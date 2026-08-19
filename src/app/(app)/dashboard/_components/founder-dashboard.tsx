import Link from "next/link";
import { EyeIcon, FileTextIcon, HeartIcon, SparklesIcon, UsersIcon } from "lucide-react";

import { ReadinessRing } from "@/components/dashboard/readiness-ring";
import { FundingProgressCard } from "@/components/dashboard/funding-progress-card";
import { MatchCard } from "@/components/dashboard/match-card";
import { ConversationPreview } from "@/components/dashboard/conversation-preview";
import { PostPreview } from "@/components/dashboard/post-preview";
import { RoomPreview } from "@/components/dashboard/room-preview";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { TaskChecklist, type ChecklistItem } from "@/components/dashboard/task-checklist";
import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import {
  CONVERSATIONS,
  FEED_POSTS,
  MOCK_NOW,
  ROOMS,
  getInvestorBySlug,
  getMatchesForStartup,
} from "@/lib/mock-data";
import type { DemoSession } from "@/lib/session/demo-session";
import { resolveFounderStartup } from "@/lib/session/persona-data";

export function FounderDashboard({ session }: { session: DemoSession }) {
  const startup = resolveFounderStartup(session);
  const matches = getMatchesForStartup(startup).slice(0, 3);
  const recentPosts = FEED_POSTS.slice(0, 4);
  const rooms = ROOMS.slice(0, 3);
  const conversations = CONVERSATIONS.slice(0, 3);

  const checklist: ChecklistItem[] = [
    { label: "Finish your startup profile", done: startup.description.length > 0 },
    { label: "Add your funding goal", done: startup.fundingGoal > 0 },
    { label: "Add a website", done: !!startup.website },
    { label: "Write a short pitch for investors", done: startup.pitch.investorSummary.length > 20 },
    { label: "Add your growth numbers", done: startup.traction.length > 0 },
  ];

  return (
    <Container className="flex flex-col gap-6 py-8">
      <PageHeader
        title={`Welcome back, ${session.fullName.split(" ")[0]}`}
        description={`Here's how ${startup.name} is doing this week.`}
        action={
          <Button asChild variant="outline">
            <Link href={dynamicRoutes.startup(startup.slug)}>View public profile</Link>
          </Button>
        }
      />

      <FadeIn className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex items-center gap-5 rounded-xl border bg-card p-5 lg:col-span-1">
          <ReadinessRing score={startup.investmentReadiness} />
          <div>
            <p className="text-sm font-semibold">Ready for investors</p>
            <p className="text-xs text-muted-foreground">
              {startup.investmentReadiness >= 75
                ? "Great! Investors can see your full story."
                : startup.investmentReadiness >= 50
                  ? "Good progress — just a little more to add."
                  : "Just starting — finish your profile to improve this."}
            </p>
          </div>
        </div>

        <FundingProgressCard
          goal={startup.fundingGoal}
          raised={startup.amountRaised}
          interestedInvestors={startup.interestedInvestors}
          meetingsScheduled={startup.meetingsScheduled}
          dueDiligenceActive={startup.dueDiligenceActive}
          className="lg:col-span-2"
        />
      </FadeIn>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Profile views"
          value={startup.analytics.profileViews.toLocaleString()}
          description="How many people looked at your startup."
          icon={EyeIcon}
          delta={startup.analytics.weeklyGrowth}
          trend={startup.analytics.weeklyViews}
        />
        <StatCard
          label="Pitch opens"
          value={startup.analytics.deckOpens.toLocaleString()}
          description="How many times investors opened your pitch."
          icon={FileTextIcon}
        />
        <StatCard
          label="Investor saves"
          value={startup.analytics.investorSaves.toLocaleString()}
          description="How many investors added you to their list."
          icon={HeartIcon}
        />
        <StatCard
          label="Messages"
          value={startup.analytics.messagesReceived.toLocaleString()}
          description="People who contacted you."
          icon={UsersIcon}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard
          title="Investor matches"
          description="People who are most likely to invest in your startup."
          action={{ label: "View all", href: ROUTES.discover }}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {matches.map((match) => {
              const investor = getInvestorBySlug(match.investorSlug);
              if (!investor) return null;

              return (
                <MatchCard
                  key={match.investorSlug}
                  avatar={<PersonaAvatar name={investor.name} hue={investor.hue} size="sm" />}
                  name={investor.name}
                  subtitle={investor.firm}
                  score={match.score}
                  reasons={match.reasons}
                  href={dynamicRoutes.investor(investor.slug)}
                />
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Get ready for investors" description="What investors look at first.">
          <TaskChecklist items={checklist} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard
          title="Founder updates"
          description="The latest news from founders you follow."
          action={{ label: "Open feed", href: ROUTES.discover }}
        >
          <div className="flex flex-col gap-1">
            {recentPosts.map((post) => (
              <PostPreview key={post.id} post={post} now={MOCK_NOW} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Messages"
          description="Your conversations with investors."
          action={{ label: "Open inbox", href: ROUTES.messages }}
        >
          <div className="flex flex-col gap-1">
            {conversations.map((conversation) => (
              <ConversationPreview key={conversation.id} conversation={conversation} now={MOCK_NOW} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Founder Rooms"
          description="Groups of founders chatting about topics like AI and fundraising."
          action={{ label: "Browse rooms", href: ROUTES.rooms }}
        >
          <div className="flex flex-col gap-2.5">
            {rooms.map((room) => (
              <RoomPreview key={room.slug} room={room} />
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
          <p className="text-sm font-medium">Ask Conditor Copilot to improve your profile</p>
          <p className="text-xs opacity-80">Get tips based on how ready you are for investors.</p>
        </div>
      </Link>
    </Container>
  );
}
