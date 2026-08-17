export interface HeroVideoMeta {
  /** Playable URL for the <video> tag (local API route or Supabase public URL). */
  url: string;
  /** Stored file name — unique per upload so URLs are cache-safe. */
  fileName: string;
  /** Name of the file the admin originally selected. */
  originalName: string;
  mimeType: string;
  /** Size in bytes. */
  size: number;
  /** ISO timestamp of the upload. */
  uploadedAt: string;
  /** Native pixel dimensions, measured in the browser before upload. */
  width?: number;
  height?: number;
  durationSec?: number;
}

/**
 * An incoming hero video. The body is a stream so large HD masters are
 * written straight to storage instead of being buffered in memory.
 */
export interface HeroVideoUpload {
  body: ReadableStream<Uint8Array>;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  durationSec?: number;
}

/**
 * Media storage behind a single interface so the app never cares where files
 * live. `local` (filesystem) is the default today; `supabase` takes over once
 * the Supabase project keys land in .env.local. Selected in storage/index.ts
 * via the STORAGE_DRIVER env var.
 *
 * Drivers store the uploaded bytes verbatim — no transcoding, resizing or
 * re-encoding ever happens, so playback quality equals the source file.
 */
/** Where the browser should PUT the bytes for a direct-to-storage upload. */
export interface DirectUploadTarget {
  signedUrl: string;
  /** Object path inside the bucket, echoed back on commit. */
  path: string;
}

/** Metadata recorded once a direct upload has finished. */
export interface DirectUploadCommit {
  path: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  durationSec?: number;
}

export interface StorageDriver {
  getHeroVideo(): Promise<HeroVideoMeta | null>;
  saveHeroVideo(upload: HeroVideoUpload): Promise<HeroVideoMeta>;
  deleteHeroVideo(): Promise<void>;

  /**
   * Optional direct-upload pair. When a driver implements these, the browser
   * sends the file straight to the storage provider and the app server only
   * records metadata — essential on hosts like Vercel, whose serverless
   * functions cap request bodies at ~4.5MB. Drivers without them (local fs)
   * keep using the streaming saveHeroVideo path.
   */
  createHeroUploadTarget?(originalName: string): Promise<DirectUploadTarget>;
  commitHeroVideo?(commit: DirectUploadCommit): Promise<HeroVideoMeta>;
}
