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

        {/* ── The range — set exactly like the fabric library, because it is
               the same job: a wall of specimens judged by eye. Rounded frames,
               a tall crop, and a caption cut to the name and what the thread
               is for. ── */}
        <section className="border-t border-ink/10 bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                The range
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight text-ink md:text-5xl">
                A thread for every stitch
              </h2>
            </Reveal>

            {threads.length === 0 ? (
              <Reveal>
                <p className="mt-12 max-w-md border-t border-ink/10 pt-8 leading-relaxed text-ink/60">
                  The thread range is being catalogued. Tell us the fabric and the finish
                  you&rsquo;re working to and we&rsquo;ll match the thread to the job in the
                  meantime.
                </p>
              </Reveal>
            ) : null}

            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {threads.map((thread, i) => (
                <Reveal key={thread.id} delay={(i % 3) * 110}>
                  <article className="group block">
                    <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-ink/5">
                      {thread.image ? (
                        <Image
                          src={thread.image}
                          alt={thread.alt}
                          fill
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                          className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03] motion-reduce:transition-none"
                        />
                      ) : (
                        <ThreadPlaceholder id={thread.id} />
                      )}
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl tracking-tight text-ink">
                        {thread.name}
                      </h3>
                      {thread.properties[0] ? (
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/60">
                          {thread.properties[0]}
                        </span>
                      ) : null}
                    </div>
                    {thread.properties.length > 1 ? (
                      <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clay">
                        {thread.properties.slice(1).join(" · ")}
                      </p>
                    ) : null}
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
