"use client";

import Link from "next/link";
import MenuSheet from "@/components/site/menus/menu-sheet";
import { dyeFor } from "@/lib/dye";
import type { ThreadsMenuItem } from "@/lib/nav-menu";

/**
 * Threads panel — the same strip, wound rather than woven.
 *
 * Thread is chosen by comparison, so all of them sit side by side at equal
 * weight. The swatches are a dyed ground under a fine cross-wind rather than
 * photographs, which means the panel renders identically before any product
 * photography exists.
 */
export default function ThreadsMenu({
  items,
  open,
  onNavigate,
  className = "",
}: {
  items: ThreadsMenuItem[];
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
          Chosen for the seam, not just the spool
        </p>
        <Link
          href="/threads"
          onClick={onNavigate}
          tabIndex={tab}
          className="group inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ink/60 transition-colors duration-300 ease-lux hover:text-ink"
        >
          All threads
          <span
            aria-hidden
            className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 md:grid-cols-6">
        {items.map((item) => {
          const dye = dyeFor(item.name);
          return (
            <li key={item.id}>
              <Link href="/threads" onClick={onNavigate} tabIndex={tab} className="group block">
                <p className="mb-3 font-display text-sm tracking-tight text-ink/70 transition-colors duration-300 ease-lux group-hover:text-ink">
                  {item.name}
                </p>
                <div
                  className="relative h-[10.5rem] overflow-hidden"
                  style={{ backgroundColor: dye.tint }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.06] motion-reduce:transition-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(102deg, rgba(255,255,255,0.6) 0 1px, rgba(255,255,255,0) 1px 4px)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{ backgroundImage: `linear-gradient(to top, ${dye.ink}2e, transparent)` }}
                  />
                </div>
                <p
                  className="mt-2.5 font-mono text-[0.52rem] uppercase tracking-[0.18em]"
                  style={{ color: dye.ink }}
                >
                  {item.properties[0]}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </MenuSheet>
  );
}
