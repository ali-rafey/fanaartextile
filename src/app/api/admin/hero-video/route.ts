import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  MAX_HERO_VIDEO_BYTES,
  MAX_HERO_VIDEO_MB,
  isAllowedVideoFile,
} from "@/lib/constants";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

// TODO(auth): protect these endpoints once Supabase auth is integrated —
// until then the admin portal must not be exposed publicly.

/** Current hero video metadata (used for debugging / future admin needs). */
export async function GET() {
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

/** Upload / replace the hero video. Expects multipart/form-data with a "file" field. */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: 'No video file provided. Send multipart/form-data with a "file" field.' },
        { status: 400 }
      );
    }
    if (!isAllowedVideoFile(file.name, file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload an MP4, WebM, OGV or MOV video." },
        { status: 415 }
      );
    }
    if (file.size > MAX_HERO_VIDEO_BYTES) {
      return NextResponse.json(
        { error: `File is too large. The hero video must be under ${MAX_HERO_VIDEO_MB}MB.` },
        { status: 413 }
      );
    }

    const video = await getStorage().saveHeroVideo(file);

    // The homepage is statically rendered — regenerate it with the new video.
    revalidatePath("/");

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error("Hero video upload failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}

/** Remove the current hero video — the homepage falls back to the placeholder. */
export async function DELETE() {
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
