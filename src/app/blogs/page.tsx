import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogPlaceholder from "@/components/site/blog-placeholder";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { BLOG_INDEX, BLOG_POSTS } from "@/content/blogs";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "The Fanaar journal — a living archive of fibre, craft and the people behind every metre.",
};

// A composed, organic scatter — varied widths, vertical offsets and a hair of
// rotation, with the middle still the largest. Offsets only kick in from md up;
// on small screens the row simply wraps into a centred cluster.
const TILES = [
  { w: "w-40 sm:w-44 md:w-52", y: "md:translate-y-12", ar: "aspect-[3/4]", r: "md:-rotate-1" },
  { w: "w-48 sm:w-56 md:w-64", y: "md:-translate-y-10", ar: "aspect-[4/5]", r: "" },
  { w: "w-60 sm:w-72 md:w-[22rem]", y: "md:translate-y-0", ar: "aspect-[3/4]", r: "", feature: true },
  { w: "w-44 sm:w-52 md:w-60", y: "md:translate-y-14", ar: "aspect-[4/5]", r: "md:rotate-1" },
  { w: "w-48 sm:w-56 md:w-64", y: "md:-translate-y-8", ar: "aspect-[3/4]", r: "" },
  { w: "w-40 sm:w-44 md:w-52", y: "md:translate-y-10", ar: "aspect-[4/5]", r: "" },
];

export default function BlogsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-greige">
        {/* Statement hero */}
        <section className="mx-auto max-w-4xl px-6 pt-20 pb-4 text-center md:pt-28">
          <Reveal>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-clay">
              {BLOG_INDEX.eyebrow}
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-ink md:text-6xl">
              {BLOG_INDEX.statement}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-ink/55">{BLOG_INDEX.intro}</p>
          </Reveal>
        </section>

        {/* Scattered archive gallery */}
        <Reveal className="relative w-full overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="flex flex-wrap items-center justify-center gap-6 md:flex-nowrap md:gap-7">
            {BLOG_POSTS.map((post, i) => {
              const tile = TILES[i % TILES.length];
              return (
                <Link
                  key={post.id}
                  href={post.href}
                  aria-label={post.title}
                  className={`group relative block shrink-0 ${tile.w} ${tile.y} ${tile.r} transition-transform duration-[900ms] ease-lux`}
                >
                  <div
                    className={`relative ${tile.ar} overflow-hidden rounded-md ring-1 ring-ink/10 shadow-[0_16px_40px_-16px_rgba(27,24,21,0.45)]`}
                  >
                    <div className="absolute inset-0 transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.05] motion-reduce:transition-none">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.alt}
                          fill
                          sizes="(min-width: 768px) 24rem, 60vw"
                          className="object-cover"
                        />
                      ) : (
                        <BlogPlaceholder id={post.id} />
                      )}
                    </div>

                    {/* Title + read reveal on hover */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100">
                      <p className="font-display text-base leading-snug text-ivory">{post.title}</p>
                      <p className="mt-1.5 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/70">
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
      </main>
      <SiteFooter />
    </>
  );
}
