"use client";

import Image from "next/image";
import Link from "next/link";
import type { NavMenus } from "@/lib/nav-menu";

/**
 * The Journal hover panel — a full-width sheet that drops out of the navbar:
 * the category list set in serif on the left, the four most recent articles as
 * image cards on the right. Kept mounted and animated with opacity/transform so
 * the reveal stays smooth and the links can be prefetched.
 *
 * Unlike its siblings this panel carries its own shell rather than MenuSheet's,
 * because its proportions are its own — a two-column spread, not the image
 * strip the other three share.
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
  return (
    <div
      aria-hidden={!open}
      className={`absolute inset-x-0 top-0 border-b border-ink/10 bg-ivory shadow-[0_28px_60px_-34px_rgba(27,24,21,0.4)] transition-[opacity,transform] duration-[420ms] ease-lux motion-reduce:transition-none ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      } ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[190px_1fr] md:gap-14 md:px-10 md:py-12">
        {/* Categories */}
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/60">
            Categories
          </p>
          <ul className="mt-6 space-y-2.5">
            {data.categories.map((category) => (
              <li key={category.label}>
                <Link
                  href={category.href}
                  onClick={onNavigate}
                  tabIndex={open ? 0 : -1}
                  className="font-display text-2xl leading-snug text-ink/75 transition-colors duration-300 ease-lux hover:text-ink"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest articles */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
          {data.featured.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              onClick={onNavigate}
              tabIndex={open ? 0 : -1}
              className="group block"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-ink/[0.05]">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 768px) 18vw, 45vw"
                    className="object-cover transition-transform duration-[900ms] ease-lux group-hover:scale-[1.05] motion-reduce:transition-none"
                  />
                ) : null}
              </div>
              <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-300 ease-lux group-hover:text-clay">
                {post.category}
              </p>
              <p className="mt-1 line-clamp-2 font-display text-[0.95rem] leading-snug text-ink/85">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
