"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect` because
 * that pattern renders one frame with the wrong value before the effect
 * corrects it — visible as a layout flash on every mount. `useSyncExternalStore`
 * reads the value during render and gives React an explicit server snapshot,
 * so SSR output is deterministic.
 *
 * The server snapshot is `false`: markup is rendered mobile-first and corrects
 * on hydration. Never branch on this for content that must exist in the SSR
 * payload for SEO — use CSS for that.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Breakpoints mirror Tailwind's defaults. Kept as a named map so a component
 * never hard-codes `"(min-width: 768px)"` and drifts from the CSS.
 */
export const BREAKPOINTS = {
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
  xl: "(min-width: 80rem)",
} as const;

/** True below the `md` breakpoint — the point at which the shell switches to a drawer. */
export function useIsMobile(): boolean {
  return !useMediaQuery(BREAKPOINTS.md);
}

/**
 * Honours the OS "reduce motion" setting. Animation components consult this
 * and render statically rather than merely shortening the duration.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
