import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/auth";

/**
 * Runs on every matched request (see src/middleware.ts). It refreshes the
 * Supabase auth session cookie (required by @supabase/ssr so Server Components
 * always see a valid session) and guards the admin area:
 *   - unauthenticated / non-admin visitors to /admin → redirected to the login
 *   - an already-signed-in admin landing on the login page → sent to /admin
 * The /api/admin routes are guarded inside the route handlers (they return 401
 * rather than redirect), so they are intentionally not handled here.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // If Supabase isn't configured, don't lock anyone out (local dev fallback).
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const onLogin = path === "/admin/login";
  const admin = isAdminEmail(user?.email);

  if (!onLogin && !admin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.search = "";
    // Distinguish "signed in but not on the allowlist" (ADMIN_EMAILS) from
    // "not signed in" so the login page can explain the former.
    if (user) redirectUrl.searchParams.set("error", "forbidden");
    return NextResponse.redirect(redirectUrl);
  }

  if (onLogin && admin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
