/**
 * Copy for the About Us page (/about). Prose and values live here so the page
 * component stays presentational — edit freely as the brand story evolves.
 */

export const ABOUT_HERO = {
  eyebrow: "Our Story",
  heading: "Crafted for the way you rest",
  intro:
    "Fanaar began with a simple discontent — that the fabric we spend the most unguarded hours in was the least considered. We set out to change that, one honest metre at a time.",
};

export const ABOUT_STORY = {
  heading: "An emerging house of considered textiles",
  paragraphs: [
    "We are a fabric house first. Before a garment is cut or a collection is named, there is the cloth — its fibre, its weight, the way it settles against skin at the end of a long day. Everything Fanaar makes begins and ends with that feeling.",
    "From audited mills to a testing lab that measures what softness alone cannot, we hold every batch to one standard. Nothing carries the Fanaar name until it has earned it — and what we learn from the people who live in our fabric flows straight back into the next run.",
    "We are young, deliberately so. It lets us question the shortcuts a larger house takes for granted, trace every yarn to its origin, and price honestly. Our ambition is quietly large: to become an emerging leader in global textiles, known not for volume but for conviction.",
  ],
};

export interface AboutValue {
  title: string;
  description: string;
}

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: "Craft over volume",
    description:
      "Small-batch, unhurried finishing and quality gates at every stage. We would rather make less and mean it.",
  },
  {
    title: "Measured, not guessed",
    description:
      "GSM, shrinkage, colourfastness, skin safety — softness is a feeling, but quality is a measurement we hold to.",
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
