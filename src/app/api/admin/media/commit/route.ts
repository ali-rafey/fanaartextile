import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

/** Resolve the public URL for an image the browser uploaded directly. */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return unauthorized();

  try {
    const { path } = (await request.json()) as { path?: string };
    if (!path) return NextResponse.json({ error: "path is required." }, { status: 400 });

    const storage = getStorage();
    if (!storage.commitImage) {
      return NextResponse.json({ error: "Driver cannot commit uploads." }, { status: 400 });
    }
    return NextResponse.json(await storage.commitImage(path));
  } catch (error) {
    console.error("Failed to commit image upload:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not finish upload." },
      { status: 500 }
    );
  }
}
