import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use inside client components (browser).
 * Uses the public anon key — RLS policies apply to every query.
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.example)."
    );
  }
  return createBrowserClient(url, anonKey);
}
