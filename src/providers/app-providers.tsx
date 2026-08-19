"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DemoSessionProvider } from "@/providers/demo-session-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

/**
 * The single client boundary at the root of the application.
 *
 * Composing every provider here keeps `layout.tsx` a Server Component: only
 * this subtree ships to the browser, rather than the whole layout. Order is
 * outside-in — theme must wrap the toaster so notifications pick up the
 * current theme on first paint.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <DemoSessionProvider>
          <TooltipProvider delayDuration={200} skipDelayDuration={300}>
            {children}
            <Toaster position="bottom-right" closeButton richColors />
          </TooltipProvider>
        </DemoSessionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
