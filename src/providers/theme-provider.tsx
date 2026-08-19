"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper over `next-themes` so theme configuration lives in one place
 * rather than being spread across `layout.tsx` props.
 *
 * `disableTransitionOnChange` is not cosmetic: without it, every element with a
 * colour transition animates simultaneously when the theme flips, producing a
 * visible smear across the whole page.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
