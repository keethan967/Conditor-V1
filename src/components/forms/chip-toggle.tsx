"use client";

import { cn } from "@/lib/utils";

interface ChipToggleProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "default";
}

/** Multi-select chip — used by onboarding and search filters wherever a checkbox would feel too heavy. */
export function ChipToggle({
  label,
  selected,
  onClick,
  size = "default",
}: ChipToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border font-medium transition-colors",
        size === "default" ? "px-3.5 py-1.5 text-sm" : "px-2.5 py-1 text-xs",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      {label}
    </button>
  );
}
