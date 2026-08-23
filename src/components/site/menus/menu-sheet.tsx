"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * The shared drop sheet every navbar panel lives in.
 *
 * All panels are mounted at once and stacked absolutely at the foot of the
 * header, so moving from one nav item to the next crossfades between them
 * with nothing but opacity and a two-pixel lift — no mount, no reflow, no
 * measuring. A closed sheet ignores the pointer entirely, which is what keeps
 * the trigger area the width of its nav label and nothing more.
 */
export default function MenuSheet({
  open,
  tone,
  rail,
  className = "",
  children,
}: {
  open: boolean;
  /** Background wash — lets the Journal tint itself per category. */
  tone?: string;
  /** Optional edge-to-edge element above the padded content. */
  rail?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = tone ? { backgroundColor: tone } : {};

  return (
    <div
      aria-hidden={!open}
      style={style}
      className={`absolute inset-x-0 top-0 border-b border-ink/10 shadow-[0_28px_60px_-34px_rgba(27,24,21,0.4)] transition-[opacity,transform,background-color] duration-[460ms] ease-lux motion-reduce:transition-none ${
        tone ? "" : "bg-ivory"
      } ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      } ${className}`}
    >
      {rail}
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-9">{children}</div>
    </div>
  );
}
