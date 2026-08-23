/**
 * Copy for the Feedback page (/feedback) and the navbar's Feedback panel.
 *
 * The loop is the whole argument of the page — that a note about the cloth
 * ends up changing the cloth — so it lives here rather than inside the page,
 * and the panel states the same four stages in the same order.
 */

export const FEEDBACK_INTRO = {
  eyebrow: "Feedback",
  statement: "Help shape\nthe next metre.",
  note: "At Fanaar the cycle doesn't end at delivery. What you tell us about the cloth you live in flows straight back into how the next run is made.",
  cta: "Share feedback",
  href: "/feedback",
};

export interface FeedbackLoopStage {
  step: string;
  note: string;
}

/** The loop a piece of feedback travels once it reaches us. */
export const FEEDBACK_LOOP: FeedbackLoopStage[] = [
  { step: "Sourcing", note: "Fibre choices revisited at origin." },
  { step: "Testing", note: "Thresholds tightened in the lab." },
  { step: "Production", note: "Finishing adjusted on the floor." },
  { step: "Back to you", note: "Better cloth in the next run." },
];
