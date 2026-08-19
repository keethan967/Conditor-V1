import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { getDemoSession } from "@/lib/session/server";

import { OnboardingFlow } from "./_components/onboarding-flow";

export const metadata: Metadata = {
  title: "Set up your account",
  description: "Tell us about you so Conditor can personalize your workspace.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  const session = await getDemoSession();

  if (!session) {
    redirect(ROUTES.signUp);
  }

  if (session.onboardingComplete) {
    redirect(ROUTES.dashboard);
  }

  return <OnboardingFlow />;
}
