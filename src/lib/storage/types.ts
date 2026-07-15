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
}

/**
 * Media storage behind a single interface so the app never cares where files
 * live. `local` (filesystem) is the default today; `supabase` takes over once
 * the Supabase project keys land in .env.local. Selected in storage/index.ts
 * via the STORAGE_DRIVER env var.
 */
export interface StorageDriver {
  getHeroVideo(): Promise<HeroVideoMeta | null>;
  saveHeroVideo(file: File): Promise<HeroVideoMeta>;
  deleteHeroVideo(): Promise<void>;
}
