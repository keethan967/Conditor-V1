import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/session";

/**
 * Runs before every matched request.
 *
 * Next.js 16 renamed this convention from `middleware` to `proxy`; the
 * behaviour is unchanged. The session logic itself lives in
 * `lib/supabase/session.ts` so it stays unit-testable without a request
 * lifecycle around it.
 */
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  /**
   * Runs on every request except static assets and image files.
   *
   * The exclusions matter for cost and latency: this handler performs an auth
   * round-trip, and running it for every icon and font would add tens of
   * milliseconds to page load for no benefit. Anything that can return a
   * rendered page must stay covered — including `/api` routes, which need the
   * same session refresh.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf)$).*)",
  ],
};
