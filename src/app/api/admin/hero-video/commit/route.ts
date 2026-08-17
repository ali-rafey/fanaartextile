import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

/**
 * Record the hero video after the browser uploaded it directly to storage
 * (see ../upload-url). Only small JSON crosses this function.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return unauthorized();

  try {
    const body = (await request.json()) as {
      path?: string;
      originalName?: string;
      mimeType?: string;
      size?: number;
      width?: number;
      height?: number;
      durationSec?: number;
    };

    if (!body.path || !body.originalName) {
      return NextResponse.json(
        { error: "path and originalName are required." },
        { status: 400 }
      );
    }

    const storage = getStorage();
    if (!storage.commitHeroVideo) {
      return NextResponse.json(
        { error: "The active storage driver does not support direct uploads." },
        { status: 400 }
      );
    }

    const video = await storage.commitHeroVideo({
      path: body.path,
      originalName: body.originalName,
      mimeType: body.mimeType || "video/mp4",
      size: Number(body.size) || 0,
      width: body.width,
      height: body.height,
      durationSec: body.durationSec,
    });

    // The homepage is statically rendered — regenerate it with the new video.
    revalidatePath("/");

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error("Hero video commit failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save the video." },
      { status: 500 }
    );
  }
}
