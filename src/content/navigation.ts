/**
 * Primary navigation. The center of the navbar carries the Fanaar logo
 * (wordmark for now — swapped for the logo image when the owner provides it).
 *
 * Hrefs are temporary: in-page anchors where a section exists, "#" otherwise.
 * Point them at real routes as those pages ship (fabrics/threads → category
 * pages, blogs → blog index, etc.).
 */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LEFT: NavItem[] = [
  { label: "Fabrics", href: "#categories" },
  { label: "Threads", href: "#categories" },
  { label: "Blogs", href: "#" },
];

export const NAV_RIGHT: NavItem[] = [
  { label: "About Us", href: "#process" },
  { label: "Contact Us", href: "#" },
  { label: "Feedback", href: "#" },
];
