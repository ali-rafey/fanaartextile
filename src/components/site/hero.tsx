import Image from "next/image";
import Link from "next/link";
import { HERO_COPY, HERO_DETAILS, HERO_PLATE } from "@/content/hero";
import { getStorage } from "@/lib/storage";
import HeroVideo from "./hero-video";
import SiteNavbar from "./site-navbar";

/**
 * Homepage hero — a spread, not a backdrop.
 *
 * The plate sits in its own column at its own framing. Beside it is a panel in
 * a colour sampled from that photograph at request time, so the two halves
 * belong to each other whichever image the admin uploads.
 *
 * The two halves stay separate, divided on a hairline. What ties them together
 * is underneath: the same photograph ghosted into the page at nine percent,
 * blurred and desaturated until it is texture rather than a second picture, so
 * the panel carries the light of the plate without competing with it.
 *
 * A light panel means an ink navbar. Ivory cannot be carried on ivory — it
 * lands at 1:1 — so the panel's tone and the navbar's are one decision.
 *
 * Which scene runs is the admin's choice (/admin/hero) — this spread or the
 * full-bleed video — and the plate is theirs to upload as a still or a clip.
 */
export default async function Hero() {
  const storage = getStorage();
  const [layout, video] = await Promise.all([
    storage.getHeroLayout(),
    storage.getHeroVideo(),
  ]);

  if (layout.mode === "video" && video) {
    return (
      <section className="relative h-svh w-full overflow-hidden bg-ink">
        <h1 className="sr-only">
          Fanaar Textile — premium lounge and loungewear fabric, woven and knitted to
          one standard
        </h1>
        <SiteNavbar />
        <HeroVideo src={video.url} />
      </section>
    );
  }

  const plate = layout.plate
    ? {
        url: layout.plate.url,
        alt: layout.plate.alt || HERO_PLATE.alt,
        isVideo: layout.plate.type === "video",
      }
    : { url: HERO_PLATE.src, alt: HERO_PLATE.alt, isVideo: false };

  // A video plate has no still to ghost, so the shipped frame stands in.
  const ghost = plate.isVideo ? HERO_PLATE.src : plate.url;

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-sand">
      <SiteNavbar tone="ink" />

      <div className="relative grid min-h-svh md:grid-cols-[1.05fr_1fr]">
        {/* The plate, at its own framing, bleeding off the left edge */}
        <div className="relative h-[62svh] w-full overflow-hidden bg-sand md:h-auto">
          {plate.isVideo ? (
            <video
              src={plate.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={plate.url}
              alt={plate.alt}
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Right: the same photograph, held back until it is a ground */}
        <div className="relative flex flex-col justify-between border-t border-ink/10 bg-ivory px-6 pt-10 pb-10 md:border-t-0 md:border-l md:px-12 md:pt-36 md:pb-12 lg:px-16">
          {/* The plate again, barely there — enough that the page carries the
              same light and colour as the photograph beside it, far too faint
              to compete with the type. Blurred and desaturated so it reads as
              texture rather than as a second picture. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <Image
              src={ghost}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="scale-105 object-cover opacity-[0.09] blur-[3px] saturate-50"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ivory/40 via-ivory/70 to-ivory/85" />
          </div>

          <div className="relative py-6 md:py-0">
            <h1 className="max-w-[12ch] font-display text-[2.75rem] leading-[0.94] tracking-tight whitespace-pre-line text-ink sm:text-6xl lg:text-7xl">
              {HERO_COPY.headline}
            </h1>
            <p className="mt-7 max-w-sm leading-relaxed text-ink/60">{HERO_COPY.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[0.6rem] uppercase tracking-[0.2em]">
              <Link
                href={HERO_COPY.primary.href}
                className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
              >
                {HERO_COPY.primary.label}
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href={HERO_COPY.secondary.href}
                className="text-ink/60 transition-colors duration-300 ease-lux hover:text-ink"
              >
                {HERO_COPY.secondary.label}
              </Link>
            </div>
          </div>

          {/* Detail shots and the credit block, the way a campaign plate closes */}
          <div className="relative flex items-end justify-between gap-8">
            <div className="flex gap-3">
              {HERO_DETAILS.map((detail) => (
                <div
                  key={detail.src}
                  className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden ring-1 ring-ink/15 sm:h-28 sm:w-[5.25rem]"
                >
                  <Image
                    src={detail.src}
                    alt={detail.alt}
                    fill
                    sizes="84px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="hidden text-right font-mono text-[0.52rem] uppercase leading-[1.9] tracking-[0.18em] text-ink/60 sm:block">
              {HERO_COPY.credits.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
