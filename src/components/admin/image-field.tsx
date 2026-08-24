"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MAX_IMAGE_BYTES, MAX_IMAGE_MB, formatBytes, isAllowedImageFile } from "@/lib/constants";

/**
 * Pick an image from the machine and put it in storage.
 *
 * Prefers a signed URL so the file goes straight to Supabase and never passes
 * through the app server — serverless hosts cap request bodies at ~4.5MB, and
 * a full-quality product photograph can be larger than that. Drivers without
 * signed uploads (the local filesystem in development) answer
 * { supported: false } and the file is POSTed to the app instead.
 *
 * The stored URL lives in a hidden input, so the surrounding form still
 * submits a plain string and the server action is unchanged. The same URL is
 * editable by hand underneath, for pointing at an image already in /public.
 */
export default function ImageField({
  name,
  folder,
  defaultValue = "",
  label = "Image",
}: {
  name: string;
  /** Sub-folder in storage, e.g. "fabrics". */
  folder: string;
  defaultValue?: string;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setError(null);

    if (!isAllowedImageFile(file.name, file.type)) {
      setError("Unsupported file type. Choose a JPEG, PNG, WebP, AVIF or GIF.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError(`That file is ${formatBytes(file.size)}. The limit is ${MAX_IMAGE_MB} MB.`);
      return;
    }

    setBusy(true);
    try {
      const targetRes = await fetch("/api/admin/media/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalName: file.name, mimeType: file.type, folder }),
      });
      const target = await targetRes.json();
      if (!targetRes.ok) throw new Error(target.error ?? "Could not start the upload.");

      let stored: { url: string };

      if (target.supported) {
        // Straight to storage — the bytes never reach the app server.
        const put = await fetch(target.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        if (!put.ok) throw new Error("Upload to storage failed.");

        const commit = await fetch("/api/admin/media/commit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: target.path }),
        });
        stored = await commit.json();
        if (!commit.ok) throw new Error(stored as unknown as string);
      } else {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
            "X-File-Name": file.name,
            "X-Folder": folder,
          },
          body: file,
        });
        stored = await res.json();
        if (!res.ok) throw new Error((stored as { error?: string }).error ?? "Upload failed.");
      }

      setUrl(stored.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="block text-xs font-semibold text-neutral-600">{label}</p>

      <div className="mt-2 flex items-start gap-4">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
          {url ? (
            <Image src={url} alt="" fill sizes="80px" className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[0.6rem] text-neutral-400">
              No image
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
            >
              {busy ? "Uploading…" : url ? "Replace image" : "Upload image"}
            </button>
            {url ? (
              <button
                type="button"
                onClick={() => setUrl("")}
                disabled={busy}
                className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
              >
                Remove
              </button>
            ) : null}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
          />

          {/* The value the form actually submits, editable for an image that
              already lives in /public rather than in storage. */}
          <input
            type="text"
            name={name}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="/images/fabrics/jersey.jpg"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />

          {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
