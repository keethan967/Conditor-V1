import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Supabase client for Server Components, Route Handlers and Server Actions.
 *
 * Reads the session from request cookies and writes refreshed tokens back.
 * Still user-scoped — RLS applies exactly as it does in the browser.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components cannot mutate cookies. This is expected and
            // safe to swallow: `middleware.ts` refreshes the session on every
            // request, so the tokens are already current by the time rendering
            // starts. Swallowing here only skips a redundant write.
          }
        },
      },
    },
  );
}

/**
 * The authenticated user, or `null`.
 *
 * Always `getUser()`, never `getSession()`, on the server: `getSession()` reads
 * the cookie without contacting Supabase, so a forged cookie would be trusted.
 * `getUser()` revalidates the JWT with the auth server.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
