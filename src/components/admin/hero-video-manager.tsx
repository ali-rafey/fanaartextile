"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MAX_HERO_VIDEO_BYTES,
  MAX_HERO_VIDEO_MB,
  RECOMMENDED_MIN_HERO_HEIGHT,
  describeResolution,
  formatBytes,
  isAllowedVideoFile,
} from "@/lib/constants";
import type { HeroVideoMeta } from "@/lib/storage/types";

type Status =
  | { kind: "idle" }
  | { kind: "reading" }
  | { kind: "uploading"; progress: number }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

type Probe = { width: number; height: number; durationSec: number };

/**
 * Reads the video's true pixel dimensions in the browser before uploading,
 * so the admin can see exactly what resolution is going live.
 */
function probeVideo(file: File): Promise<Probe | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.muted = true;
    const done = (result: Probe | null) => {
      URL.revokeObjectURL(url);
      resolve(result);
    };
    probe.onloadedmetadata = () =>
      done({
        width: probe.videoWidth,
        height: probe.videoHeight,
        durationSec: Number.isFinite(probe.duration) ? probe.duration : 0,
      });
    probe.onerror = () => done(null);
    probe.src = url;
  });
}

/** XHR so upload progress is reportable (fetch cannot report it). */
function sendWithProgress(
  method: "PUT" | "POST",
  url: string,
  file: File,
  onProgress: (fraction: number) => void,
  headers: Record<string, string> = {}
): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    };
    xhr.onload = () => resolve({ status: xhr.status, text: xhr.responseText });
    xhr.onerror = () => reject(new Error("Network error during upload — try again."));
    xhr.send(file);
  });
}

