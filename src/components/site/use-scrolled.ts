"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * True once the reader has moved past `threshold` px.
 *
 * useSyncExternalStore rather than an effect: the snapshot is read during
 * render, so the bar is never briefly wrong on mount and there is no
 * setState-in-effect for the compiler to object to. The server snapshot is
 * false, which matches the top of a freshly loaded page.
 */
export function useScrolled(threshold = 24) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
}
