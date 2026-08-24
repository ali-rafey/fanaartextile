import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { FABRICS_CATEGORIES, FABRICS_INDEX } from "@/content/fabrics";
import { listPublishedFabrics } from "@/lib/db/fabrics";
import JsonLd from "@/components/seo/json-ld";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fabrics",
  description:
    "Explore the Fanaar fabric library — twill, jersey, piqué, fleece, French terry and interlock. Full specifications: composition, GSM, dye class, finish and width.",
  alternates: { canonical: "/fabrics" },
  openGraph: {
    title: "Fabrics · Fanaar Textile",
    description:
      "Explore the Fanaar fabric library — twill, jersey, piqué, fleece, French terry and interlock. Full specifications: composition, GSM, dye class, finish and width.",
    url: "/fabrics",
  },
};

export default async function FabricsPage() {
  const fabrics = await listPublishedFabrics();

  const catalogueJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Fanaar fabric library",
    itemListElement: fabrics.map((fabric, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${fabric.name} Fabric`,
      url: absoluteUrl(`/fabrics/${fabric.slug}`),
    })),
  };

  return (
    <>
      <JsonLd data={catalogueJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Fabrics", path: "/fabrics" },
        ])}
      />
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

          {/* One continuous shot behind a row of empty frames. The mask cuts
              the windows, an overlay grid on the same column maths draws their
              borders, and the figure crossing the clip passes out of one frame
              and into the next while the footage underneath never breaks. */}
          <Reveal className="relative mt-16 md:mt-0">
            <video
              src="/videos/fabric-frames.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              className="aperture-row block h-[34vh] w-full object-cover md:h-[28vh]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className={`border border-ink/20 ${i > 1 ? "hidden md:block" : ""}`} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Categories: the full construction list ── */}
        <section className="mt-24 border-t border-ink/10 py-20 md:mt-32 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                {FABRICS_CATEGORIES.eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight text-ink md:text-5xl">
                {FABRICS_CATEGORIES.heading}
              </h2>
            </Reveal>

            {/* The cloth is the point, so the frame gets the room: a wider
                track, a taller crop, and the caption cut back to the name and
                what the construction is. The whole card is the link, so it
                never needed a "view fabric" line of its own. */}
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {fabrics.map((fabric, i) => (
                <Reveal key={fabric.slug} delay={(i % 3) * 110}>
                  <Link href={`/fabrics/${fabric.slug}`} className="group block">
                    <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-ink/5">
                      <Image
                        src={fabric.image}
                        alt={fabric.alt}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                        className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl tracking-tight text-ink transition-colors duration-300 ease-lux group-hover:text-clay">
                        {fabric.name}
                      </h3>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/60">
                        {fabric.family}
                      </span>
                    </div>
                    <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clay">
                      {fabric.category}
                    </p>
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
