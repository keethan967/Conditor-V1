interface SparklineProps {
  values: number[];
  className?: string;
  strokeClassName?: string;
}

/**
 * Minimal inline trend line — no charting library needed for a 7-point
 * weekly series. Scales to its container via `viewBox`, so it stays crisp
 * inside a stat card at any width.
 */
export function Sparkline({ values, className, strokeClassName }: SparklineProps) {
  if (values.length < 2) return null;

  const width = 100;
  const height = 32;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClassName ?? "stroke-primary"}
      />
    </svg>
  );
}
