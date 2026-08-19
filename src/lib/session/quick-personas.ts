import { ACCELERATORS } from "@/lib/mock-data/accelerators";
import { INVESTORS } from "@/lib/mock-data/investors";
import { STARTUPS } from "@/lib/mock-data/startups";

import type { DemoSession } from "./demo-session";

/**
 * One-click "sign in" personas for the sign-in page. Each links straight to a
 * fully fleshed-out fixture entity, so a reviewer lands on a dashboard with
 * real-looking depth instead of an empty freshly-onboarded account.
 */

const founderEntity = STARTUPS[0]!;
const investorEntity = INVESTORS[0]!;
const acceleratorEntity = ACCELERATORS[0]!;

export const QUICK_DEMO_PERSONAS: Record<
  "founder" | "investor" | "accelerator",
  DemoSession
> = {
  founder: {
    accountType: "founder",
    fullName: founderEntity.founders[0]?.name ?? "Priya Nandakumar",
    email: "priya@orbitalhealth.io",
    onboardingComplete: true,
    createdAt: new Date().toISOString(),
    founder: {
      startupName: founderEntity.name,
      industry: founderEntity.industry,
      country: founderEntity.country,
      fundingStage: founderEntity.stage,
      website: founderEntity.website,
      teamSize: founderEntity.teamSize,
      fundingGoal: founderEntity.fundingGoal,
      traction: founderEntity.traction[0]?.value ?? "",
      linkedSlug: founderEntity.slug,
    },
  },
  investor: {
    accountType: investorEntity.type,
    fullName: investorEntity.name,
    email: `${investorEntity.name.split(" ")[0]?.toLowerCase()}@${investorEntity.firm.toLowerCase().replace(/\s+/g, "")}.com`,
    onboardingComplete: true,
    createdAt: new Date().toISOString(),
    investor: {
      industries: investorEntity.industries,
      countries: [investorEntity.country],
      stages: investorEntity.stages,
      avgCheque: investorEntity.avgCheque,
      portfolioSize: String(investorEntity.portfolioCount),
      interests: investorEntity.bio,
      linkedSlug: investorEntity.slug,
    },
  },
  accelerator: {
    accountType: "accelerator",
    fullName: "Jordan Blake",
    email: "jordan@ignitionlabs.com",
    onboardingComplete: true,
    createdAt: new Date().toISOString(),
    program: {
      programName: acceleratorEntity.name,
      industries: acceleratorEntity.industries,
      regions: acceleratorEntity.regions,
      focusAreas: acceleratorEntity.description,
      linkedSlug: acceleratorEntity.slug,
    },
  },
};
