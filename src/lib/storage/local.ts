import { mkdir, readFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import type { HeroVideoMeta, StorageDriver } from "./types";

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

  async saveHeroVideo(file) {
    const previous = await readHeroManifest();
    const fileName = `hero-${Date.now()}.${safeExtension(file.name)}`;

    await mkdir(HERO_UPLOAD_DIR, { recursive: true });
    await mkdir(path.dirname(HERO_MANIFEST_PATH), { recursive: true });
    await writeFile(path.join(HERO_UPLOAD_DIR, fileName), Buffer.from(await file.arrayBuffer()));

    const manifest: HeroManifest = {
      fileName,
      originalName: file.name,
      mimeType: file.type || "video/mp4",
      size: file.size,
      uploadedAt: new Date().toISOString(),
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
