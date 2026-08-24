import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogPlaceholder from "@/components/site/blog-placeholder";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { BLOG_INDEX } from "@/content/blogs";
import { listPublishedPosts } from "@/lib/db/blogs";
import JsonLd from "@/components/seo/json-ld";
import { SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "The Fanaar journal — field notes on fibre, weave, GSM, colourfastness and fabric care from a working textile house.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Journal · Fanaar Textile",
    description:
      "The Fanaar journal — field notes on fibre, weave, GSM, colourfastness and fabric care from a working textile house.",
    url: "/blogs",
  },
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = await listPublishedPosts();

  // Category comes from the navbar's Journal panel. An unknown value falls
  // back to the full archive rather than an empty wall.
  const filtered = category
    ? all.filter((post) => post.category.toLowerCase() === category.toLowerCase())
    : all;
  const posts = filtered.length ? filtered : all;
  const activeCategory = filtered.length ? category : undefined;

  // The newest piece leads; the rest fill the archive grid beneath it.
  const [lead, ...rest] = posts;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Journal`,
    url: absoluteUrl("/blogs"),
    description: BLOG_INDEX.intro,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      articleSection: post.category,
      url: absoluteUrl(post.href),
      ...(post.image ? { image: absoluteUrl(post.image) } : {}),
      publisher: { "@type": "Organization", name: SITE_NAME },
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blogs" },
        ])}
      />
      <SiteHeader />
      <main className="bg-ivory">
        {/* Masthead */}
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-4 md:px-10 md:pt-24">
          <Reveal>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
              {BLOG_INDEX.eyebrow}
            </p>
            <div className="mt-5 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-16">
              <h1 className="max-w-2xl font-display text-5xl leading-[0.98] tracking-tight text-ink md:text-6xl">
                {BLOG_INDEX.statement}
              </h1>
              <p className="leading-relaxed text-ink/60">{BLOG_INDEX.intro}</p>
            </div>
            {activeCategory ? (
              <p className="mt-10 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/60">
                {activeCategory}
                <Link
                  href="/blogs"
                  className="ml-4 text-clay transition-colors duration-300 ease-lux hover:text-ink"
                >
                  Clear
                </Link>
              </p>
            ) : null}
          </Reveal>
        </section>

        {/* The lead piece, given the room a lead deserves */}
        {lead ? (
          <section className="mx-auto max-w-7xl px-6 pt-14 md:px-10 md:pt-20">
            <Reveal>
              <Link href={lead.href} className="group grid gap-8 md:grid-cols-2 md:items-center md:gap-14">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-ink/5">
                  {lead.image ? (
                    <Image
                      src={lead.image}
                      alt={lead.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      priority
                      className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  ) : (
                    <BlogPlaceholder id={lead.id} />
                  )}
                </div>
                <div>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-clay">
                    {lead.category}
                    {lead.date ? <span className="text-ink/60"> · {lead.date}</span> : null}
                  </p>
                  <h2 className="mt-4 max-w-md font-display text-3xl leading-[1.1] tracking-tight text-ink transition-colors duration-300 ease-lux group-hover:text-clay md:text-4xl">
                    {lead.title}
                  </h2>
                  <p className="mt-5 max-w-md leading-relaxed text-ink/60">{lead.excerpt}</p>
                  <span className="mt-7 inline-block border-b border-ink/30 pb-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux group-hover:border-clay group-hover:text-clay">
                    Read the piece
                  </span>
                </div>
              </Link>
            </Reveal>
          </section>
        ) : null}

        {/* The rest of the archive */}
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
          <div className="grid gap-x-8 gap-y-14 border-t border-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 110}>
                <Link href={post.href} className="group block">
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-ink/5">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.alt}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
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
                  <h3 className="mt-2 font-display text-xl leading-snug tracking-tight text-ink transition-colors duration-300 ease-lux group-hover:text-clay">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/60">
                    {post.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
