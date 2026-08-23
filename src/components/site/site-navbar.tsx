import NavbarShell from "@/components/site/navbar-shell";
import { getNavMenus } from "@/lib/nav-menu";

/**
 * Transparent primary navbar floating over the hero video. Server component so
 * the hover panels can be built from real content; the interactive shell is a
 * client component beneath it.
 */
export default async function SiteNavbar() {
  const menus = await getNavMenus();
  return <NavbarShell menus={menus} />;
}
