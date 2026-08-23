"use client";

import Link from "next/link";
import MenuSheet from "@/components/site/menus/menu-sheet";
import { FEEDBACK_INTRO, FEEDBACK_LOOP } from "@/content/feedback";

/**
 * Feedback panel — the loop, in four words and a line each.
 *
 * The ask is a favour, so the panel earns it by showing where a note actually
 * goes rather than simply requesting one. Four ruled stages, the last one
 * returning to the reader, and a single way in.
 */
export default function FeedbackMenu({
  open,
  onNavigate,
  className = "",
}: {
  open: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const tab = open ? 0 : -1;

  return (
    <MenuSheet open={open} className={className}>
      <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:gap-16">
        <div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
            {FEEDBACK_INTRO.eyebrow}
          </p>
          <p className="mt-5 font-display text-[1.9rem] leading-[1.05] tracking-tight whitespace-pre-line text-ink">
            {FEEDBACK_INTRO.statement}
          </p>
          <Link
            href={FEEDBACK_INTRO.href}
            onClick={onNavigate}
            tabIndex={tab}
            className="group mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
          >
            {FEEDBACK_INTRO.cta}
            <span
              aria-hidden
              className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <ol className="self-start">
          {FEEDBACK_LOOP.map((stage, i) => (
            <li
              key={stage.step}
              className="flex items-baseline gap-5 border-t border-ink/10 py-3.5 last:border-b"
            >
              <span className="font-mono text-[0.56rem] tracking-[0.2em] text-clay">
                ({String(i + 1).padStart(2, "0")})
              </span>
              <span className="flex-1 text-[0.92rem] text-ink/80">{stage.step}</span>
              <span className="max-w-[22ch] text-right text-[0.78rem] leading-snug text-ink/60">
                {stage.note}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </MenuSheet>
  );
}
