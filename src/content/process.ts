/**
 * Content for the homepage "Fanaar Standard" process section.
 *
 * Each step carries one image showing the cloth in the state that discipline
 * leaves it in — loose fibre, measured cloth, a joined seam, worn cloth. To
 * swap one, drop a file into public/images/process/ and point `image` at it;
 * setting it back to null renders the branded woven placeholder instead.
 */

export type ProcessStepId = "sourcing" | "lab" | "production" | "feedback";

export interface ProcessStep {
  id: ProcessStepId;
  /** Display number, e.g. "01". */
  step: string;
  /** Kept for the page title and alt text; the homepage sets it in type. */
  title: string;
  /**
   * One sentence. The homepage draws the four disciplines as stops on a
   * thread, and a stop can only carry a couple of lines before the drawing
   * stops being a drawing — so the discipline has to be named inside the
   * sentence rather than sitting above it as a heading.
   */
  description: string;
  image: string | null;
  alt: string;
}

export const PROCESS_SECTION = {
  eyebrow: "The Fanaar Standard",
  heading: "From first fibre to final feeling",
  intro:
    "Fanaar is built on a simple conviction — lounge fabric should be as considered as it is comfortable. Four disciplines shape every metre that carries our name.",
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "sourcing",
    step: "01",
    title: "Fabric Sourcing",
    description:
      "Fibre is chosen at origin — long-staple cotton, modal, bamboo — from audited mills, and traced back to the field.",
    image: "/images/process/sourcing.jpg",
    alt: "Raw premium fibres and yarns at a Fanaar partner mill",
  },
  {
    id: "lab",
    step: "02",
    title: "Laboratory Testing",
    description:
      "Every batch is measured before it earns the name: GSM, shrinkage, colourfastness, pilling, skin safety.",
    image: "/images/process/lab.jpg",
    alt: "Fabric samples under analysis in the testing laboratory",
  },
  {
    id: "production",
    step: "03",
    title: "Garment Production",
    description:
      "Approved cloth goes to small-batch production — precision cutting, clean seams, a quality gate at every stage.",
    image: "/images/process/production.jpg",
    alt: "Loungewear being cut and stitched on the production floor",
  },
  {
    id: "feedback",
    step: "04",
    title: "Feedback & Value Return",
    description:
      "What you tell us after wearing it returns to sourcing and testing. The next run is better for it.",
    image: "/images/process/feedback.jpg",
    alt: "Customers sharing feedback that shapes future Fanaar collections",
  },
];
