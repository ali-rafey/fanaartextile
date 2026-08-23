"use client";

import Link from "next/link";
import MenuSheet from "@/components/site/menus/menu-sheet";
import { CONTACT_DETAILS, CONTACT_HERO } from "@/content/contact";

/**
 * Contact panel — the details, and nothing else.
 *
 * Someone who hovers Contact wants an address, not a pitch: the panel hands
 * over the four details straight away so the common case never needs the page
 * at all. Ruled rows rather than cards, because this is a list of facts.
 */
export default function ContactMenu({
  open,
  onNavigate,
  className = "",
}: {
  open: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const tab = open ? 0 : -1;

  return (
    <MenuSheet open={open} className={className}>
      <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:gap-16">
        <div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
            Contact
          </p>
          <p className="mt-5 font-display text-[1.9rem] leading-[1.05] tracking-tight whitespace-pre-line text-ink">
            {CONTACT_HERO.statement}
          </p>
          <Link
            href="/contact"
            onClick={onNavigate}
            tabIndex={tab}
            className="group mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
          >
            Write to us
            <span
              aria-hidden
              className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <dl className="self-start">
          {CONTACT_DETAILS.map((detail) => (
            <div
              key={detail.label}
              className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-3.5 last:border-b"
            >
              <dt className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ink/60">
                {detail.label}
              </dt>
              <dd className="text-right text-[0.92rem] text-ink/80">
                {detail.href ? (
                  <a
                    href={detail.href}
                    tabIndex={tab}
                    className="transition-colors duration-300 ease-lux hover:text-clay"
                  >
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </MenuSheet>
  );
}
