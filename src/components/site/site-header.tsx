import HeaderShell from "@/components/site/header-shell";
import { getJournalMenu } from "@/lib/nav-menu";

/**
 * Light interior-page header — the counterpart to the transparent hero navbar.
 * Server component so the Journal drop panel can be built from real posts;
 * the interactive shell is a client component beneath it.
 */
export default async function SiteHeader() {
  const journal = await getJournalMenu();
  return <HeaderShell journal={journal} />;
}
