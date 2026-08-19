"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ChartLegend } from "./chart-legend";
import { ChartTooltip, ChartTooltipRow } from "./chart-tooltip";
import { categoricalColor } from "./chart-colors";
import { formatAxisValue, niceCeil, useChartSize } from "./use-chart-size";

export interface LineSeries {
  id: string;
  label: string;
  values: number[];
  color?: string;
  /** Fills the area under this line at low opacity — set for the primary/only series. */
  area?: boolean;
}

interface LineChartProps {
  labels: string[];
  series: LineSeries[];
  height?: number;
  valueFormatter?: (value: number) => string;
  className?: string;
}

const PADDING = { top: 16, right: 12, bottom: 26, left: 44 };
const TICKS = 4;

/**
 * Multi-series line/area chart. A single series with `area: true` reads as
 * an area chart; several lines read as a comparison. Ships a crosshair that
 * snaps to the nearest X and a one-tooltip-every-series readout, per the
 * data-viz skill's interaction spec.
 */
export function LineChart({
  labels,
  series,
  height = 240,
  valueFormatter,
  className,
}: LineChartProps) {
  const { ref, width } = useChartSize<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const gradientId = useId();
  const format = valueFormatter ?? formatAxisValue;

  const plotW = Math.max(width - PADDING.left - PADDING.right, 0);
  const plotH = height - PADDING.top - PADDING.bottom;

  const allValues = series.flatMap((s) => s.values);
  const rawMax = Math.max(...allValues, 0);
  const rawMin = Math.min(0, ...allValues);
  const max = niceCeil(rawMax);
  const min = rawMin < 0 ? -niceCeil(-rawMin) : 0;
  const range = max - min || 1;

  const xFor = (i: number) =>
    PADDING.left + (plotW * i) / Math.max(labels.length - 1, 1);
  const yFor = (v: number) => PADDING.top + plotH - ((v - min) / range) * plotH;

  const legendItems = series.map((s, i) => ({
    label: s.label,
    color: s.color ?? categoricalColor(i),
  }));

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || labels.length === 0) return;
    const rect = ref.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left - PADDING.left;
    const index = Math.round((relativeX / (plotW || 1)) * (labels.length - 1));
    setHoverIndex(Math.min(Math.max(index, 0), labels.length - 1));
  }

  const ticks = Array.from({ length: TICKS + 1 }, (_, i) => min + (range * i) / TICKS);

  return (
    <div className={className}>
      <ChartLegend items={legendItems} className="mb-4" />

      <div
        ref={ref}
        className="relative"
        style={{ height }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label="Line chart">
            <defs>
              {series
                .filter((s) => s.area)
                .map((s, i) => (
                  <linearGradient
                    key={s.id}
                    id={`${gradientId}-${s.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={s.color ?? categoricalColor(i)}
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="100%"
                      stopColor={s.color ?? categoricalColor(i)}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
            </defs>

            {/* Gridlines — hairline, recessive, one step off the surface. */}
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  x2={width - PADDING.right}
                  y1={yFor(tick)}
                  y2={yFor(tick)}
                  className="stroke-border"
                  strokeWidth={1}
                />
                <text
                  x={PADDING.left - 8}
                  y={yFor(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="tabular fill-muted-foreground text-[10px]"
                >
                  {format(tick)}
                </text>
              </g>
            ))}

            {/* X labels — thin out if the axis would get crowded. First/last
                anchor inward so they never clip past the chart edge. */}
            {labels.map((label, i) => {
              const step = labels.length > 8 ? Math.ceil(labels.length / 6) : 1;
              if (i % step !== 0 && i !== labels.length - 1) return null;
              const anchor =
                i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle";
              return (
                <text
                  key={label + i}
                  x={xFor(i)}
                  y={height - 6}
                  textAnchor={anchor}
                  className="fill-muted-foreground text-[10px]"
                >
                  {label}
                </text>
              );
            })}

            {/* Crosshair */}
            {hoverIndex != null && (
              <line
                x1={xFor(hoverIndex)}
                x2={xFor(hoverIndex)}
                y1={PADDING.top}
                y2={height - PADDING.bottom}
                className="stroke-border-strong"
                strokeWidth={1}
              />
            )}

            {series.map((s, seriesIndex) => {
              const color = s.color ?? categoricalColor(seriesIndex);
              const points = s.values.map((v, i) => [xFor(i), yFor(v)] as const);
              const linePath = points
                .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
                .join(" ");
              const areaPath =
                s.area && points.length > 0
                  ? `${linePath} L${points[points.length - 1]![0]},${yFor(min)} L${points[0]![0]},${yFor(min)} Z`
                  : null;

              return (
                <g key={s.id}>
                  {areaPath && (
                    <motion.path
                      d={areaPath}
                      fill={`url(#${gradientId}-${s.id})`}
                      initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  />
                  {hoverIndex != null && (
                    <circle
                      cx={xFor(hoverIndex)}
                      cy={yFor(s.values[hoverIndex] ?? 0)}
                      r={4}
                      fill={color}
                      stroke="var(--card)"
                      strokeWidth={2}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {hoverIndex != null && width > 0 && (
          <ChartTooltip x={xFor(hoverIndex)} y={PADDING.top + 8} containerWidth={width}>
            <p className="mb-1.5 font-medium text-popover-foreground">
              {labels[hoverIndex]}
            </p>
            <div className="flex flex-col gap-1">
              {series.map((s, i) => (
                <ChartTooltipRow
                  key={s.id}
                  color={s.color ?? categoricalColor(i)}
                  label={s.label}
                  value={format(s.values[hoverIndex] ?? 0)}
                />
              ))}
            </div>
          </ChartTooltip>
        )}
      </div>
    </div>
  );
}
