import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  /**
   * Say what the user can do, not that nothing exists. "Save a startup to see
   * it here" earns its space; "No results" does not.
   */
  description?: string;
  /** The action that resolves the emptiness. */
  action?: ReactNode;
  className?: string;
  size?: "sm" | "default";
}

/**
 * The canonical empty state.
 *
 * Empty states are the most-seen screens in a new product and the least
 * designed — every list, table and feed in Conditor routes through this one
 * component so none of them can quietly ship as a bare "No data".
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "default",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border-strong/60 text-center",
        size === "default" ? "gap-4 px-6 py-16" : "gap-3 px-4 py-10",
        className,
      )}
    >
      {Icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
            size === "default" ? "size-12" : "size-10",
          )}
        >
          <Icon
            className={size === "default" ? "size-5" : "size-4"}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <p className={cn("font-medium", size === "default" ? "text-base" : "text-sm")}>
          {title}
        </p>

        {description && (
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-1 flex items-center gap-2">{action}</div>}
    </div>
  );
}
