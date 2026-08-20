/**
 * Copy for the About page (/about).
 *
 * The page is deliberately typographic: no stock industrial photography. What
 * fills it is the reasoning behind the house and the person behind that —
 * which is the point of an about page, and reads far better than a strip of
 * looms nobody has any relationship to.
 */

export const ABOUT_HERO = {
  index: "(01)",
  caption: ["FANAAR TEXTILE", "A FABRIC HOUSE,", "EST. 2026"],
  statement: "We make the cloth\nyou live in.",
  intro:
    "Fanaar began with a simple discontent — that the fabric we spend the most unguarded hours in was the least considered. Everything here follows from fixing that.",
};

/** Why the house exists — the thinking, set large. */
export const ABOUT_PSYCHOLOGY = {
  eyebrow: "Why Fanaar exists",
  statement: "Softness is a feeling.\nQuality is a measurement.\nWe refuse to choose.",
  paragraphs: [
    "The cloth we spend our most unguarded hours in — asleep, at home, off duty — is the cloth almost nobody examines. It is sold on adjectives. Soft. Premium. Luxurious. Not one of them means anything you can hold to account.",
    "Fanaar starts from the other end. Before a fabric earns the name it is traced to its origin, weighed, washed, pulled and tested. What survives is what we sell, and what the people wearing it tell us decides the next run.",
    "That is the whole psychology of the house: measure everything that can be measured, and be honest about the rest.",
  ],
};

/**
 * Two frames on how people actually read cloth — by hand, and by feel, long
 * before they read a label. Sensory rather than industrial on purpose: nobody
 * forms a relationship with a photograph of a loom.
 */
export const ABOUT_PERCEPTION = {
  eyebrow: "How cloth is really judged",
  images: [
    {
      src: "/images/perception/touch.jpg",
      alt: "A hand reaching out to feel hanging cloth in daylight",
      caption: "The hand decides before the eye does.",
    },
    {
      src: "/images/perception/perception.jpg",
      alt: "A hand resting behind a sheer length of fabric",
      caption: "Weight, drape and warmth are read in the first second of contact.",
    },
  ],
  note: "Nobody buys fabric by reading a specification. They touch it, and something older than reasoning tells them whether it is good. Our job is to make sure that instinct is right — that what feels considered has actually been measured.",
};

/** The house at a glance. */
export const ABOUT_FIGURES = [
  { value: "6", label: "Constructions in the library" },
  { value: "100%", label: "Traceable to origin" },
  { value: "4", label: "Quality gates per batch" },
  { value: "1", label: "Standard, no exceptions" },
];

/**
 * The person behind the house, in the first person.
 *
 * `portrait` is intentionally empty: the note stands on its own as type rather
 * than borrowing a stranger's photograph. Point it at a real portrait
 * (e.g. "/images/about/founder.jpg") and it renders beside the note instead.
 * Setting `name` prints it above the role.
 */
export const ABOUT_FOUNDER = {
  eyebrow: "The person behind it",
  paragraphs: [
    "I came to textiles from the outside — not from a family mill, not from a fashion house, but from a stubborn belief that an industry this old deserves someone willing to ask better questions of it.",
    "Fanaar is that belief turned into a company. It is young and deliberately small, and I would rather it grow slowly and mean something than grow quickly and mean very little.",
    "If you are reading this, you are early. I would genuinely like to know what you think.",
  ],
  name: "",
  role: "Founder, Fanaar Textile",
  portrait: "",
  portraitAlt: "",
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

export const ABOUT_CTA = {
  heading: "Have a question, or a project in mind?",
  intro:
    "Whether you are sourcing fabric or simply curious about how we work, we would love to hear from you.",
  primaryLabel: "Contact us",
  primaryHref: "/contact",
  secondaryLabel: "Share feedback",
  secondaryHref: "/feedback",
};
