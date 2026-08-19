import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Supabase client for the browser (Client Components).
 *
 * `createBrowserClient` memoises internally, so calling this per render is
 * cheap and correct — do not hoist it into a module-level singleton, which
 * would leak one user's session across requests during SSR.
 *
 * Authenticated as the signed-in user: every query is subject to Row Level
 * Security. That is the intended trust boundary — never reach for the admin
 * client to "make a query work".
 */
export function createClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
