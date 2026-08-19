import Image from "next/image";
import Link from "next/link";
import { BLOG_SECTION } from "@/content/blogs";
import { listPublishedPosts } from "@/lib/db/blogs";
import Reveal from "./reveal";

/**
 * Homepage journal — a centred statement over a scattered archive gallery.
 *
 * The stills sit at deliberately uneven widths and vertical offsets, with the
 * middle one dominant and the outermost pair running off both edges, so the row
 * reads like photographs laid out on a table rather than a tidy grid. Offsets
 * only apply from md up; below that the row wraps into a centred cluster.
 */

// width · vertical offset · aspect — the middle entry is the anchor.
const TILES = [
  { w: "w-40 sm:w-44 md:w-[13rem]", y: "md:translate-y-16", ar: "aspect-[3/4]" },
  { w: "w-48 sm:w-56 md:w-[15rem]", y: "md:-translate-y-6", ar: "aspect-[4/5]" },
  { w: "w-44 sm:w-52 md:w-[13.5rem]", y: "md:translate-y-24", ar: "aspect-[3/4]" },
  { w: "w-60 sm:w-72 md:w-[21rem]", y: "md:translate-y-2", ar: "aspect-[4/5]" },
  { w: "w-44 sm:w-52 md:w-[14rem]", y: "md:-translate-y-10", ar: "aspect-[3/4]" },
  { w: "w-40 sm:w-48 md:w-[13rem]", y: "md:translate-y-20", ar: "aspect-[4/5]" },
];

export default async function FeaturedBlogs() {
  const posts = (await listPublishedPosts()).slice(0, 6);

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="scroll-mt-16 overflow-hidden bg-[#efede8] pt-20 pb-24 md:pt-28 md:pb-32"
    >
      {/* Statement */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
            {BLOG_SECTION.caption}
          </p>
          <h2
            id="journal-heading"
            className="mx-auto mt-6 max-w-2xl font-display text-3xl leading-[1.2] tracking-tight text-ink whitespace-pre-line md:text-[2.75rem]"
          >
            {BLOG_SECTION.statement}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink/55 md:text-base">
            {BLOG_SECTION.intro}
          </p>
        </Reveal>
      </div>

      {/* Scattered archive */}
      <Reveal className="mt-16 w-full md:mt-24">
        <div className="flex flex-wrap items-center justify-center gap-5 md:flex-nowrap md:gap-6">
          {posts.map((post, i) => {
            const tile = TILES[i % TILES.length];
            return (
              <Link
                key={post.id}
                href={post.href}
                aria-label={post.title}
                className={`group relative block shrink-0 ${tile.w} ${tile.y}`}
              >
                <div
                  className={`relative ${tile.ar} overflow-hidden rounded-[3px] shadow-[0_18px_45px_-20px_rgba(27,24,21,0.55)]`}
                >
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.04] motion-reduce:transition-none">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        sizes="(min-width: 768px) 22rem, 60vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100">
                    <p className="font-display text-sm leading-snug text-ivory md:text-base">
                      {post.title}
                    </p>
                    <p className="mt-1.5 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/70">
                      <span>{post.category}</span>
                      <span>↗ Read</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-16 text-center md:mt-24">
          <Link
            href={BLOG_SECTION.ctaHref}
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:text-clay"
          >
            {BLOG_SECTION.ctaLabel}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
