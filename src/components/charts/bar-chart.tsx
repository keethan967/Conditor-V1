"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ChartTooltip, ChartTooltipRow } from "./chart-tooltip";
import { categoricalColor, sequentialStep } from "./chart-colors";
import { formatAxisValue, niceCeil, useChartSize } from "./use-chart-size";

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDatum[];
  height?: number;
  valueFormatter?: (value: number) => string;
  /** Stages/tiers where order carries meaning — colored as a same-hue ramp instead of categorical hues. */
  ordinal?: boolean;
  className?: string;
}

const BAR_MAX_THICKNESS = 40;
const PADDING = { top: 24, right: 12, bottom: 26, left: 40 };

/**
 * Vertical bar/column chart. Ordinal data (funnel stages, tiers) takes a
 * same-hue ramp via `ordinal`; nominal data takes the fixed categorical
 * order. Rounded data-end, square at the baseline, per the mark spec.
 */
export function BarChart({
  data,
  height = 240,
  valueFormatter,
  ordinal,
  className,
}: BarChartProps) {
  const { ref, width } = useChartSize<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const format = valueFormatter ?? formatAxisValue;

  const plotW = Math.max(width - PADDING.left - PADDING.right, 0);
  const plotH = height - PADDING.top - PADDING.bottom;
  const max = niceCeil(Math.max(...data.map((d) => d.value), 1));

  const slot = plotW / Math.max(data.length, 1);
  const barWidth = Math.min(slot * 0.55, BAR_MAX_THICKNESS);

  const yFor = (v: number) => PADDING.top + plotH - (v / max) * plotH;
  const xFor = (i: number) => PADDING.left + slot * i + slot / 2;

  return (
    <div className={className}>
      <div
        ref={ref}
        className="relative"
        style={{ height }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label="Bar chart">
            <line
              x1={PADDING.left}
              x2={width - PADDING.right}
              y1={height - PADDING.bottom}
              y2={height - PADDING.bottom}
              className="stroke-border"
              strokeWidth={1}
            />

            {data.map((d, i) => {
              const color =
                d.color ??
                (ordinal ? sequentialStep(i, data.length) : categoricalColor(i));
              const barHeight = Math.max((d.value / max) * plotH, 0);
              const x = xFor(i) - barWidth / 2;
              const yTop = yFor(d.value);
              const isHovered = hoverIndex === i;

              return (
                <g
                  key={d.label}
                  onMouseEnter={() => setHoverIndex(i)}
                  onFocus={() => setHoverIndex(i)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${d.label}: ${format(d.value)}`}
                  className="outline-none"
                >
                  {/* Full-height invisible hit area — bigger than the bar itself. */}
                  <rect
                    x={xFor(i) - slot / 2}
                    y={PADDING.top}
                    width={slot}
                    height={plotH}
                    fill="transparent"
                  />
                  <motion.rect
                    x={x}
                    width={barWidth}
                    rx={4}
                    fill={color}
                    initial={
                      prefersReducedMotion
                        ? undefined
                        : { height: 0, y: height - PADDING.bottom }
                    }
                    animate={{ height: barHeight, y: yTop }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.03,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    opacity={hoverIndex == null || isHovered ? 1 : 0.55}
                  />
                  <text
                    x={xFor(i)}
                    y={height - 8}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[10px]"
                  >
                    {d.label.length > 10 ? `${d.label.slice(0, 9)}…` : d.label}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {hoverIndex != null && width > 0 && data[hoverIndex] && (
          <ChartTooltip
            x={xFor(hoverIndex)}
            y={yFor(data[hoverIndex].value)}
            containerWidth={width}
          >
            <ChartTooltipRow
              color={
                data[hoverIndex].color ??
                (ordinal
                  ? sequentialStep(hoverIndex, data.length)
                  : categoricalColor(hoverIndex))
              }
              label={data[hoverIndex].label}
              value={format(data[hoverIndex].value)}
            />
          </ChartTooltip>
        )}
      </div>
    </div>
  );
}
