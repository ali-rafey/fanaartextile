"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MAX_HERO_VIDEO_BYTES,
  MAX_HERO_VIDEO_MB,
  formatBytes,
  isAllowedVideoFile,
} from "@/lib/constants";
import type { HeroVideoMeta } from "@/lib/storage/types";

type Status =
  | { kind: "idle" }
  | { kind: "uploading"; progress: number }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

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

  const uploading = status.kind === "uploading";

  const upload = useCallback(
    (file: File) => {
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

      setStatus({ kind: "uploading", progress: 0 });

      // XMLHttpRequest instead of fetch so we get upload progress events.
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/hero-video");
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setStatus({ kind: "uploading", progress: event.loaded / event.total });
        }
      };
      xhr.onload = () => {
        try {
          const body = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            setVideo(body.video);
            setStatus({
              kind: "success",
              message: "Hero video updated — it is now live on the homepage.",
            });
            router.refresh();
          } else {
            setStatus({
              kind: "error",
              message: body.error ?? `Upload failed (HTTP ${xhr.status}).`,
            });
          }
        } catch {
          setStatus({ kind: "error", message: `Upload failed (HTTP ${xhr.status}).` });
        }
      };
      xhr.onerror = () =>
        setStatus({ kind: "error", message: "Network error during upload — try again." });

      const formData = new FormData();
      formData.append("file", file);
      xhr.send(formData);
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

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-stone-400">File</dt>
              <dd className="truncate text-stone-700" title={video.originalName}>
                {video.originalName}
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Size</dt>
              <dd className="text-stone-700">{formatBytes(video.size)}</dd>
            </div>
            <div>
              <dt className="text-stone-400">Uploaded</dt>
              <dd className="text-stone-700" suppressHydrationWarning>
                {new Date(video.uploadedAt).toLocaleString()}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={openFilePicker}
              disabled={uploading}
              className="rounded-lg bg-clay px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              Replace video
            </button>
            <button
              type="button"
              onClick={removeVideo}
              disabled={uploading}
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
          if (file && !uploading) upload(file);
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
            disabled={uploading}
            className="font-medium text-clay underline underline-offset-2 hover:text-clay-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            browse files
          </button>
        </p>
        <p className="mt-2 text-xs text-stone-400">
          MP4, WebM or MOV · up to {MAX_HERO_VIDEO_MB}MB
        </p>

        {uploading && status.kind === "uploading" && (
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
