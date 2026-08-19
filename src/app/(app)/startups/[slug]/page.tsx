import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarIcon, GlobeIcon, MapPinIcon, UsersIcon } from "lucide-react";

import { CompanyMark } from "@/components/entity/company-mark";
import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { ProfileActionBar } from "@/components/entity/profile-action-bar";
import { IndustryBadge, StageBadge } from "@/components/entity/taxonomy-badges";
import { FundingProgressCard } from "@/components/dashboard/funding-progress-card";
import { MatchCard } from "@/components/dashboard/match-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Separator } from "@/components/ui/separator";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import {
  MOCK_NOW,
  getInvestorBySlug,
  getMatchesForStartup,
  getPostsByStartup,
  getStartupBySlug,
} from "@/lib/mock-data";
import { ensureProtocol, formatUrlForDisplay } from "@/utils/string";
import { formatRelativeTime } from "@/utils/format";
import { getDemoSession } from "@/lib/session/server";
import { resolveFounderStartup } from "@/lib/session/persona-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);

  if (!startup) return { title: "Startup not found" };

  return {
    title: startup.name,
    description: startup.tagline,
  };
}

export default async function StartupProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);
  if (!startup) notFound();

  const session = await getDemoSession();
  const isOwner =
    !!session &&
    session.accountType === "founder" &&
    (() => {
      try {
        return resolveFounderStartup(session).slug === startup.slug;
      } catch {
        return false;
      }
    })();

  const matches = getMatchesForStartup(startup).slice(0, 3);
  const posts = getPostsByStartup(startup.slug);

  return (
    <div className="flex flex-1 flex-col">
      <div
        className="h-40 w-full sm:h-52"
        style={{
          backgroundImage: `linear-gradient(135deg, oklch(0.62 0.16 ${startup.hue}) 0%, oklch(0.48 0.18 ${startup.hue + 40}) 100%)`,
        }}
        aria-hidden="true"
      />

      <Container className="flex flex-col gap-8 py-8">
        <FadeIn className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <CompanyMark
              name={startup.name}
              hue={startup.hue}
              size="xl"
              className="ring-4 ring-background"
            />
            <div className="flex flex-col gap-1.5 pb-1">
              <h1 className="text-display-xs font-bold">{startup.name}</h1>
              <p className="text-sm text-muted-foreground">{startup.tagline}</p>
            </div>
          </div>
          <ProfileActionBar />
        </FadeIn>

        <div className="flex flex-wrap items-center gap-2">
          <IndustryBadge industry={startup.industry} />
          <StageBadge stage={startup.stage} />
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5" aria-hidden="true" />
            {startup.city ? `${startup.city}, ${startup.country}` : startup.country}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <UsersIcon className="size-3.5" aria-hidden="true" />
            {startup.employees} employees
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <CalendarIcon className="size-3.5" aria-hidden="true" />
            Founded {startup.foundedYear}
          </span>
          {startup.website && (
            <a
              href={ensureProtocol(startup.website) ?? "#"}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <GlobeIcon className="size-3.5" aria-hidden="true" />
              {formatUrlForDisplay(startup.website)}
            </a>
          )}
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {startup.description}
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">The pitch</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "Problem", value: startup.pitch.problem },
                  { label: "Solution", value: startup.pitch.solution },
                  { label: "Mission", value: startup.pitch.mission },
                  { label: "Vision", value: startup.pitch.vision },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border bg-card p-4">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-pretty">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border bg-primary-subtle p-4">
                <p className="text-xs font-medium tracking-wide text-primary-subtle-foreground uppercase">
                  Investor summary
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty text-primary-subtle-foreground">
                  {startup.pitch.investorSummary}
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Growth</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {startup.traction.map((metric) => (
                  <div key={metric.label} className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="tabular mt-1 text-lg font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Team</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {startup.founders.map((founder) => (
                  <div
                    key={founder.name}
                    className="flex items-center gap-3 rounded-xl border bg-card p-4"
                  >
                    <PersonaAvatar name={founder.name} hue={startup.hue} />
                    <div>
                      <p className="text-sm font-medium">{founder.name}</p>
                      <p className="text-xs text-muted-foreground">{founder.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {posts.length > 0 && (
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Updates</h2>
                <div className="flex flex-col gap-3">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={ROUTES.discover}
                      className="lift rounded-xl border bg-card p-4"
                    >
                      <p className="text-sm font-medium">{post.headline}</p>
                      <p className="mt-1 line-clamp-2-safe text-sm text-muted-foreground">
                        {post.content}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {formatRelativeTime(post.createdAt, { now: MOCK_NOW })}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {isOwner && (
              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Your progress</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <StatCard
                    label="Profile views"
                    value={String(startup.analytics.profileViews)}
                    description="How many people looked at your startup."
                  />
                  <StatCard
                    label="Pitch opens"
                    value={String(startup.analytics.deckOpens)}
                    description="How many times investors opened your pitch."
                  />
                  <StatCard
                    label="Pitch downloads"
                    value={String(startup.analytics.deckDownloads)}
                    description="How many investors saved your pitch."
                  />
                  <StatCard
                    label="Investor saves"
                    value={String(startup.analytics.investorSaves)}
                    description="How many investors added you to their list."
                  />
                </div>
              </section>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <FundingProgressCard
              goal={startup.fundingGoal}
              raised={startup.amountRaised}
              interestedInvestors={startup.interestedInvestors}
              meetingsScheduled={startup.meetingsScheduled}
              dueDiligenceActive={startup.dueDiligenceActive}
            />

            <SectionCard
              title="Interested investors"
              description="People who are most likely to invest in your startup."
            >
              <div className="flex flex-col gap-3">
                {matches.map((match) => {
                  const investor = getInvestorBySlug(match.investorSlug);
                  if (!investor) return null;

                  return (
                    <MatchCard
                      key={match.investorSlug}
                      avatar={
                        <PersonaAvatar
                          name={investor.name}
                          hue={investor.hue}
                          size="sm"
                        />
                      }
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
          </div>
        </div>
      </Container>
    </div>
  );
}
