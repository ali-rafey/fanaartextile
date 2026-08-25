import Image from "next/image";
import Link from "next/link";
import { HERO_COPY, HERO_DETAILS, HERO_PLATE } from "@/content/hero";
import SiteNavbar from "./site-navbar";

/**
 * Homepage hero — a spread, not a backdrop.
 *
 * The old hero was a full-bleed video with the navbar floating on it and not
 * one word of type: the largest surface on the site said nothing about what
 * Fanaar is or where to go next, and a dark plate sat oddly against a house
 * whose every other page is ivory.
 *
 * It is set as a printed spread now — the plate bleeding off the left edge, a
 * cream field beside it carrying the claim, two detail shots and a credit
 * block. Everything the references share: one big image against generous
 * cream, small type placed with intent, and the photograph doing the talking.
 *
 * The admin's hero-video upload is untouched and still works; this page simply
 * no longer reads from it.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-svh w-full flex-col bg-ivory">
      <SiteNavbar tone="ink" />

      <div className="grid flex-1 md:grid-cols-[1.02fr_1fr]">
        {/* The plate — bleeds off the left, top and bottom edges */}
        <div className="relative order-1 h-[46svh] w-full overflow-hidden bg-sand md:h-auto md:min-h-svh">
          <Image
            src={HERO_PLATE.src}
            alt={HERO_PLATE.alt}
            fill
            sizes="(min-width: 768px) 52vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* The page */}
        <div className="order-2 flex flex-col justify-between px-6 pt-12 pb-10 md:px-12 md:pt-36 md:pb-12 lg:px-16">
          <div className="py-10 md:py-0">
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
          <div className="flex items-end justify-between gap-8">
            <div className="flex gap-3">
              {HERO_DETAILS.map((detail) => (
                <div
                  key={detail.src}
                  className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden bg-sand sm:h-28 sm:w-[5.25rem]"
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
