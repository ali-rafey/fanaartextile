import { createWriteStream } from "fs";
import { mkdir, readFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import type { HeroVideoMeta, StorageDriver } from "./types";

/** Bridges a web ReadableStream to something Node's pipeline() accepts. */
async function* toAsyncIterable(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      if (value) yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

// Everything the local driver writes lives under ./var (gitignored):
//   var/uploads/hero/<file>   — the video itself
//   var/data/hero-video.json  — manifest describing the current video
const VAR_ROOT = path.join(process.cwd(), "var");
export const HERO_UPLOAD_DIR = path.join(VAR_ROOT, "uploads", "hero");
const HERO_MANIFEST_PATH = path.join(VAR_ROOT, "data", "hero-video.json");

export type HeroManifest = Omit<HeroVideoMeta, "url">;

export async function readHeroManifest(): Promise<HeroManifest | null> {
  try {
    const raw = await readFile(HERO_MANIFEST_PATH, "utf8");
    return JSON.parse(raw) as HeroManifest;
  } catch {
    return null;
  }
}

function toMeta(manifest: HeroManifest): HeroVideoMeta {
  return {
    ...manifest,
    url: `/api/hero-video/${encodeURIComponent(manifest.fileName)}`,
  };
}

function safeExtension(fileName: string): string {
  const ext = (fileName.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return ext || "mp4";
}

export const localFsDriver: StorageDriver = {
  async getHeroVideo() {
    const manifest = await readHeroManifest();
    if (!manifest) return null;
    try {
      await stat(path.join(HERO_UPLOAD_DIR, manifest.fileName));
    } catch {
      return null; // manifest points at a file that no longer exists
    }
    return toMeta(manifest);
  },

  async saveHeroVideo(upload) {
    const previous = await readHeroManifest();
    const fileName = `hero-${Date.now()}.${safeExtension(upload.originalName)}`;
    const filePath = path.join(HERO_UPLOAD_DIR, fileName);

    await mkdir(HERO_UPLOAD_DIR, { recursive: true });
    await mkdir(path.dirname(HERO_MANIFEST_PATH), { recursive: true });

    // Stream to disk so a multi-hundred-MB master never lands in memory.
    try {
      await pipeline(toAsyncIterable(upload.body), createWriteStream(filePath));
    } catch (error) {
      await unlink(filePath).catch(() => {}); // don't leave a partial file behind
      throw error;
    }

    // Trust the bytes actually written over any client-declared length.
    const { size } = await stat(filePath);

    const manifest: HeroManifest = {
      fileName,
      originalName: upload.originalName,
      mimeType: upload.mimeType,
      size,
      uploadedAt: new Date().toISOString(),
      width: upload.width,
      height: upload.height,
      durationSec: upload.durationSec,
    };
    await writeFile(HERO_MANIFEST_PATH, JSON.stringify(manifest, null, 2));

    // Only the current video is kept; clean up the replaced file best-effort.
    if (previous && previous.fileName !== fileName) {
      await unlink(path.join(HERO_UPLOAD_DIR, previous.fileName)).catch(() => {});
    }

    return toMeta(manifest);
  },

  async deleteHeroVideo() {
    const manifest = await readHeroManifest();
    if (!manifest) return;
    await unlink(HERO_MANIFEST_PATH).catch(() => {});
    await unlink(path.join(HERO_UPLOAD_DIR, manifest.fileName)).catch(() => {});
  },
};
