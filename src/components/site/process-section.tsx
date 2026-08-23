import Image from "next/image";
import { PROCESS_SECTION, PROCESS_STEPS } from "@/content/process";
import ProcessPlaceholder from "./process-placeholder";
import Reveal from "./reveal";

/**
 * "The Fanaar Standard" — the four disciplines behind every metre, set as a
 * dossier rather than a slideshow.
 *
 * The masthead stays put on the left while the four entries pass it, so the
 * claim being made and the evidence for it are on screen together the whole
 * way down. Each entry is numbered, ruled off, and shows the cloth in the
 * state that discipline leaves it in: loose fibre, measured cloth, a joined
 * seam, worn cloth. Nothing moves on its own and nothing is hidden behind a
 * control — all four disciplines are readable at a glance.
 */
export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-16 bg-ivory py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-20 md:px-10">
        <Reveal className="md:sticky md:top-28">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-clay">
            {PROCESS_SECTION.eyebrow}
          </p>
          <h2
            id="process-heading"
            className="mt-5 font-display text-4xl leading-[1.04] tracking-tight text-ink md:text-5xl"
          >
            {PROCESS_SECTION.heading}
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-ink/60">{PROCESS_SECTION.intro}</p>
        </Reveal>

        <ol className="md:pt-1">
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.id}
              className="border-t border-ink/10 pt-9 pb-10 first:border-t-0 first:pt-0 md:pt-11 md:pb-12"
            >
              <Reveal delay={i === 0 ? 0 : 80}>
                <div className="grid gap-6 sm:grid-cols-[12rem_1fr] sm:gap-10">
                  <div className="relative aspect-4/5 overflow-hidden bg-ink/5">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        sizes="(min-width: 640px) 192px, 45vw"
                        className="object-cover"
                      />
                    ) : (
                      <ProcessPlaceholder id={step.id} />
                    )}
                  </div>

                  <div>
                    <p className="font-mono text-[0.62rem] tracking-[0.22em] text-clay">
                      ({step.step})
                    </p>
                    <h3 className="mt-3 font-display text-2xl tracking-tight text-ink md:text-[1.75rem]">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-ink/60">{step.description}</p>

                    <ul className="mt-7 max-w-sm">
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-baseline gap-3 border-t border-ink/[0.08] py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink/60"
                        >
                          <span aria-hidden className="text-clay/70">
                            —
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
