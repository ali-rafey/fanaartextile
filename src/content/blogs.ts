/**
 * Content for the Journal — the homepage "Featured" strip and the /blogs
 * index both read from here. These are showcase placeholders until the real
 * blogs feature ships from the admin portal — rename or extend freely. Wire a
 * cover photo in exactly like the categories:
 *   1. Drop the file into  public/images/blogs/   (e.g. gsm.jpg)
 *   2. Set that post's `image` to "/images/blogs/gsm.jpg"
 * Until then `image: null` renders the branded woven placeholder.
 */

export type BlogId =
  | "gsm"
  | "long-staple"
  | "care"
  | "traceability"
  | "seasonless"
  | "colourfast";

export interface BlogPost {
  id: BlogId;
  /** Short kicker shown above the title, e.g. "Materials". */
  category: string;
  title: string;
  excerpt: string;
  /** Estimated reading time, e.g. "4 min read". */
  readTime: string;
  /** Human-readable publish date. */
  date: string;
  image: string | null;
  alt: string;
  /** "#" until article pages ship with the blogs feature. */
  href: string;
}

/** Homepage journal masthead + link through to the full archive. */
export const BLOG_SECTION = {
  masthead: "Journal",
  caption: "From the Fanaar archive",
  /** Centred statement above the scattered archive gallery. */
  statement: "Cloth carries memory — of the hands,\nthe mill and the years it outlives.",
  intro:
    "The Fanaar journal is a working archive of fibre, weave and craft — notes from the loom, the lab and the lives our cloth ends up in.",
  ctaLabel: "Enter the archive",
  ctaHref: "/blogs",
};

/** Statement hero for the /blogs archive page. */
export const BLOG_INDEX = {
  eyebrow: "The Journal",
  statement: "Cloth remembers the hands that made it.",
  intro:
    "A living archive of fibre, craft and the quiet obsession that turns raw thread into something worth keeping — the passion of textile, shown to the world.",
};

/**
 * All journal posts, newest first. The homepage features the first three via
 * FEATURED_BLOGS; the /blogs index lists them all.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "gsm",
    category: "Craft",
    title: "The weight of comfort: understanding GSM",
    excerpt:
      "Grams per square metre is the quiet number behind how a fabric drapes, breathes and lasts. Here's how we read it — and why heavier isn't always better.",
    readTime: "4 min read",
    date: "July 2026",
    image: "/images/journal/gsm.jpg",
    alt: "Close-up of woven lounge fabric showing its weight and drape",
    href: "#",
  },
  {
    id: "long-staple",
    category: "Materials",
    title: "Why long-staple cotton feels different",
    excerpt:
      "Fibre length decides softness, strength and how a garment ages. We trace the journey from a longer staple to the hand-feel you notice on day one — and year three.",
    readTime: "5 min read",
    date: "June 2026",
    image: "/images/journal/long-staple.jpg",
    alt: "Raw long-staple cotton fibres before spinning",
    href: "#",
  },
  {
    id: "care",
    category: "Care Guide",
    title: "Care notes: making lounge fabric last",
    excerpt:
      "A few unhurried habits keep colour true and cloth soft for years. Our simple ritual for washing, drying and storing the pieces you live in most.",
    readTime: "3 min read",
    date: "May 2026",
    image: "/images/journal/care.jpg",
    alt: "Neatly folded loungewear ready for storage",
    href: "#",
  },
  {
    id: "traceability",
    category: "Craft",
    title: "What traceable really means",
    excerpt:
      "Traceability is more than a label — it's knowing the mill, the field and the hands behind every metre. Here's how we follow a yarn back to where it began.",
    readTime: "6 min read",
    date: "April 2026",
    image: "/images/journal/traceability.jpg",
    alt: "A yarn cone at an audited partner mill",
    href: "#",
  },
  {
    id: "seasonless",
    category: "Perspective",
    title: "The case for seasonless lounge",
    excerpt:
      "Comfort doesn't follow a calendar. Why we design fabric to be lived in year-round, and how that quietly asks less of the planet.",
    readTime: "4 min read",
    date: "March 2026",
    image: "/images/journal/seasonless.jpg",
    alt: "Folded loungewear in muted, seasonless tones",
    href: "#",
  },
  {
    id: "colourfast",
    category: "Craft",
    title: "Colour that stays: the fastness test",
    excerpt:
      "A colour is only as good as its second wash. Inside the colourfastness checks every Fanaar batch passes before it earns its name.",
    readTime: "5 min read",
    date: "February 2026",
    image: "/images/journal/colourfast.jpg",
    alt: "Dyed fabric swatches lined up for colourfastness testing",
    href: "#",
  },
];

/** The three posts featured on the homepage Journal strip. */
export const FEATURED_BLOGS: BlogPost[] = BLOG_POSTS.slice(0, 3);
