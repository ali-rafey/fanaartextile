/**
 * Content for the homepage collection filmstrip — an editorial gallery of
 * fabric families, one enlarged in the centre with the rest bleeding off both
 * edges. Showcase placeholders until the real products & categories feature
 * ships from the admin portal. Wire images in like the process section:
 *   1. Drop the file into  public/images/categories/   (e.g. cotton.jpg)
 *   2. Set that family's `image` to "/images/categories/cotton.jpg"
 * Until then `image: null` renders the branded woven placeholder.
 */

export type CategoryId =
  | "cotton"
  | "linen"
  | "modal"
  | "bamboo"
  | "polyester"
  | "wool"
  | "silk";

export interface Category {
  id: CategoryId;
  name: string;
  /** One-line note shown beneath the active feature. */
  descriptor: string;
  /**
   * The index slip above the strip: what the fibre actually is, in the terms
   * a mill would use. Three lines, because a fourth stops being read.
   */
  science: string[];
  image: string | null;
  alt: string;
  /** "#" until category pages ship with the products feature. */
  href: string;
}

export const CATEGORY_SECTION = {
  eyebrow: "The collection",
  cta: "View fabrics",
  ctaHref: "/fabrics",
};

export const CATEGORIES: Category[] = [
  {
    id: "cotton",
    name: "Cotton",
    descriptor: "Long-staple and endlessly breathable.",
    science: [
      "SEED FIBRE — NEAR-PURE CELLULOSE",
      "STAPLE 28–35 MM — COMBED LONG-STAPLE",
      "REGAIN 8.5% — GAINS STRENGTH WET",
    ],
    image: "/images/collection/cotton.jpg",
    alt: "Fanaar cotton lounge fabric",
    href: "#",
  },
  {
    id: "linen",
    name: "Linen",
    descriptor: "Cool, textured, better with every wash.",
    science: [
      "BAST FIBRE — DRAWN FROM THE FLAX STEM",
      "HOLLOW LUMEN — WICKS, THEN DRIES FAST",
      "HIGH TENACITY — LOW ELASTICITY, SO IT CREASES",
    ],
    image: "/images/collection/linen.jpg",
    alt: "Fanaar linen lounge fabric",
    href: "#",
  },
  {
    id: "modal",
    name: "Modal",
    descriptor: "A liquid drape with a quiet softness.",
    science: [
      "REGENERATED CELLULOSE — BEECH PULP",
      "HIGH WET MODULUS — HOLDS SHAPE THROUGH THE WASH",
      "REGAIN ~13% — TAKES MORE WATER THAN COTTON",
    ],
    image: "/images/collection/modal.jpg",
    alt: "Fanaar modal lounge fabric",
    href: "#",
  },
  {
    id: "bamboo",
    name: "Bamboo",
    descriptor: "Silky, temperature-smart, gentle on skin.",
    science: [
      "REGENERATED CELLULOSE — BAMBOO PULP",
      "ROUND, SMOOTH SECTION — LOW FRICTION ON SKIN",
      "HIGH REGAIN — MOVES HEAT AND MOISTURE OUT",
    ],
    image: "/images/collection/bamboo.jpg",
    alt: "Fanaar bamboo lounge fabric",
    href: "#",
  },
  {
    id: "polyester",
    name: "Polyester",
    descriptor: "Resilient, colourfast, quietly technical.",
    science: [
      "SYNTHETIC — POLYETHYLENE TEREPHTHALATE",
      "MELT-SPUN, HEAT-SET — SHAPE IS LOCKED IN",
      "REGAIN 0.4% — DRIES FAST, HOLDS ITS COLOUR",
    ],
    image: "/images/collection/polyester.jpg",
    alt: "Fanaar polyester lounge fabric",
    href: "#",
  },
  {
    id: "wool",
    name: "Wool",
    descriptor: "Warm, resilient, naturally regulating.",
    science: [
      "PROTEIN FIBRE — KERATIN, UNDER A SCALED CUTICLE",
      "NATURAL CRIMP — TRAPS AIR, SO IT INSULATES",
      "ABSORBS TO 30% OF ITS WEIGHT — WARM WHEN DAMP",
    ],
    image: "/images/collection/wool.jpg",
    alt: "Fanaar wool lounge fabric",
    href: "#",
  },
  {
    id: "silk",
    name: "Silk",
    descriptor: "A whisper of lustre in every metre.",
    science: [
      "PROTEIN FILAMENT — FIBROIN, SPUN CONTINUOUS",
      "TRIANGULAR SECTION — REFRACTS LIGHT AS LUSTRE",
      "FINEST NATURAL FILAMENT — STRONG FOR ITS WEIGHT",
    ],
    image: "/images/collection/silk.jpg",
    alt: "Fanaar silk-blend lounge fabric",
    href: "#",
  },
];
