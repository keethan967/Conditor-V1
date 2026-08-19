import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarIcon, GlobeIcon } from "lucide-react";

import { CompanyMark } from "@/components/entity/company-mark";
import { ProfileActionBar } from "@/components/entity/profile-action-bar";
import { IndustryBadge } from "@/components/entity/taxonomy-badges";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Separator } from "@/components/ui/separator";
import { getAcceleratorBySlug } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/utils/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const accelerator = getAcceleratorBySlug(slug);

  if (!accelerator) return { title: "Program not found" };

  return { title: accelerator.name, description: accelerator.description };
}

export default async function AcceleratorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const accelerator = getAcceleratorBySlug(slug);
  if (!accelerator) notFound();

  return (
    <Container width="content" className="flex flex-col gap-8 py-8">
      <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <CompanyMark name={accelerator.name} hue={accelerator.hue} size="lg" />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-display-xs font-bold">{accelerator.name}</h1>
            <p className="max-w-xl text-sm text-pretty text-muted-foreground">
              {accelerator.description}
            </p>
            <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <CalendarIcon className="size-3.5" aria-hidden="true" />
              Founded {accelerator.founded} · {accelerator.regions.join(", ")}
            </p>
          </div>
        </div>
        <ProfileActionBar />
      </FadeIn>

      <div className="flex flex-wrap items-center gap-2">
        {accelerator.industries.map((industry) => (
          <IndustryBadge key={industry} industry={industry} />
        ))}
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard
          label="Startups graduated"
          value={String(accelerator.companiesGraduated)}
          description="Startups that finished this program."
          icon={GlobeIcon}
        />
        <StatCard
          label="Total money raised"
          value={formatCurrency(accelerator.totalFundingRaised)}
          description="How much their startups have raised in total."
        />
        <StatCard
          label="Active programs"
          value={String(accelerator.programs.length)}
          description="Programs currently accepting startups."
        />
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Programs</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {accelerator.programs.map((program) => (
            <div key={program.id} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{program.name}</p>
                <Badge variant={program.status === "open" ? "default" : "secondary"} className="capitalize">
                  {program.status}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <p>How long: {program.duration}</p>
                <p>Group size: {program.cohortSize} startups</p>
                <p>The deal: {program.equity}</p>
                <p>Applications close: {formatDate(program.applicationDeadline)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
