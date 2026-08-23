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

/**
 * The composition, in the stage's own pixel space (1200 x 640 at a 1440
 * viewport). The previous version was drawn into a square viewBox and then
 * stretched 1.875:1, which flattened the loop into a wobble and dragged the
 * thread straight through three of the four sentences. Authoring at the
 * stage's real proportions keeps the drawing the shape it was drawn as.
 */
const STAGE = { w: 1200, h: 640 };

/** Stops on the thread, and the pocket each sentence sits in. */
const STOPS = [
  { node: { x: 168, y: 196 }, text: { x: 344, y: 186, w: 212 }, align: "left" as const },
  { node: { x: 452, y: 430 }, text: { x: 330, y: 496, w: 264 }, align: "left" as const },
  { node: { x: 772, y: 188 }, text: { x: 648, y: 22, w: 264 }, align: "left" as const },
  { node: { x: 1010, y: 452 }, text: { x: 712, y: 470, w: 264 }, align: "right" as const },
];

/**
 * The thread: in off the left, down the back of a slack loop, out of it and
 * along the floor, up to a crest and away off the bottom-right. Every stop
 * sits on a change of direction, and every sentence sits in a pocket the
 * curve opens — verified by sampling the path rather than by eye.
 */
const THREAD =
  "M -60,96 C 30,150 96,190 168,196 " +
  "C 250,205 300,250 322,318 " +
  "C 352,404 300,470 232,452 " +
  "C 176,437 196,372 274,380 " +
  "C 352,389 398,424 452,430 " +
  "C 560,442 610,300 772,188 " +
  "C 900,108 950,320 1010,452 " +
  "C 1090,540 1170,578 1260,604";

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

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

        {/* ── The thread, at the width it was drawn for ───────────────────── */}
        <div className="relative mt-10 hidden h-[40rem] xl:block">
          <svg
            aria-hidden
            viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
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
                    style={{
                      left: pct(stop.node.x, STAGE.w),
                      top: pct(stop.node.y, STAGE.h),
                    }}
                  >
                    <span className="block h-3 w-3 rounded-full bg-ink ring-4 ring-ivory" />
                  </Reveal>

                  <Reveal
                    delay={i * 90 + 60}
                    className="absolute"
                    style={{
                      left: pct(stop.text.x, STAGE.w),
                      top: pct(stop.text.y, STAGE.h),
                      width: pct(stop.text.w, STAGE.w),
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

        {/* ── Below xl: the thread straightens into a rule ──────────────────
            The placed composition is drawn for a 1200px stage. Narrower than
            that the sentences wrap taller, the pockets close up and the copy
            lands on the line — so it hands over to the rule rather than
            degrading into a mess. */}
        <ol className="mt-12 ml-1 xl:hidden">
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
