export const SITE_NAME = "Fanaar";

/** Upload ceiling for the homepage hero video. */
export const MAX_HERO_VIDEO_MB = 200;
export const MAX_HERO_VIDEO_BYTES = MAX_HERO_VIDEO_MB * 1024 * 1024;

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
