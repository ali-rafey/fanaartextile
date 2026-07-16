import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, CATEGORY_SECTION } from "@/content/categories";
import CategoryPlaceholder from "./category-placeholder";
import Reveal from "./reveal";

/**
 * Landing-page category showcase — three rounded cards in one row (stacked
 * on mobile). Pure client-side UI for now; cards link to "#" until the
 * products & categories feature ships. Copy and images live in
 * src/content/categories.ts.
 */
export default function CategorySection() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      // Top padding stays slim — the process section above already provides
      // the breathing room between the two.
      className="scroll-mt-16 bg-ivory pt-2 pb-24 md:pt-4 md:pb-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-clay md:text-sm">
              {CATEGORY_SECTION.eyebrow}
            </p>
            <h2
              id="categories-heading"
              className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl"
            >
              {CATEGORY_SECTION.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-stone-600">{CATEGORY_SECTION.intro}</p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 lg:gap-8">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.id} delay={i * 120}>
              <Link
                href={category.href}
                className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10 focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <CategoryPlaceholder id={category.id} />
                    )}
                  </div>
                </div>

                <div className="p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl text-ink">{category.name}</h3>
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-ivory"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {category.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
