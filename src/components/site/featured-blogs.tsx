import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/content/blogs";
import { BLOG_SECTION } from "@/content/blogs";
import { listPublishedPosts } from "@/lib/db/blogs";
import Reveal from "./reveal";

/**
 * Homepage journal — a centred statement over a scattered archive wall.
 *
 * Laid out as five columns rather than one row: the two columns flanking the
 * centre stack a pair of photographs, the middle column holds a single
 * dominant portrait, and the outer columns run past both edges of the frame.
 * Each column carries its own vertical offset so the wall reads like prints
 * pinned at slightly different heights. Below md it collapses to a simple
 * two-up grid.
 */

/** Column plan: which posts sit in each column, and how that column is offset. */
// Widths are viewport-relative and total more than 100vw, so the outer
// columns are always cropped by the frame — the wall never floats centred.
const COLUMNS: { picks: number[]; width: string; offset: string }[] = [
  { picks: [0], width: "w-[19vw] min-w-[160px]", offset: "md:translate-y-10" },
  { picks: [1, 2], width: "w-[21vw] min-w-[180px]", offset: "md:-translate-y-8" },
  { picks: [3], width: "w-[29vw] min-w-[250px]", offset: "md:translate-y-16" },
  { picks: [4, 5], width: "w-[21vw] min-w-[180px]", offset: "md:-translate-y-6" },
  { picks: [6], width: "w-[19vw] min-w-[160px]", offset: "md:translate-y-12" },
];

function Frame({ post, ratio }: { post: BlogPost; ratio: string }) {
  return (
    <Link href={post.href} aria-label={post.title} className="group block">
      <div
        className={`relative ${ratio} overflow-hidden rounded-md shadow-[0_20px_50px_-24px_rgba(27,24,21,0.6)]`}
      >
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.05] motion-reduce:transition-none">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(min-width: 768px) 24vw, 45vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100">
          <p className="font-display text-sm leading-snug text-ivory">{post.title}</p>
          <p className="mt-1.5 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ivory/70">
            <span>{post.category}</span>
            <span>↗ Read</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default async function FeaturedBlogs() {
  const posts = await listPublishedPosts();
  if (posts.length === 0) return null;

  // Wrap the index so the wall stays full even with fewer posts than slots.
  const at = (i: number) => posts[i % posts.length];

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="scroll-mt-16 overflow-hidden border-t border-ink/10 bg-ivory pt-20 pb-24 md:pt-28 md:pb-32"
    >
      {/* Statement */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2
            id="journal-heading"
            className="mx-auto max-w-2xl font-display text-[1.75rem] leading-[1.25] tracking-tight text-ink whitespace-pre-line md:text-[2.6rem]"
          >
            {BLOG_SECTION.statement}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ink/60">
            {BLOG_SECTION.intro}
          </p>
        </Reveal>
      </div>

      {/* Archive wall */}
      <Reveal className="mt-16 w-full md:mt-24">
        {/* md+: five staggered columns that bleed off both edges */}
        <div className="hidden items-start justify-center gap-4 md:flex lg:gap-6">
          {COLUMNS.map((column, ci) => (
            <div
              key={ci}
              className={`flex shrink-0 flex-col gap-4 lg:gap-6 ${column.width} ${column.offset}`}
            >
              {column.picks.map((index, ri) => (
                <Frame
                  key={index}
                  post={at(index)}
                  ratio={
                    column.picks.length === 1
                      ? "aspect-[3/4]"
                      : ri === 0
                        ? "aspect-[4/5]"
                        : "aspect-square"
                  }
                />
              ))}
            </div>
          ))}
        </div>

        {/* below md: a simple two-up grid */}
        <div className="grid grid-cols-2 gap-4 px-6 md:hidden">
          {posts.slice(0, 6).map((post) => (
            <Frame key={post.id} post={post} ratio="aspect-[4/5]" />
          ))}
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
