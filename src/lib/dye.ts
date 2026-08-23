/**
 * Dye-lot palette — the only colour in an otherwise neutral house.
 *
 * The Journal is the one place where colour earns its keep: an archive is a
 * set of parallel threads, and a reader who can tell them apart at a glance
 * navigates it far faster than one reading six near-identical grey cards.
 * So every category is assigned a hue and keeps it everywhere it appears.
 *
 * The hues are named after real dyestuffs — indigo, madder, weld — and held
 * at low saturation and high value so they read as *tinted paper* rather than
 * as UI colour. That keeps them warm and calm next to ivory, and stops the
 * navbar panel from turning into a toybox.
 *
 * Every `ink` clears WCAG AA (>= 4.5:1) on ivory, because that is the value
 * the small mono category kickers are set in — the smallest type on the site,
 * so it needs the most contrast, not the least.
 */

export interface Dye {
  /** Dyestuff name, for reference in markup. */
  name: string;
  /** Very light panel wash — the sheet background. */
  wash: string;
  /** Slightly deeper tint — chips and image beds. */
  tint: string;
  /** Saturated companion for small type and rules. */
  ink: string;
}

const PALETTE: Dye[] = [
  { name: "madder", wash: "#f9f1ec", tint: "#f0ded2", ink: "#9c5b40" },
  { name: "indigo", wash: "#eff2f7", tint: "#dee6f0", ink: "#4a6285" },
  { name: "sage", wash: "#f0f3ed", tint: "#dfe8d9", ink: "#5a6f50" },
  { name: "plum", wash: "#f5eef3", tint: "#e8dce6", ink: "#7a5670" },
  { name: "weld", wash: "#f8f2e3", tint: "#eee3c6", ink: "#75601f" },
  { name: "verdigris", wash: "#edf3f2", tint: "#d7e7e6", ink: "#46706c" },
];

/** Categories we ship with, pinned so the colours never shuffle on edit. */
const PINNED: Record<string, number> = {
  craft: 0,
  materials: 1,
  "care guide": 2,
  care: 2,
  perspective: 3,
  colour: 4,
  people: 5,
};

/** Neutral fallback for "All posts" and anything unclassified. */
export const DYE_NEUTRAL: Dye = {
  name: "neutral",
  wash: "#faf8f4",
  tint: "#eae5dc",
  ink: "#6b6259",
};

/**
 * Stable colour for a category name. Pinned names keep their hue; anything
 * added later hashes into the palette, so a new category is instantly
 * distinguishable without anyone having to choose a colour for it.
 */
export function dyeFor(category: string): Dye {
  const key = category.trim().toLowerCase();
  if (key in PINNED) return PALETTE[PINNED[key]];

  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
