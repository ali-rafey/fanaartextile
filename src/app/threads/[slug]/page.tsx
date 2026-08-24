import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/json-ld";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import ThreadPlaceholder from "@/components/site/thread-placeholder";
import { THREADS_CTA } from "@/content/threads";
import { getPublishedThread, listPublishedThreads } from "@/lib/db/threads";
import { SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const thread = await getPublishedThread(slug);
  if (!thread) return { title: "Thread not found" };

  const description = thread.description.slice(0, 155);
  return {
    title: `${thread.name} Thread`,
    description,
    alternates: { canonical: `/threads/${slug}` },
    openGraph: {
      title: `${thread.name} · ${SITE_NAME} Threads`,
      description,
      url: `/threads/${slug}`,
      ...(thread.image ? { images: [{ url: absoluteUrl(thread.image) }] } : {}),
    },
  };
}

/**
 * A single thread.
 *
 * Deliberately short: a thread is one picture, one paragraph and a list of
 * properties, and the table holds nothing else. Padding that out with
 * invented sections would only make the page look like it is hiding how
 * little there is to say.
 */
export default async function ThreadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thread = await getPublishedThread(slug);
  if (!thread) notFound();

  const others = (await listPublishedThreads()).filter((t) => t.id !== thread.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Threads", path: "/threads" },
          { name: thread.name, path: `/threads/${slug}` },
        ])}
      />
      <SiteHeader />
      <main className="bg-ivory">
        <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 md:px-10 md:pt-16 md:pb-32">
          <Reveal>
            <Link
              href="/threads"
              className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink/60 transition-colors duration-300 ease-lux hover:text-clay"
            >
              ← Threads
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-ink/5">
                {thread.image ? (
                  <Image
                    src={thread.image}
                    alt={thread.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <ThreadPlaceholder id={thread.id} />
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-5xl">
                {thread.name}
              </h1>
              <p className="mt-6 max-w-md leading-relaxed text-ink/60">{thread.description}</p>

              {thread.properties.length ? (
                <ul className="mt-10 max-w-md">
                  {thread.properties.map((property) => (
                    <li
                      key={property}
                      className="flex items-baseline gap-4 border-t border-ink/10 py-3 last:border-b font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/60"
                    >
                      <span aria-hidden className="text-clay">
                        —
                      </span>
                      {property}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                href={THREADS_CTA.href}
                className="mt-10 inline-block border-b border-ink/30 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
              >
                {THREADS_CTA.label}
              </Link>
            </Reveal>
          </div>

          {others.length ? (
            <section className="mt-24 border-t border-ink/10 pt-14 md:mt-32">
              <Reveal>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
                  More from the range
                </p>
              </Reveal>
              <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
                {others.map((other, i) => (
                  <Reveal key={other.id} delay={i * 100}>
                    <Link href={`/threads/${other.id}`} className="group block">
                      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-ink/5">
                        {other.image ? (
                          <Image
                            src={other.image}
                            alt={other.alt}
                            fill
                            sizes="(min-width: 640px) 30vw, 100vw"
                            className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03] motion-reduce:transition-none"
                          />
                        ) : (
                          <ThreadPlaceholder id={other.id} />
                        )}
                      </div>
                      <h3 className="mt-4 font-display text-xl tracking-tight text-ink">
                        {other.name}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
