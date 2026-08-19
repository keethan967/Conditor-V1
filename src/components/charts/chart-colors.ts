/**
 * Chart color assignment.
 *
 * Categorical hues are validated against the data-viz skill's six checks
 * (band, chroma floor, adjacent CVD ΔE, normal-vision floor, contrast) for
 * both themes — see the re-stepped `--chart-*` dark values in `globals.css`
 * for what that validation caught and fixed. Slots are assigned in this
 * fixed order and never cycled or reassigned when a filter changes the
 * series count — color follows the entity, not its rank.
 *
 * Two WARNs the validator returned are handled structurally rather than by
 * picking new hues: slot 2 (sky) sits under 3:1 against a white surface, and
 * slots 4/5 (emerald/amber) clear only the CVD floor band when adjacent —
 * both are legal only with a secondary encoding, which is why every chart
 * here ships a legend and/or direct labels rather than color-only identity.
 */
export const CHART_CATEGORICAL = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const CHART_STATUS = {
  good: "var(--success)",
  warning: "var(--warning)",
  critical: "var(--destructive)",
  neutral: "var(--muted-foreground)",
} as const;

/**
 * One step of a same-hue sequential/ordinal ramp — for funnel stages, tiers
 * or any "order matters" series, where a rainbow of categorical hues would
 * misstate the data as unordered identity instead of position.
 *
 * Mixes toward the card surface rather than white/black so the ramp holds up
 * on both themes without a separate light/dark step table.
 */
export function sequentialStep(index: number, total: number): string {
  const steps =
    total <= 1
      ? [100]
      : Array.from({ length: total }, (_, i) => 40 + (i * 60) / (total - 1));
  const pct = steps[index] ?? 100;
  return `color-mix(in oklch, var(--primary) ${pct}%, var(--card))`;
}

export function categoricalColor(index: number): string {
  return CHART_CATEGORICAL[index % CHART_CATEGORICAL.length]!;
}
