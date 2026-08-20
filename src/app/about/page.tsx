import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import {
  ABOUT_CTA,
  ABOUT_FIGURES,
  ABOUT_FOUNDER,
  ABOUT_HERO,
  ABOUT_PSYCHOLOGY,
  ABOUT_VALUES,
} from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Fanaar Textile is a craft-led lounge fabric house — audited mills, lab-tested batches and small-batch finishing, built on traceable origins and honest pricing.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us · Fanaar Textile",
    description:
      "Fanaar Textile is a craft-led lounge fabric house — audited mills, lab-tested batches and small-batch finishing, built on traceable origins and honest pricing.",
    url: "/about",
  },
};

export default function AboutPage() {
  const hasPortrait = Boolean(ABOUT_FOUNDER.portrait);

  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        {/* Masthead */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
          <Reveal>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink/70">
              {ABOUT_HERO.index}
            </p>
            <div className="mt-5 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h1 className="max-w-2xl font-display text-5xl leading-[0.98] tracking-tight text-ink whitespace-pre-line sm:text-6xl md:text-7xl">
                {ABOUT_HERO.statement}
              </h1>
              <div className="font-mono text-[0.62rem] leading-[1.9] tracking-[0.16em] text-ink/60 uppercase md:text-right">
                {ABOUT_HERO.caption.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <p className="mt-10 max-w-xl leading-relaxed text-ink/55">{ABOUT_HERO.intro}</p>
          </Reveal>
        </section>

        {/* The thinking — set large, carrying the space a photo strip used to */}
        <section className="border-y border-ink/10 bg-[#f1efea]">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <Reveal>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-clay">
                {ABOUT_PSYCHOLOGY.eyebrow}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
              <Reveal>
                <h2 className="font-display text-[2rem] leading-[1.18] tracking-tight text-ink whitespace-pre-line md:text-[3rem]">
                  {ABOUT_PSYCHOLOGY.statement}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <div className="space-y-6 leading-relaxed text-ink/60 md:pt-3">
                  {ABOUT_PSYCHOLOGY.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Figures */}
        <section className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-16 md:grid-cols-4 md:px-10 md:py-20">
          {ABOUT_FIGURES.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 90}>
              <p className="font-display text-4xl tracking-tight text-ink md:text-5xl">
                {figure.value}
              </p>
              <p className="mt-2 max-w-[14ch] font-mono text-[0.6rem] uppercase leading-[1.7] tracking-[0.18em] text-ink/50">
                {figure.label}
              </p>
            </Reveal>
          ))}
        </section>

        {/* The person — a note in the first person */}
        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <Reveal>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-clay">
                {ABOUT_FOUNDER.eyebrow}
              </p>
            </Reveal>

            <div
              className={
                hasPortrait
                  ? "mt-10 grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
                  : "mt-10"
              }
            >
              {hasPortrait ? (
                <Reveal>
                  <div className="relative aspect-[4/5] w-full overflow-hidden md:sticky md:top-28">
                    <Image
                      src={ABOUT_FOUNDER.portrait}
                      alt={ABOUT_FOUNDER.portraitAlt}
                      fill
                      sizes="(min-width: 768px) 34vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={hasPortrait ? 120 : 0}>
                <div className={hasPortrait ? "" : "max-w-3xl"}>
                  <div className="space-y-7 font-display text-xl leading-[1.55] tracking-tight text-ink/75 md:text-[1.6rem] md:leading-[1.5]">
                    {ABOUT_FOUNDER.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-12 border-t border-ink/10 pt-5">
                    {ABOUT_FOUNDER.name ? (
                      <p className="font-display text-xl tracking-tight text-ink">
                        {ABOUT_FOUNDER.name}
                      </p>
                    ) : null}
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/45">
                      {ABOUT_FOUNDER.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values — numbered, hairline-separated */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 md:pb-32">
          {ABOUT_VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 100}>
              <div className="grid gap-4 border-t border-ink/10 py-10 md:grid-cols-[6rem_1fr_1.2fr] md:gap-10">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-clay">
                  ({String(i + 1).padStart(2, "0")})
                </p>
                <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-ink/55">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* CTA */}
        <section className="border-t border-ink/10 bg-[#f1efea] py-20 md:py-24">
          <Reveal>
            <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-6 md:px-10">
              <div>
                <h2 className="max-w-md font-display text-3xl tracking-tight text-ink md:text-4xl">
                  {ABOUT_CTA.heading}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-ink/55">{ABOUT_CTA.intro}</p>
              </div>
              <div className="flex items-center gap-8 font-mono text-[0.68rem] uppercase tracking-[0.2em]">
                <Link
                  href={ABOUT_CTA.primaryHref}
                  className="group inline-flex items-center gap-2 text-ink transition-colors duration-300 ease-lux hover:text-clay"
                >
                  {ABOUT_CTA.primaryLabel}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href={ABOUT_CTA.secondaryHref}
                  className="text-ink/55 transition-colors duration-300 ease-lux hover:text-ink"
                >
                  {ABOUT_CTA.secondaryLabel}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
