import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { isAllowedVideoFile } from "@/lib/constants";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Mint a signed URL so the browser can upload the hero video straight to
 * storage. This is what makes large files work on serverless hosts: the bytes
 * never pass through this function (Vercel caps request bodies at ~4.5MB).
 *
 * Responds { supported: false } on drivers without direct upload (local fs),
 * so the client falls back to streaming the file through the app server.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return unauthorized();

  try {
    const { originalName, mimeType } = (await request.json()) as {
      originalName?: string;
      mimeType?: string;
    };

    if (!originalName) {
      return NextResponse.json({ error: "originalName is required." }, { status: 400 });
    }
    if (!isAllowedVideoFile(originalName, mimeType ?? "")) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload an MP4, WebM, OGV or MOV video." },
        { status: 415 }
      );
    }

    const storage = getStorage();
    if (!storage.createHeroUploadTarget) {
      return NextResponse.json({ supported: false });
    }

    const target = await storage.createHeroUploadTarget(originalName);
    return NextResponse.json({ supported: true, ...target });
  } catch (error) {
    console.error("Failed to create hero upload URL:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not start upload." },
      { status: 500 }
    );
  }
}
