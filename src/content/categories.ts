/**
 * Content for the homepage category cards. These are showcase placeholders
 * until the real products & categories feature ships from the admin portal —
 * rename freely, and wire images in exactly like the process section:
 *   1. Drop the file into  public/images/categories/   (e.g. fabrics.jpg)
 *   2. Set that category's `image` to "/images/categories/fabrics.jpg"
 */

export type CategoryId = "fabrics" | "threads" | "loungewear";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string | null;
  alt: string;
  /** "#" until category pages ship with the products feature. */
  href: string;
}

export const CATEGORY_SECTION = {
  eyebrow: "Collections",
  heading: "Explore the collections",
  intro:
    "Three ways into Fanaar — each one sourced, tested and finished to the same standard.",
};

export const CATEGORIES: Category[] = [
  {
    id: "fabrics",
    name: "Lounge Fabrics",
    blurb:
      "Signature knits and wovens with tested drape and a hand-feel made for slow days.",
    image: null,
    alt: "Folded Fanaar lounge fabrics",
    href: "#",
  },
  {
    id: "threads",
    name: "Premium Threads",
    blurb:
      "Fine threads matched to our fabrics in tone and tenacity — the quiet detail that lasts.",
    image: null,
    alt: "Spools of premium Fanaar thread",
    href: "#",
  },
  {
    id: "loungewear",
    name: "Loungewear",
    blurb:
      "Small-batch pieces cut and finished in-house, true to the Fanaar standard.",
    image: null,
    alt: "Finished Fanaar loungewear pieces",
    href: "#",
  },
];
