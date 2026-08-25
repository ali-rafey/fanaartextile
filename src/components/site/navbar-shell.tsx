"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/site/mobile-menu";
import NavMenus, { MENU_FOR } from "@/components/site/menus/nav-menus";
import { useHoverMenu } from "@/components/site/use-hover-menu";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";
import type { NavMenus as NavMenusData } from "@/lib/nav-menu";

/**
 * The navbar floats over whatever the hero is, so it takes its colour from
 * the plate beneath it rather than assuming a dark one.
 */
const TONES = {
  ivory: {
    link: "text-ivory/85 hover:text-ivory",
    shadow: "xl:[text-shadow:0_1px_14px_rgba(27,24,21,0.45)]",
    logo: "/images/brand/logo-ivory.png",
  },
  ink: {
    link: "text-ink/70 hover:text-ink",
    shadow: "",
    logo: "/images/brand/logo-ink.png",
  },
} as const;

/**
 * Transparent primary navbar floating over the hero video: three links left
 * (Fabrics / Threads / Journal), the Fanaar mark centered, three links right
 * (About Us / Contact Us / Feedback). On wide screens it sits inset 20% from
 * each side and ~7.5% from the top per the brand spec; below that it
 * collapses to a centered mark with a menu button opening a full overlay.
 */
export default function NavbarShell({
  menus,
  tone = "ivory",
}: {
  menus: NavMenusData;
  tone?: keyof typeof TONES;
}) {
  const skin = TONES[tone];
  // Below xl the bar has an ivory ground of its own, so the mark has to be the
  // ink one there whatever tone the hero behind it asks for — the ivory mark
  // on ivory is invisible.
  const INK_MARK = "/images/brand/logo-ink.png";
  const needsInkMark = skin.logo !== INK_MARK;
  const desktopLink = `text-xs whitespace-nowrap uppercase tracking-[0.18em] transition-colors duration-300 ease-lux ${skin.link}`;
  const [open, setOpen] = useState(false);
  const menu = useHoverMenu();

  const renderItem = (item: { label: string; href: string }) => {
    const key = MENU_FOR[item.label];
    return (
      <li
        key={item.label}
        // Handlers sit on the item, not the Link: next/link does not forward
        // onMouseEnter. The item is a content-sized flex child, so its box is
        // the text itself — nothing beside the label can open a panel.
        onMouseEnter={key ? () => menu.show(key) : undefined}
        onMouseLeave={key ? menu.hide : undefined}
      >
        <Link
          href={item.href}
          className={desktopLink}
          onFocus={key ? () => menu.show(key) : undefined}
          aria-haspopup={key ? "true" : undefined}
          aria-expanded={key ? menu.active === key : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <nav
        aria-label="Primary"
        // Below xl this is a fixed bar like every other page's header, so the
        // navigation does not scroll away and vanish on a phone — the homepage
        // was the only page in the site without one. From xl it goes back to
        // floating free over the hero at the brand's inset.
        className={`fixed inset-x-0 top-0 z-30 border-b border-ink/10 bg-ivory/85 px-6 py-4 backdrop-blur-md xl:absolute xl:inset-x-[20%] xl:top-[7.5%] xl:border-0 xl:bg-transparent xl:px-0 xl:py-0 xl:backdrop-blur-none ${skin.shadow}`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <ul className="hidden items-center gap-7 xl:flex">
            {NAV_LEFT.map(renderItem)}
          </ul>
          {/* keeps the mark centered while the links are collapsed */}
          <span aria-hidden className="xl:hidden" />

          {/* Brand mark — Fanaar calligraphy, ivory over the dark hero video */}
          <Link
            href="/"
            className="group justify-self-center"
            aria-label="Fanaar — home"
          >
            {needsInkMark && (
              <Image
                src={INK_MARK}
                alt=""
                width={1131}
                height={823}
                priority
                className="h-9 w-auto opacity-90 transition-opacity duration-500 ease-lux group-hover:opacity-100 xl:hidden"
              />
            )}
            <Image
              src={skin.logo}
              alt=""
              width={1131}
              height={823}
              priority
              className={`h-9 w-auto opacity-90 transition-opacity duration-500 ease-lux group-hover:opacity-100 xl:h-11 ${needsInkMark ? "hidden xl:block" : ""}`}
            />
          </Link>

          <ul className="hidden items-center gap-7 justify-self-end xl:flex">
            {NAV_RIGHT.map(renderItem)}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="justify-self-end p-1 text-ink/80 transition-colors hover:text-ink xl:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
              className="h-6 w-6"
            >
              <path d="M4 9h16" />
              <path d="M4 15h16" />
            </svg>
          </button>
        </div>

        {/* Drop panels — break out of the 20% inset to full viewport width. The
            wrapper has no height of its own, so only the nav labels open it. */}
        <div
          className="pointer-events-none absolute left-1/2 top-[calc(100%+1.5rem)] hidden w-screen -translate-x-1/2 xl:block"
          onMouseEnter={menu.hold}
          onMouseLeave={menu.hide}
        >
          <NavMenus
            menus={menus}
            active={menu.active}
            onNavigate={menu.close}
            className="border-t border-ink/10 [text-shadow:none]"
          />
        </div>
      </nav>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        categories={menus.journal.categories}
      />
    </>
  );
}
