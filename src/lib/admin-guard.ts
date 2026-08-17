import "server-only";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Guard for /api/admin/* route handlers: resolves the Supabase session and
 * checks it against the ADMIN_EMAILS allowlist. Kept separate from
 * src/lib/auth.ts so the middleware (edge runtime) can import the pure
 * allowlist check without pulling in next/headers.
 */
export async function isAdminRequest(): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return isAdminEmail(user?.email);
  } catch {
    return false;
  }
}

export const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized." }, { status: 401 });
