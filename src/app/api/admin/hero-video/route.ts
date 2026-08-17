import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth";
import {
  MAX_HERO_VIDEO_BYTES,
  MAX_HERO_VIDEO_MB,
  isAllowedVideoFile,
} from "@/lib/constants";
import { getStorage } from "@/lib/storage";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/** Every handler below requires a signed-in admin (see ADMIN_EMAILS). */
async function requireAdmin(): Promise<boolean> {
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

const unauthorized = () => NextResponse.json({ error: "Unauthorized." }, { status: 401 });

/** Current hero video metadata (used for debugging / future admin needs). */
export async function GET() {
  if (!(await requireAdmin())) return unauthorized();
  try {
    const video = await getStorage().getHeroVideo();
    return NextResponse.json({ video });
  } catch (error) {
    console.error("Failed to read hero video:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read hero video." },
      { status: 500 }
    );
  }
}

/** Reads an optional positive number from a request header. */
function numericHeader(request: NextRequest, name: string): number | undefined {
  const value = Number(request.headers.get(name));
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

/** Aborts the upload if the body exceeds the cap, whatever the client claimed. */
function limitBytes(source: ReadableStream<Uint8Array>, maxBytes: number) {
  let seen = 0;
  return source.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        seen += chunk.byteLength;
        if (seen > maxBytes) {
          controller.error(
            new Error(`File is too large. The hero video must be under ${MAX_HERO_VIDEO_MB}MB.`)
          );
          return;
        }
        controller.enqueue(chunk);
      },
    })
  );
}

/**
 * Upload / replace the hero video.
 *
 * The file is sent as the raw request body (not multipart) so it can be
 * streamed straight to storage without being buffered in memory — that is
 * what makes full-resolution HD/4K masters practical. Nothing is transcoded:
 * the stored bytes are exactly the bytes the admin selected.
 *
 * Headers: Content-Type = video MIME, X-File-Name = original name,
 * and optional X-Video-Width / X-Video-Height / X-Video-Duration measured
 * in the browser before upload.
 */
export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  try {
    const rawName = request.headers.get("x-file-name");
    if (!rawName || !request.body) {
      return NextResponse.json(
        { error: "No video uploaded. Send the file as the request body with an X-File-Name header." },
        { status: 400 }
      );
    }

    let originalName: string;
    try {
      originalName = decodeURIComponent(rawName);
    } catch {
      originalName = rawName;
    }

    const mimeType = (request.headers.get("content-type") ?? "").split(";")[0] || "video/mp4";
    if (!isAllowedVideoFile(originalName, mimeType)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload an MP4, WebM, OGV or MOV video." },
        { status: 415 }
      );
    }

    const declaredSize = numericHeader(request, "content-length") ?? 0;
    if (declaredSize > MAX_HERO_VIDEO_BYTES) {
      return NextResponse.json(
        { error: `File is too large. The hero video must be under ${MAX_HERO_VIDEO_MB}MB.` },
        { status: 413 }
      );
    }

    const video = await getStorage().saveHeroVideo({
      body: limitBytes(request.body, MAX_HERO_VIDEO_BYTES),
      originalName,
      mimeType,
      size: declaredSize,
      width: numericHeader(request, "x-video-width"),
      height: numericHeader(request, "x-video-height"),
      durationSec: numericHeader(request, "x-video-duration"),
    });

    // The homepage is statically rendered — regenerate it with the new video.
    revalidatePath("/");

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error("Hero video upload failed:", error);
    const message = error instanceof Error ? error.message : "Upload failed.";
    const tooLarge = message.includes("too large");
    return NextResponse.json({ error: message }, { status: tooLarge ? 413 : 500 });
  }
}

/** Remove the current hero video — the homepage falls back to the placeholder. */
export async function DELETE() {
  if (!(await requireAdmin())) return unauthorized();
  try {
    await getStorage().deleteHeroVideo();
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Hero video delete failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed." },
      { status: 500 }
    );
  }
}
