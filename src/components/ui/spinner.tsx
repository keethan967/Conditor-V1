import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  /**
   * Announced to screen readers. Set to `null` when the spinner sits inside an
   * element that already conveys the busy state — a submitting button, for
   * instance — so the status is not announced twice.
   */
  label?: string | null;
}

export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <>
      <Loader2Icon
        className={cn("size-4 animate-spin text-muted-foreground", className)}
        aria-hidden="true"
      />
      {label && <span className="sr-only">{label}</span>}
    </>
  );
}
