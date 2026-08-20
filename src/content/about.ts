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

/** One quiet frame beneath the masthead, rather than a strip of them. */
export const ABOUT_BAND = {
  src: "/images/about/band.jpg",
  alt: "Warp threads drawn tight across the loom",
};

/**
 * A note from the founder — the reasoning behind the house, in the first
 * person. Replace `image` with a real portrait when there is one, and set
 * `name` to have it printed above the role.
 */
export const ABOUT_FOUNDER = {
  eyebrow: "A note from the founder",
  paragraphs: [
    "I did not arrive at textiles from a family mill or a fashion house. I arrived as someone who kept noticing the same thing: the cloth we spend our most unguarded hours in — asleep, at home, off duty — is the cloth almost nobody thinks about.",
    "Fanaar began as a stubborn question. We measure almost everything else we buy. So why is “soft” a marketing word instead of a number? Why does the fabric closest to us get the least scrutiny?",
    "The house is built around that answer. Audited mills, a testing lab, four gates before anything carries the name. It is a slower way to work, and it is the only way I wanted to do it.",
  ],
  /** Optional — leave empty and only the role is shown. */
  name: "",
  role: "Founder, Fanaar Textile",
  image: "/images/about/hands.jpg",
  imageAlt: "A weaver's hand guiding thread at the loom",
};

export const ABOUT_CTA = {
  heading: "Have a question, or a project in mind?",
  intro:
    "Whether you are sourcing fabric or simply curious about how we work, we would love to hear from you.",
  primaryLabel: "Contact us",
  primaryHref: "/contact",
  secondaryLabel: "Share feedback",
  secondaryHref: "/feedback",
};
