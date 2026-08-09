/**
 * Content for the Threads page (/threads) — the sewing/stitching threads that
 * hold a Fanaar garment together. Showcase placeholders until the real
 * products feature ships from the admin portal. Wire a photo in like the
 * categories: drop a file into public/images/threads/ and set `image`.
 * Until then `image: null` renders the branded spool placeholder.
 */

export type ThreadId =
  | "polyester"
  | "cotton"
  | "core-spun"
  | "overlock"
  | "embroidery"
  | "bonded-nylon";

export interface Thread {
  id: ThreadId;
  name: string;
  description: string;
  /** Short spec pills, e.g. "High tensile". */
  properties: string[];
  image: string | null;
  alt: string;
}

export const THREADS_HERO = {
  eyebrow: "Threads",
  heading: "The thread in every seam",
  intro:
    "A garment is only as sound as the thread that holds it. We match each stitch to its fabric — for seams that stay true wash after wash.",
};

export const THREADS_INTRO = {
  heading: "Chosen for the seam, not just the spool",
  paragraphs: [
    "Thread is the quiet half of construction. The wrong choice puckers a seam, fades a season early or gives way under load; the right one disappears into the cloth and simply holds.",
    "We select stitching thread the way we select fabric — by fibre, tensile strength, heat tolerance and colourfastness — and pair it to the weight and stretch of each Fanaar piece.",
  ],
};

export const THREADS: Thread[] = [
  {
    id: "polyester",
    name: "Spun polyester",
    description:
      "Our all-purpose workhorse — strong, supple and colourfast, at home on almost every lounge weight.",
    properties: ["All-purpose", "High tensile", "Colourfast"],
    image: null,
    alt: "Spool of spun polyester sewing thread",
  },
  {
    id: "cotton",
    name: "Cotton thread",
    description:
      "A natural-fibre thread for natural fabrics, sinking into cotton and blends for a soft, matte seam.",
    properties: ["Natural fibre", "Soft seam", "Breathable"],
    image: null,
    alt: "Spool of natural cotton sewing thread",
  },
  {
    id: "core-spun",
    name: "Core-spun",
    description:
      "A polyester core wrapped in fibre — the strength of a filament with the feel of spun, built for high-speed stitching.",
    properties: ["Seam strength", "Heat-resistant", "Low friction"],
    image: null,
    alt: "Spool of core-spun sewing thread",
  },
  {
    id: "overlock",
    name: "Overlock",
    description:
      "Fine, high-yield thread for clean edge finishing and serged seams that stay flexible against the skin.",
    properties: ["Fine", "High-yield", "Flexible"],
    image: null,
    alt: "Cone of fine overlock thread",
  },
  {
    id: "embroidery",
    name: "Embroidery",
    description:
      "Lustrous thread for labels, monograms and detail work — sheen that holds through every wash.",
    properties: ["Lustrous", "Decorative", "Wash-fast"],
    image: null,
    alt: "Spool of lustrous embroidery thread",
  },
  {
    id: "bonded-nylon",
    name: "Bonded nylon",
    description:
      "A heavy-duty, bonded thread for load-bearing seams and trims where abrasion resistance matters most.",
    properties: ["Heavy-duty", "Abrasion-resistant", "Bonded"],
    image: null,
    alt: "Spool of heavy-duty bonded nylon thread",
  },
];

export const THREADS_CTA = {
  heading: "Sourcing thread for a run?",
  intro:
    "Tell us the fabric and the finish you're after, and we'll help match the right thread to the job.",
  label: "Talk to us",
  href: "/contact",
};
