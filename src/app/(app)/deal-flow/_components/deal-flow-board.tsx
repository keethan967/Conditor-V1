"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CircleHelpIcon } from "lucide-react";

import { CompanyMark } from "@/components/entity/company-mark";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { dynamicRoutes } from "@/constants/routes";
import {
  DEAL_FLOW,
  getStartupBySlug,
  type DealFlowItem,
  type DealStage,
} from "@/lib/mock-data";
import { formatDate } from "@/utils/format";

const STAGES: { value: DealStage; label: string; hint?: string }[] = [
  { value: "sourced", label: "New" },
  {
    value: "screening",
    label: "First Look",
    hint: "You're taking a quick look at this startup.",
  },
  { value: "meeting", label: "Meeting" },
  {
    value: "diligence",
    label: "Startup Review",
    hint: "You're checking the startup's numbers and story carefully before deciding.",
  },
  {
    value: "term_sheet",
    label: "Offer Sent",
    hint: "You've sent them an offer to invest.",
  },
  { value: "closed", label: "Invested" },
];

export function DealFlowBoard() {
  const [deals] = useState<DealFlowItem[]>(DEAL_FLOW);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateEdges() {
      if (!el) return;
      setEdges({
        left: el.scrollLeft > 4,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    }

    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-w-0">
      {/* Hint that the board scrolls sideways — fades in only when there's
          more to see in that direction, like Linear's board view. */}
      <div
        aria-hidden="true"
        className={cn(
          "duration-base pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent transition-opacity ease-out-quart",
          edges.left ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "duration-base pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent transition-opacity ease-out-quart",
          edges.right ? "opacity-100" : "opacity-0",
        )}
      />
      <div ref={scrollRef} className="flex min-w-0 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const items = deals.filter((deal) => deal.stage === stage.value);

          return (
            <div key={stage.value} className="flex w-72 shrink-0 flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="flex items-center gap-1">
                  <p className="text-sm font-semibold">{stage.label}</p>
                  {stage.hint && (
                    <Tooltip>
                      <TooltipTrigger className="text-muted-foreground/60 outline-none hover:text-muted-foreground">
                        <CircleHelpIcon className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">What does this mean?</span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-56 text-center">
                        {stage.hint}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </span>
                <span className="tabular text-xs text-muted-foreground">
                  {items.length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {items.map((deal) => {
                  const startup = getStartupBySlug(deal.startupSlug);
                  if (!startup) return null;

                  return (
                    <Link
                      key={deal.startupSlug}
                      href={dynamicRoutes.startup(startup.slug)}
                      className="flex lift flex-col gap-2 rounded-xl border bg-card p-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <CompanyMark name={startup.name} hue={startup.hue} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{startup.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {startup.tagline}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{deal.nextStep}</p>
                      <p className="text-[0.6875rem] text-muted-foreground">
                        Added {formatDate(deal.addedAt)}
                      </p>
                    </Link>
                  );
                })}

                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed p-4 text-center text-xs text-muted-foreground">
                    Nothing here yet
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
