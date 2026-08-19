/**
 * Fixture entity shapes.
 *
 * These mirror the tables that will eventually exist in Postgres. Until the
 * schema lands, this file — together with the rest of `lib/mock-data/` — is
 * the product's only "database". Every feature service reads from here
 * instead of Supabase; swapping the two later touches services, not
 * components.
 */

import type {
  AccountType,
  FundingStage,
  Industry,
  RevenueBand,
  TeamSize,
} from "@/constants/taxonomy";

export interface TractionMetric {
  label: string;
  value: string;
}

export interface StartupAnalytics {
  profileViews: number;
  deckOpens: number;
  deckDownloads: number;
  meetingRequests: number;
  messagesReceived: number;
  investorSaves: number;
  weeklyGrowth: number;
  weeklyViews: number[];
}

export interface StartupPitch {
  mission: string;
  vision: string;
  elevatorPitch: string;
  problem: string;
  solution: string;
  investorSummary: string;
}

export interface FounderProfile {
  name: string;
  role: string;
}

export interface Startup {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  industry: Industry;
  stage: FundingStage;
  country: string;
  city: string;
  foundedYear: number;
  teamSize: TeamSize;
  employees: number;
  revenueBand: RevenueBand;
  website: string;
  hue: number;
  founders: FounderProfile[];
  fundingGoal: number;
  amountRaised: number;
  interestedInvestors: number;
  meetingsScheduled: number;
  dueDiligenceActive: number;
  investmentReadiness: number;
  pitch: StartupPitch;
  traction: TractionMetric[];
  tags: string[];
  analytics: StartupAnalytics;
}

export interface Investor {
  id: string;
  slug: string;
  name: string;
  type: AccountType;
  firm: string;
  title: string;
  bio: string;
  country: string;
  city: string;
  hue: number;
  industries: Industry[];
  stages: FundingStage[];
  avgCheque: string;
  portfolioCount: number;
  avgResponseTime: string;
  verified: boolean;
  rating: number;
  founderFeedback: { quote: string; author: string; startup: string }[];
  portfolioSlugs: string[];
}

export interface AcceleratorProgram {
  id: string;
  name: string;
  duration: string;
  cohortSize: number;
  equity: string;
  applicationDeadline: string;
  status: "open" | "closed" | "upcoming";
}

export interface Accelerator {
  id: string;
  slug: string;
  name: string;
  description: string;
  industries: Industry[];
  regions: string[];
  hue: number;
  founded: number;
  companiesGraduated: number;
  totalFundingRaised: number;
  programs: AcceleratorProgram[];
}

export type PostType =
  "launch" | "milestone" | "hiring" | "funding" | "award" | "update";

export interface PostComment {
  id: string;
  authorName: string;
  authorHue: number;
  content: string;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  startupSlug: string;
  type: PostType;
  headline: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  comments: PostComment[];
  metric?: { label: string; value: string };
}

export interface RoomPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorHue: number;
  content: string;
  createdAt: string;
  replies: number;
  reactions: number;
  pinned: boolean;
}

export interface Room {
  slug: string;
  name: string;
  description: string;
  memberCount: number;
  postsToday: number;
  posts: RoomPost[];
}

export interface Message {
  id: string;
  senderId: "me" | string;
  content: string;
  createdAt: string;
  read: boolean;
  attachment?: { name: string; size: string };
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  participantHue: number;
  online: boolean;
  typing: boolean;
  lastMessageAt: string;
  unreadCount: number;
  pinned: boolean;
  messages: Message[];
}

export type NotificationType =
  "message" | "match" | "view" | "save" | "meeting" | "milestone" | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  actorName: string;
  actorHue: number;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface MatchReason {
  label: string;
  met: boolean;
}

export interface InvestorMatch {
  investorSlug: string;
  score: number;
  reasons: MatchReason[];
}

export interface Application {
  id: string;
  startupName: string;
  founderName: string;
  industry: Industry;
  stage: FundingStage;
  submittedAt: string;
  status: "pending" | "reviewing" | "interview" | "accepted" | "rejected";
  fitScore: number;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  hue: number;
  sessionsThisMonth: number;
}

export interface CohortCompany {
  name: string;
  industry: Industry;
  hue: number;
  progress: number;
}

export interface Cohort {
  id: string;
  name: string;
  programName: string;
  startDate: string;
  companies: CohortCompany[];
}

export type DealStage =
  "sourced" | "screening" | "meeting" | "diligence" | "term_sheet" | "closed";

export interface DealFlowItem {
  startupSlug: string;
  stage: DealStage;
  addedAt: string;
  nextStep: string;
}

export interface PortfolioItem {
  startupSlug: string;
  investedAt: string;
  amountInvested: number;
  ownershipPercent: number;
  currentValuation: number;
  status: "active" | "exited" | "written_off";
  moic: number;
}

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface CopilotSuggestion {
  id: string;
  label: string;
  prompt: string;
  icon: "search" | "sparkles" | "file" | "mail" | "book" | "trending";
}
