import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

// Guard the admin UI (the /api/admin routes protect themselves with a 401).
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
