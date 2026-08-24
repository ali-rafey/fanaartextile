/**
 * The Fanaar fabric library. Each entry is a construction (weave/knit) with its
 * own detail page at /fabrics/[slug] — specs, best uses and origin. Showcase
 * data until the real products & categories feature ships from the admin
 * portal; extend or correct freely. Wire a photo by dropping it into
 * public/images/fabrics/ and pointing `image` at it.
 */

export interface FabricSpec {
  composition: string;
  construction: string;
  weight: string;
  dyeClass: string;
  finish: string;
  width: string;
}

export interface Fabric {
  slug: string;
  name: string;
  /** "Woven" | "Knit" — the family, shown as an eyebrow. */
  family: string;
  /** Short category descriptor, e.g. "Diagonal twill weave". */
  category: string;
  tagline: string;
  intro: string;
  image: string;
  alt: string;
  specs: FabricSpec;
  /** Short line introducing the "best used for" list. */
  bestForIntro: string;
  bestFor: string[];
  /** Origin / heritage of the construction. */
  root: string[];
}

export const FABRICS_INDEX = {
  eyebrow: "Fabrics",
  heading: "The fabric library",
  intro:
    "Every construction we build on, gathered in one place — chosen by fibre, weight and hand, and finished to the Fanaar standard. Choose a family to explore its specification and character.",
  metaLines: [
    "Premium lounge & loungewear cloth",
    "Woven, knitted & finished to one standard",
  ],
  email: "hello@fanaar.com",
};

export const FABRICS_CATEGORIES = {
  eyebrow: "Categories",
  heading: "Every construction, by name",
};

