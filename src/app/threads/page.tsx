import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import ThreadPlaceholder from "@/components/site/thread-placeholder";
import { THREADS_CTA, THREADS_HERO, THREADS_INTRO } from "@/content/threads";
import { listPublishedThreads } from "@/lib/db/threads";

export const metadata: Metadata = {
  title: "Threads",
  description:
    "Fanaar stitching threads — spun polyester, cotton, core-spun, overlock, embroidery and bonded nylon, matched to the fabric, the seam and the finish.",
  alternates: { canonical: "/threads" },
  openGraph: {
    title: "Threads · Fanaar Textile",
    description:
      "Fanaar stitching threads — spun polyester, cotton, core-spun, overlock, embroidery and bonded nylon, matched to the fabric, the seam and the finish.",
    url: "/threads",
  },
};

export default async function ThreadsPage() {
  const threads = await listPublishedThreads();

  return (
    <>
      <SiteHeader />
      <main>
        {/* Masthead — same left-aligned treatment as the fabric library, so the
            two catalogue pages open the same way. */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-4 md:px-10 md:pt-24">
          <Reveal>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
              {THREADS_HERO.eyebrow}
            </p>
            <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
              <h1 className="max-w-3xl font-display text-5xl leading-[0.96] tracking-tight text-ink sm:text-6xl md:text-7xl">
                {THREADS_HERO.heading}
              </h1>
              <p className="max-w-sm leading-relaxed text-ink/60 md:pb-2">{THREADS_HERO.intro}</p>
            </div>
          </Reveal>
        </section>

        {/* Intro */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                {THREADS_INTRO.heading}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 leading-relaxed text-ink/60">
                {THREADS_INTRO.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Thread grid */}
        <section className="border-t border-ink/10 bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <header className="mx-auto max-w-2xl text-center">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
                  The range
                </p>
                <h2 className="mt-4 font-display text-3xl tracking-tight text-ink md:text-4xl">
                  A thread for every stitch
                </h2>
              </header>
            </Reveal>

            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {threads.map((thread, i) => (
                <Reveal key={thread.id} delay={(i % 3) * 120}>
                  <article className="group flex h-full flex-col">
                    <div className="relative aspect-4/3 overflow-hidden bg-ink/5">
                      {thread.image ? (
                        <Image
                          src={thread.image}
                          alt={thread.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03] motion-reduce:transition-none"
                        />
                      ) : (
                        <ThreadPlaceholder id={thread.id} />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col pt-5">
                      <h3 className="font-display text-2xl tracking-tight text-ink">{thread.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/60">{thread.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/[0.08] pt-4">
                        {thread.properties.map((property) => (
                          <li
                            key={property}
                            className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-ink/60"
                          >
                            {property}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
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
                {THREADS_CTA.heading}
              </h2>
              <p className="mt-5 leading-relaxed text-ink/60">{THREADS_CTA.intro}</p>
              <Link
                href={THREADS_CTA.href}
                className="mt-9 inline-flex items-center justify-center rounded-full bg-ink px-8 py-3 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-clay-deep focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ivory focus-visible:outline-none"
              >
                {THREADS_CTA.label}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
