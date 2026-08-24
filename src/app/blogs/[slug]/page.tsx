import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/json-ld";
import BlogPlaceholder from "@/components/site/blog-placeholder";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { getPublishedPost, listPublishedPosts } from "@/lib/db/blogs";
import { SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blogs/${slug}`,
      ...(post.image ? { images: [{ url: absoluteUrl(post.image) }] } : {}),
    },
  };
}

/** One paragraph per blank line, the way the admin's textarea is written. */
function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const all = await listPublishedPosts();
  const recent = all.filter((other) => other.href !== post.href).slice(0, 3);
  const related = all.filter((other) => other.href !== post.href).slice(0, 2);
  const body = paragraphs(post.body?.trim() || post.excerpt);

  // Archive counts, in the order the posts already come back in.
  const months = new Map<string, number>();
  for (const other of all) {
    if (other.date) months.set(other.date, (months.get(other.date) ?? 0) + 1);
  }
  const archive = [...months.entries()];

  const shareUrl = encodeURIComponent(absoluteUrl(post.href));
  const shareText = encodeURIComponent(post.title);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    url: absoluteUrl(post.href),
    ...(post.image ? { image: absoluteUrl(post.image) } : {}),
    ...(post.date ? { datePublished: post.date } : {}),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blogs" },
          { name: post.title, path: post.href },
        ])}
      />
      <SiteHeader />
      <main className="bg-ivory">
        {/* Title block — centred, the way a printed piece opens */}
        <header className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center md:pt-24 md:pb-16">
          <Reveal>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-7 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ink/60">
              <Link
                href={`/blogs?category=${encodeURIComponent(post.category)}`}
                className="transition-colors duration-300 ease-lux hover:text-clay"
              >
                {post.category}
              </Link>
              {post.date ? <span> · {post.date}</span> : null}
              {post.readTime ? <span> · {post.readTime}</span> : null}
            </p>
          </Reveal>
        </header>

        {/* The piece, and the archive beside it. There is no "about the
            author" rail: Fanaar publishes as a house, not as a byline, so a
            portrait and a potted biography there would be invented furniture. */}
        <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 md:px-10 md:pb-32 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-20">
          <article>
            <Reveal>
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-ink/5">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <BlogPlaceholder id={post.id} />
                )}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mx-auto mt-12 max-w-2xl space-y-6 text-[1.02rem] leading-[1.75] text-ink/75">
                {body.map((para) => (
                  <p key={para.slice(0, 28)}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Share */}
            <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink/10 pt-6">
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-ink/60">
                Share
              </span>
              {[
                { label: "X", href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}` },
                { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
                { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}` },
              ].map((target) => (
                <a
                  key={target.label}
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:text-clay"
                >
                  {target.label}
                </a>
              ))}
            </div>

            {related.length ? (
              <section className="mx-auto mt-20 max-w-2xl border-t border-ink/10 pt-10">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
                  Read next
                </p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  {related.map((other) => (
                    <Link key={other.href} href={other.href} className="group block">
                      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-ink/5">
                        {other.image ? (
                          <Image
                            src={other.image}
                            alt={other.alt}
                            fill
                            sizes="(min-width: 640px) 30vw, 100vw"
                            className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.04] motion-reduce:transition-none"
                          />
                        ) : (
                          <BlogPlaceholder id={other.id} />
                        )}
                      </div>
                      <p className="mt-3 font-mono text-[0.54rem] uppercase tracking-[0.2em] text-clay">
                        {other.category}
                      </p>
                      <p className="mt-1.5 font-display text-lg leading-snug tracking-tight text-ink transition-colors duration-300 ease-lux group-hover:text-clay">
                        {other.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside>
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
                Recent
              </p>
              <ul className="mt-5 space-y-6">
                {recent.map((other) => (
                  <li key={other.href}>
                    <Link href={other.href} className="group block">
                      <span className="block font-mono text-[0.52rem] uppercase tracking-[0.2em] text-clay">
                        {other.category}
                      </span>
                      <span className="mt-1.5 block font-display text-[0.98rem] leading-snug tracking-tight text-ink/85 transition-colors duration-300 ease-lux group-hover:text-clay">
                        {other.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {archive.length ? (
                <>
                  <p className="mt-12 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
                    Archive
                  </p>
                  <ul className="mt-5 space-y-3">
                    {archive.map(([month, count]) => (
                      <li key={month} className="text-[0.9rem] text-ink/70">
                        {month} <span className="text-ink/60">({count})</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <Link
                href="/blogs"
                className="mt-10 inline-block border-b border-ink/30 pb-1 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
              >
                All articles
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
