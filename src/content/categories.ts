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
  image: string | null;
  alt: string;
  /** "#" until category pages ship with the products feature. */
  href: string;
}

export const CATEGORY_SECTION = {
  eyebrow: "The collection",
  /** Mono caption block sitting above the strip, editorial-index style. */
  caption: [
    "EXPLORE THE COLLECTION",
    "WOVEN & KNITTED CLOTH,",
    "EXPLORE THE ARCHIVE, \u00a92026 FANAAR",
  ],
  cta: "View fabrics",
  ctaHref: "/fabrics",
};

export const CATEGORIES: Category[] = [
  {
    id: "cotton",
    name: "Cotton",
    descriptor: "Long-staple and endlessly breathable.",
    image: "/images/collection/cotton.jpg",
    alt: "Fanaar cotton lounge fabric",
    href: "#",
  },
  {
    id: "linen",
    name: "Linen",
    descriptor: "Cool, textured, better with every wash.",
    image: "/images/collection/linen.jpg",
    alt: "Fanaar linen lounge fabric",
    href: "#",
  },
  {
    id: "modal",
    name: "Modal",
    descriptor: "A liquid drape with a quiet softness.",
    image: "/images/collection/modal.jpg",
    alt: "Fanaar modal lounge fabric",
    href: "#",
  },
  {
    id: "bamboo",
    name: "Bamboo",
    descriptor: "Silky, temperature-smart, gentle on skin.",
    image: "/images/collection/bamboo.jpg",
    alt: "Fanaar bamboo lounge fabric",
    href: "#",
  },
  {
    id: "polyester",
    name: "Polyester",
    descriptor: "Resilient, colourfast, quietly technical.",
    image: "/images/collection/polyester.jpg",
    alt: "Fanaar polyester lounge fabric",
    href: "#",
  },
  {
    id: "wool",
    name: "Wool",
    descriptor: "Warm, resilient, naturally regulating.",
    image: "/images/collection/wool.jpg",
    alt: "Fanaar wool lounge fabric",
    href: "#",
  },
  {
    id: "silk",
    name: "Silk",
    descriptor: "A whisper of lustre in every metre.",
    image: "/images/collection/silk.jpg",
    alt: "Fanaar silk-blend lounge fabric",
    href: "#",
  },
];
