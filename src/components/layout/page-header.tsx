import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  /**
   * The page's primary action. Every screen gets exactly one — that constraint
   * is what keeps the hierarchy readable in under five seconds.
   */
  action?: ReactNode;
  /** Breadcrumbs or a back link, rendered above the title. */
  breadcrumb?: ReactNode;
  className?: string;
}

/**
 * Standard page heading.
 *
 * Every authenticated route renders one of these, so titles share a single
 * type scale and spacing rhythm instead of each page inventing its own.
 */
export function PageHeader({
  title,
  description,
  action,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>
      {breadcrumb}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1.5">
          {/* `text-balance` keeps two-line titles from leaving one orphaned word. */}
          <h1 className="text-display-xs font-bold text-balance sm:text-display-sm">
            {title}
          </h1>

          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* `shrink-0` so a long title never squeezes the action into two lines. */}
        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>
    </header>
  );
}
