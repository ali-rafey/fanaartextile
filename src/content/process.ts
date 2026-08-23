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
  title: string;
  description: string;
  points: string[];
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
      "Every Fanaar fabric begins long before the loom — with fibre chosen at origin. We work with audited mills and select long-staple cottons, modal and bamboo blends for their hand-feel, drape and integrity, tracing each yarn back to where it was grown.",
    points: [
      "Audited partner mills",
      "Long-staple & premium blends",
      "Fully traceable origins",
    ],
    image: "/images/process/sourcing.jpg",
    alt: "Raw premium fibres and yarns at a Fanaar partner mill",
  },
  {
    id: "lab",
    step: "02",
    title: "Laboratory Testing",
    description:
      "Softness is a feeling — quality is a measurement. Before approval, every batch passes through the lab: GSM consistency, shrinkage and colourfastness, pilling resistance and skin safety. Only fabric that proves itself earns the Fanaar name.",
    points: [
      "GSM & shrinkage control",
      "Colourfastness & pilling tests",
      "Certified skin-safe",
    ],
    image: "/images/process/lab.jpg",
    alt: "Fabric samples under analysis in the testing laboratory",
  },
  {
    id: "production",
    step: "03",
    title: "Garment Production",
    description:
      "Approved fabric moves to small-batch production, where loungewear takes shape through precision cutting, clean seams and unhurried finishing. Quality gates at every stage keep each piece true to the standard the lab signed off.",
    points: [
      "Small-batch manufacturing",
      "Precision cutting & finishing",
      "Quality gates at every stage",
    ],
    image: "/images/process/production.jpg",
    alt: "Loungewear being cut and stitched on the production floor",
  },
  {
    id: "feedback",
    step: "04",
    title: "Feedback & Value Return",
    description:
      "The cycle doesn't end at delivery. Wear-feedback from our customers flows straight back into sourcing, testing and production — refining every collection and returning the value to you: better fabric, honest pricing, no compromises.",
    points: [
      "Customer wear feedback",
      "Continuous refinement",
      "Value returned in every collection",
    ],
    image: "/images/process/feedback.jpg",
    alt: "Customers sharing feedback that shapes future Fanaar collections",
  },
];
