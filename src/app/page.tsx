import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { MatchCard } from "@/components/dashboard/match-card";
import { FundingProgressCard } from "@/components/dashboard/funding-progress-card";
import { ReadinessRing } from "@/components/dashboard/readiness-ring";
import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PillarMotif } from "@/components/marketing/pillar-motif";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { INVESTORS, STARTUPS, getMatchesForInvestor, getInvestorBySlug } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/utils/format";

const HEADLINE_WORDS = APP.tagline.split(" ");

const ORBITAL = STARTUPS.find((s) => s.slug === "orbital-health")!;
const AMARA = getInvestorBySlug("kestrel-ventures")!;
const AMARA_MATCH = getMatchesForInvestor(AMARA).find((m) => m.startupSlug === "orbital-health")!;

const totalRaised = STARTUPS.reduce((sum, s) => sum + s.amountRaised, 0);

const STATS = [
  { value: formatNumber(STARTUPS.length), label: "startups raising right now" },
  { value: formatNumber(INVESTORS.length), label: "active investors & funds" },
  { value: formatCurrency(totalRaised, { compact: true }), label: "raised through Conditor" },
] as const;

const CAPABILITIES = [
  "See exactly why an investor is a good match, in plain English",
  "Message investors directly — no cold email, no gatekeeping",
  "Track your \"Ready for investors\" score and fix what's weak",
  "Join rooms where founders share what's actually working",
  "Get an AI helper that reviews your pitch and drafts outreach",
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />

      <main id="main" className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative overflow-hidden">
          <PillarMotif className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full text-primary opacity-[0.35] sm:opacity-50" />

          <Container
            width="content"
            className="flex flex-col items-center gap-8 py-28 text-center sm:py-36"
          >
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-subtle px-3 py-1 text-xs font-medium text-primary-subtle-foreground">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                Now in preview
              </span>
            </FadeIn>

            <h1 className="max-w-3xl text-display-lg font-bold text-balance sm:text-display-2xl">
              {HEADLINE_WORDS.map((word, index) => (
                <FadeIn key={word + index} delay={0.1 + index * 0.04} className="mr-[0.28em] inline-block">
                  {word}
                </FadeIn>
              ))}
            </h1>

            <FadeIn delay={0.4}>
              <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
                {APP.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.5} className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href={ROUTES.signUp}>
                  Get started
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={ROUTES.signIn}>Sign in</Link>
              </Button>
            </FadeIn>
          </Container>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Chapter 01 — matching                                            */}
        {/* ---------------------------------------------------------------- */}
        <Container width="content" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn from="left" whileInView className="flex flex-col gap-5">
              <span className="tabular text-sm font-semibold text-primary">01</span>
              <h2 className="text-display-sm font-bold text-balance">
                You&apos;ll know exactly who wants to talk to you.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
                No cold outreach, no guessing. Every match comes with a plain-English
                reason — the same industry, the same stage, the amount they usually
                invest.
              </p>
            </FadeIn>

            <FadeIn from="right" whileInView delay={0.1} className="mx-auto w-full max-w-sm">
              <div className="rounded-3xl border bg-gradient-to-b from-card to-surface-muted p-6 shadow-lg">
                <MatchCard
                  href={ROUTES.signUp}
                  avatar={<PersonaAvatar name={AMARA.name} hue={AMARA.hue} />}
                  name={AMARA.name}
                  subtitle={AMARA.firm}
                  score={AMARA_MATCH.score}
                  reasons={AMARA_MATCH.reasons}
                />
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* ---------------------------------------------------------------- */}
        {/* Chapter 02 — messaging                                           */}
        {/* ---------------------------------------------------------------- */}
        <Container width="content" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn from="left" whileInView delay={0.1} className="order-2 mx-auto w-full max-w-sm lg:order-1">
              <div className="flex flex-col gap-3 rounded-3xl border bg-gradient-to-b from-card to-surface-muted p-6 shadow-lg">
                <div className="flex items-start gap-2.5">
                  <PersonaAvatar name="Priya Nandakumar" hue={ORBITAL.hue} size="sm" />
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm">
                    Hi Amara — we just crossed $5.2M raised and I&apos;d love 15 minutes
                    to show you what we&apos;re building.
                  </div>
                </div>
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
                    Sounds great — I&apos;m free Thursday at 2pm.
                  </div>
                  <PersonaAvatar name={AMARA.name} hue={AMARA.hue} size="sm" />
                </div>
              </div>
            </FadeIn>

            <FadeIn from="right" whileInView className="order-1 flex flex-col gap-5 lg:order-2">
              <span className="tabular text-sm font-semibold text-primary">02</span>
              <h2 className="text-display-sm font-bold text-balance">
                Message them yourself. No middlemen.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
                When you&apos;re both interested, just start talking. Draft your first
                message yourself, or let our AI helper write one for you.
              </p>
            </FadeIn>
          </div>
        </Container>

        {/* ---------------------------------------------------------------- */}
        {/* Chapter 03 — readiness                                           */}
        {/* ---------------------------------------------------------------- */}
        <Container width="content" className="py-20 sm:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn from="left" whileInView className="flex flex-col gap-5">
              <span className="tabular text-sm font-semibold text-primary">03</span>
              <h2 className="text-display-sm font-bold text-balance">
                Watch yourself get ready, in real time.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
                One simple score shows you exactly what to fix — your profile, your
                pitch, your growth numbers — before you ever get on a call.
              </p>
            </FadeIn>

            <FadeIn from="right" whileInView delay={0.1} className="mx-auto flex w-full max-w-sm flex-col gap-4">
              <div className="flex items-center gap-4 rounded-3xl border bg-gradient-to-b from-card to-surface-muted p-6 shadow-lg">
                <ReadinessRing score={ORBITAL.investmentReadiness} />
                <div>
                  <p className="font-semibold">Ready for investors</p>
                  <p className="text-sm text-muted-foreground">
                    Investors can see your full story.
                  </p>
                </div>
              </div>
              <FundingProgressCard
                goal={ORBITAL.fundingGoal}
                raised={ORBITAL.amountRaised}
                interestedInvestors={ORBITAL.interestedInvestors}
                meetingsScheduled={ORBITAL.meetingsScheduled}
                dueDiligenceActive={ORBITAL.dueDiligenceActive}
                className="shadow-lg"
              />
            </FadeIn>
          </div>
        </Container>

        {/* ---------------------------------------------------------------- */}
        {/* Stats                                                            */}
        {/* ---------------------------------------------------------------- */}
        <div className="border-y bg-surface-muted">
          <Container width="content" className="py-16 sm:py-20">
            <Stagger whileInView className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
              {STATS.map((stat) => (
                <StaggerItem key={stat.label} className="flex flex-col items-center gap-1 text-center">
                  <p className="tabular text-display-md font-bold sm:text-display-lg">{stat.value}</p>
                  <p className="max-w-[20ch] text-sm text-muted-foreground">{stat.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Quote                                                            */}
        {/* ---------------------------------------------------------------- */}
        <Container width="narrow" className="py-20 text-center sm:py-28">
          <FadeIn whileInView className="flex flex-col items-center gap-6">
            <p className="text-display-xs leading-snug font-semibold text-balance sm:text-display-sm">
              &ldquo;I stopped guessing who to email. Every meeting I took, I already
              knew why it made sense.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <PersonaAvatar name="Priya Nandakumar" hue={ORBITAL.hue} />
              <div className="text-left">
                <p className="text-sm font-medium">Priya Nandakumar</p>
                <p className="text-sm text-muted-foreground">CEO, Orbital Health</p>
              </div>
            </div>
          </FadeIn>
        </Container>

        {/* ---------------------------------------------------------------- */}
        {/* Everything you need                                              */}
        {/* ---------------------------------------------------------------- */}
        <Container width="narrow" className="pb-20 sm:pb-28">
          <Stagger whileInView className="flex flex-col gap-3">
            {CAPABILITIES.map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <p className="text-sm text-pretty">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>

        {/* ---------------------------------------------------------------- */}
        {/* Final CTA                                                        */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative overflow-hidden bg-aurora">
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid"
            aria-hidden="true"
          />
          <Container
            width="content"
            className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-32"
          >
            <FadeIn whileInView className="flex flex-col items-center gap-6">
              <h2 className="max-w-2xl text-display-md font-bold text-balance text-white sm:text-display-lg">
                Ready to find each other?
              </h2>
              <p className="max-w-md text-base text-pretty text-white/70">
                Set up your profile in a couple of minutes. Your matches are waiting.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href={ROUTES.signUp}>
                  Get started
                  <ArrowRightIcon />
                </Link>
              </Button>
            </FadeIn>
          </Container>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
