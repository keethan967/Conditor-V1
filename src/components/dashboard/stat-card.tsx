import { CircleHelpIcon, type LucideIcon } from "lucide-react";

import { Sparkline } from "@/components/dashboard/sparkline";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatDelta } from "@/utils/format";

interface StatCardProps {
  label: string;
  value: string;
  /** One short, plain-English sentence explaining what this number means. Shown in a tooltip so the grid stays uncluttered. */
  description?: string;
  icon?: LucideIcon;
  delta?: number;
  trend?: number[];
  className?: string;
}

/**
 * The single stat-tile shape used across every dashboard and analytics
 * screen. One layout, everywhere — so a founder scanning their dashboard and
 * an investor scanning theirs get the same reading rhythm.
 */
export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  delta,
  trend,
  className,
}: StatCardProps) {
  const isPositive = delta != null && delta >= 0;

  return (
    <div className={cn("flex flex-col gap-3 rounded-xl border bg-card p-5", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          {description && (
            <Tooltip>
              <TooltipTrigger className="shrink-0 text-muted-foreground/60 outline-none hover:text-muted-foreground focus-visible:text-muted-foreground">
                <CircleHelpIcon className="size-3.5" aria-hidden="true" />
                <span className="sr-only">What does this mean?</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-56 text-center">{description}</TooltipContent>
            </Tooltip>
          )}
        </div>
        {Icon && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary-subtle-foreground">
            <Icon className="size-4" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-3">
        <p className="tabular text-display-xs font-bold">{value}</p>

        {trend && trend.length > 1 && (
          <Sparkline
            values={trend}
            className="h-8 w-20"
            strokeClassName={isPositive ? "stroke-success" : "stroke-destructive"}
          />
        )}
      </div>

      {delta != null && (
        <p
          className={cn(
            "tabular text-xs font-medium",
            isPositive ? "text-success" : "text-destructive",
          )}
        >
          {formatDelta(delta)} <span className="text-muted-foreground">vs last week</span>
        </p>
      )}
    </div>
  );
}
