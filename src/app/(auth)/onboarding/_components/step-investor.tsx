"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FUNDING_STAGES,
  INDUSTRIES,
  type FundingStage,
  type Industry,
} from "@/constants/taxonomy";

import { ChipToggle } from "@/components/forms/chip-toggle";

export interface InvestorDraft {
  industries: Industry[];
  stages: FundingStage[];
  countriesInput: string;
  avgCheque: string;
  portfolioSize: string;
  interests: string;
}

interface StepInvestorProps {
  value: InvestorDraft;
  onChange: (patch: Partial<InvestorDraft>) => void;
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item)
    ? list.filter((existing) => existing !== item)
    : [...list, item];
}

export function StepInvestor({ value, onChange }: StepInvestorProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-display-sm font-bold text-balance">
          What do you invest in?
        </h1>
        <p className="text-base text-pretty text-muted-foreground">
          This helps us show you the right startups.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Field>
          <FieldLabel>Industries</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <ChipToggle
                key={industry.value}
                label={industry.label}
                selected={value.industries.includes(industry.value)}
                onClick={() =>
                  onChange({ industries: toggle(value.industries, industry.value) })
                }
              />
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel>Investment stages</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {FUNDING_STAGES.map((stage) => (
              <ChipToggle
                key={stage.value}
                label={stage.label}
                selected={value.stages.includes(stage.value)}
                onClick={() => onChange({ stages: toggle(value.stages, stage.value) })}
              />
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="countries">Countries you invest in</FieldLabel>
          <Input
            id="countries"
            placeholder="United States, United Kingdom"
            value={value.countriesInput}
            onChange={(event) => onChange({ countriesInput: event.target.value })}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="avgCheque">Usual amount you invest</FieldLabel>
            <Input
              id="avgCheque"
              placeholder="$50K – $250K"
              value={value.avgCheque}
              onChange={(event) => onChange({ avgCheque: event.target.value })}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="portfolioSize">Startups you&apos;ve invested in so far</FieldLabel>
            <Input
              id="portfolioSize"
              placeholder="12"
              value={value.portfolioSize}
              onChange={(event) => onChange({ portfolioSize: event.target.value })}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="interests">
            What are you looking for right now?
          </FieldLabel>
          <Textarea
            id="interests"
            rows={3}
            placeholder="e.g. AI tools that businesses already pay for, teams that spend money wisely"
            value={value.interests}
            onChange={(event) => onChange({ interests: event.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
