"use client";

import Link from "next/link";
import MenuSheet from "@/components/site/menus/menu-sheet";
import type { NavMenus } from "@/lib/nav-menu";

/**
 * About panel — the quiet one.
 *
 * No index, no swatches, no photography. An about page is read, not browsed,
 * so this panel simply says the thing the house exists to say, backs it with
 * the four numbers that make it checkable, and offers three ways in. The
 * restraint is the point: after two image-heavy panels, arriving at plain type
 * lands as a change of register rather than more of the same.
 */
export default function AboutMenu({
  data,
  open,
  onNavigate,
  className = "",
}: {
  data: NavMenus["about"];
  open: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const tab = open ? 0 : -1;

  return (
    <MenuSheet open={open} className={className}>
      <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-20">
        <div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
            The house
          </p>
          <p className="mt-5 max-w-md font-display text-[1.75rem] leading-[1.1] tracking-tight whitespace-pre-line text-ink md:text-[2.1rem]">
            {data.statement}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-4">
            {data.figures.map((figure) => (
              <div key={figure.label}>
                <dt className="font-display text-2xl tracking-tight text-ink">{figure.value}</dt>
                <dd className="mt-1.5 max-w-[13ch] font-mono text-[0.54rem] uppercase leading-[1.7] tracking-[0.16em] text-ink/60">
                  {figure.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="md:pt-7">
          {data.links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                tabIndex={tab}
                className="group flex items-baseline justify-between gap-6 border-t border-ink/10 py-4 transition-colors duration-300 ease-lux last:border-b hover:border-ink/25"
              >
                <span>
                  <span className="block font-display text-[1.2rem] leading-snug tracking-tight text-ink/80 transition-colors duration-300 ease-lux group-hover:text-ink">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-mono text-[0.54rem] uppercase tracking-[0.18em] text-ink/60">
                    {item.note}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-ink/30 transition-[transform,color] duration-500 ease-lux group-hover:translate-x-1 group-hover:text-clay motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MenuSheet>
  );
}
