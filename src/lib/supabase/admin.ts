import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { env, serverEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Service-role client. BYPASSES ROW LEVEL SECURITY ENTIRELY.
 *
 * The `server-only` import above turns any client-component import of this
 * module into a build error, which is the only reliable guard against the
 * service key reaching a browser bundle.
 *
 * Legitimate uses are narrow — admin tooling, webhook handlers, background
 * jobs, and cross-tenant aggregates that cannot be expressed in RLS. If you
 * are reaching for this to fix a "row not found", the fix is the policy, not
 * the client.
 *
 * @throws if `SUPABASE_SERVICE_ROLE_KEY` is not configured.
 */
export function createAdminClient() {
  const serviceRoleKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. It is required for privileged " +
        "server operations and must never be exposed to the client.",
    );
  }

  return createSupabaseClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, {
    auth: {
      // No session to persist or refresh — this client is not a user.
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
