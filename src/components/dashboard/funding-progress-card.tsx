import { CalendarClockIcon, CircleHelpIcon, SearchCheckIcon, UsersIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent } from "@/utils/format";

interface FundingProgressCardProps {
  goal: number;
  raised: number;
  interestedInvestors: number;
  meetingsScheduled: number;
  dueDiligenceActive: number;
  className?: string;
}

export function FundingProgressCard({
  goal,
  raised,
  interestedInvestors,
  meetingsScheduled,
  dueDiligenceActive,
  className,
}: FundingProgressCardProps) {
  const ratio = goal > 0 ? Math.min(raised / goal, 1) : 0;

  return (
    <div className={cn("flex flex-col gap-5 rounded-xl border bg-card p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm text-muted-foreground">Money raised</p>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground/60 outline-none hover:text-muted-foreground">
                <CircleHelpIcon className="size-3.5" aria-hidden="true" />
                <span className="sr-only">What does this mean?</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-56 text-center">
                How much funding you&apos;ve received so far, out of your goal.
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="tabular mt-1 text-display-xs font-bold">
            {formatCurrency(raised, { compact: true })}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              of {formatCurrency(goal, { compact: true })}
            </span>
          </p>
        </div>
        <span className="tabular rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary-subtle-foreground">
          {formatPercent(ratio)}
        </span>
      </div>

      <Progress value={ratio * 100} />

      <div className="grid grid-cols-3 gap-3 border-t pt-4">
        <div className="flex flex-col gap-1">
          <UsersIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          <p className="tabular text-lg font-semibold">{interestedInvestors}</p>
          <p className="text-xs text-muted-foreground">Interested</p>
        </div>
        <div className="flex flex-col gap-1">
          <CalendarClockIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          <p className="tabular text-lg font-semibold">{meetingsScheduled}</p>
          <p className="text-xs text-muted-foreground">Meetings</p>
        </div>
        <div className="flex flex-col gap-1">
          <SearchCheckIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          <p className="tabular text-lg font-semibold">{dueDiligenceActive}</p>
          <p className="text-xs text-muted-foreground">Being reviewed</p>
        </div>
      </div>
    </div>
  );
}
