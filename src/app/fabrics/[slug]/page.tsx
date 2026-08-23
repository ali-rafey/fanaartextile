import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { FABRIC_CTA, FABRICS } from "@/content/fabrics";
import { getPublishedFabric, listPublishedFabrics } from "@/lib/db/fabrics";
import JsonLd from "@/components/seo/json-ld";
import { SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return FABRICS.map((fabric) => ({ slug: fabric.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fabric = await getPublishedFabric(slug);
  if (!fabric) return { title: "Fabric not found" };

  const description = `${fabric.name} — ${fabric.tagline} ${fabric.specs.composition}, ${fabric.specs.weight}. ${fabric.intro}`.slice(
    0,
    300
  );

  return {
    title: `${fabric.name} Fabric`,
    description,
    keywords: [
      `${fabric.name.toLowerCase()} fabric`,
      `${fabric.name.toLowerCase()} ${fabric.family.toLowerCase()}`,
      fabric.category.toLowerCase(),
      "lounge fabric",
      "loungewear fabric supplier",
    ],
    alternates: { canonical: `/fabrics/${fabric.slug}` },
    openGraph: {
      type: "article",
      title: `${fabric.name} Fabric · ${SITE_NAME}`,
      description,
      url: `/fabrics/${fabric.slug}`,
      images: [{ url: fabric.image, alt: fabric.alt }],
    },
  };
}

export default async function FabricDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fabric = await getPublishedFabric(slug);
  if (!fabric) notFound();

  const specRows: { label: string; value: string }[] = [
    { label: "Composition", value: fabric.specs.composition },
    { label: "Construction", value: fabric.specs.construction },
    { label: "Weight", value: fabric.specs.weight },
    { label: "Dye class", value: fabric.specs.dyeClass },
    { label: "Finish", value: fabric.specs.finish },
    { label: "Width", value: fabric.specs.width },
  ];

  const related = (await listPublishedFabrics())
    .filter((f) => f.slug !== fabric.slug)
    .slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${fabric.name} Fabric`,
    description: fabric.intro,
    image: [absoluteUrl(fabric.image)],
    url: absoluteUrl(`/fabrics/${fabric.slug}`),
    category: `${fabric.family} — ${fabric.category}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    material: fabric.specs.composition,
    additionalProperty: [
      { name: "Composition", value: fabric.specs.composition },
      { name: "Construction", value: fabric.specs.construction },
      { name: "Weight", value: fabric.specs.weight },
      { name: "Dye class", value: fabric.specs.dyeClass },
      { name: "Finish", value: fabric.specs.finish },
      { name: "Width", value: fabric.specs.width },
    ]
      .filter((spec) => spec.value)
      .map((spec) => ({
        "@type": "PropertyValue",
        name: spec.name,
        value: spec.value,
      })),
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Fabrics", path: "/fabrics" },
          { name: fabric.name, path: `/fabrics/${fabric.slug}` },
        ])}
      />
      <SiteHeader />
      <main className="bg-ivory">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <nav className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/60">
            <Link href="/fabrics" className="transition-colors duration-300 ease-lux hover:text-ink">
              Fabrics
            </Link>
            <span className="mx-2 text-ink/25">/</span>
            <span className="text-ink/70">{fabric.name}</span>
          </nav>
        </div>

        {/* Hero — image left, all copy + specification right */}
        <section className="mx-auto max-w-6xl px-6 pt-10 pb-20 md:pt-14 md:pb-28">
          <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14 lg:gap-20">
            {/* Image */}
            <Reveal>
              <div className="md:sticky md:top-28">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                  <Image
                    src={fabric.image}
                    alt={fabric.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            {/* Copy + specification */}
            <Reveal delay={120}>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                  {fabric.family} · {fabric.category}
                </p>
                <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-6xl">
                  {fabric.name}
                </h1>
                <p className="mt-5 font-display text-xl text-ink/70 md:text-2xl">{fabric.tagline}</p>
                <p className="mt-5 leading-relaxed text-ink/60">{fabric.intro}</p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={FABRIC_CTA.href}
                    className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 ease-lux hover:bg-clay-deep focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ivory focus-visible:outline-none"
                  >
                    {FABRIC_CTA.label}
                  </Link>
                  <Link
                    href={FABRIC_CTA.secondaryHref}
                    className="inline-flex items-center justify-center rounded-full border border-ink/15 px-8 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
                  >
                    {FABRIC_CTA.secondaryLabel}
                  </Link>
                </div>

                {/* Specification — sits right beside the image */}
                <div className="mt-12 border-t border-ink/10 pt-8">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                    Specification
                  </p>
                  <dl className="mt-5">
                    {specRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-4 first:border-t-0"
                      >
                        <dt className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/60">
                          {row.label}
                        </dt>
                        <dd className="text-right text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Best used for */}
        <section className="border-t border-ink/10 bg-ivory py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                  Best used for
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                  {fabric.bestForIntro}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul>
                {fabric.bestFor.map((use, i) => (
                  <li
                    key={use}
                    className="flex items-baseline gap-5 border-t border-ink/10 py-5 last:border-b"
                  >
                    <span className="font-mono text-[0.65rem] text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg text-ink/80">{use}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* The root */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
                  The root
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                  Where {fabric.name.toLowerCase()} comes from
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 leading-relaxed text-ink/60">
                {fabric.root.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-ink/10 bg-ivory py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  More from the library
                </h2>
                <Link
                  href="/fabrics"
                  className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-300 ease-lux hover:text-clay"
                >
                  All fabrics →
                </Link>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {related.map((f, i) => (
                <Reveal key={f.slug} delay={i * 100}>
                  <Link href={`/fabrics/${f.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
                      <Image
                        src={f.image}
                        alt={f.alt}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.03]"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-ink">{f.name}</h3>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-clay">
                      {f.category}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-ink py-20 text-center md:py-24">
          <Reveal>
            <div className="mx-auto max-w-xl px-6">
              <h2 className="font-display text-3xl tracking-tight text-ivory md:text-4xl">
                Ready to source {fabric.name}?
              </h2>
              <p className="mt-4 leading-relaxed text-ivory/60">
                Request a swatch, ask about weights and colours, or start a production
                conversation — a real person will get back to you.
              </p>
              <Link
                href={FABRIC_CTA.href}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-ivory px-8 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-lux hover:bg-ink/[0.04] focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
              >
                {FABRIC_CTA.label}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
