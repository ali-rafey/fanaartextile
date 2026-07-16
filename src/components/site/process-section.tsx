import Image from "next/image";
import { PROCESS_SECTION, PROCESS_STEPS } from "@/content/process";
import ProcessPlaceholder from "./process-placeholder";
import Reveal from "./reveal";

/**
 * "The Fanaar Standard" — the four disciplines behind every fabric:
 * sourcing → laboratory testing → garment production → feedback & value
 * return. Editorial alternating rows; copy and images live in
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

        <ol className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {PROCESS_STEPS.map((item, index) => {
            const flipped = index % 2 === 1;
            return (
              <li
                key={item.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={flipped ? "lg:order-2" : undefined}>
                  <figure className="relative">
                    <div
                      aria-hidden
                      className={`absolute inset-0 rounded-2xl border border-clay/25 ${
                        flipped ? "-translate-x-3 translate-y-3" : "translate-x-3 translate-y-3"
                      }`}
                    />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand shadow-sm ring-1 ring-ink/5">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <ProcessPlaceholder id={item.id} step={item.step} />
                      )}
                    </div>
                  </figure>
                </Reveal>

                <Reveal delay={150} className={flipped ? "lg:order-1" : undefined}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm tracking-[0.3em] text-clay">
                      {item.step}
                    </span>
                    <span aria-hidden className="h-px w-12 bg-clay/40" />
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-stone-600">{item.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-stone-700">
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-clay" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
