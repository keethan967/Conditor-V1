import { cn } from "@/lib/utils";

interface MatchScoreBadgeProps {
  score: number;
  size?: "sm" | "default";
  className?: string;
}

function toneFor(score: number) {
  if (score >= 85) return "bg-success-subtle text-success-subtle-foreground";
  if (score >= 65) return "bg-info-subtle text-info-subtle-foreground";
  return "bg-muted text-muted-foreground";
}

/** The "98% Match" pill used on every investor/startup recommendation card. */
export function MatchScoreBadge({
  score,
  size = "default",
  className,
}: MatchScoreBadgeProps) {
  return (
    <span
      className={cn(
        "tabular inline-flex shrink-0 items-center gap-1 rounded-full font-semibold",
        toneFor(score),
        size === "default" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[0.6875rem]",
        className,
      )}
    >
      {score}% Match
    </span>
  );
}
