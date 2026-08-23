"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/site/mobile-menu";
import NavMenus, { MENU_FOR } from "@/components/site/menus/nav-menus";
import { useHoverMenu } from "@/components/site/use-hover-menu";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";
import type { NavMenus as NavMenusData } from "@/lib/nav-menu";

const link =
  "text-xs whitespace-nowrap uppercase tracking-[0.18em] text-ink/70 transition-colors duration-300 ease-lux hover:text-ink";

export default function HeaderShell({ menus }: { menus: NavMenusData }) {
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
          className={link}
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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/85 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto max-w-6xl px-6 py-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <ul className="hidden items-center gap-7 xl:flex">{NAV_LEFT.map(renderItem)}</ul>
          <span aria-hidden className="xl:hidden" />

          <Link href="/" className="group justify-self-center" aria-label="Fanaar — home">
            <Image
              src="/images/brand/logo-ink.png"
              alt="Fanaar"
              width={1131}
              height={823}
              priority
              className="h-8 w-auto opacity-90 transition-opacity duration-500 ease-lux group-hover:opacity-100 xl:h-10"
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
      </nav>

      {/* Drop panels — desktop hover only. The wrapper carries no height of its
          own (every panel inside is absolutely positioned), so it cannot open
          a panel from anywhere but the nav label above it. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-full hidden xl:block"
        onMouseEnter={menu.hold}
        onMouseLeave={menu.hide}
      >
        <NavMenus menus={menus} active={menu.active} onNavigate={menu.close} />
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        categories={menus.journal.categories}
      />
    </header>
  );
}
