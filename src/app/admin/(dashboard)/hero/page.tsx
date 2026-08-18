import type { Metadata } from "next";
import HeroVideoManager from "@/components/admin/hero-video-manager";
import { MAX_HERO_VIDEO_MB, RECOMMENDED_MIN_HERO_HEIGHT } from "@/lib/constants";
import { getStorage } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Hero Video",
};

// Always reflect the latest uploaded content in the admin.
export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const currentVideo = await getStorage().getHeroVideo();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Hero video</h1>
      <p className="mt-1.5 text-sm text-neutral-500">
        Plays full-screen at the top of the homepage, exactly as uploaded — the
        file is stored and streamed untouched, never compressed or resized. For a
        crisp result use a {RECOMMENDED_MIN_HERO_HEIGHT}p or 4K master: MP4
        (H.264), 16:9 landscape, up to {MAX_HERO_VIDEO_MB}MB.
      </p>

      <HeroVideoManager initialVideo={currentVideo} />
    </div>
  );
}
