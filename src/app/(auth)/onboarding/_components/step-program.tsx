"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { INDUSTRIES, type Industry } from "@/constants/taxonomy";

import { ChipToggle } from "@/components/forms/chip-toggle";
import { REGIONS } from "@/constants/regions";

export interface ProgramDraft {
  programName: string;
  industries: Industry[];
  regions: string[];
  focusAreas: string;
}

interface StepProgramProps {
  value: ProgramDraft;
  onChange: (patch: Partial<ProgramDraft>) => void;
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item)
    ? list.filter((existing) => existing !== item)
    : [...list, item];
}

export function StepProgram({ value, onChange }: StepProgramProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-display-sm font-bold text-balance">
          Tell us about your program.
        </h1>
        <p className="text-base text-pretty text-muted-foreground">
          This helps us set up your applications and groups.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Field>
          <FieldLabel htmlFor="programName">Program name</FieldLabel>
          <Input
            id="programName"
            placeholder="Ignition Labs"
            value={value.programName}
            onChange={(event) => onChange({ programName: event.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel>Focus industries</FieldLabel>
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
          <FieldLabel>Regions</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <ChipToggle
                key={region}
                label={region}
                selected={value.regions.includes(region)}
                onClick={() => onChange({ regions: toggle(value.regions, region) })}
              />
            ))}
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="focusAreas">
            What do you look for in applicants?
          </FieldLabel>
          <Textarea
            id="focusAreas"
            rows={3}
            placeholder="e.g. technical founders, very early stage, a working prototype"
            value={value.focusAreas}
            onChange={(event) => onChange({ focusAreas: event.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}
