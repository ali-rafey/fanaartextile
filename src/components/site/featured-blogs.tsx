import Image from "next/image";
import Link from "next/link";
import BlogPlaceholder from "@/components/site/blog-placeholder";
import Reveal from "@/components/site/reveal";
import { BLOG_SECTION } from "@/content/blogs";
import type { BlogPost } from "@/content/blogs";
import { listPublishedPosts } from "@/lib/db/blogs";

/**
 * Homepage journal — three pieces, titled and dated, the way an archive
 * actually presents itself.
 *
 * It used to be a wall of untitled frames: handsome, but a reader could not
 * tell what any of them were about without clicking, and the homepage is
 * exactly where that has to be obvious. Every frame now carries its category,
 * its date and its title, and reads the same as the index it leads to.
 */
function Card({ post, lead = false }: { post: BlogPost; lead?: boolean }) {
  return (
    <Link href={post.href} className="group block">
      <div
        className={`relative overflow-hidden rounded-2xl bg-ink/5 ${
          lead ? "aspect-4/3" : "aspect-3/2"
        }`}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes={lead ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
            className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <BlogPlaceholder id={post.id} />
        )}
      </div>
      <p className="mt-5 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-clay">
        {post.category}
        {post.date ? <span className="text-ink/60"> · {post.date}</span> : null}
      </p>
      <h3
        className={`mt-2 font-display leading-snug tracking-tight text-ink transition-colors duration-300 ease-lux group-hover:text-clay ${
          lead ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>
      {lead ? (
        <p className="mt-3 max-w-md leading-relaxed text-ink/60">{post.excerpt}</p>
      ) : null}
    </Link>
  );
}

export default async function FeaturedBlogs() {
  const posts = await listPublishedPosts();
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;
  const others = rest.slice(0, 2);

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="scroll-mt-16 border-t border-ink/10 bg-ivory py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
              {BLOG_SECTION.masthead}
            </p>
            <Link
              href={BLOG_SECTION.ctaHref}
              className="group inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:text-clay"
            >
              {BLOG_SECTION.ctaLabel}
              <span
                aria-hidden
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <h2
            id="journal-heading"
            className="mt-5 max-w-2xl font-display text-4xl leading-[1.06] tracking-tight whitespace-pre-line text-ink md:text-5xl"
          >
            {BLOG_SECTION.statement}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 md:gap-14">
          <Reveal>
            <Card post={lead} lead />
          </Reveal>
          {others.length ? (
            <Reveal delay={120}>
              <div className="grid gap-10 sm:grid-cols-2 md:pt-2">
                {others.map((post) => (
                  <Card key={post.id} post={post} />
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
