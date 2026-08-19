"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ChartTooltip, ChartTooltipRow } from "./chart-tooltip";
import { categoricalColor } from "./chart-colors";
import { formatAxisValue } from "./use-chart-size";

export interface DonutDatum {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutDatum[];
  size?: number;
  thickness?: number;
  valueFormatter?: (value: number) => string;
  centerLabel?: string;
  className?: string;
}

const GAP_DEGREES = 2.5;

/**
 * Part-to-whole as a donut rather than a full pie — the center carries the
 * total, which a pie's solid middle can't. Segments separate with the
 * surface-gap spec (air between marks, not a stroke) rather than borders.
 */
export function DonutChart({
  data,
  size = 200,
  thickness = 28,
  valueFormatter,
  centerLabel,
  className,
}: DonutChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const format = valueFormatter ?? formatAxisValue;

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const segments = data.reduce<
    Array<
      DonutDatum & {
        color: string;
        startDegrees: number;
        sweepDegrees: number;
        percent: number;
      }
    >
  >((acc, d, i) => {
    const previousCursor =
      acc.length > 0
        ? acc[acc.length - 1]!.startDegrees +
          acc[acc.length - 1]!.sweepDegrees +
          (data.length > 1 ? GAP_DEGREES : 0)
        : -90;
    const fraction = d.value / total;
    const sweep = fraction * 360 - (data.length > 1 ? GAP_DEGREES : 0);

    acc.push({
      ...d,
      color: d.color ?? categoricalColor(i),
      startDegrees: previousCursor,
      sweepDegrees: Math.max(sweep, 0),
      percent: fraction,
    });
    return acc;
  }, []);

  const hovered = hoverIndex != null ? segments[hoverIndex] : null;
  const tooltipPos = hovered
    ? (() => {
        const midAngle =
          ((hovered.startDegrees + hovered.sweepDegrees / 2) * Math.PI) / 180;
        return {
          x: center + Math.cos(midAngle) * (radius + thickness / 2 + 8),
          y: center + Math.sin(midAngle) * (radius + thickness / 2 + 8),
        };
      })()
    : null;

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} role="img" aria-label="Donut chart">
            {segments.map((segment, i) => {
              const dashLength = (segment.sweepDegrees / 360) * circumference;
              const dashOffset = -((segment.startDegrees + 90) / 360) * circumference;
              const isHovered = hoverIndex === i;

              return (
                <motion.circle
                  key={segment.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={isHovered ? thickness + 4 : thickness}
                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${center} ${center})`}
                  onMouseEnter={() => setHoverIndex(i)}
                  onFocus={() => setHoverIndex(i)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${segment.label}: ${format(segment.value)}`}
                  className="cursor-pointer transition-[stroke-width] duration-150 outline-none"
                  initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                />
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="tabular text-xl font-bold">
              {format(hovered ? hovered.value : total)}
            </p>
            {(centerLabel || hovered) && (
              <p className="max-w-20 truncate text-center text-[11px] text-muted-foreground">
                {hovered ? hovered.label : centerLabel}
              </p>
            )}
          </div>

          {hovered && tooltipPos && (
            <ChartTooltip x={tooltipPos.x} y={tooltipPos.y} containerWidth={size}>
              <ChartTooltipRow
                color={hovered.color}
                label={hovered.label}
                value={`${format(hovered.value)} · ${Math.round(hovered.percent * 100)}%`}
              />
            </ChartTooltip>
          )}
        </div>

        <ul className="flex min-w-0 flex-1 flex-col gap-2">
          {segments.map((segment, i) => (
            <li
              key={segment.label}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">
                {segment.label}
              </span>
              <span className="tabular font-medium">
                {Math.round(segment.percent * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
