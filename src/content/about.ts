/**
 * Copy for the About page (/about). Prose, figures and values live here so the
 * page component stays presentational.
 */

export const ABOUT_HERO = {
  index: "(01)",
  caption: ["FANAAR TEXTILE", "A FABRIC HOUSE,", "EST. 2026"],
  statement: "We make the cloth\nyou live in.",
  intro:
    "Fanaar began with a simple discontent — that the fabric we spend the most unguarded hours in was the least considered. Everything here follows from fixing that.",
};

export const ABOUT_STORY = {
  lead: "We are a fabric house first.",
  paragraphs: [
    "Before a garment is cut or a collection is named, there is the cloth — its fibre, its weight, the way it settles against skin at the end of a long day. Everything Fanaar makes begins and ends with that feeling.",
    "From audited mills to a testing lab that measures what softness alone cannot, we hold every batch to one standard. Nothing carries the Fanaar name until it has earned it — and what we learn from the people who live in our fabric flows straight back into the next run.",
    "We are young, deliberately so. It lets us question the shortcuts a larger house takes for granted, trace every yarn to its origin, and price honestly.",
  ],
};

/** Mono figures strip — the house at a glance. */
export const ABOUT_FIGURES = [
  { value: "6", label: "Constructions in the library" },
  { value: "100%", label: "Traceable to origin" },
  { value: "4", label: "Quality gates per batch" },
  { value: "1", label: "Standard, no exceptions" },
];

export const ABOUT_QUOTE = {
  text: "Softness is a feeling. Quality is a measurement. We insist on both.",
  attribution: "The Fanaar Standard",
};

export interface AboutValue {
  title: string;
  description: string;
}

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: "Craft over volume",
    description:
      "Small-batch runs, unhurried finishing and quality gates at every stage. We would rather make less and mean it.",
  },
  {
    title: "Measured, not guessed",
    description:
      "GSM, shrinkage, colourfastness, skin safety — every batch is tested before it earns the name.",
  },
  {
    title: "Honest by default",
    description:
      "Traceable origins, transparent pricing and feedback that shapes the next collection. Value returned, not extracted.",
  },
];

export const ABOUT_IMAGES = [
  { src: "/images/about/mill.jpg", alt: "Spinning machinery at a partner mill" },
  { src: "/images/about/hands.jpg", alt: "A weaver's hand at the loom" },
  { src: "/images/about/yarn.jpg", alt: "Cones of yarn waiting to be warped" },
  { src: "/images/about/warp.jpg", alt: "Warp threads drawn tight across the loom" },
];

export const ABOUT_CTA = {
  heading: "Have a question, or a project in mind?",
  intro:
    "Whether you are sourcing fabric or simply curious about how we work, we would love to hear from you.",
  primaryLabel: "Contact us",
  primaryHref: "/contact",
  secondaryLabel: "Share feedback",
  secondaryHref: "/feedback",
};
