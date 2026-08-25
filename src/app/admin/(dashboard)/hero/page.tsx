import type { Metadata } from "next";
import HeroLayoutManager from "@/components/admin/hero-layout-manager";
import HeroVideoManager from "@/components/admin/hero-video-manager";
import { MAX_HERO_VIDEO_MB, RECOMMENDED_MIN_HERO_HEIGHT } from "@/lib/constants";
import { getStorage } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Hero",
};

// Always reflect the latest uploaded content in the admin.
export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const storage = getStorage();
  const [currentVideo, layout] = await Promise.all([
    storage.getHeroVideo(),
    storage.getHeroLayout(),
  ]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Hero</h1>
      <p className="mt-1.5 text-sm text-neutral-500">
        The homepage opens with one of two scenes. Choose which below; the video
        uploader underneath stays available either way.
      </p>

      <HeroLayoutManager layout={layout} />

      <div className="mt-12 border-t border-neutral-200 pt-10">
        <h2 className="text-lg font-bold tracking-tight text-neutral-900">Hero video</h2>
        <p className="mt-1.5 text-sm text-neutral-500">
          Used when the full-screen scene is selected. Stored and streamed exactly
          as uploaded — never compressed or resized. For a crisp result use a{" "}
          {RECOMMENDED_MIN_HERO_HEIGHT}p or 4K master: MP4 (H.264), 16:9 landscape,
          up to {MAX_HERO_VIDEO_MB}MB.
        </p>

        <HeroVideoManager initialVideo={currentVideo} />
      </div>
    </div>
  );
}
