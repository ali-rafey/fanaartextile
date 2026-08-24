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
        {/* One masthead, not two. The page opened with "The thread in every
            seam" and an intro, then said much the same thing again under
            "Chosen for the seam, not just the spool" — the second was the
            better argument, so it is the only one now. */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-24">
          <Reveal>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
              {THREADS_HERO.eyebrow}
            </p>
            <div className="mt-5 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-16">
              <h1 className="max-w-2xl font-display text-5xl leading-[0.98] tracking-tight text-ink md:text-6xl">
                {THREADS_INTRO.heading}
              </h1>
              <div className="space-y-5 leading-relaxed text-ink/60">
                {THREADS_INTRO.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── The range — set exactly like the fabric library, because it is
               the same job: a wall of specimens judged by eye. Rounded frames,
               a tall crop, and the name alone underneath — the spec list ran
               to seven clauses per thread and buried the picture. ── */}
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
                  <Link href={`/threads/${thread.id}`} className="group block">
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

                    <h3 className="mt-5 font-display text-2xl tracking-tight text-ink transition-colors duration-300 ease-lux group-hover:text-clay">
                      {thread.name}
                    </h3>
                  </Link>
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
