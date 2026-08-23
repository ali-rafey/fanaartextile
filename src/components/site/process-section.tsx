import Image from "next/image";
import { PROCESS_SECTION, PROCESS_STEPS } from "@/content/process";
import ProcessPlaceholder from "./process-placeholder";
import Reveal from "./reveal";

/**
 * "The Fanaar Standard" — the four disciplines, drawn as one continuous thread.
 *
 * The section is about a single unbroken chain of custody, from fibre at origin
 * to the wearer's feedback coming back round. A list can only assert that; a
 * line can show it. So one thread enters top-right, passes through four stops
 * and leaves bottom-left, and the reader's eye follows the same route the cloth
 * does.
 *
 * The composition is placed rather than flowed: on desktop each stop is pinned
 * to a coordinate in a 0–100 space, and the SVG is authored in that same space
 * and stretched over it, so the thread meets every stop exactly. Stroke width
 * survives the stretch via vector-effect. Below md the whole thing falls back
 * to an ordinary stacked list with a rule down the side — a hand-placed
 * composition has no business on a 375px screen.
 */

/** Stop coordinates in the shared 0–100 space, and where its copy sits. */
const STOPS = [
  { node: { x: 23, y: 13 }, text: { x: 30, y: 4 }, align: "left" as const },
  { node: { x: 71, y: 35 }, text: { x: 34, y: 28 }, align: "right" as const },
  { node: { x: 27, y: 60 }, text: { x: 32, y: 53 }, align: "left" as const },
  { node: { x: 73, y: 84 }, text: { x: 36, y: 76 }, align: "right" as const },
];

/**
 * The thread. Authored in the same 0–100 space as STOPS: it enters off the
 * top-right, loops back on itself between the first two stops the way a slack
 * thread does, and runs off the bottom-left.
 */
const THREAD =
  "M 108,-6 C 92,4 74,9 23,13 " +
  "C -12,16 -6,29 20,30 C 44,31 44,38 71,35 " +
  "C 104,31 6,44 27,60 " +
  "C 40,70 44,80 73,84 " +
  "C 96,87 34,98 -8,108";

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-16 overflow-hidden bg-ivory py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Index rule — the section states its own terms before it begins */}
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 pb-5 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
            <span>{PROCESS_SECTION.eyebrow}</span>
            <span className="hidden sm:inline">
              ({String(PROCESS_STEPS.length).padStart(2, "0")}) Disciplines
            </span>
            <span>Fanaar Textile</span>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2
              id="process-heading"
              className="max-w-2xl font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-6xl"
            >
              {PROCESS_SECTION.heading}
            </h2>
            <p className="max-w-sm leading-relaxed text-ink/60 md:pb-2">{PROCESS_SECTION.intro}</p>
          </div>
        </Reveal>

        {/* ── Desktop: the thread ─────────────────────────────────────────── */}
        <div className="relative mt-16 hidden h-[70rem] md:block">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d={THREAD}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
              vectorEffect="non-scaling-stroke"
              className="text-ink/35"
            />
          </svg>

          <ol>
            {PROCESS_STEPS.map((step, i) => {
              const stop = STOPS[i];
              const right = stop.align === "right";
              return (
                <li key={step.id}>
                  {/* Stop — the cloth as it leaves this discipline */}
                  <Reveal
                    delay={i * 90}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${stop.node.x}%`, top: `${stop.node.y}%` }}
                  >
                    <span className="block h-[5.5rem] w-[5.5rem] overflow-hidden rounded-full bg-ivory p-1.5 shadow-[0_16px_36px_-22px_rgba(27,24,21,0.6)]">
                      <span className="relative block h-full w-full overflow-hidden rounded-full bg-ink/5">
                        {step.image ? (
                          <Image
                            src={step.image}
                            alt={step.alt}
                            fill
                            sizes="88px"
                            className="object-cover"
                          />
                        ) : (
                          <ProcessPlaceholder id={step.id} />
                        )}
                      </span>
                    </span>
                  </Reveal>

                  {/* Copy */}
                  <Reveal
                    delay={i * 90 + 60}
                    className="absolute w-[30%]"
                    style={{
                      left: `${stop.text.x}%`,
                      top: `${stop.text.y}%`,
                      textAlign: right ? "right" : "left",
                    }}
                  >
                    <p className="font-mono text-[0.6rem] tracking-[0.22em] text-clay">
                      {step.step}.
                    </p>
                    <h3 className="mt-2 font-display text-[1.6rem] leading-tight tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60">
                      {step.description}
                    </p>
                    <p className="mt-4 font-mono text-[0.55rem] uppercase leading-[1.9] tracking-[0.16em] text-ink/60">
                      {step.points.join(" · ")}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Below md: the same four stops, stacked on a rule ─────────────── */}
        {/* Indented by the node's radius so the stops sit fully on screen. */}
        <ol className="mt-14 ml-2 md:hidden">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.id}
              className="relative border-l border-ink/15 pb-12 pl-14 last:border-transparent last:pb-0"
            >
              <span className="absolute top-0 -left-7 block h-14 w-14 overflow-hidden rounded-full bg-ivory p-1 shadow-[0_14px_30px_-20px_rgba(27,24,21,0.6)]">
                <span className="relative block h-full w-full overflow-hidden rounded-full bg-ink/5">
                  {step.image ? (
                    <Image src={step.image} alt={step.alt} fill sizes="56px" className="object-cover" />
                  ) : (
                    <ProcessPlaceholder id={step.id} />
                  )}
                </span>
              </span>

              <div className="pt-1">
                <p className="font-mono text-[0.6rem] tracking-[0.22em] text-clay">{step.step}.</p>
                <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/60">{step.description}</p>
                <p className="mt-4 font-mono text-[0.55rem] uppercase leading-[1.9] tracking-[0.16em] text-ink/60">
                  {step.points.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
