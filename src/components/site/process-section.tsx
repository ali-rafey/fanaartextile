import { PROCESS_SECTION, PROCESS_STEPS } from "@/content/process";
import Reveal from "./reveal";

/**
 * "The Fanaar Standard" — the four disciplines, drawn as one continuous thread.
 *
 * The section argues that four disciplines form a single unbroken chain, from
 * fibre at origin to the wearer's feedback coming back round. A stacked list
 * can only assert that; a line can show it. So one thread enters top-right,
 * passes through four stops and leaves bottom-left, and the eye follows the
 * same route the cloth does.
 *
 * Everything that isn't the thread has been taken out — no frames, no titles,
 * no spec lists. A stop is a dot and a sentence, because the drawing only
 * reads as a drawing while the copy stays short enough to leave it room.
 *
 * The composition is placed rather than flowed: each stop is pinned to a
 * coordinate in a shared 0–100 space, and the SVG is authored in that same
 * space and stretched over it, so the thread meets every stop wherever the
 * section lands. Stroke width survives the stretch via vector-effect. Below md
 * the thread straightens into a rule — a hand-placed composition has no
 * business on a 375px screen.
 */

/** Stop coordinates in the shared 0–100 space, and where its sentence sits. */
const STOPS = [
  { node: { x: 23, y: 13 }, text: { x: 29, y: 6 }, align: "left" as const },
  { node: { x: 71, y: 35 }, text: { x: 44, y: 29 }, align: "right" as const },
  { node: { x: 27, y: 60 }, text: { x: 32, y: 53 }, align: "left" as const },
  { node: { x: 73, y: 84 }, text: { x: 46, y: 77 }, align: "right" as const },
];

/**
 * The thread, authored in the same 0–100 space as STOPS: in off the top-right,
 * slack enough to loop back on itself between the first two stops, out off the
 * bottom-left.
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
      className="scroll-mt-16 overflow-hidden bg-ivory py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Index rule — the section states its terms before it begins */}
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
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2
              id="process-heading"
              className="max-w-2xl font-display text-4xl leading-[1.02] tracking-tight text-ink md:text-5xl"
            >
              {PROCESS_SECTION.heading}
            </h2>
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-ink/60 md:pb-2">
              {PROCESS_SECTION.intro}
            </p>
          </div>
        </Reveal>

        {/* ── Desktop: the thread ─────────────────────────────────────────── */}
        <div className="relative mt-10 hidden h-[40rem] md:block">
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
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="text-ink/35"
            />
          </svg>

          <ol>
            {PROCESS_STEPS.map((step, i) => {
              const stop = STOPS[i];
              return (
                <li key={step.id}>
                  <Reveal
                    delay={i * 90}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${stop.node.x}%`, top: `${stop.node.y}%` }}
                  >
                    <span className="block h-3 w-3 rounded-full bg-ink ring-4 ring-ivory" />
                  </Reveal>

                  <Reveal
                    delay={i * 90 + 60}
                    className="absolute w-[24%]"
                    style={{
                      left: `${stop.text.x}%`,
                      top: `${stop.text.y}%`,
                      textAlign: stop.align,
                    }}
                  >
                    <p className="font-mono text-[0.58rem] tracking-[0.22em] text-clay">
                      {step.step}
                    </p>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink/75">
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Below md: the thread straightens into a rule ─────────────────── */}
        <ol className="mt-12 ml-1 md:hidden">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.id}
              className="relative border-l border-ink/20 pb-10 pl-8 last:border-transparent last:pb-0"
            >
              <span className="absolute top-1.5 -left-[0.4rem] block h-3 w-3 rounded-full bg-ink ring-4 ring-ivory" />
              <p className="font-mono text-[0.58rem] tracking-[0.22em] text-clay">{step.step}</p>
              <p className="mt-2.5 leading-relaxed text-ink/75">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
