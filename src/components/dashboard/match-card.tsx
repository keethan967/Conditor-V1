import Link from "next/link";
import { CheckIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";

import { MatchScoreBadge } from "@/components/entity/match-score-badge";
import type { MatchReason } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  avatar: ReactNode;
  name: string;
  subtitle: string;
  score: number;
  reasons: MatchReason[];
  href: string;
  className?: string;
}

/** The "why this match" card — used for both investor→startup and founder→investor recommendations. */
export function MatchCard({
  avatar,
  name,
  subtitle,
  score,
  reasons,
  href,
  className,
}: MatchCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex lift flex-col gap-3.5 rounded-xl border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {avatar}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <MatchScoreBadge score={score} />
      </div>

      <ul className="flex flex-col gap-1.5">
        {reasons.slice(0, 3).map((reason) => (
          <li key={reason.label} className="flex items-center gap-2 text-xs">
            {reason.met ? (
              <CheckIcon
                className="size-3.5 shrink-0 text-success"
                aria-hidden="true"
              />
            ) : (
              <XIcon
                className="size-3.5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span
              className={cn(reason.met ? "text-foreground" : "text-muted-foreground")}
            >
              {reason.label}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
