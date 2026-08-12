import Reveal from "./reveal";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  intro?: string;
}

/**
 * Interior-page title band — sits directly beneath the sticky header on
 * about / contact / feedback / threads. Deliberately bare: a clean ivory field,
 * generous air and a large serif heading. No texture or wash — the sophistication
 * comes from the whitespace and type, not decoration.
 */
export default function PageHero({ eyebrow, heading, intro }: PageHeroProps) {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-12 text-center md:pt-32 md:pb-16">
        <Reveal>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-clay">{eyebrow}</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
            {heading}
          </h1>
          {intro ? (
            <p className="mx-auto mt-7 max-w-xl leading-relaxed text-ink/55">{intro}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
