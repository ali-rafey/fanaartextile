/**
 * The homepage hero.
 *
 * One plate, held. An earlier version ran all ten creatives as a dissolving
 * film; a single frame carries the page better — the eye settles, and the
 * type beside it gets to be the thing that moves you. The rest of the set
 * stays in public/images/hero/ for whenever it is wanted.
 */

export interface HeroFrame {
  src: string;
  alt: string;
}

export const HERO_PLATE: HeroFrame = {
  src: "/images/hero/running-meadow.jpg",
  alt: "Running through a meadow in loose, undyed cloth",
};

/**
 * The two stills set beside the film, the way a spread carries detail shots
 * next to its opening plate. Chosen for contrast with the moving frame: one
 * still life, one figure.
 */
export const HERO_DETAILS: HeroFrame[] = [
  { src: "/images/hero/folded-napkins.jpg", alt: "Stacked linen napkins in sage and cream" },
  { src: "/images/hero/arms-raised.jpg", alt: "Arms raised against an open sky" },
];

export const HERO_COPY = {
  headline: "We make\nthe cloth\nyou live in.",
  intro:
    "Traced to origin, tested by batch, finished in small runs — cloth for the hours nobody is watching.",
  /** The credit block, bottom right, in the manner of a campaign plate. */
  credits: ["Fanaar Textile", "Woven & knitted to one standard", "fanaar.online"],
  primary: { label: "The fabric library", href: "/fabrics" },
  secondary: { label: "How we work", href: "/about" },
};
