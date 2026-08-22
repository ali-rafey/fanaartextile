"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import JournalMenu from "@/components/site/journal-menu";
import { useHoverMenu } from "@/components/site/use-hover-menu";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";
import type { JournalMenu as JournalMenuData } from "@/lib/nav-menu";

const link =
  "text-xs whitespace-nowrap uppercase tracking-[0.18em] text-ink/70 transition-colors duration-300 ease-lux hover:text-ink";

/** Nav items that open a drop panel on hover. */
const HAS_MENU = new Set(["Blogs"]);

export default function HeaderShell({ journal }: { journal: JournalMenuData }) {
  const [open, setOpen] = useState(false);
  const menu = useHoverMenu();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-ivory/85 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto max-w-6xl px-6 py-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <ul className="hidden items-center gap-7 xl:flex">
            {NAV_LEFT.map((item) => {
              const hasMenu = HAS_MENU.has(item.label);
              return (
                <li
                  key={item.label}
                  // Handlers sit on the item, not the Link: next/link does not
                  // forward onMouseEnter. The item is a content-sized flex
                  // child, so its box is the text itself.
                  onMouseEnter={hasMenu ? menu.show : undefined}
                  onMouseLeave={hasMenu ? menu.hide : undefined}
                >
                  <Link
                    href={item.href}
                    className={link}
                    onFocus={hasMenu ? menu.show : undefined}
                    aria-haspopup={hasMenu ? "true" : undefined}
                    aria-expanded={hasMenu ? menu.open : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
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
            {NAV_RIGHT.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
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

      {/* Journal drop panel — desktop hover only.
          The wrapper spans the width of the header, so it must ignore the
          pointer while closed; otherwise moving anywhere beneath the navbar
          would open it. It only becomes hoverable once already open, so the
          pointer can travel from the link into the panel. */}
      <div
        className={`absolute inset-x-0 top-full hidden xl:block ${
          menu.open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onMouseEnter={menu.show}
        onMouseLeave={menu.hide}
      >
        <JournalMenu data={journal} open={menu.open} onNavigate={menu.close} />
      </div>

      {open && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 px-8 py-7 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <Image
              src="/images/brand/logo-ivory.png"
              alt="Fanaar"
              width={1131}
              height={823}
              className="h-8 w-auto"
            />
            <button
              autoFocus
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 text-ivory/80 transition-colors hover:text-ivory"
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
                <path d="m6 6 12 12" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>

          <ul className="mt-14 space-y-6">
            {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-ivory/90 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Journal categories, inline for touch */}
          <div className="mt-10 border-t border-ivory/15 pt-6">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory/40">
              Journal categories
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {journal.categories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
