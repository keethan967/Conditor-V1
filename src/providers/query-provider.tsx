"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { getQueryClient } from "@/lib/query/client";
import { isDevelopment } from "@/lib/env";

/**
 * Devtools are loaded dynamically and only in development, so they contribute
 * nothing to the production bundle. `ssr: false` because they touch `window`.
 */
const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then((mod) => ({
      default: mod.ReactQueryDevtools,
    })),
  { ssr: false },
);

export function QueryProvider({ children }: { children: ReactNode }) {
  /**
   * Called during render rather than held in `useState`. `getQueryClient()`
   * already returns a per-request instance on the server and a stable
   * singleton in the browser, so an extra layer of state would add nothing
   * except a chance to get the Suspense-boundary semantics wrong.
   */
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
