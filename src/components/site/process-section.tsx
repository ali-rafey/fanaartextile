import { PROCESS_SECTION, PROCESS_STEPS } from "@/content/process";
import ProcessCarousel from "./process-carousel";
import Reveal from "./reveal";

/**
 * "The Fanaar Standard" — the four disciplines behind every fabric
 * (sourcing → laboratory testing → garment production → feedback & value
 * return), presented as a cinematic carousel. Copy and images live in
 * src/content/process.ts.
 */
export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-16 bg-ivory py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-clay md:text-sm">
              {PROCESS_SECTION.eyebrow}
            </p>
            <h2
              id="process-heading"
              className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl"
            >
              {PROCESS_SECTION.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-stone-600">{PROCESS_SECTION.intro}</p>
          </header>
        </Reveal>

        <Reveal delay={150} className="mt-14 md:mt-20">
          <ProcessCarousel steps={PROCESS_STEPS} />
        </Reveal>
      </div>
    </section>
  );
}
