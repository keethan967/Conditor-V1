"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterXIcon, SearchIcon } from "lucide-react";

import { ChipToggle } from "@/components/forms/chip-toggle";
import { CompanyMark } from "@/components/entity/company-mark";
import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ACCOUNT_TYPES,
  FUNDING_STAGES,
  INDUSTRIES,
  REVENUE_BANDS,
  TEAM_SIZES,
  labelFor,
  type FundingStage,
  type Industry,
  type RevenueBand,
  type TeamSize,
} from "@/constants/taxonomy";
import { REGIONS, type Region } from "@/constants/regions";
import { dynamicRoutes } from "@/constants/routes";
import { ACCELERATORS, INVESTORS, STARTUPS } from "@/lib/mock-data";

import { ResultCard } from "./result-card";

type EntityType = "startups" | "investors" | "accelerators";

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item)
    ? list.filter((existing) => existing !== item)
    : [...list, item];
}

export function SearchView() {
  const searchParams = useSearchParams();

  const [entityType, setEntityType] = useState<EntityType>("startups");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [stages, setStages] = useState<FundingStage[]>([]);
  const [teamSizes, setTeamSizes] = useState<TeamSize[]>([]);
  const [revenueBands, setRevenueBands] = useState<RevenueBand[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const hasActiveFilters =
    industries.length > 0 ||
    stages.length > 0 ||
    teamSizes.length > 0 ||
    revenueBands.length > 0 ||
    regions.length > 0;

  function clearFilters() {
    setIndustries([]);
    setStages([]);
    setTeamSizes([]);
    setRevenueBands([]);
    setRegions([]);
  }

  const filteredStartups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STARTUPS.filter((startup) => {
      if (
        q &&
        !`${startup.name} ${startup.tagline} ${startup.tags.join(" ")}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (industries.length && !industries.includes(startup.industry)) return false;
      if (stages.length && !stages.includes(startup.stage)) return false;
      if (teamSizes.length && !teamSizes.includes(startup.teamSize)) return false;
      if (revenueBands.length && !revenueBands.includes(startup.revenueBand))
        return false;
      return true;
    });
  }, [query, industries, stages, teamSizes, revenueBands]);

  const filteredInvestors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INVESTORS.filter((investor) => {
      if (
        q &&
        !`${investor.name} ${investor.firm} ${investor.bio}`.toLowerCase().includes(q)
      )
        return false;
      if (
        industries.length &&
        !industries.some((industry) => investor.industries.includes(industry))
      )
        return false;
      if (stages.length && !stages.some((stage) => investor.stages.includes(stage)))
        return false;
      return true;
    });
  }, [query, industries, stages]);

  const filteredAccelerators = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACCELERATORS.filter((accelerator) => {
      if (
        q &&
        !`${accelerator.name} ${accelerator.description}`.toLowerCase().includes(q)
      )
        return false;
      if (
        industries.length &&
        !industries.some((industry) => accelerator.industries.includes(industry))
      )
        return false;
      if (
        regions.length &&
        !regions.some((region) => accelerator.regions.includes(region))
      )
        return false;
      return true;
    });
  }, [query, industries, regions]);

  const resultCount =
    entityType === "startups"
      ? filteredStartups.length
      : entityType === "investors"
        ? filteredInvestors.length
        : filteredAccelerators.length;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Filters</p>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1 text-xs"
            >
              <FilterXIcon className="size-3.5" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Industry
          </p>
          <div className="flex flex-wrap gap-1.5">
            {INDUSTRIES.map((industry) => (
              <ChipToggle
                key={industry.value}
                size="sm"
                label={industry.label}
                selected={industries.includes(industry.value)}
                onClick={() =>
                  setIndustries((current) => toggle(current, industry.value))
                }
              />
            ))}
          </div>
        </div>

        {entityType !== "accelerators" && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Funding stage
            </p>
            <div className="flex flex-wrap gap-1.5">
              {FUNDING_STAGES.map((stage) => (
                <ChipToggle
                  key={stage.value}
                  size="sm"
                  label={stage.label}
                  selected={stages.includes(stage.value)}
                  onClick={() => setStages((current) => toggle(current, stage.value))}
                />
              ))}
            </div>
          </div>
        )}

        {entityType === "startups" && (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Employees
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TEAM_SIZES.map((size) => (
                  <ChipToggle
                    key={size.value}
                    size="sm"
                    label={size.label}
                    selected={teamSizes.includes(size.value)}
                    onClick={() =>
                      setTeamSizes((current) => toggle(current, size.value))
                    }
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Revenue
              </p>
              <div className="flex flex-wrap gap-1.5">
                {REVENUE_BANDS.map((band) => (
                  <ChipToggle
                    key={band.value}
                    size="sm"
                    label={band.label}
                    selected={revenueBands.includes(band.value)}
                    onClick={() =>
                      setRevenueBands((current) => toggle(current, band.value))
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {entityType === "accelerators" && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Region
            </p>
            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map((region) => (
                <ChipToggle
                  key={region}
                  size="sm"
                  label={region}
                  selected={regions.includes(region)}
                  onClick={() => setRegions((current) => toggle(current, region))}
                />
              ))}
            </div>
          </div>
        )}
      </aside>

      <div className="flex flex-col gap-5">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, tag or keyword…"
            className="h-10 pl-9"
          />
        </div>

        <div className="flex items-center justify-between">
          <Tabs
            value={entityType}
            onValueChange={(value) => setEntityType(value as EntityType)}
          >
            <TabsList>
              <TabsTrigger value="startups">Startups</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
              <TabsTrigger value="accelerators">Accelerators</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm text-muted-foreground">{resultCount} results</p>
        </div>

        {resultCount === 0 && (
          <EmptyState
            icon={SearchIcon}
            title="No results"
            description="Try removing a filter or searching a different term."
          />
        )}

        {entityType === "startups" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredStartups.map((startup) => (
              <ResultCard
                key={startup.slug}
                href={dynamicRoutes.startup(startup.slug)}
                avatar={<CompanyMark name={startup.name} hue={startup.hue} size="sm" />}
                title={startup.name}
                subtitle={startup.tagline}
                badges={
                  <>
                    <Badge variant="outline">
                      {labelFor(INDUSTRIES, startup.industry)}
                    </Badge>
                    <Badge variant="secondary">
                      {labelFor(FUNDING_STAGES, startup.stage)}
                    </Badge>
                  </>
                }
                meta={`${startup.city ? `${startup.city}, ` : ""}${startup.country}`}
              />
            ))}
          </div>
        )}

        {entityType === "investors" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredInvestors.map((investor) => (
              <ResultCard
                key={investor.slug}
                href={dynamicRoutes.investor(investor.slug)}
                avatar={
                  <PersonaAvatar name={investor.name} hue={investor.hue} size="sm" />
                }
                title={investor.name}
                subtitle={`${investor.firm} · ${labelFor(ACCOUNT_TYPES, investor.type)}`}
                badges={investor.industries.slice(0, 3).map((industry) => (
                  <Badge key={industry} variant="outline">
                    {labelFor(INDUSTRIES, industry)}
                  </Badge>
                ))}
                meta={`Usually invests ${investor.avgCheque}`}
              />
            ))}
          </div>
        )}

        {entityType === "accelerators" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAccelerators.map((accelerator) => (
              <ResultCard
                key={accelerator.slug}
                href={dynamicRoutes.accelerator(accelerator.slug)}
                avatar={
                  <CompanyMark
                    name={accelerator.name}
                    hue={accelerator.hue}
                    size="sm"
                  />
                }
                title={accelerator.name}
                subtitle={accelerator.description}
                badges={accelerator.industries.slice(0, 3).map((industry) => (
                  <Badge key={industry} variant="outline">
                    {labelFor(INDUSTRIES, industry)}
                  </Badge>
                ))}
                meta={accelerator.regions.join(", ")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
