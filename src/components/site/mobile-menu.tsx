"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";
import type { NavMenus } from "@/lib/nav-menu";

/**
 * The full-screen menu behind the burger, shared by both headers.
 *
 * It lived twice — once per shell — and the two copies had already drifted
 * apart once. One component means a change to the touch navigation cannot
 * reach only half the site.
 */
export default function MobileMenu({
  open,
  onClose,
  categories,
}: {
  open: boolean;
  onClose: () => void;
  categories: NavMenus["journal"]["categories"];
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink/95 px-8 py-7 backdrop-blur-sm"
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
          onClick={onClose}
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
              onClick={onClose}
              className="font-display text-3xl text-ivory/90 transition-colors hover:text-ivory"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Journal categories, inline — the drop panels are pointer-only */}
      <div className="mt-10 border-t border-ivory/15 pt-6">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ivory/50">
          Journal categories
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {categories.map((category) => (
            <li key={category.label}>
              <Link
                href={category.href}
                onClick={onClose}
                className="text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