export const FABRICS: Fabric[] = [
  {
    slug: "twill",
    name: "Twill",
    family: "Woven",
    category: "Diagonal twill weave",
    tagline: "Structure with a soft hand.",
    intro:
      "A tight diagonal weave that gives quiet structure and a fluid drape — the backbone of considered loungewear that holds its shape without ever feeling stiff.",
    image: "/images/fabrics/twill.jpg",
    alt: "Fanaar twill fabric, close and draped",
    specs: {
      composition: "100% long-staple cotton",
      construction: "3/1 diagonal twill, piece-woven",
      weight: "240–320 GSM",
      dyeClass: "Reactive / vat",
      finish: "Enzyme-washed, peached",
      width: "150 cm",
    },
    bestForIntro: "Where quiet structure earns its place.",
    bestFor: [
      "Overshirts and relaxed jackets",
      "Drawstring trousers and wide-leg bottoms",
      "Structured loungewear sets",
    ],
    root: [
      "Twill is one of the three foundational weaves, named for the way the weft floats over two or more warp threads before dropping under one — the offset that draws its signature diagonal wale.",
      "That wale is what makes twill quietly resilient: it hides soil, resists wrinkling and drapes with weight. We weave ours from long-staple cotton and wash it back so the structure stays but the hand turns soft.",
    ],
  },
  {
    slug: "jersey",
    name: "Jersey",
    family: "Knit",
    category: "Single knit",
    tagline: "The everyday second skin.",
    intro:
      "A fine single knit with natural stretch and an easy drape — light, breathable and endlessly soft. The fabric you reach for without thinking, made properly.",
    image: "/images/fabrics/jersey.jpg",
    alt: "Fanaar jersey fabric, soft and draped",
    specs: {
      composition: "95% cotton, 5% elastane",
      construction: "Single-jersey circular knit",
      weight: "140–200 GSM",
      dyeClass: "Reactive",
      finish: "Bio-polished, skin-safe",
      width: "180 cm (tubular)",
    },
    bestForIntro: "Made to be lived in, all day.",
    bestFor: [
      "Everyday tees and long-sleeves",
      "Soft layering and lounge dresses",
      "Relaxed loungewear separates",
    ],
    root: [
      "Jersey takes its name from the Channel Island where it was knitted for fishermen — prized for warmth, give and a closeness to the skin that woven cloth could never match.",
      "It is a single knit: one continuous yarn looped into rows, smooth on the face and looped on the back. A touch of elastane gives recovery so it moves with you and springs back true.",
    ],
  },
  {
    slug: "pique",
    name: "Piqué",
    family: "Knit",
    category: "Textured honeycomb knit",
    tagline: "Texture with backbone.",
    intro:
      "A knit with a fine raised waffle — more body than jersey, more breathability than a woven. Structured enough to hold a collar, soft enough to live in.",
    image: "/images/fabrics/pique.jpg",
    alt: "Fanaar piqué fabric showing its honeycomb texture",
    specs: {
      composition: "100% combed cotton",
      construction: "Honeycomb piqué knit",
      weight: "180–240 GSM",
      dyeClass: "Reactive",
      finish: "Combed, mercerised",
      width: "175 cm",
    },
    bestForIntro: "For pieces that want quiet structure.",
    bestFor: [
      "Polos and collared knits",
      "Structured tees and overlayers",
      "Breathable warm-weather loungewear",
    ],
    root: [
      "Piqué — French for 'quilted' — began as a woven imitation of hand-corded Marseilles quilting, later reborn as a knit with the same raised, geometric surface.",
      "That texture traps a little air, so piqué breathes and keeps its shape where a flat jersey would cling. Combed and mercerised, ours gains a subtle lustre and a cleaner, stronger yarn.",
    ],
  },
  {
    slug: "fleece",
    name: "Fleece",
    family: "Knit",
    category: "Brushed loop-back knit",
    tagline: "Warmth you sink into.",
    intro:
      "A dense loop-back knit brushed to a soft, insulating pile. The weight and warmth behind the perfect hoodie and the Sunday sweatpant.",
    image: "/images/fabrics/fleece.jpg",
    alt: "Fanaar brushed fleece fabric, soft pile visible",
    specs: {
      composition: "80% cotton, 20% recycled polyester",
      construction: "Loop-back, brushed pile",
      weight: "300–400 GSM",
      dyeClass: "Reactive / disperse",
      finish: "Brushed interior, anti-pill",
      width: "185 cm",
    },
    bestForIntro: "Built for the cold end of the wardrobe.",
    bestFor: [
      "Hoodies and heavyweight crews",
      "Sweatpants and lounge sets",
      "Cool-weather layering",
    ],
    root: [
      "Fleece was engineered to mimic sheep's wool — a knit whose back is brushed until the loops lift into a soft, air-trapping pile that insulates at a fraction of the weight.",
      "Ours pairs cotton for hand with a recycled-polyester core for structure and anti-pill durability, so the loft survives wash after wash instead of matting flat.",
    ],
  },
  {
    slug: "french-terry",
    name: "French Terry",
    family: "Knit",
    category: "Loop-back terry knit",
    tagline: "The soft middleweight.",
    intro:
      "Smooth on the face, looped on the back, and unbrushed — a breathable middleweight that carries warmth without bulk. The all-year loungewear workhorse.",
    image: "/images/fabrics/french-terry.jpg",
    alt: "Fanaar French terry fabric showing its looped back",
    specs: {
      composition: "92% cotton, 8% elastane",
      construction: "Loop-back French terry",
      weight: "240–340 GSM",
      dyeClass: "Reactive",
      finish: "Bio-washed, unbrushed loops",
      width: "180 cm",
    },
    bestForIntro: "The piece you wear three seasons a year.",
    bestFor: [
      "Crewnecks and relaxed sweats",
      "Joggers and matching sets",
      "Transitional layering",
    ],
    root: [
      "French terry keeps the loops of towelling on the inside and a clean knit face on the outside — the loops give softness and absorbency while the face stays smooth and refined.",
      "Left unbrushed, it breathes far better than fleece, which is why it works nearly year-round. A little elastane keeps cuffs and waistbands honest over time.",
    ],
  },
  {
    slug: "interlock",
    name: "Interlock",
    family: "Knit",
    category: "Double knit",
    tagline: "Smooth on both sides.",
    intro:
      "A double knit that is identical front and back — denser, more stable and more luxurious than jersey, with a clean matte face and no curling edges.",
    image: "/images/fabrics/interlock.jpg",
    alt: "Fanaar interlock fabric, smooth double-knit face",
    specs: {
      composition: "100% Supima cotton",
      construction: "Interlock double knit",
      weight: "200–260 GSM",
      dyeClass: "Reactive",
      finish: "Singed, mercerised",
      width: "175 cm",
    },
    bestForIntro: "When the piece should feel considered.",
    bestFor: [
      "Elevated tees and lounge dresses",
      "Structured soft separates",
      "Reversible and clean-finish pieces",
    ],
    root: [
      "Interlock is two jersey fabrics knitted together, interlocking so the loops face inward — which is why both sides look the same and the cloth lies flat instead of curling.",
      "That double construction gives weight, opacity and stability without stiffness. Knitted from Supima and singed smooth, ours reads as the quiet-luxury end of a knit wardrobe.",
    ],
  },
];

export const FABRIC_CTA = {
  label: "Request a sample",
  href: "/contact",
  secondaryLabel: "Talk to us",
  secondaryHref: "/contact",
};

export function getFabric(slug: string): Fabric | undefined {
  return FABRICS.find((f) => f.slug === slug);
}
