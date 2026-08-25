import NavbarShell from "@/components/site/navbar-shell";
import { getNavMenus } from "@/lib/nav-menu";

/**
 * Transparent primary navbar floating over the hero. `tone` picks the ink or
 * ivory treatment — the hero is a cream spread now, so the homepage asks for
 * ink; the ivory treatment stays for any dark plate behind it. Server component so
 * the hover panels can be built from real content; the interactive shell is a
 * client component beneath it.
 */
export default async function SiteNavbar({ tone = "ivory" }: { tone?: "ivory" | "ink" }) {
  const menus = await getNavMenus();
  return <NavbarShell menus={menus} tone={tone} />;
}
