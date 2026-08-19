import type { Metadata } from "next";
import Link from "next/link";
import { InboxIcon, PlusIcon } from "lucide-react";

import { FormDemo } from "@/app/design-system/_components/form-demo";
import { Logo } from "@/components/brand/logo";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { CardGridSkeleton } from "@/components/feedback/loading-state";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FUNDING_STAGES, INDUSTRIES } from "@/constants/taxonomy";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDelta, formatNumber } from "@/utils/format";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "The tokens, primitives and states every Conditor surface is built from.",
  robots: { index: false, follow: false },
};

/* -------------------------------------------------------------------------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-14 rounded-lg border ${className}`} />
      <code className="font-mono text-xs text-muted-foreground">{name}</code>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const SURFACES = [
  { name: "background", className: "bg-background" },
  { name: "surface", className: "bg-surface" },
  { name: "surface-muted", className: "bg-surface-muted" },
  { name: "elevated", className: "bg-elevated shadow-md" },
  { name: "muted", className: "bg-muted" },
] as const;

const INTENTS = [
  { name: "primary", className: "bg-primary" },
  { name: "primary-subtle", className: "bg-primary-subtle" },
  { name: "success", className: "bg-success" },
  { name: "warning", className: "bg-warning" },
  { name: "info", className: "bg-info" },
  { name: "destructive", className: "bg-destructive" },
] as const;

const BRAND_RAMP = [
  "bg-brand-50",
  "bg-brand-100",
  "bg-brand-200",
  "bg-brand-300",
  "bg-brand-400",
  "bg-brand-500",
  "bg-brand-600",
  "bg-brand-700",
  "bg-brand-800",
  "bg-brand-900",
  "bg-brand-950",
] as const;

const TYPE_SCALE = [
  { className: "text-display-xl", label: "display-xl" },
  { className: "text-display-lg", label: "display-lg" },
  { className: "text-display-md", label: "display-md" },
  { className: "text-display-sm", label: "display-sm" },
  { className: "text-xl", label: "xl" },
  { className: "text-base", label: "base" },
  { className: "text-sm", label: "sm" },
  { className: "text-xs", label: "xs" },
] as const;

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

export default function DesignSystemPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <Container
          as="nav"
          className="flex h-(--spacing-header) items-center justify-between"
        >
          <Link href={ROUTES.home} className="rounded-md">
            <Logo />
          </Link>
          <ThemeToggle />
        </Container>
      </header>

      <main id="main" className="flex-1">
        <Container className="flex flex-col gap-14 py-12">
          <PageHeader
            title="Design system"
            description="Every token, primitive and state the product is assembled from. Toggle the theme — nothing here is hard-coded to a single mode."
            action={
              <Button size="lg">
                <PlusIcon />
                Primary action
              </Button>
            }
          />

          <Separator />

          <Section
            title="Surfaces"
            description="A three-step elevation model. Anything deeper than `elevated` is a modal, not a layer."
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {SURFACES.map((surface) => (
                <Swatch key={surface.name} {...surface} />
              ))}
            </div>
          </Section>

          <Section
            title="Intent"
            description="Semantic colour. Features reference these names, never a palette step."
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {INTENTS.map((intent) => (
                <Swatch key={intent.name} {...intent} />
              ))}
            </div>
          </Section>

          <Section
            title="Brand ramp"
            description="Deep Indigo, 50 through 950. Reserved for brand moments and data visualisation."
          >
            <div className="flex overflow-hidden rounded-lg border">
              {BRAND_RAMP.map((className) => (
                <div key={className} className={`h-14 flex-1 ${className}`} />
              ))}
            </div>
          </Section>

          <Section
            title="Typography"
            description="One family — Inter. Hierarchy comes from size, weight and tracking, not from a second typeface."
          >
            <div className="flex flex-col gap-5">
              {TYPE_SCALE.map(({ className, label }) => (
                <div key={label} className="flex items-baseline gap-6">
                  <code className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
                    {label}
                  </code>
                  <p className={`${className} truncate font-semibold`}>
                    Capital finds conviction
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Numerals"
            description="Figures use tabular lining so columns of amounts align. Compact notation keeps card layouts stable as values grow."
          >
            <div className="tabular grid gap-4 sm:grid-cols-3">
              {[
                { label: "Raised", value: formatCurrency(4_200_000) },
                { label: "Investors", value: formatNumber(1284) },
                { label: "Month over month", value: formatDelta(0.184) },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl border bg-card p-5">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-display-xs font-bold">{metric.value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Buttons"
            description="One primary action per screen. Everything else is secondary or quieter."
          >
            <div className="flex flex-wrap items-center gap-3">
              {BUTTON_VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} size="lg">
                  {variant}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {(["xs", "sm", "default", "lg"] as const).map((size) => (
                <Button key={size} size={size} variant="outline">
                  size: {size}
                </Button>
              ))}
            </div>
          </Section>

          <Section
            title="Badges"
            description="Taxonomy values render as badges throughout discovery and profiles."
          >
            <div className="flex flex-wrap gap-2">
              {FUNDING_STAGES.map((stage) => (
                <Badge key={stage.value} variant="secondary">
                  {stage.label}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.slice(0, 8).map((industry) => (
                <Badge key={industry.value} variant="outline">
                  {industry.label}
                </Badge>
              ))}
            </div>
          </Section>

          <Section
            title="Forms"
            description="Schema-driven. Labels, descriptions, ARIA wiring and error messaging are handled by the field component — blur a field to see validation."
          >
            <FormDemo />
          </Section>

          <Section
            title="States"
            description="Empty, error and loading are designed once and reused, so no screen ships with a bare 'No data'."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <EmptyState
                icon={InboxIcon}
                title="No saved startups yet"
                description="Bookmark a company from Discover and it will appear here for quick access."
                action={<Button variant="outline">Browse Discover</Button>}
              />
              <ErrorState />
            </div>
            <CardGridSkeleton count={3} />
          </Section>

          <Section
            title="Motion"
            description="150–250ms, quart-out easing, 8px of travel. Staggered entrances for lists. Fully suppressed when the OS requests reduced motion."
          >
            <Stagger className="grid gap-4 sm:grid-cols-3" whileInView>
              {[1, 2, 3].map((index) => (
                <StaggerItem key={index}>
                  <div className="lift rounded-xl border bg-card p-5">
                    <p className="font-medium">Card {index}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Hover to see the standard interactive lift.
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Section>
        </Container>
      </main>
    </div>
  );
}
