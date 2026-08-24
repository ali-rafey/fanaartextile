"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MenuSheet from "@/components/site/menus/menu-sheet";
import ThreadPlaceholder from "@/components/site/thread-placeholder";
import type { ThreadsMenuItem } from "@/lib/nav-menu";

/**
 * Threads panel — the range, read one spool at a time.
 *
 * Index on the left, the spool held on a soft panel in the middle, its name
 * and what it is for on the right. Hovering the index swaps the specimen;
 * every frame and every paragraph is mounted from the start and crossfaded,
 * so the swap costs one opacity transition and never moves the layout.
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
  const [active, setActive] = useState(0);

  // Reopen on the first thread rather than wherever the pointer happened to
  // leave off last time. Adjusted during render as the panel closes, which is
  // React's own answer to "reset state when a prop changes" — an effect here
  // would render once with the stale selection before correcting it.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setActive(0);
  }

  if (!items.length) return null;
  const tab = open ? 0 : -1;

  return (
    <MenuSheet open={open} className={className}>
      <div className="grid gap-10 md:grid-cols-[13rem_minmax(0,19rem)_1fr] md:gap-14">
        {/* Index */}
        <div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
            Threads by Fanaar
          </p>
          <ul className="mt-7 space-y-1">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={tab}
                  className={`block text-left font-display text-[1.4rem] leading-[1.55] tracking-tight transition-colors duration-300 ease-lux ${
                    i === active ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/threads"
                onClick={onNavigate}
                tabIndex={tab}
                className="font-display text-[1.4rem] leading-[1.55] tracking-tight text-ink/60 transition-colors duration-300 ease-lux hover:text-ink"
              >
                All threads
              </Link>
            </li>
          </ul>
        </div>

        {/* Specimen */}
        <div className="relative hidden aspect-4/5 overflow-hidden rounded-3xl bg-[#f2f0ec] md:block">
          {items.map((item, i) => (
            <div
              key={item.id}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-[520ms] ease-lux motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.image ? (
                <Image src={item.image} alt={item.alt} fill sizes="19rem" className="object-cover" />
              ) : (
                <ThreadPlaceholder id={item.id} />
              )}
            </div>
          ))}
        </div>

        {/* Character */}
        <div className="relative min-h-[15rem] md:pt-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              aria-hidden={i !== active}
              className={`transition-opacity duration-[420ms] ease-lux motion-reduce:transition-none md:absolute md:inset-0 ${
                i === active ? "opacity-100" : "hidden opacity-0 md:pointer-events-none md:block"
              }`}
            >
              <h2 className="font-display text-[2.4rem] leading-[1.05] tracking-tight text-ink md:text-[3rem]">
                {item.name}
              </h2>
              {item.properties.length ? (
                <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-clay">
                  {item.properties.slice(0, 3).join(" · ")}
                </p>
              ) : null}
              <p className="mt-6 max-w-md leading-relaxed text-ink/60">{item.description}</p>
              <Link
                href="/threads"
                onClick={onNavigate}
                tabIndex={i === active ? tab : -1}
                className="mt-8 inline-block border-b border-ink/30 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
              >
                Explore threads
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MenuSheet>
  );
}
