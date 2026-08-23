"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Extra transition delay in ms, for staggering siblings. */
  delay?: number;
  className?: string;
  /** Merged with the delay — lets a caller place the block itself. */
  style?: React.CSSProperties;
};

/**
 * Fades content up as it scrolls into view. Server-renders fully visible so
 * the page works without JS. After hydration the observer's first callback
 * hides the block only if it is still off-screen, then reveals it when it
 * enters the viewport; reduced-motion users skip the effect entirely.
 */
export default function Reveal({ children, delay = 0, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        } else {
          // Off-screen on first check — arm the reveal animation.
          setHidden(true);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-[900ms] ease-lux ${
        hidden ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
