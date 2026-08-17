import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import {
  FABRICS,
  FABRICS_CATEGORIES,
  FABRICS_FEATURED,
  FABRICS_INDEX,
} from "@/content/fabrics";

export const metadata: Metadata = {
  title: "Fabrics",
  description:
    "The Fanaar fabric library — featured edits and every construction: twill, jersey, piqué, fleece and more, each with its own specification, character and best use.",
};

export default function FabricsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        {/* ── Featured: full-height hero — masthead up top, image row pinned to the bottom ── */}
        <section className="mx-auto flex max-w-7xl flex-col justify-between px-6 pt-12 pb-10 md:min-h-[calc(100vh-73px)] md:pt-12 md:pb-12">
          {/* Masthead + meta */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
            <Reveal>
              <h1 className="font-display text-6xl leading-[0.92] tracking-tight text-ink sm:text-7xl md:text-8xl">
                {FABRICS_INDEX.heading}
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <div className="font-display text-base leading-relaxed text-ink/60 md:pt-4 md:text-right">
                {FABRICS_INDEX.metaLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p>
                  <a
                    href={`mailto:${FABRICS_INDEX.email}`}
                    className="transition-colors duration-300 ease-lux hover:text-clay"
                  >
                    {FABRICS_INDEX.email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Image row — static display, pinned to the foot of the viewport */}
          <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:mt-0 md:grid-cols-5 md:gap-x-4">
            {FABRICS_FEATURED.map((feature, i) => (
              <Reveal key={feature.label} delay={(i % 5) * 80}>
                <figure>
                  <figcaption className="mb-3 font-display text-sm text-ink/70">
                    {feature.label}
                  </figcaption>
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink/5 md:aspect-auto md:h-[28vh]">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      sizes="(min-width: 768px) 19vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Categories: the full construction list ── */}
        <section className="mt-24 border-t border-ink/10 py-20 md:mt-32 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                {FABRICS_CATEGORIES.eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight text-ink md:text-5xl">
                {FABRICS_CATEGORIES.heading}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {FABRICS.map((fabric, i) => (
                <Reveal key={fabric.slug} delay={(i % 3) * 110}>
                  <Link href={`/fabrics/${fabric.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                      <Image
                        src={fabric.image}
                        alt={fabric.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl text-ink">{fabric.name}</h3>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/40">
                        {fabric.family}
                      </span>
                    </div>
                    <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clay">
                      {fabric.category}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/55">{fabric.tagline}</p>

                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/70 transition-colors duration-300 ease-lux group-hover:text-clay">
                      View fabric
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
