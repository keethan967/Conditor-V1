import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";

/**
 * Query client factory and request-scoped accessor.
 *
 * The distinction below is the single most important detail in TanStack Query's
 * SSR setup: on the server a NEW client must be created per request, or one
 * user's cached data can be served to another. In the browser the client is a
 * singleton, or every Suspense boundary would refetch on mount.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * Non-zero so a server-prefetched query is not immediately refetched
         * the moment it hydrates on the client — the most common cause of
         * "why does my page flash and fetch twice?".
         */
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        /**
         * Retrying a 401/403/404 is pointless — the answer will not change and
         * it triples the latency of every genuine error state.
         */
        retry: (failureCount, error) => {
          const status = (error as { status?: number })?.status;
          if (status && status >= 400 && status < 500) return false;
          return failureCount < 2;
        },
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      },
      mutations: {
        retry: false,
      },
      dehydrate: {
        // Lets pending queries stream from Server Components rather than
        // forcing the server to await them before sending any HTML.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
