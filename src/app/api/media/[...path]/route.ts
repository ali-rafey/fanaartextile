import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";
import { IMAGE_UPLOAD_ROOT } from "@/lib/storage/local";

export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

/**
 * Serves imagery the local driver wrote under var/. Public on purpose: this
 * is catalogue photography, and it stands in for the Supabase public URL so
 * a stored path renders the same whichever driver is active.
 */
export async function GET(_request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await context.params;

  // Resolve, then prove the result is still inside the upload root — a
  // segment like ".." would otherwise reach anywhere on the disk.
  const filePath = path.resolve(IMAGE_UPLOAD_ROOT, ...segments);
  if (filePath !== IMAGE_UPLOAD_ROOT && !filePath.startsWith(IMAGE_UPLOAD_ROOT + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new NextResponse("Not found", { status: 404 });

    const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
    const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream<Uint8Array>;

    return new NextResponse(stream, {
      headers: {
        "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
        "Content-Length": String(info.size),
        // The file name carries a timestamp, so a given URL never changes.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
