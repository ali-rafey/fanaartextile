import NavbarShell from "@/components/site/navbar-shell";
import { getJournalMenu } from "@/lib/nav-menu";

/**
 * Transparent primary navbar floating over the hero video. Server component so
 * the Journal drop panel can be built from real posts; the interactive shell is
 * a client component beneath it.
 */
export default async function SiteNavbar() {
  const journal = await getJournalMenu();
  return <NavbarShell journal={journal} />;
}
