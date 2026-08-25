import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_HERO_LAYOUT } from "./types";
import type {
  DirectUploadCommit,
  DirectUploadTarget,
  HeroLayout,
  HeroVideoMeta,
  ImageUpload,
  StorageDriver,
  StoredImage,
} from "./types";

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
const HERO_LAYOUT_KEY = "hero_layout";

type StoredHeroValue = Omit<HeroVideoMeta, "url"> & {
  /** Object path inside the bucket, e.g. "hero/hero-1720000000000.mp4". */
  path: string;
};

/** A collision-proof object name that keeps the admin's own file name legible. */
function imageObjectPath(folder: string, originalName: string): string {
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "misc";
  const stem = (originalName.split("/").pop() ?? originalName)
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "image";
  const ext = (originalName.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  return `images/${safeFolder}/${stem}-${Date.now()}.${ext}`;
}

function publicUrl(path: string): string {
  const { data } = getSupabaseAdminClient().storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

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

  /**
   * Mint a short-lived signed URL the browser uploads to directly. Keeps large
   * masters off the app server entirely (Vercel functions cap bodies at ~4.5MB)
   * and the bytes still land in Supabase verbatim — nothing is transcoded.
   */
  async createHeroUploadTarget(originalName: string): Promise<DirectUploadTarget> {
    const supabase = getSupabaseAdminClient();
    const objectPath = `hero/hero-${Date.now()}.${safeExtension(originalName)}`;

    const { data, error } = await supabase.storage
      .from(SITE_ASSETS_BUCKET)
      .createSignedUploadUrl(objectPath);
    if (error || !data) {
      throw new Error(`Failed to create upload URL: ${error?.message ?? "unknown error"}`);
    }
    return { signedUrl: data.signedUrl, path: data.path ?? objectPath };
  },

  /** Record metadata for a file the browser already uploaded. */
  async commitHeroVideo(commit: DirectUploadCommit): Promise<HeroVideoMeta> {
    const supabase = getSupabaseAdminClient();
    const previous = await readStoredValue();

    const value: StoredHeroValue = {
      path: commit.path,
      fileName: commit.path.split("/").pop() ?? commit.path,
      originalName: commit.originalName,
      mimeType: commit.mimeType,
      size: commit.size,
      uploadedAt: new Date().toISOString(),
      width: commit.width,
      height: commit.height,
      durationSec: commit.durationSec,
    };

    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: HERO_SETTINGS_KEY, value, updated_at: new Date().toISOString() });
    if (error) {
      // Don't leave an orphaned object behind if the metadata write failed.
      await supabase.storage.from(SITE_ASSETS_BUCKET).remove([commit.path]);
      throw new Error(`Failed to save hero video settings: ${error.message}`);
    }

    if (previous && previous.path !== commit.path) {
      await supabase.storage.from(SITE_ASSETS_BUCKET).remove([previous.path]);
    }

    return toMeta(value);
  },

  async getHeroLayout(): Promise<HeroLayout> {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", HERO_LAYOUT_KEY)
      .maybeSingle();
    if (error || !data?.value) return DEFAULT_HERO_LAYOUT;
    return { ...DEFAULT_HERO_LAYOUT, ...(data.value as Partial<HeroLayout>) };
  },

  async saveHeroLayout(layout: HeroLayout): Promise<HeroLayout> {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: HERO_LAYOUT_KEY, value: layout, updated_at: new Date().toISOString() });
    if (error) throw new Error(`Failed to save hero layout: ${error.message}`);
    return layout;
  },

  /**
   * Images are small enough to pass through the server, so this path works on
   * every host. Larger files use the signed-URL pair below.
   */
  async saveImage(upload: ImageUpload): Promise<StoredImage> {
    const supabase = getSupabaseAdminClient();
    const objectPath = imageObjectPath(upload.folder, upload.originalName);
    const blob = await new Response(upload.body).blob();

    const { error } = await supabase.storage
      .from(SITE_ASSETS_BUCKET)
      .upload(objectPath, blob, { contentType: upload.mimeType, upsert: false });
    if (error) throw new Error(`Failed to upload image: ${error.message}`);

    return { url: publicUrl(objectPath), path: objectPath };
  },

  async createImageUploadTarget(folder: string, originalName: string): Promise<DirectUploadTarget> {
    const supabase = getSupabaseAdminClient();
    const objectPath = imageObjectPath(folder, originalName);
    const { data, error } = await supabase.storage
      .from(SITE_ASSETS_BUCKET)
      .createSignedUploadUrl(objectPath);
    if (error || !data) {
      throw new Error(`Failed to create upload URL: ${error?.message ?? "unknown error"}`);
    }
    return { signedUrl: data.signedUrl, path: data.path ?? objectPath };
  },

  async commitImage(path: string): Promise<StoredImage> {
    return { url: publicUrl(path), path };
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
