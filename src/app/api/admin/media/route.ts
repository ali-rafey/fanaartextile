import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { isAllowedImageFile } from "@/lib/constants";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Upload one catalogue image. The file is the raw request body — streamed to
 * storage rather than buffered — with its name and folder carried in headers,
 * the same shape the hero-video route uses.
 *
 * This is the path every driver supports. Where the driver can mint a signed
 * URL (Supabase), the client prefers that instead so the bytes never touch
 * this function at all.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return unauthorized();

  const originalName = request.headers.get("x-file-name") ?? "";
  const folder = request.headers.get("x-folder") ?? "misc";
  const mimeType = request.headers.get("content-type") ?? "";

  if (!originalName) {
    return NextResponse.json({ error: "Missing X-File-Name header." }, { status: 400 });
  }
  if (!isAllowedImageFile(originalName, mimeType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Upload a JPEG, PNG, WebP, AVIF or GIF." },
      { status: 415 }
    );
  }
  if (!request.body) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  try {
    const stored = await getStorage().saveImage({
      body: request.body,
      originalName,
      mimeType,
      folder,
    });
    return NextResponse.json(stored);
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}
