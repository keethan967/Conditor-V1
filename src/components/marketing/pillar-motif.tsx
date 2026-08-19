import { cn } from "@/lib/utils";

const LINES = [
  { x: 6, height: 58, hue: "var(--brand-400)", opacity: 0.5, delay: 0 },
  { x: 16, height: 82, hue: "var(--brand-500)", opacity: 0.6, delay: 60 },
  { x: 26, height: 40, hue: "var(--teal)", opacity: 0.35, delay: 120 },
  { x: 36, height: 96, hue: "var(--brand-600)", opacity: 0.7, delay: 40 },
  { x: 50, height: 100, hue: "var(--brand-700)", opacity: 0.85, delay: 0 },
  { x: 64, height: 96, hue: "var(--brand-600)", opacity: 0.7, delay: 40 },
  { x: 74, height: 40, hue: "var(--gold)", opacity: 0.4, delay: 140 },
  { x: 84, height: 82, hue: "var(--brand-500)", opacity: 0.6, delay: 60 },
  { x: 94, height: 58, hue: "var(--brand-400)", opacity: 0.5, delay: 0 },
] as const;

/**
 * Abstract echo of the mark's rising column — thin vertical strokes fanning
 * out from a shared base, never the mark itself. Purely decorative: sits
 * behind hero copy, low opacity, ignored by assistive tech.
 */
export function PillarMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax slice"
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      {LINES.map((line, index) => (
        <line
          key={index}
          x1={line.x}
          x2={line.x}
          y1={100}
          y2={100 - line.height}
          stroke={line.hue}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={line.opacity}
          style={{
            animation: `rise var(--duration-slow) var(--ease-out-quart) both`,
            animationDelay: `${line.delay}ms`,
          }}
        />
      ))}
    </svg>
  );
}
