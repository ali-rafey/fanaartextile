import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { isAllowedImageFile, isAllowedVideoFile } from "@/lib/constants";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Mint a signed URL so the browser can send an image straight to storage,
 * bypassing this server entirely — serverless hosts cap request bodies at
 * ~4.5MB and a full-quality photograph can exceed that.
 *
 * Responds { supported: false } on drivers without direct upload (local fs),
 * and the client falls back to POSTing the file to /api/admin/media.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return unauthorized();

  try {
    const { originalName, mimeType, folder, allowVideo } = (await request.json()) as {
      originalName?: string;
      mimeType?: string;
      folder?: string;
      allowVideo?: boolean;
    };

    if (!originalName) {
      return NextResponse.json({ error: "originalName is required." }, { status: 400 });
    }
    const ok =
      isAllowedImageFile(originalName, mimeType ?? "") ||
      (allowVideo === true && isAllowedVideoFile(originalName, mimeType ?? ""));
    if (!ok) {
      return NextResponse.json(
        {
          error: allowVideo
            ? "Unsupported file type. Upload an image or an MP4/WebM video."
            : "Unsupported file type. Upload a JPEG, PNG, WebP, AVIF or GIF.",
        },
        { status: 415 }
      );
    }

    const storage = getStorage();
    if (!storage.createImageUploadTarget) return NextResponse.json({ supported: false });

    const target = await storage.createImageUploadTarget(folder ?? "misc", originalName);
    return NextResponse.json({ supported: true, ...target });
  } catch (error) {
    console.error("Failed to create image upload URL:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not start upload." },
      { status: 500 }
    );
  }
}
