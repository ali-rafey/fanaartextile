"use client";

import Image from "next/image";
import Link from "next/link";
import MenuSheet from "@/components/site/menus/menu-sheet";
import type { FabricsMenuItem } from "@/lib/nav-menu";

/**
 * Fabrics panel — the image series from the top of /fabrics, brought up into
 * the navbar.
 *
 * Same grammar as that page: the name set small above, the cloth below it,
 * square-cut and edge to edge, no cards and no frames. The panel is a strip
 * rather than a room, so it drops in front of the page without swallowing it.
 */
export default function FabricsMenu({
  items,
  open,
  onNavigate,
  className = "",
}: {
  items: FabricsMenuItem[];
  open: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  if (!items.length) return null;
  const tab = open ? 0 : -1;

  return (
    <MenuSheet open={open} className={className}>
      <div className="flex items-baseline justify-between gap-6">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
          The fabric library
        </p>
        <Link
          href="/fabrics"
          onClick={onNavigate}
          tabIndex={tab}
          className="group inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ink/60 transition-colors duration-300 ease-lux hover:text-ink"
        >
          All fabrics
          <span
            aria-hidden
            className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 md:grid-cols-6">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/fabrics/${item.slug}`}
              onClick={onNavigate}
              tabIndex={tab}
              className="group block"
            >
              <p className="mb-3 font-display text-sm tracking-tight text-ink/70 transition-colors duration-300 ease-lux group-hover:text-ink">
                {item.name}
              </p>
              <div className="relative h-[10.5rem] overflow-hidden bg-ink/5">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 16vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </MenuSheet>
  );
}
