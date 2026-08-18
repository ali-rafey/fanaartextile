import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/page-hero";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { ABOUT_CTA, ABOUT_HERO, ABOUT_STORY, ABOUT_VALUES } from "@/content/about";

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
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={ABOUT_HERO.eyebrow}
          heading={ABOUT_HERO.heading}
          intro={ABOUT_HERO.intro}
        />

        {/* Brand story */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                {ABOUT_STORY.heading}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 leading-relaxed text-stone-600">
                {ABOUT_STORY.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Values */}
        <section className="bg-sand py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <header className="mx-auto max-w-2xl text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-clay md:text-sm">
                  What we hold to
                </p>
                <h2 className="mt-4 font-display text-3xl tracking-tight text-ink md:text-4xl">
                  Three convictions in every metre
                </h2>
              </header>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
              {ABOUT_VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 120}>
                  <div className="flex h-full flex-col rounded-3xl bg-ivory p-8 shadow-sm ring-1 ring-ink/5">
                    <span className="font-display text-3xl text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-display text-xl text-ink">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-stone-600">{value.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ivory py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-2xl px-6 text-center">
              <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                {ABOUT_CTA.heading}
              </h2>
              <p className="mt-5 leading-relaxed text-stone-600">{ABOUT_CTA.intro}</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={ABOUT_CTA.primaryHref}
                  className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-clay-deep focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ivory focus-visible:outline-none"
                >
                  {ABOUT_CTA.primaryLabel}
                </Link>
                <Link
                  href={ABOUT_CTA.secondaryHref}
                  className="inline-flex items-center justify-center rounded-full border border-ink/15 px-8 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-clay hover:text-clay focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
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
