import { NextResponse, type NextRequest } from "next/server";
import { isBlockedBot } from "@/lib/bots";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Turn away commercial scrapers before any work is done. robots.txt asks
  // politely; this enforces it for the ones that ignore it.
  if (isBlockedBot(request.headers.get("user-agent"))) {
    return new NextResponse("Not available.", {
      status: 403,
      headers: { "cache-control": "no-store", "x-robots-tag": "noindex" },
    });
  }

  // Auth/session handling only applies to the admin portal.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  // Run on pages, but skip static assets, images and the SEO files so the
  // bot check never adds latency to cached responses.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
