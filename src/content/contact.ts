/**
 * Copy + contact details for the Contact page (/contact). Swap the placeholder
 * phone / studio details for the real ones when they are confirmed.
 */

export const CONTACT_HERO = {
  index: "(02)",
  caption: ["SOURCING & COLLABORATION", "MON–FRI, 9:00–18:00", "REPLIES WITHIN 2 DAYS"],
  statement: "Let's talk\ncloth.",
  intro:
    "Sourcing fabric, exploring a collaboration, or simply curious how we work? Send a note — a real person reads it.",
};

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export const CONTACT_DETAILS: ContactDetail[] = [
  { label: "Email", value: "hello@fanaar.com", href: "mailto:hello@fanaar.com" },
  { label: "Phone", value: "+1 (000) 000-0000", href: "tel:+10000000000" },
  { label: "Studio", value: "By appointment — details on request" },
  { label: "Hours", value: "Sun–Thu, 9:00–18:00" },
];
