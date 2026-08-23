"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export type MenuKey = "fabrics" | "threads" | "journal" | "about" | "contact" | "feedback";

/**
 * Which navbar drop panel is open, if any.
 *
 * Closing is delayed slightly so the pointer can travel from the trigger into
 * the panel without it flickering shut; moving straight from one trigger to
 * the next swaps panels instantly rather than closing and reopening. Escape
 * and a route change both close it.
 */
export function useHoverMenu(closeDelay = 160) {
  // The open panel is stamped with the route it was opened on, so navigating
  // closes it by derivation rather than by a setState in an effect.
  const [opened, setOpened] = useState<{ key: MenuKey; path: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const active = opened && opened.path === pathname ? opened.key : null;

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const show = useCallback(
    (key: MenuKey) => {
      clear();
      setOpened({ key, path: pathname });
    },
    [pathname]
  );

  const hide = useCallback(() => {
    clear();
    timer.current = setTimeout(() => setOpened(null), closeDelay);
  }, [closeDelay]);

  /** Keeps the panel open while the pointer is inside it. */
  const hold = useCallback(() => clear(), []);

  const close = useCallback(() => {
    clear();
    setOpened(null);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close]);

  useEffect(() => clear, []);

  return { active, show, hide, hold, close };
}
