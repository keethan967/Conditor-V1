import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/lib/env";
import { isAuthOnlyPath, isProtectedPath, ROUTES } from "@/constants/routes";
import {
  DEMO_SESSION_COOKIE,
  parseDemoSessionCookie,
} from "@/lib/session/demo-session";
import type { Database } from "@/types/database";

/**
 * Refreshes the Supabase session and enforces route access on every request.
 * Called from `src/proxy.ts` (the convention Next.js 16 renamed from
 * `middleware`), and kept separate from it so this logic can be tested with a
 * plain request object.
 *
 * Two things are load-bearing here and easy to break:
 *
 * 1. The response object must be created BEFORE the Supabase client and
 *    mutated in place. Returning a freshly constructed `NextResponse` later
 *    discards the refreshed auth cookies, and users get logged out at random
 *    intervals — an intermittent bug that is miserable to diagnose.
 *
 * 2. `getUser()` (not `getSession()`) must be called. It revalidates the JWT
 *    against the auth server; `getSession()` trusts the cookie as-is, so a
 *    forged cookie would sail past this check.
 *
 * This is a first line of defence for UX, not the security boundary. Row Level
 * Security in Postgres is the boundary — middleware only decides which page a
 * request is allowed to *render*.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          response = NextResponse.next({ request });

          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  /**
   * A failure here means the auth service is unreachable, not that the request
   * is anonymous — but the two must be handled identically. Treating an error
   * as "signed out" fails closed: protected routes still redirect to sign-in,
   * while public marketing pages keep serving.
   *
   * Without this guard a Supabase outage returns 500 for every route on the
   * site, including the ones that need no authentication at all.
   */
  let user = null;

  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("[proxy] Auth lookup failed; treating request as anonymous.", error);
  }

  const { pathname, search } = request.nextUrl;

  /**
   * TEMPORARY: no Supabase project is configured yet (see `.env.local`), so
   * `user` above is always `null`. The demo session cookie — set by the
   * sign-in/sign-up flow in `features/auth` — stands in for a real session so
   * the product can be reviewed end to end. Delete this block once real
   * Supabase auth is wired up; everything else in this file already assumes
   * that world.
   */
  const hasDemoSession =
    parseDemoSessionCookie(request.cookies.get(DEMO_SESSION_COOKIE)?.value) !== null;

  if (!user && !hasDemoSession && isProtectedPath(pathname)) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = ROUTES.signIn;
    signInUrl.search = "";
    // Preserve the destination so sign-in can return the user to where they
    // were headed rather than dumping everyone on the dashboard.
    signInUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(signInUrl);
  }

  if ((user || hasDemoSession) && isAuthOnlyPath(pathname)) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = ROUTES.dashboard;
    dashboardUrl.search = "";

    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}
