"use client";

import {
  Building2Icon,
  HandCoinsIcon,
  LandmarkIcon,
  LineChartIcon,
  RocketIcon,
  SproutIcon,
  UniversityIcon,
  type LucideIcon,
} from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { ACCOUNT_TYPES, type AccountType } from "@/constants/taxonomy";
import { cn } from "@/lib/utils";

const ICONS: Record<AccountType, LucideIcon> = {
  founder: RocketIcon,
  angel: HandCoinsIcon,
  vc: LineChartIcon,
  accelerator: SproutIcon,
  incubator: Building2Icon,
  family_office: LandmarkIcon,
  government: UniversityIcon,
};

interface StepRoleProps {
  value: AccountType | null;
  onSelect: (accountType: AccountType) => void;
}

export function StepRole({ value, onSelect }: StepRoleProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-display-sm font-bold text-balance">Welcome to Conditor.</h1>
        <p className="text-base text-pretty text-muted-foreground">
          What best describes you?
        </p>
      </div>

      <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ACCOUNT_TYPES.map((option) => {
          const Icon = ICONS[option.value];
          const selected = value === option.value;

          return (
            <StaggerItem key={option.value}>
              <button
                type="button"
                onClick={() => onSelect(option.value)}
                aria-pressed={selected}
                className={cn(
                  "flex w-full lift items-start gap-3.5 rounded-2xl border bg-card p-4 text-left",
                  selected && "border-primary ring-2 ring-primary/20",
                )}
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary-subtle text-primary-subtle-foreground",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
