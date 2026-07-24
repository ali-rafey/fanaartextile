import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import type { HeroVideoMeta, StorageDriver } from "./types";

/**
 * Supabase-backed driver. Becomes active when STORAGE_DRIVER=supabase and the
 * keys in .env.local are set. Requires supabase/schema.sql to have been run
 * once (creates the `site_settings` table and the public `site-assets` bucket).
 *
 * Layout:
 *   storage bucket `site-assets`, object `hero/hero-<ts>.<ext>`  — the video
 *   table `site_settings`, row key `hero_video`                  — metadata
 *
 * Files are uploaded verbatim — Supabase storage does not transcode, so the
 * served video is bit-identical to what the admin selected.
 */
export const SITE_ASSETS_BUCKET = "site-assets";
const HERO_SETTINGS_KEY = "hero_video";

type StoredHeroValue = Omit<HeroVideoMeta, "url"> & {
  /** Object path inside the bucket, e.g. "hero/hero-1720000000000.mp4". */
  path: string;
};

function safeExtension(fileName: string): string {
  const ext = (fileName.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return ext || "mp4";
}

async function readStoredValue(): Promise<StoredHeroValue | null> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", HERO_SETTINGS_KEY)
    .maybeSingle();
  if (error) throw new Error(`Failed to read hero video settings: ${error.message}`);
  return (data?.value as StoredHeroValue | undefined) ?? null;
}

function toMeta(value: StoredHeroValue): HeroVideoMeta {
  const supabase = getSupabaseAdminClient();
  const { data } = supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(value.path);
  return {
    url: data.publicUrl,
    fileName: value.fileName,
    originalName: value.originalName,
    mimeType: value.mimeType,
    size: value.size,
    uploadedAt: value.uploadedAt,
    width: value.width,
    height: value.height,
    durationSec: value.durationSec,
  };
}

export const supabaseDriver: StorageDriver = {
  async getHeroVideo() {
    const value = await readStoredValue();
    return value ? toMeta(value) : null;
  },

  async saveHeroVideo(upload) {
    const supabase = getSupabaseAdminClient();
    const previous = await readStoredValue();

    const fileName = `hero-${Date.now()}.${safeExtension(upload.originalName)}`;
    const objectPath = `hero/${fileName}`;

    // The storage SDK wants a sized body, so the stream is collected here.
    // Large masters should move to direct-to-Supabase signed URL uploads
    // (see README roadmap) so bytes bypass this server entirely.
    const blob = await new Response(upload.body).blob();

    const { error: uploadError } = await supabase.storage
      .from(SITE_ASSETS_BUCKET)
      .upload(objectPath, blob, { contentType: upload.mimeType });
    if (uploadError) throw new Error(`Failed to upload hero video: ${uploadError.message}`);

    const value: StoredHeroValue = {
      path: objectPath,
      fileName,
      originalName: upload.originalName,
      mimeType: upload.mimeType,
      size: blob.size,
      uploadedAt: new Date().toISOString(),
      width: upload.width,
      height: upload.height,
      durationSec: upload.durationSec,
    };

    const { error: upsertError } = await supabase
      .from("site_settings")
      .upsert({ key: HERO_SETTINGS_KEY, value, updated_at: new Date().toISOString() });
    if (upsertError) {
      // Keep storage consistent if the metadata write failed.
      await supabase.storage.from(SITE_ASSETS_BUCKET).remove([objectPath]);
      throw new Error(`Failed to save hero video settings: ${upsertError.message}`);
    }

    if (previous && previous.path !== objectPath) {
      await supabase.storage.from(SITE_ASSETS_BUCKET).remove([previous.path]);
    }

    return toMeta(value);
  },

  async deleteHeroVideo() {
    const supabase = getSupabaseAdminClient();
    const previous = await readStoredValue();
    if (!previous) return;

    const { error } = await supabase.from("site_settings").delete().eq("key", HERO_SETTINGS_KEY);
    if (error) throw new Error(`Failed to delete hero video settings: ${error.message}`);
    await supabase.storage.from(SITE_ASSETS_BUCKET).remove([previous.path]);
  },
};
