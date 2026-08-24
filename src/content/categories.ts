/**
 * Content for the homepage strip.
 *
 * These are not fabric families. They are the moments cloth is actually
 * judged in — held to the light, worn through an afternoon, read by the hand
 * before the eye. A fibre name tells a buyer nothing they can feel; a picture
 * of the cloth in use tells them everything, which is the argument the strip
 * is here to make.
 *
 * To swap one: drop the file into public/images/collection/ and point `image`
 * at it. Setting `image` to null renders the branded woven placeholder.
 */

export type CategoryId =
  | "air"
  | "stillness"
  | "morning"
  | "open-air"
  | "afternoon"
  | "touch"
  | "movement"
  | "drape";

export interface Category {
  id: CategoryId;
  name: string;
  /** One-line note shown beneath the active feature. */
  descriptor: string;
  /**
   * The index slip above the strip: three short observations about what this
   * frame is showing. Three, because a fourth stops being read.
   */
  notes: string[];
  image: string | null;
  alt: string;
  /** "#" until the products feature ships. */
  href: string;
}

export const CATEGORY_SECTION = {
  eyebrow: "In wear",
  cta: "View fabrics",
  ctaHref: "/fabrics",
};

export const CATEGORIES: Category[] = [
  {
    id: "air",
    name: "Air",
    descriptor: "Cloth you can see the light through.",
    notes: [
      "HELD UP TO THE LIGHT",
      "OPEN WEAVE — LOW COVER FACTOR",
      "THE FIRST THING ANYONE TESTS",
    ],
    image: "/images/collection/air.jpg",
    alt: "Cloth held up against an open sky, light passing through the weave",
    href: "#",
  },
  {
    id: "stillness",
    name: "Stillness",
    descriptor: "The hour when nothing is asked of you.",
    notes: [
      "SLEEVES PAST THE WRIST",
      "KNIT THAT KEEPS ITS SHAPE",
      "WARMTH WITHOUT THE WEIGHT",
    ],
    image: "/images/collection/stillness.jpg",
    alt: "Hands folded inside long knitted sleeves",
    href: "#",
  },
  {
    id: "morning",
    name: "Morning",
    descriptor: "A first cup, a cuff not yet fastened.",
    notes: [
      "LINEN, CREASED AND UNBOTHERED",
      "COOL AGAINST A WARM ROOM",
      "SOFTER WITH EVERY WASH",
    ],
    image: "/images/collection/morning.jpg",
    alt: "A linen shirt and an unfastened cuff around a warm cup",
    href: "#",
  },
  {
    id: "open-air",
    name: "Open air",
    descriptor: "Cloth reads differently with weather in it.",
    notes: [
      "CUT LOOSE ENOUGH TO MOVE",
      "WIND FINDS THE DRAPE",
      "COLOUR HELD UNDER FULL SUN",
    ],
    image: "/images/collection/open-air.jpg",
    alt: "A shirt catching the wind in open country under a wide sky",
    href: "#",
  },
  {
    id: "afternoon",
    name: "Afternoon",
    descriptor: "Wide trousers, bare feet, dappled ground.",
    notes: [
      "WEIGHT THAT FALLS STRAIGHT",
      "NO CLING IN THE HEAT",
      "SHADOW READS THE SURFACE",
    ],
    image: "/images/collection/afternoon.jpg",
    alt: "Walking barefoot through tree shadow in wide-legged trousers",
    href: "#",
  },
  {
    id: "touch",
    name: "Touch",
    descriptor: "The hand decides before the eye does.",
    notes: [
      "HAND-FEEL, JUDGED IN A SECOND",
      "A GRAIN YOU CAN FIND BLIND",
      "THE TEST NO SPEC SHEET PASSES",
    ],
    image: "/images/collection/touch.jpg",
    alt: "A hand resting on folds of white linen",
    href: "#",
  },
  {
    id: "movement",
    name: "Movement",
    descriptor: "Fabric only tells the truth in motion.",
    notes: [
      "DRAPE MEASURED BY HOW IT FALLS",
      "SHEER ENOUGH TO BLUR",
      "RECOVERY AFTER EVERY STEP",
    ],
    image: "/images/collection/movement.jpg",
    alt: "A figure moving behind a sheer length of cloth",
    href: "#",
  },
  {
    id: "drape",
    name: "Drape",
    descriptor: "How it hangs is the whole design.",
    notes: [
      "THE SHOULDER SETS THE LINE",
      "FULLNESS WITHOUT BULK",
      "SEAMS THAT DISAPPEAR",
    ],
    image: "/images/collection/drape.jpg",
    alt: "The back of a white shirt and skirt, falling in soft folds",
    href: "#",
  },
];
