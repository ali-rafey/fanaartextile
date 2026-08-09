/**
 * Copy + contact details for the Contact Us page (/contact). Swap the
 * placeholder email / phone / address for the real ones when the owner
 * provides them.
 */

export const CONTACT_HERO = {
  eyebrow: "Contact",
  heading: "Let's talk cloth",
  intro:
    "Sourcing fabric, exploring a collaboration, or simply have a question? Send a note and a real person will get back to you.",
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
