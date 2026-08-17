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
  { label: "Fabrics", href: "/fabrics" },
  { label: "Threads", href: "/threads" },
  { label: "Blogs", href: "/blogs" },
];

export const NAV_RIGHT: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
];
