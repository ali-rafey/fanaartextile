import { localFsDriver } from "./local";
import { supabaseDriver } from "./supabase";
import type { StorageDriver } from "./types";

export type { HeroVideoMeta, StorageDriver } from "./types";

/**
 * Resolve the active media-storage driver.
 * Defaults to the local filesystem; set STORAGE_DRIVER=supabase in .env.local
 * (plus the Supabase keys) to switch — no application code changes needed.
 */
export function getStorage(): StorageDriver {
  const driver = process.env.STORAGE_DRIVER ?? "local";
  if (driver === "supabase") return supabaseDriver;
  return localFsDriver;
}
