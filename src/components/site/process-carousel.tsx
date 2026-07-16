"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ProcessStep } from "@/content/process";
import ProcessPlaceholder from "./process-placeholder";

const AUTOPLAY_MS = 7000;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

/**
 * Cinematic carousel for the four process steps: a light stage where slides
 * push in with a ken-burns settle and staggered copy. Auto-advances while on
 * screen (progress shown in the step rail), pauses on hover, and hands over
 * control permanently once the visitor navigates — arrows, step rail, swipe
 * and ←/→ keys all work. Reduced-motion users get no autoplay or movement.
 */
export default function ProcessCarousel({ steps }: { steps: ProcessStep[] }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const count = steps.length;
  const total = String(count).padStart(2, "0");
  const playing = auto && inView && !hovered && !reducedMotion;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setAuto(false); // the visitor took over — stop auto-advancing
    },
    [count]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [playing, index, count]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="The Fanaar process"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1));
      }}
      className="relative overflow-hidden rounded-[2rem] bg-white text-ink shadow-xl shadow-ink/5 ring-1 ring-ink/5 outline-none focus-visible:ring-2 focus-visible:ring-clay"
    >
      {/* Slides — stacked in one grid cell so the panel sizes to the tallest */}
      <div className="grid" aria-live="polite">
        {steps.map((step, i) => {
          const active = i === index;
          // Staggered entrance for the text block once the slide is active.
          const childClass = `transition-all duration-700 ease-out motion-reduce:transition-none ${
            active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`;
          const childDelay = (order: number) => ({
            transitionDelay: active ? `${200 + order * 100}ms` : "0ms",
          });
          return (
            <article
              key={step.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count} — ${step.title}`}
              aria-hidden={!active}
              className={`col-start-1 row-start-1 grid transition-all duration-700 ease-out motion-reduce:transition-none lg:grid-cols-[1.1fr_1fr] ${
                active
                  ? "z-10 translate-x-0 opacity-100"
                  : `pointer-events-none opacity-0 ${i < index ? "-translate-x-10" : "translate-x-10"}`
              }`}
            >
              {/* Visual side */}
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-auto lg:min-h-[480px]">
                <div
                  className={`absolute inset-0 transition-transform duration-[1600ms] ease-out motion-reduce:transition-none ${
                    active ? "scale-100" : "scale-[1.07]"
                  }`}
                >
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <ProcessPlaceholder id={step.id} tone="light" />
                  )}
                </div>
                {/* blend the visual into the light stage */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent lg:hidden" />
                <div className="absolute inset-y-0 right-0 hidden w-44 bg-gradient-to-r from-transparent to-white lg:block" />
              </div>

              {/* Text side */}
              <div className="relative px-7 pt-8 pb-12 sm:px-10 lg:flex lg:flex-col lg:justify-center lg:px-14 lg:py-16">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-5 font-display text-[8rem] leading-none text-ink/[0.04] select-none lg:top-4 lg:text-[11rem]"
                >
                  {step.step}
                </span>

                <div className="relative z-10">
                  <p
                    className={`text-xs tracking-[0.3em] text-clay uppercase ${childClass}`}
                    style={childDelay(0)}
                  >
                    Step {step.step} / {total}
                  </p>
                  <h3
                    className={`mt-4 font-display text-3xl text-ink md:text-4xl ${childClass}`}
                    style={childDelay(1)}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-md leading-relaxed text-stone-600 ${childClass}`}
                    style={childDelay(2)}
                  >
                    {step.description}
                  </p>
                  <ul className={`mt-6 space-y-2.5 ${childClass}`} style={childDelay(3)}>
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-sm text-stone-700"
                      >
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-clay" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Control bar */}
      <div className="relative z-20 flex flex-col gap-6 border-t border-ink/10 px-7 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-14">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous step"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-clay hover:text-clay focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next step"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-clay hover:text-clay focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Step rail */}
        <div className="flex items-end gap-5 sm:gap-6">
          {steps.map((step, i) => {
            const active = i === index;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to step ${step.step}: ${step.title}`}
                aria-current={active ? "true" : undefined}
                className="group/step flex flex-col items-start gap-2 focus-visible:ring-2 focus-visible:ring-clay focus-visible:outline-none"
              >
                <span
                  className={`text-[10px] tracking-[0.2em] whitespace-nowrap uppercase transition-colors ${
                    active ? "text-clay" : "text-stone-400 group-hover/step:text-stone-600"
                  }`}
                >
                  <span className="font-display">{step.step}</span>
                  <span className="ml-2 hidden xl:inline">{step.title}</span>
                </span>
                <span className="relative block h-px w-12 overflow-hidden bg-ink/10 sm:w-16">
                  {active && (
                    <span
                      key={`${index}-${playing ? "play" : "hold"}`}
                      className="absolute inset-0 origin-left bg-clay"
                      style={
                        playing
                          ? { animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards` }
                          : { transform: "scaleX(1)" }
                      }
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
