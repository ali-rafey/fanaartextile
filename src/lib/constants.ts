export const SITE_NAME = "Fanaar";

/**
 * Upload ceiling for the homepage hero video. Generous by default so true
 * HD/4K masters never have to be compressed before upload — the file is
 * stored and streamed byte-for-byte, never transcoded. Override with
 * NEXT_PUBLIC_MAX_HERO_VIDEO_MB (readable on both server and client).
 */
const DEFAULT_MAX_HERO_VIDEO_MB = 1024;
export const MAX_HERO_VIDEO_MB =
  Number(process.env.NEXT_PUBLIC_MAX_HERO_VIDEO_MB) || DEFAULT_MAX_HERO_VIDEO_MB;
export const MAX_HERO_VIDEO_BYTES = MAX_HERO_VIDEO_MB * 1024 * 1024;

/**
 * The hero plays full-screen, so anything below 1080p gets visibly upscaled
 * on modern displays. Uploads under this are accepted but flagged in admin.
 */
export const RECOMMENDED_MIN_HERO_HEIGHT = 1080;

export const ALLOWED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-m4v",
];

/** Fallback check — some browsers/OSes report an empty MIME type for .mov/.m4v. */
export const ALLOWED_VIDEO_EXTENSIONS = ["mp4", "webm", "ogv", "mov", "m4v"];

export function isAllowedVideoFile(fileName: string, mimeType: string): boolean {
  if (ALLOWED_VIDEO_MIME_TYPES.includes(mimeType)) return true;
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_VIDEO_EXTENSIONS.includes(ext);
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** i;
  return `${value >= 10 || i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}

/** "1920×1080 (Full HD)" — the label shown next to an uploaded video. */
export function describeResolution(width?: number, height?: number): string | null {
  if (!width || !height) return null;
  const tiers: [number, string][] = [
    [4320, "8K"],
    [2160, "4K"],
    [1440, "2K"],
    [1080, "Full HD"],
    [720, "HD"],
  ];
  const tier = tiers.find(([h]) => height >= h);
  return `${width}×${height}${tier ? ` (${tier[1]})` : ""}`;
}
