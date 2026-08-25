"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";

/**
 * The full-screen menu behind the burger, shared by both headers.
 *
 * It lived twice — once per shell — and the two copies had already drifted
 * apart once. One component means a change to the touch navigation cannot
 * reach only half the site.
 *
 * Deliberately spare: an ivory ground, the mark, seven destinations. The
 * journal categories used to sit at the foot of it, which made a navigation
 * menu look like a page of its own; they live on the journal itself.
 */
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory px-8 py-7"
    >
      <div className="flex items-center justify-between">
        <Image
          src="/images/brand/logo-ink.png"
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
          className="-mr-1 p-1 text-ink/60 transition-colors duration-300 ease-lux hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            aria-hidden
            className="h-6 w-6"
          >
            <path d="m6 6 12 12" />
            <path d="m18 6-12 12" />
          </svg>
        </button>
      </div>

      {/* Home first — the mark in the bar is the only other way back, and on a
          phone it sits behind this dialog. */}
      <ul className="mt-16 space-y-7">
        {[{ label: "Home", href: "/" }, ...NAV_LEFT, ...NAV_RIGHT].map(
          (item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onClose}
                className="font-display text-[2rem] leading-none text-ink transition-opacity duration-300 ease-lux hover:opacity-60"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
