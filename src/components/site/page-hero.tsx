import Reveal from "./reveal";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  intro?: string;
}

/**
 * Interior-page title band — sits directly beneath the sticky header on
 * about / contact / feedback. A soft sand-to-ivory wash with a hairline of
 * woven texture, then the eyebrow, serif heading and a short intro. Mirrors
 * the section headers used across the homepage so the pages feel of a piece.
 */
export default function PageHero({ eyebrow, heading, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand to-ivory">
      <svg aria-hidden className="absolute inset-0 h-full w-full text-ink">
        <defs>
          <pattern id="page-hero-weave" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8h16" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
            <path d="M8 0v16" stroke="currentColor" strokeWidth="0.5" opacity="0.035" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-hero-weave)" />
      </svg>

      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-clay md:text-sm">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-6xl">
            {heading}
          </h1>
          {intro ? (
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-stone-600">{intro}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
