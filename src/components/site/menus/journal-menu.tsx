"use client";

import Image from "next/image";
import Link from "next/link";
import MenuSheet from "@/components/site/menus/menu-sheet";
import { dyeFor } from "@/lib/dye";
import type { NavMenus } from "@/lib/nav-menu";

/**
 * Journal panel — the same image series as the rest of the navbar, except
 * here the covers carry the colour.
 *
 * Nothing behind the pictures is tinted: no coloured cards, no washed
 * background. The only colour in the furniture is the category kicker and its
 * dot, which each category keeps everywhere it appears so the archive can be
 * read by hue before it is read by word.
 */
export default function JournalMenu({
  data,
  open,
  onNavigate,
  className = "",
}: {
  data: NavMenus["journal"];
  open: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  const tab = open ? 0 : -1;

  return (
    <MenuSheet open={open} className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/60">
          The journal
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {data.categories.map((category) => {
            const dye = dyeFor(category.label);
            return (
              <li key={category.label}>
                <Link
                  href={category.href}
                  onClick={onNavigate}
                  tabIndex={tab}
                  className="group inline-flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-300 ease-lux hover:text-ink"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full transition-transform duration-[420ms] ease-lux group-hover:scale-150 motion-reduce:transition-none"
                    style={{
                      backgroundColor:
                        category.label === "All posts" ? "rgba(27,24,21,0.25)" : dye.ink,
                    }}
                  />
                  {category.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
        {data.featured.map((post) => (
          <li key={post.id}>
            <Link href={post.href} onClick={onNavigate} tabIndex={tab} className="group block">
              <p
                className="mb-3 font-mono text-[0.54rem] uppercase tracking-[0.2em]"
                style={{ color: dyeFor(post.category).ink }}
              >
                {post.category}
              </p>
              <div className="relative h-[10.5rem] overflow-hidden bg-ink/5">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 640px) 22vw, 45vw"
                    className="object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                ) : null}
              </div>
              <p className="mt-3 line-clamp-2 font-display text-[0.95rem] leading-snug tracking-tight text-ink/80 transition-colors duration-300 ease-lux group-hover:text-ink">
                {post.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </MenuSheet>
  );
}
