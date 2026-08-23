"use client";

import AboutMenu from "@/components/site/menus/about-menu";
import ContactMenu from "@/components/site/menus/contact-menu";
import FabricsMenu from "@/components/site/menus/fabrics-menu";
import FeedbackMenu from "@/components/site/menus/feedback-menu";
import JournalMenu from "@/components/site/menus/journal-menu";
import ThreadsMenu from "@/components/site/menus/threads-menu";
import type { MenuKey } from "@/components/site/use-hover-menu";
import type { NavMenus as NavMenusData } from "@/lib/nav-menu";

/**
 * All four navbar panels, stacked at the foot of the header.
 *
 * Each is absolutely positioned, so the group takes no height of its own and
 * cannot intercept the pointer between panels — the trigger stays the nav
 * label itself. Only the open panel is hoverable; switching nav items
 * crossfades one into the next instead of closing and reopening.
 */
export default function NavMenus({
  menus,
  active,
  onNavigate,
  className = "",
}: {
  menus: NavMenusData;
  active: MenuKey | null;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      <FabricsMenu
        items={menus.fabrics}
        open={active === "fabrics"}
        onNavigate={onNavigate}
        className={className}
      />
      <ThreadsMenu
        items={menus.threads}
        open={active === "threads"}
        onNavigate={onNavigate}
        className={className}
      />
      <JournalMenu
        data={menus.journal}
        open={active === "journal"}
        onNavigate={onNavigate}
        className={className}
      />
      <AboutMenu
        data={menus.about}
        open={active === "about"}
        onNavigate={onNavigate}
        className={className}
      />
      <ContactMenu open={active === "contact"} onNavigate={onNavigate} className={className} />
      <FeedbackMenu open={active === "feedback"} onNavigate={onNavigate} className={className} />
    </>
  );
}

/** Nav label → the panel it opens. Labels without an entry have no panel. */
export const MENU_FOR: Record<string, MenuKey> = {
  Fabrics: "fabrics",
  Threads: "threads",
  Journal: "journal",
  "About Us": "about",
  "Contact Us": "contact",
  Feedback: "feedback",
};
