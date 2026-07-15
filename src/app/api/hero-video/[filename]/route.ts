import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { Readable } from "stream";
import { NextRequest } from "next/server";
import { HERO_UPLOAD_DIR, readHeroManifest } from "@/lib/storage/local";

export const runtime = "nodejs";

/**
 * Streams the hero video when STORAGE_DRIVER=local, with HTTP Range support
 * so browsers can seek. Only the file referenced by the current manifest is
 * served — anything else 404s (also prevents path traversal). Once Supabase
 * storage takes over, video URLs point at the Supabase CDN and this route
 * simply stops being referenced.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const manifest = await readHeroManifest();
  const requested = path.basename(decodeURIComponent(filename));

  if (!manifest || manifest.fileName !== requested) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(HERO_UPLOAD_DIR, manifest.fileName);
  let size: number;
  try {
    size = (await stat(filePath)).size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const baseHeaders: Record<string, string> = {
    "Content-Type": manifest.mimeType,
    "Accept-Ranges": "bytes",
    // File names are unique per upload, so responses can be cached hard.
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  const range = request.headers.get("range");
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    let start = 0;
    let end = size - 1;
    if (match) {
      const [, rawStart, rawEnd] = match;
      if (rawStart === "" && rawEnd !== "") {
        // Suffix range: "bytes=-500" → last 500 bytes.
        start = Math.max(size - Number(rawEnd), 0);
      } else {
        start = Number(rawStart || 0);
        if (rawEnd !== "") end = Math.min(Number(rawEnd), size - 1);
      }
    }
    if (!match || start >= size || start > end) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const stream = Readable.toWeb(
      createReadStream(filePath, { start, end })
    ) as ReadableStream;
    return new Response(stream, {
      status: 206,
      headers: {
        ...baseHeaders,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": String(end - start + 1),
      },
    });
  }

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
  return new Response(stream, {
    status: 200,
    headers: { ...baseHeaders, "Content-Length": String(size) },
  });
}
