import Link from "next/link";
import { BriefcaseIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";

import { CompanyMark } from "@/components/entity/company-mark";
import { ConversationPreview } from "@/components/dashboard/conversation-preview";
import { MatchCard } from "@/components/dashboard/match-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { INDUSTRIES, labelFor, type Industry } from "@/constants/taxonomy";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import {
  CONVERSATIONS,
  DEAL_FLOW,
  MOCK_NOW,
  PORTFOLIO,
  STARTUPS,
  getMatchesForInvestor,
  getStartupBySlug,
} from "@/lib/mock-data";
import type { DemoSession } from "@/lib/session/demo-session";
import { resolveInvestorProfile } from "@/lib/session/persona-data";
import { formatCurrency } from "@/utils/format";

const DEAL_STAGE_LABELS: Record<string, string> = {
  sourced: "New",
  screening: "First Look",
  meeting: "Meeting",
  diligence: "Startup Review",
  term_sheet: "Offer Sent",
  closed: "Invested",
};

export function InvestorDashboard({ session }: { session: DemoSession }) {
  const investor = resolveInvestorProfile(session);
  const matches = getMatchesForInvestor(investor).slice(0, 3);
  const conversations = CONVERSATIONS.slice(0, 3);

  const totalInvested = PORTFOLIO.reduce((sum, item) => sum + item.amountInvested, 0);
  const totalValue = PORTFOLIO.reduce((sum, item) => sum + item.amountInvested * item.moic, 0);
  const avgMoic = PORTFOLIO.length
    ? PORTFOLIO.reduce((sum, item) => sum + item.moic, 0) / PORTFOLIO.length
    : 0;

  const dealStageCounts = DEAL_FLOW.reduce<Record<string, number>>((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] ?? 0) + 1;
    return acc;
  }, {});

  const industryCounts = STARTUPS.reduce<Partial<Record<Industry, number>>>((acc, startup) => {
    acc[startup.industry] = (acc[startup.industry] ?? 0) + 1;
    return acc;
  }, {});
  const trendingIndustries = (Object.entries(industryCounts) as [Industry, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const maxIndustryCount = Math.max(...trendingIndustries.map(([, count]) => count), 1);

  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title={`Welcome back, ${session.fullName.split(" ")[0]}`}
        description="Here's what's happening with your investments."
        action={
          <Button asChild>
            <Link href={ROUTES.discover}>Browse startups</Link>
          </Button>
        }
      />

      <FadeIn className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Startups you've invested in"
          value={String(PORTFOLIO.length)}
          description="How many startups you've put money into."
          icon={BriefcaseIcon}
        />
        <StatCard
          label="Money invested"
          value={formatCurrency(totalInvested)}
          description="The total amount you've invested."
        />
        <StatCard
          label="Worth now"
          value={formatCurrency(totalValue)}
          description="What your investments are worth today."
          icon={TrendingUpIcon}
        />
        <StatCard
          label="Average return"
          value={`${avgMoic.toFixed(1)}x`}
          description="How much your money has grown, on average. 2x means it doubled."
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard
          title="Startups you might like"
          description="Matched to what you told us you're looking for."
          action={{ label: "View all", href: ROUTES.discover }}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {matches.map((match) => {
              const startup = getStartupBySlug(match.startupSlug);
              if (!startup) return null;

              return (
                <MatchCard
                  key={match.startupSlug}
                  avatar={<CompanyMark name={startup.name} hue={startup.hue} size="sm" />}
                  name={startup.name}
                  subtitle={startup.tagline}
                  score={match.score}
                  reasons={match.reasons}
                  href={dynamicRoutes.startup(startup.slug)}
                />
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Popular industries" description="Where most startups on Conditor are right now.">
          <div className="flex flex-col gap-3">
            {trendingIndustries.map(([industry, count]) => (
              <div key={industry} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{labelFor(INDUSTRIES, industry)}</span>
                  <span className="tabular text-muted-foreground">{count}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(count / maxIndustryCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard
          title="Investment opportunities"
          description="Startups you're considering, by stage."
          action={{ label: "Open", href: ROUTES.dealFlow }}
        >
          <div className="flex flex-col gap-2.5">
            {Object.entries(DEAL_STAGE_LABELS).map(([stage, label]) => (
              <div key={stage} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="tabular font-medium">{dealStageCounts[stage] ?? 0}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Your investments" description="Startups you've put money into.">
          <div className="flex flex-col gap-1">
            {PORTFOLIO.slice(0, 4).map((item) => {
              const startup = getStartupBySlug(item.startupSlug);
              if (!startup) return null;

              return (
                <Link
                  key={item.startupSlug}
                  href={dynamicRoutes.startup(startup.slug)}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                >
                  <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{startup.name}</p>
                    <p className="text-xs text-muted-foreground">{item.moic.toFixed(1)}x return</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          title="Messages"
          description="Your conversations with founders."
          action={{ label: "Open inbox", href: ROUTES.messages }}
        >
          <div className="flex flex-col gap-1">
            {conversations.map((conversation) => (
              <ConversationPreview key={conversation.id} conversation={conversation} now={MOCK_NOW} />
            ))}
          </div>
        </SectionCard>
      </div>

      <Link
        href={ROUTES.assistant}
        className="lift flex items-center gap-3 rounded-xl border bg-primary-subtle p-4 text-primary-subtle-foreground"
      >
        <SparklesIcon className="size-5 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Ask Conditor Copilot to summarize a startup</p>
          <p className="text-xs opacity-80">
            Get a fast read on growth, team and fit before your first call.
          </p>
        </div>
      </Link>
    </Container>
  );
}
