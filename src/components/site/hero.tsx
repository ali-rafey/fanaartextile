import { getStorage } from "@/lib/storage";
import HeroVideo from "./hero-video";
import SiteNavbar from "./site-navbar";

/**
 * Homepage hero — a full-viewport video managed from the admin portal
 * (/admin/hero), with the transparent primary navbar floating on top.
 * Falls back to a branded placeholder until a video is set.
 */
export default async function Hero() {
  const video = await getStorage().getHeroVideo();

  return (
    <section className="relative h-svh w-full overflow-hidden bg-ink">
      <h1 className="sr-only">Fanaar — premium lounge fabrics</h1>
      <SiteNavbar />

      {video ? (
        <HeroVideo src={video.url} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-ink via-stone-800 to-ink">
          <p
            aria-hidden
            className="select-none text-4xl font-extralight tracking-[0.45em] text-ivory/90 md:text-6xl"
          >
            FANAAR
          </p>
        </div>
      )}
    </section>
  );
}
