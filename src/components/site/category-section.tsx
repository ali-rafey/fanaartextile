"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORIES, CATEGORY_SECTION } from "@/content/categories";

const pad = (n: number) => String(n).padStart(2, "0");

// One long, soft curve shared by the track glide and every still, so the whole
// strip moves as a single unhurried gesture.
const GLIDE = "1000ms cubic-bezier(0.22, 1, 0.36, 1)";
/** How much taller the featured still stands than the rest. */
const SCALE = 2;

/**
 * Homepage collection — an editorial filmstrip on cream.
 *
 * Every still shares one base size and sits in a single row; the active one
 * scales up and breaks the line while its neighbours slide outward by exactly
 * the overflow, so the gaps stay even and the row keeps bleeding off both
 * edges. Motion is transform-only (no width/layout animation) so it stays
 * glass-smooth, and sizes are measured at rest — nothing is ever measured
 * mid-animation.
 */
export default function CategorySection() {
  const [active, setActive] = useState(3);
  const [m, setM] = useState<{ w: number; gap: number; vw: number } | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    const item = itemRefs.current[0];
    if (!vp || !track || !item) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    setM({ w: item.offsetWidth, gap, vw: vp.clientWidth });
  }, []);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  // Half the width the feature gains — how far each neighbour steps aside.
  const delta = m ? (m.w * (SCALE - 1)) / 2 : 0;
  const trackOffset = m ? m.vw / 2 - (active * (m.w + m.gap) + m.w / 2) : 0;

  const clamp = (n: number) => Math.min(CATEGORIES.length - 1, Math.max(0, n));
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActive((i) => clamp(i + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((i) => clamp(i - 1));
    }
  };

  const current = CATEGORIES[active];

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="relative overflow-hidden bg-[#f1efea] py-16 md:py-24"
    >
      {/* Index + caption block, set like an archive slip */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink/70">
          ({pad(active + 1)})
        </p>
        <div className="mt-6 font-mono text-[0.62rem] leading-[1.7] tracking-[0.16em] text-ink/70 uppercase">
          {CATEGORY_SECTION.caption.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <h2 id="categories-heading" className="sr-only">
          Explore the Fanaar collection
        </h2>
      </div>

      {/* Filmstrip */}
      <div
        ref={viewportRef}
        role="group"
        aria-label="Fabric collection"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mt-10 w-full overflow-hidden py-24 focus:outline-none md:mt-14 md:py-28"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-2.5 will-change-transform sm:gap-3"
          style={{
            transform: `translateX(${trackOffset}px)`,
            opacity: m ? 1 : 0,
            transition: `transform ${GLIDE}, opacity 500ms ease`,
          }}
        >
          {CATEGORIES.map((category, i) => {
            const isActive = i === active;
            const shift = i < active ? -delta : i > active ? delta : 0;
            return (
              <button
                key={category.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${category.name} — view collection`}
                aria-current={isActive ? "true" : undefined}
                tabIndex={-1}
                style={{
                  transform: `translateX(${shift}px) scale(${isActive ? SCALE : 1})`,
                  zIndex: isActive ? 10 : 1,
                  transition: `transform ${GLIDE}, opacity ${GLIDE}`,
                  // Viewport-relative so the strip overflows both edges on any
                  // screen, rather than floating in the middle.
                  width: "max(96px, 13vw)",
                }}
                className={`relative aspect-[3/4] shrink-0 overflow-hidden bg-ink/5 will-change-transform focus-visible:outline-none ${
                  isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
                }`}
              >
                <Image
                  src={category.image!}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 768px) 280px, 220px"
                  priority={i < 4}
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer slip — mirrors the header, with the active name */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-6 md:px-10">
        <div>
          <h3 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            {current.name}
          </h3>
          <p className="mt-2 text-sm text-ink/55">{current.descriptor}</p>
        </div>

        <div className="flex items-center gap-6 font-mono text-[0.62rem] uppercase tracking-[0.2em]">
          <button
            type="button"
            onClick={() => setActive((i) => clamp(i - 1))}
            disabled={active === 0}
            aria-label="Previous"
            className="text-ink/60 transition-colors duration-300 ease-lux hover:text-ink disabled:opacity-25"
          >
            [ ← ]
          </button>
          <Link
            href={CATEGORY_SECTION.ctaHref}
            className="text-ink transition-colors duration-300 ease-lux hover:text-clay"
          >
            {CATEGORY_SECTION.cta}
          </Link>
          <button
            type="button"
            onClick={() => setActive((i) => clamp(i + 1))}
            disabled={active === CATEGORIES.length - 1}
            aria-label="Next"
            className="text-ink/60 transition-colors duration-300 ease-lux hover:text-ink disabled:opacity-25"
          >
            [ → ]
          </button>
        </div>
      </div>
    </section>
  );
}
