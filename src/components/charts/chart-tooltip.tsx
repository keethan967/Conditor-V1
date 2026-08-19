import type { ReactNode } from "react";

interface ChartTooltipProps {
  x: number;
  y: number;
  /** Container width in px — used to flip the tooltip when it would clip the right edge. */
  containerWidth: number;
  children: ReactNode;
}

/**
 * Floating readout for chart hover/focus. Positioned in the chart's own
 * pixel space (not the SVG viewBox), so callers pass real container
 * coordinates. Flips to the left of the cursor near the right edge instead
 * of clipping.
 */
export function ChartTooltip({ x, y, containerWidth, children }: ChartTooltipProps) {
  const flip = x > containerWidth - 140;

  return (
    <div
      className="pointer-events-none absolute z-10 min-w-32 rounded-lg border bg-popover px-3 py-2 text-xs shadow-lg"
      style={{
        left: flip ? undefined : x + 12,
        right: flip ? containerWidth - x + 12 : undefined,
        top: y,
        transform: "translateY(-50%)",
      }}
      role="status"
    >
      {children}
    </div>
  );
}

export function ChartTooltipRow({
  color,
  label,
  value,
}: {
  color?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {color && (
        <span
          className="h-0.5 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}
      <span className="min-w-0 flex-1 truncate text-muted-foreground">{label}</span>
      <span className="tabular font-semibold text-popover-foreground">{value}</span>
    </div>
  );
}
