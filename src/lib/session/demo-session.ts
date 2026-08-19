import type {
  AccountType,
  FundingStage,
  Industry,
  TeamSize,
} from "@/constants/taxonomy";

/**
 * Demo/mock authentication layer.
 *
 * Conditor's real auth (`lib/supabase/session.ts`) is fully wired but has no
 * live project behind it yet — every `getUser()` call resolves to `null` and
 * every protected route redirects to sign-in. This module provides a
 * parallel, cookie-based "session" so the product can be explored end to end
 * before a real backend exists. `proxy.ts` treats its presence as
 * authentication alongside (not instead of) the real Supabase check.
 *
 * Deliberately framework-agnostic — no `document`, no `next/headers` — so
 * the exact same parsing logic runs in the Edge middleware, Server
 * Components and the browser. `session/client.ts` and `session/server.ts`
 * supply the environment-specific read/write.
 */

export const DEMO_SESSION_COOKIE = "conditor_demo_session";
export const DEMO_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface FounderOnboarding {
  startupName: string;
  industry: Industry;
  country: string;
  fundingStage: FundingStage;
  website: string;
  teamSize: TeamSize;
  fundingGoal: number;
  traction: string;
  /** Set only by the one-click demo personas — links the session to a full fixture entity. */
  linkedSlug?: string;
}

export interface InvestorOnboarding {
  industries: Industry[];
  countries: string[];
  stages: FundingStage[];
  avgCheque: string;
  portfolioSize: string;
  interests: string;
  linkedSlug?: string;
}

export interface ProgramOnboarding {
  programName: string;
  industries: Industry[];
  regions: string[];
  focusAreas: string;
  linkedSlug?: string;
}

export interface DemoSession {
  accountType: AccountType;
  fullName: string;
  email: string;
  onboardingComplete: boolean;
  createdAt: string;
  founder?: FounderOnboarding;
  investor?: InvestorOnboarding;
  program?: ProgramOnboarding;
}

export function serializeDemoSession(session: DemoSession): string {
  return encodeURIComponent(JSON.stringify(session));
}

export function parseDemoSessionCookie(
  raw: string | undefined | null,
): DemoSession | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "accountType" in parsed &&
      "fullName" in parsed
    ) {
      return parsed as DemoSession;
    }

    return null;
  } catch {
    return null;
  }
}

/** Deterministic 32-bit hash — same input always produces the same seed. */
export function hashSeed(input: string): number {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (Math.imul(31, hash) + input.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

/** Mulberry32 PRNG — small, fast, and stable across renders for a given seed. */
export function seededRandom(seed: number): () => number {
  let state = seed;

  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic integer in `[min, max]`, derived from a string seed. */
export function seededInt(seed: string, min: number, max: number): number {
  const random = seededRandom(hashSeed(seed));
  return Math.floor(random() * (max - min + 1)) + min;
}
