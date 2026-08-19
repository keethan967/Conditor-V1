import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheckIcon, ClockIcon, MapPinIcon, StarIcon } from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { ProfileActionBar } from "@/components/entity/profile-action-bar";
import { IndustryBadge, StageBadge } from "@/components/entity/taxonomy-badges";
import { CompanyMark } from "@/components/entity/company-mark";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Separator } from "@/components/ui/separator";
import { ACCOUNT_TYPES, labelFor } from "@/constants/taxonomy";
import { dynamicRoutes } from "@/constants/routes";
import { getInvestorBySlug, getStartupBySlug } from "@/lib/mock-data";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const investor = getInvestorBySlug(slug);

  if (!investor) return { title: "Investor not found" };

  return { title: investor.name, description: investor.bio };
}

export default async function InvestorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const investor = getInvestorBySlug(slug);
  if (!investor) notFound();

  return (
    <Container width="content" className="flex flex-col gap-8 py-8">
      <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <PersonaAvatar name={investor.name} hue={investor.hue} size="lg" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-display-xs font-bold">{investor.name}</h1>
              {investor.verified && (
                <BadgeCheckIcon
                  className="size-5 text-primary"
                  aria-label="Verified investor"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {investor.title} · {investor.firm}
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="size-3.5" aria-hidden="true" />
                {investor.city
                  ? `${investor.city}, ${investor.country}`
                  : investor.country}
              </span>
              {investor.rating > 0 && (
                <span className="inline-flex items-center gap-1">
                  <StarIcon
                    className="size-3.5 fill-current text-warning"
                    aria-hidden="true"
                  />
                  {investor.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>
        <ProfileActionBar />
      </FadeIn>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {labelFor(ACCOUNT_TYPES, investor.type)}
        </span>
        {investor.industries.map((industry) => (
          <IndustryBadge key={industry} industry={industry} />
        ))}
        {investor.stages.map((stage) => (
          <StageBadge key={stage} stage={stage} />
        ))}
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {investor.bio}
            </p>
          </section>

          {investor.portfolioSlugs.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Startups they&apos;ve invested in</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {investor.portfolioSlugs.map((portfolioSlug) => {
                  const startup = getStartupBySlug(portfolioSlug);
                  if (!startup) return null;

                  return (
                    <Link
                      key={portfolioSlug}
                      href={dynamicRoutes.startup(portfolioSlug)}
                      className="flex lift items-center gap-3 rounded-xl border bg-card p-4"
                    >
                      <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{startup.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {startup.tagline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {investor.founderFeedback.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Founder feedback</h2>
              <div className="flex flex-col gap-3">
                {investor.founderFeedback.map((feedback) => (
                  <blockquote
                    key={feedback.quote}
                    className="rounded-xl border-l-2 border-primary bg-card p-4 text-sm text-muted-foreground italic"
                  >
                    &ldquo;{feedback.quote}&rdquo;
                    <footer className="mt-2 text-xs font-medium text-foreground not-italic">
                      — {feedback.author}, {feedback.startup}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <SectionCard title="How this investor works">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Startups backed"
                value={String(investor.portfolioCount)}
                description="How many startups they've invested in already."
              />
              <StatCard
                label="Usual amount"
                value={investor.avgCheque}
                description="How much they typically invest in one startup."
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
              <ClockIcon className="size-4 text-muted-foreground" aria-hidden="true" />
              Responds in {investor.avgResponseTime}
            </div>
          </SectionCard>
        </div>
      </div>
    </Container>
  );
}
