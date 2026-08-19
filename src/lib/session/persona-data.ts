import { getAcceleratorBySlug } from "@/lib/mock-data/accelerators";
import { getInvestorBySlug } from "@/lib/mock-data/investors";
import { getStartupBySlug } from "@/lib/mock-data/startups";
import type { Accelerator, Investor, Startup } from "@/lib/mock-data/types";
import { labelFor, INDUSTRIES } from "@/constants/taxonomy";
import { slugify } from "@/utils/string";

import { seededInt, type DemoSession } from "./demo-session";

/**
 * Resolves "my company / my fund / my programme" for the current session to a
 * fully-populated fixture entity — the same shape every dashboard, profile
 * and analytics screen already knows how to render.
 *
 * The quick demo personas (`quick-personas.ts`) link straight to a curated
 * fixture via `linkedSlug`. A session that came through real onboarding has
 * no such link, so its numbers are synthesized deterministically from the
 * onboarding answers — stable across reloads, but honestly generated rather
 * than borrowed from another company.
 */

export function resolveFounderStartup(session: DemoSession): Startup {
  const founder = session.founder;

  if (founder?.linkedSlug) {
    const linked = getStartupBySlug(founder.linkedSlug);
    if (linked) return linked;
  }

  if (!founder) {
    throw new Error("resolveFounderStartup called without founder onboarding data");
  }

  const seed = `${session.email}:${founder.startupName}`;
  const industryLabel = labelFor(INDUSTRIES, founder.industry);
  const amountRaised = Math.round(
    founder.fundingGoal * (seededInt(`${seed}:raised`, 8, 45) / 100),
  );

  return {
    id: `persona_${slugify(founder.startupName || session.fullName)}`,
    slug: slugify(founder.startupName) || "my-startup",
    name: founder.startupName || "Your Startup",
    tagline: `Building the future of ${industryLabel.toLowerCase()}.`,
    description: `${founder.startupName || "This startup"} is an early-stage ${industryLabel.toLowerCase()} company based in ${founder.country || "the world"}.`,
    industry: founder.industry,
    stage: founder.fundingStage,
    country: founder.country || "—",
    city: "",
    foundedYear: new Date().getFullYear(),
    teamSize: founder.teamSize,
    employees: seededInt(`${seed}:employees`, 1, 40),
    revenueBand: "pre_revenue",
    website: founder.website,
    hue: seededInt(`${seed}:hue`, 0, 360),
    founders: [{ name: session.fullName, role: "Founder & CEO" }],
    fundingGoal: founder.fundingGoal,
    amountRaised,
    interestedInvestors: seededInt(`${seed}:investors`, 3, 16),
    meetingsScheduled: seededInt(`${seed}:meetings`, 0, 6),
    dueDiligenceActive: seededInt(`${seed}:dd`, 0, 2),
    investmentReadiness: seededInt(`${seed}:readiness`, 38, 74),
    pitch: {
      mission: `To bring ${industryLabel.toLowerCase()} to the people who need it most.`,
      vision: `A world where ${founder.startupName || "our product"} is the default choice in ${industryLabel.toLowerCase()}.`,
      elevatorPitch:
        founder.traction ||
        "We're early, moving fast, and heads-down on our first customers.",
      problem: `${industryLabel} buyers are underserved by incumbent solutions.`,
      solution: `${founder.startupName || "Our product"} solves this with a focused, fast-to-adopt approach.`,
      investorSummary:
        founder.traction ||
        "Pre-traction — building toward first meaningful milestones.",
    },
    traction: founder.traction
      ? [{ label: "Traction", value: founder.traction }]
      : [{ label: "Stage", value: "Early — building toward first milestones" }],
    tags: [industryLabel],
    analytics: {
      profileViews: seededInt(`${seed}:views`, 40, 600),
      deckOpens: seededInt(`${seed}:opens`, 5, 90),
      deckDownloads: seededInt(`${seed}:downloads`, 1, 25),
      meetingRequests: seededInt(`${seed}:requests`, 0, 10),
      messagesReceived: seededInt(`${seed}:messages`, 2, 30),
      investorSaves: seededInt(`${seed}:saves`, 3, 40),
      weeklyGrowth: seededInt(`${seed}:growth`, 4, 22) / 100,
      weeklyViews: Array.from({ length: 7 }, (_, index) =>
        seededInt(`${seed}:view:${index}`, 8 + index * 4, 20 + index * 8),
      ),
    },
  };
}

export function resolveInvestorProfile(session: DemoSession): Investor {
  const investor = session.investor;

  if (investor?.linkedSlug) {
    const linked = getInvestorBySlug(investor.linkedSlug);
    if (linked) return linked;
  }

  if (!investor) {
    throw new Error("resolveInvestorProfile called without investor onboarding data");
  }

  const seed = `${session.email}:${session.fullName}`;

  return {
    id: `persona_${slugify(session.fullName)}`,
    slug: slugify(session.fullName) || "my-profile",
    name: session.fullName,
    type: session.accountType,
    firm: "Independent",
    title: "Investor",
    bio: investor.interests || "Actively investing and building out a portfolio.",
    country: investor.countries[0] ?? "—",
    city: "",
    hue: seededInt(`${seed}:hue`, 0, 360),
    industries: investor.industries,
    stages: investor.stages,
    avgCheque: investor.avgCheque || "Not specified",
    portfolioCount: Number(investor.portfolioSize) || 0,
    avgResponseTime: "—",
    verified: false,
    rating: 0,
    founderFeedback: [],
    portfolioSlugs: [],
  };
}

export function resolveProgramProfile(session: DemoSession): Accelerator {
  const program = session.program;

  if (program?.linkedSlug) {
    const linked = getAcceleratorBySlug(program.linkedSlug);
    if (linked) return linked;
  }

  if (!program) {
    throw new Error("resolveProgramProfile called without programme onboarding data");
  }

  const seed = `${session.email}:${program.programName}`;

  return {
    id: `persona_${slugify(program.programName)}`,
    slug: slugify(program.programName) || "my-programme",
    name: program.programName || "Your Program",
    description: program.focusAreas || "A program that helps early-stage founders grow.",
    industries: program.industries,
    regions: program.regions,
    hue: seededInt(`${seed}:hue`, 0, 360),
    founded: new Date().getFullYear(),
    companiesGraduated: 0,
    totalFundingRaised: 0,
    programs: [
      {
        id: `${seed}:prog`,
        name: "Core Cohort",
        duration: "12 weeks",
        cohortSize: seededInt(`${seed}:cohort`, 8, 20),
        equity: "6% for $150K",
        applicationDeadline: "—",
        status: "open",
      },
    ],
  };
}
