import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ROUTES } from "@/constants/routes";
import { getDemoSession } from "@/lib/session/server";

import { AppShell } from "./_components/app-shell";

/**
 * Shared shell for every authenticated route.
 *
 * `proxy.ts` already redirects unauthenticated requests before they reach
 * here (see `lib/session/demo-session.ts` for why a demo cookie stands in
 * for a real Supabase session today). The `onboardingComplete` check below
 * has nowhere else to live: it depends on parsed session content, not just
 * the cookie's presence, and it must exclude `/onboarding` itself or every
 * incomplete session would redirect-loop against its own destination.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getDemoSession();

  if (!session) {
    redirect(ROUTES.signIn);
  }

  if (!session.onboardingComplete) {
    redirect(ROUTES.onboarding);
  }

  return <AppShell>{children}</AppShell>;
}
