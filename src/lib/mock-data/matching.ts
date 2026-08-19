import { FUNDING_STAGES, INDUSTRIES, labelFor } from "@/constants/taxonomy";

import { INVESTORS } from "./investors";
import { STARTUPS } from "./startups";
import type { Investor, Startup, InvestorMatch } from "./types";

export interface StartupMatch {
  startupSlug: string;
  score: number;
  reasons: InvestorMatch["reasons"];
}

/**
 * Deterministic match scoring between a startup and the investor roster.
 *
 * Not a real recommendation engine — a readable stand-in that produces
 * consistent, explainable scores so the "why this match" UI has real
 * reasons to render instead of a hard-coded percentage.
 */
export function getMatchesForStartup(startup: Startup): InvestorMatch[] {
  return INVESTORS.map((investor) => {
    const industryMatch = investor.industries.includes(startup.industry);
    const stageMatch = investor.stages.includes(startup.stage);
    const regionMatch =
      investor.country === startup.country ||
      (investor.type === "government" && startup.stage !== "growth");

    let score = 48;
    if (industryMatch) score += 22;
    if (stageMatch) score += 18;
    if (regionMatch) score += 7;
    if (investor.verified) score += 3;
    score = Math.min(score, 99);

    return {
      investorSlug: investor.slug,
      score,
      reasons: [
        { label: `Invests in ${labelFor(INDUSTRIES, startup.industry)}`, met: industryMatch },
        {
          label: `Backs ${labelFor(FUNDING_STAGES, startup.stage)}-stage startups`,
          met: stageMatch,
        },
        {
          label: "Usually invests the amount you're raising",
          met: true,
        },
        { label: `Based in or near ${startup.country}`, met: regionMatch },
      ],
    };
  }).sort((a, b) => b.score - a.score);
}

/** Inverse of `getMatchesForStartup` — scores the startup roster against one investor's stated preferences. */
export function getMatchesForInvestor(investor: Investor): StartupMatch[] {
  return STARTUPS.map((startup) => {
    const industryMatch = investor.industries.includes(startup.industry);
    const stageMatch = investor.stages.includes(startup.stage);
    const regionMatch = investor.country === startup.country;

    let score = 48;
    if (industryMatch) score += 22;
    if (stageMatch) score += 18;
    if (regionMatch) score += 7;
    score = Math.min(score, 99);

    return {
      startupSlug: startup.slug,
      score,
      reasons: [
        {
          label: `${labelFor(INDUSTRIES, startup.industry)} matches what you invest in`,
          met: industryMatch,
        },
        {
          label: `${labelFor(FUNDING_STAGES, startup.stage)} matches the stage you invest at`,
          met: stageMatch,
        },
        { label: `Based in ${startup.country}`, met: regionMatch },
      ],
    };
  }).sort((a, b) => b.score - a.score);
}
