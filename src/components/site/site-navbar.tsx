"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";

const desktopLink =
  "text-xs whitespace-nowrap uppercase tracking-[0.18em] text-ivory/85 transition-colors duration-300 ease-lux hover:text-ivory";

/**
 * Transparent primary navbar floating over the hero video: three links left
 * (Fabrics / Threads / Blogs), the Fanaar mark centered, three links right
 * (About Us / Contact Us / Feedback). On wide screens it sits inset 20% from
 * each side and ~7.5% from the top per the brand spec; below that it
 * collapses to a centered mark with a menu button opening a full overlay.
 */
export default function SiteNavbar() {
  const [open, setOpen] = useState(false);

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
    <>
      <nav
        aria-label="Primary"
        className="absolute inset-x-6 top-7 z-20 [text-shadow:0_1px_14px_rgba(27,24,21,0.45)] xl:inset-x-[20%] xl:top-[7.5%]"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          <ul className="hidden items-center gap-7 xl:flex">
            {NAV_LEFT.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={desktopLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* keeps the mark centered while the links are collapsed */}
          <span aria-hidden className="xl:hidden" />

          {/* Brand mark — Fanaar calligraphy, ivory over the dark hero video */}
          <Link href="/" className="group justify-self-center" aria-label="Fanaar — home">
            <Image
              src="/images/brand/logo-ivory.png"
              alt="Fanaar"
              width={1131}
              height={823}
              priority
              className="h-9 w-auto opacity-90 transition-opacity duration-500 ease-lux group-hover:opacity-100 xl:h-11"
            />
          </Link>

          <ul className="hidden items-center gap-7 justify-self-end xl:flex">
            {NAV_RIGHT.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={desktopLink}>
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
            className="justify-self-end p-1 text-ivory/90 transition-colors hover:text-ivory xl:hidden"
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
              className="h-9 w-auto"
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
        </div>
      )}
    </>
  );
}
