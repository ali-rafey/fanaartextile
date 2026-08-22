"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hover state for a navbar drop panel. Closing is delayed slightly so the
 * pointer can travel from the trigger into the panel without it flickering
 * shut, and the panel closes on Escape or when the route changes.
 */
export function useHoverMenu(closeDelay = 160) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const show = useCallback(() => {
    clear();
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay]);

  const close = useCallback(() => {
    clear();
    setOpen(false);
  }, []);

  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => clear, []);

  return { open, show, hide, close };
}
