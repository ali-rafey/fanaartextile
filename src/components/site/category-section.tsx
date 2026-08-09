"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORIES, CATEGORY_SECTION } from "@/content/categories";
import Reveal from "./reveal";

const pad = (n: number) => String(n).padStart(2, "0");

// Long, soft easing shared by the track glide and every still's transform, so
// the whole strip moves as one unhurried gesture.
const GLIDE = "900ms cubic-bezier(0.22, 1, 0.36, 1)";
// How much larger the featured still is than the rest.
const SCALE = 1.9;

/**
 * Homepage collection — an editorial filmstrip. All stills share one base size
 * and sit in a row; the active one is enlarged and the rest bleed off both
 * edges. Everything animates on **transforms only** — the active still scales
 * up, its neighbours slide outward by exactly the overflow so the gaps stay
 * even, and the track translates to re-centre. No width/layout animation, so it
 * stays glass-smooth on the GPU. Sizes are measured at rest (they never change,
 * only transform), so the maths can't catch a half-animated box.
 */
export default function CategorySection() {
  const [active, setActive] = useState(1);
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

  // Half the width the active still gains — how far each neighbour slides out so
  // the spacing stays exactly `gap` on both sides of the feature.
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
      className="scroll-mt-16 overflow-hidden bg-ivory pt-8 pb-20 md:pt-12 md:pb-28"
    >
      {/* Micro-type header row */}
      <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/50">
        <span>{CATEGORY_SECTION.eyebrow}</span>
        <span className="hidden sm:inline">{CATEGORY_SECTION.caption}</span>
      </div>

      {/* Filmstrip */}
      <div
        ref={viewportRef}
        role="group"
        aria-label="Fabric collections"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative w-full overflow-hidden py-28 focus:outline-none md:py-32"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-4 will-change-transform sm:gap-6"
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
                aria-label={`${category.name} collection`}
                aria-current={isActive ? "true" : undefined}
                tabIndex={-1}
                style={{
                  transform: `translateX(${shift}px) scale(${isActive ? SCALE : 1})`,
                  transformOrigin: "center",
                  zIndex: isActive ? 10 : 1,
                  transition: `transform ${GLIDE}, opacity ${GLIDE}`,
                }}
                className={`relative aspect-[3/4] w-36 shrink-0 overflow-hidden bg-ink/5 will-change-transform focus-visible:outline-none sm:w-40 md:w-44 ${
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-95"
                }`}
              >
                <Image
                  src={category.image!}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 768px) 340px, 280px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Active caption */}
      <Reveal className="mx-auto mt-6 max-w-xl px-6 text-center md:mt-10">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-clay">
          ({pad(active + 1)}) <span className="text-ink/35">/ {pad(CATEGORIES.length)}</span>
        </p>
        <h2
          id="categories-heading"
          className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl"
        >
          {current.name}
        </h2>
        <p className="mt-3 leading-relaxed text-stone-600">{current.descriptor}</p>

        <div className="mt-8 flex items-center justify-center gap-6 font-mono text-[0.7rem] uppercase tracking-[0.2em]">
          <button
            type="button"
            onClick={() => setActive((i) => clamp(i - 1))}
            disabled={active === 0}
            aria-label="Previous collection"
            className="text-ink/60 transition-colors duration-300 ease-lux hover:text-ink disabled:opacity-30 disabled:hover:text-ink/60"
          >
            [ ← ]
          </button>
          <Link
            href={current.href}
            className="text-ink underline-offset-4 transition-colors duration-300 ease-lux hover:text-clay hover:underline"
          >
            View collection
          </Link>
          <button
            type="button"
            onClick={() => setActive((i) => clamp(i + 1))}
            disabled={active === CATEGORIES.length - 1}
            aria-label="Next collection"
            className="text-ink/60 transition-colors duration-300 ease-lux hover:text-ink disabled:opacity-30 disabled:hover:text-ink/60"
          >
            [ → ]
          </button>
        </div>
      </Reveal>
    </section>
  );
}
