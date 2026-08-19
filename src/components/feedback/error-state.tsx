"use client";

import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isDevelopment } from "@/lib/env";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  /** Wire to a router refresh or a query `refetch`. Omit if nothing can retry. */
  onRetry?: () => void;
  /** Surfaced in development only — raw errors leak internals to users. */
  error?: Error;
  className?: string;
}

/**
 * The canonical error state.
 *
 * The copy stays calm and non-technical, because the user cannot act on a
 * stack trace. Full diagnostics render in development only; in production they
 * belong in the error reporter, not on screen.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content. Please try again in a moment.",
  onRetry,
  error,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/20 bg-destructive-subtle/40 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-5" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-base font-medium">{title}</p>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>
      </div>

      {isDevelopment && error?.message && (
        <pre className="mt-1 max-w-full overflow-x-auto rounded-md bg-muted px-3 py-2 text-left font-mono text-xs text-muted-foreground">
          {error.message}
        </pre>
      )}

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          <RefreshCwIcon />
          Try again
        </Button>
      )}
    </div>
  );
}
