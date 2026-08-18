import "server-only";
import { cache } from "react";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Resolve the signed-in user, deduped per request.
 *
 * React's cache() means the dashboard layout, the page and any server action
 * in the same render share ONE call to Supabase instead of each paying its own
 * network round-trip — that duplication is what made switching admin tabs feel
 * laggy.
 */
export const getAdminUser = cache(async (): Promise<{ email: string } | null> => {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return isAdminEmail(user?.email) ? { email: user!.email! } : null;
  } catch {
    return null;
  }
});

/** Guard for /api/admin/* route handlers and server actions. */
export async function isAdminRequest(): Promise<boolean> {
  return (await getAdminUser()) !== null;
}

export const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized." }, { status: 401 });
