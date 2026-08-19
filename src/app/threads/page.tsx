import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/site/page-hero";
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
        <PageHero
          eyebrow={THREADS_HERO.eyebrow}
          heading={THREADS_HERO.heading}
          intro={THREADS_HERO.intro}
        />

        {/* Intro */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                {THREADS_INTRO.heading}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 leading-relaxed text-stone-600">
                {THREADS_INTRO.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Thread grid */}
        <section className="bg-sand py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <header className="mx-auto max-w-2xl text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-clay md:text-sm">
                  The range
                </p>
                <h2 className="mt-4 font-display text-3xl tracking-tight text-ink md:text-4xl">
                  A thread for every stitch
                </h2>
              </header>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {threads.map((thread, i) => (
                <Reveal key={thread.id} delay={(i % 3) * 120}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-ivory shadow-sm ring-1 ring-ink/5">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {thread.image ? (
                        <Image
                          src={thread.image}
                          alt={thread.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <ThreadPlaceholder id={thread.id} />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-2xl text-ink">{thread.name}</h3>
                      <p className="mt-3 leading-relaxed text-stone-600">{thread.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {thread.properties.map((property) => (
                          <li
                            key={property}
                            className="rounded-full border border-ink/10 bg-sand/60 px-3 py-1 text-xs tracking-wide text-ink/70"
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
              <p className="mt-5 leading-relaxed text-stone-600">{THREADS_CTA.intro}</p>
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
