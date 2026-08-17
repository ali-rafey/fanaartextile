import Image from "next/image";
import Link from "next/link";
import { BLOG_SECTION } from "@/content/blogs";
import { listPublishedPosts } from "@/lib/db/blogs";
import BlogPlaceholder from "./blog-placeholder";
import Reveal from "./reveal";

/**
 * Homepage "Journal" — an editorial masthead on the left (the word set large in
 * Fraunces, with a small dated archive index beneath it) and three journal
 * entries as clean columns on the right: a monospace kicker, a black-and-white
 * still, an excerpt and a READ link. No cards, lots of air — the passion of
 * textile laid out like a printed spread. Copy lives in content/blogs.ts.
 */
export default async function FeaturedBlogs() {
  const posts = (await listPublishedPosts()).slice(0, 3);

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="scroll-mt-16 bg-greige py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-10">
          {/* Masthead */}
          <Reveal className="md:col-span-4 lg:col-span-3">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                  {BLOG_SECTION.caption}
                </p>
                <h2
                  id="journal-heading"
                  className="mt-4 font-display text-6xl leading-[0.9] tracking-tight text-ink md:text-7xl"
                >
                  {BLOG_SECTION.masthead}
                </h2>
              </div>

              <ul className="mt-12 space-y-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink/45 md:mt-0">
                {posts.map((post) => (
                  <li key={post.id}>{post.date}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Entries */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3 md:pt-10">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 110}>
                  <article className="flex h-full flex-col">
                    <div className="flex items-baseline justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em]">
                      <span className="text-ink/80">↗ {post.category}</span>
                      <span className="text-ink/35">{post.date}</span>
                    </div>

                    <Link
                      href={post.href}
                      className="group mt-5 block overflow-hidden rounded-sm ring-1 ring-ink/5 focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
                      aria-label={post.title}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <div className="absolute inset-0 grayscale transition-[transform,filter] duration-[900ms] ease-lux group-hover:scale-[1.04] group-hover:grayscale-0 motion-reduce:transition-none">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.alt}
                              fill
                              sizes="(min-width: 768px) 30vw, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <BlogPlaceholder id={post.id} />
                          )}
                        </div>
                      </div>
                    </Link>

                    <h3 className="mt-5 font-display text-xl leading-snug text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/55">{post.excerpt}</p>

                    <Link
                      href={post.href}
                      className="mt-5 inline-flex items-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/70 transition-colors duration-300 ease-lux hover:text-clay"
                    >
                      ↗ Read
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-14 border-t border-ink/10 pt-6">
                <Link
                  href={BLOG_SECTION.ctaHref}
                  className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:text-clay"
                >
                  {BLOG_SECTION.ctaLabel}
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
