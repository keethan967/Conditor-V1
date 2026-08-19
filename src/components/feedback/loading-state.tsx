import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

/**
 * Centred spinner for whole-route loading, where no meaningful layout can be
 * predicted. Prefer a skeleton whenever the shape of the result IS known —
 * a skeleton communicates what is coming; a spinner only says "wait".
 */
export function LoadingState({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-64 w-full flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <Spinner className="size-5" label={null} />
      <p className="text-sm text-muted-foreground" role="status">
        {label}
      </p>
    </div>
  );
}

/**
 * Skeleton matching the standard card footprint.
 *
 * The dimensions deliberately mirror the real card so the swap from skeleton
 * to content produces no layout shift — a skeleton of the wrong size is worse
 * than none at all.
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col gap-4 rounded-xl border bg-card p-5", className)}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

/**
 * A grid of card skeletons.
 *
 * @param count keep this close to the real page size — rendering 20 skeletons
 * for a 6-item result set makes the page appear to shrink on load.
 */
export function CardGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}
      aria-busy="true"
      aria-label="Loading content"
    >
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
