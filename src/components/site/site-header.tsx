import HeaderShell from "@/components/site/header-shell";
import { getNavMenus } from "@/lib/nav-menu";

/**
 * Light interior-page header — the counterpart to the transparent hero navbar.
 * Server component so the hover panels can be built from real content; the
 * interactive shell is a client component beneath it.
 */
export default async function SiteHeader() {
  const menus = await getNavMenus();
  return <HeaderShell menus={menus} />;
}