export default function HeroVideoManager({
  initialVideo,
}: {
  initialVideo: HeroVideoMeta | null;
}) {
  const [video, setVideo] = useState(initialVideo);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const busy = status.kind === "uploading" || status.kind === "reading";

  const upload = useCallback(
    async (file: File) => {
      if (!isAllowedVideoFile(file.name, file.type)) {
        setStatus({
          kind: "error",
          message: "Unsupported file type. Upload an MP4, WebM, OGV or MOV video.",
        });
        return;
      }
      if (file.size > MAX_HERO_VIDEO_BYTES) {
        setStatus({
          kind: "error",
          message: `"${file.name}" is ${formatBytes(file.size)} — the hero video must be under ${MAX_HERO_VIDEO_MB}MB.`,
        });
        return;
      }

      setStatus({ kind: "reading" });
      const probe = await probeVideo(file);

      setStatus({ kind: "uploading", progress: 0 });
      const onProgress = (progress: number) => setStatus({ kind: "uploading", progress });

      const finish = (saved: HeroVideoMeta) => {
        setVideo(saved);
        const shortfall = saved?.height && saved.height < RECOMMENDED_MIN_HERO_HEIGHT;
        setStatus({
          kind: "success",
          message: shortfall
            ? "Uploaded and live — but see the resolution note below."
            : "Hero video updated — it is now live on the homepage.",
        });
        router.refresh();
      };

      try {
        // Prefer a direct-to-storage upload: on serverless hosts the file must
        // bypass the app server entirely (Vercel caps request bodies at ~4.5MB).
        const targetRes = await fetch("/api/admin/hero-video/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalName: file.name, mimeType: file.type }),
        });
        const target = await targetRes.json();
        if (!targetRes.ok) throw new Error(target.error ?? "Could not start the upload.");

        if (target.supported) {
          const put = await sendWithProgress("PUT", target.signedUrl, file, onProgress, {
            "Content-Type": file.type || "application/octet-stream",
            "x-upsert": "true",
          });
          if (put.status < 200 || put.status >= 300) {
            throw new Error(`Upload to storage failed (HTTP ${put.status}).`);
          }

          const commitRes = await fetch("/api/admin/hero-video/commit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              path: target.path,
              originalName: file.name,
              mimeType: file.type || "video/mp4",
              size: file.size,
              width: probe?.width,
              height: probe?.height,
              durationSec: probe ? Math.round(probe.durationSec) : undefined,
            }),
          });
          const committed = await commitRes.json();
          if (!commitRes.ok) throw new Error(committed.error ?? "Could not save the video.");
          finish(committed.video);
          return;
        }

        // Local filesystem driver — stream the raw body through the app server.
        const headers: Record<string, string> = {
          "Content-Type": file.type || "application/octet-stream",
          "X-File-Name": encodeURIComponent(file.name),
        };
        if (probe) {
          headers["X-Video-Width"] = String(probe.width);
          headers["X-Video-Height"] = String(probe.height);
          headers["X-Video-Duration"] = String(Math.round(probe.durationSec));
        }
        const res = await sendWithProgress(
          "POST",
          "/api/admin/hero-video",
          file,
          onProgress,
          headers
        );
        const body = JSON.parse(res.text);
        if (res.status < 200 || res.status >= 300) {
          throw new Error(body.error ?? `Upload failed (HTTP ${res.status}).`);
        }
        finish(body.video);
      } catch (error) {
        setStatus({
          kind: "error",
          message: error instanceof Error ? error.message : "Upload failed — try again.",
        });
      }
    },
    [router]
  );

  const removeVideo = useCallback(async () => {
    if (
      !window.confirm(
        "Remove the hero video? The homepage will show the placeholder until a new one is uploaded."
      )
    ) {
      return;
    }
    const res = await fetch("/api/admin/hero-video", { method: "DELETE" });
    if (res.ok) {
      setVideo(null);
      setStatus({ kind: "success", message: "Hero video removed." });
      router.refresh();
    } else {
      const body = await res.json().catch(() => null);
      setStatus({ kind: "error", message: body?.error ?? "Failed to remove the video." });
    }
  }, [router]);

  const openFilePicker = () => inputRef.current?.click();

  const resolution = describeResolution(video?.width, video?.height);
  const lowResolution = !!video?.height && video.height < RECOMMENDED_MIN_HERO_HEIGHT;

  return (
    <div className="mt-8 space-y-6">
      {video && (
        <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-stone-700">Current video</h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              Live on homepage
            </span>
          </div>

          <video
            key={video.url}
            src={video.url}
            controls
            playsInline
            preload="metadata"
            className="mt-4 aspect-video w-full rounded-lg bg-ink object-contain"
          />

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-stone-400">File</dt>
              <dd className="truncate text-stone-700" title={video.originalName}>
                {video.originalName}
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Resolution</dt>
              <dd className={lowResolution ? "font-medium text-amber-700" : "text-stone-700"}>
                {resolution ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Size</dt>
              <dd className="text-stone-700">{formatBytes(video.size)}</dd>
            </div>
            <div>
              <dt className="text-stone-400">Uploaded</dt>
              <dd className="text-stone-700" suppressHydrationWarning>
                {new Date(video.uploadedAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>

          {lowResolution && (
            <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong className="font-medium">This video is below Full HD.</strong> It plays at
              its original quality — nothing is compressed on upload — but at{" "}
              {video.width}×{video.height} it gets stretched to fill a full-screen hero, so it
              looks soft on larger displays. Re-upload a {RECOMMENDED_MIN_HERO_HEIGHT}p or 4K
              master for a crisp result.
            </p>
          )}

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={openFilePicker}
              disabled={busy}
              className="rounded-lg bg-clay px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              Replace video
            </button>
            <button
              type="button"
              onClick={removeVideo}
              disabled={busy}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </section>
      )}

      <section
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file && !busy) upload(file);
        }}
        className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          dragging ? "border-clay bg-clay/5" : "border-stone-300 bg-white"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="mx-auto h-10 w-10 text-stone-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        <p className="mt-4 text-sm text-stone-600">
          {video
            ? "Drop a new video here to replace the current one, or "
            : "Drop your hero video here, or "}
          <button
            type="button"
            onClick={openFilePicker}
            disabled={busy}
            className="font-medium text-clay underline underline-offset-2 hover:text-clay-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            browse files
          </button>
        </p>
        <p className="mt-2 text-xs text-stone-400">
          MP4, WebM or MOV · up to {MAX_HERO_VIDEO_MB}MB · uploaded at full quality, never
          compressed
        </p>

        {status.kind === "reading" && (
          <p className="mt-6 text-xs text-stone-500">Reading video…</p>
        )}

        {status.kind === "uploading" && (
          <div className="mx-auto mt-6 max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-clay transition-[width] duration-200"
                style={{ width: `${Math.round(status.progress * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Uploading… {Math.round(status.progress * 100)}%
            </p>
          </div>
        )}
      </section>

      {status.kind === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {status.message}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-m4v,.mp4,.webm,.ogv,.mov,.m4v"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}
