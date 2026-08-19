"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FUNDING_STAGES,
  INDUSTRIES,
  TEAM_SIZES,
  type FundingStage,
  type Industry,
  type TeamSize,
} from "@/constants/taxonomy";

import { ChipToggle } from "@/components/forms/chip-toggle";

export interface FounderDraft {
  startupName: string;
  industry: Industry | "";
  country: string;
  fundingStage: FundingStage | "";
  website: string;
  teamSize: TeamSize | "";
  fundingGoal: string;
  traction: string;
}

interface StepFounderProps {
  value: FounderDraft;
  onChange: (patch: Partial<FounderDraft>) => void;
}

export function StepFounder({ value, onChange }: StepFounderProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-display-sm font-bold text-balance">
          Tell us about your startup.
        </h1>
        <p className="text-base text-pretty text-muted-foreground">
          This helps us find your matches and set up your home page.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Field>
          <FieldLabel htmlFor="startupName">Startup name</FieldLabel>
          <Input
            id="startupName"
            placeholder="Acme Inc."
            value={value.startupName}
            onChange={(event) => onChange({ startupName: event.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="country">Country</FieldLabel>
          <Input
            id="country"
            placeholder="United States"
            value={value.country}
            onChange={(event) => onChange({ country: event.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel>Industry</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <ChipToggle
                key={industry.value}
                label={industry.label}
                selected={value.industry === industry.value}
                onClick={() => onChange({ industry: industry.value })}
              />
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel>Funding stage</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {FUNDING_STAGES.map((stage) => (
              <ChipToggle
                key={stage.value}
                label={stage.label}
                selected={value.fundingStage === stage.value}
                onClick={() => onChange({ fundingStage: stage.value })}
              />
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel>Team size</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {TEAM_SIZES.map((size) => (
              <ChipToggle
                key={size.value}
                label={size.label}
                selected={value.teamSize === size.value}
                onClick={() => onChange({ teamSize: size.value })}
              />
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="website">Website</FieldLabel>
            <Input
              id="website"
              placeholder="acme.com"
              value={value.website}
              onChange={(event) => onChange({ website: event.target.value })}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="fundingGoal">Funding goal (USD)</FieldLabel>
            <Input
              id="fundingGoal"
              type="number"
              placeholder="2000000"
              value={value.fundingGoal}
              onChange={(event) => onChange({ fundingGoal: event.target.value })}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="traction">Growth so far</FieldLabel>
          <Textarea
            id="traction"
            rows={3}
            placeholder="e.g. $40,000 in sales each month, 12 customers, 3 free trials"
            value={value.traction}
            onChange={(event) => onChange({ traction: event.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
