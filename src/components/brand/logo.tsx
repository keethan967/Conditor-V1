import { APP } from "@/constants/app";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

/**
 * The Conditor mark: a column rising inside a ring, standing for the
 * "founder" ("conditor" is Latin for founder) as the load-bearing support
 * of the whole structure.
 *
 * Rendered from the official logo file (`public/brand/logo-mark.png`),
 * cropped to the mark and matted to a transparent background — never redrawn.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed local asset, no responsive/optimization needs
    <img
      src="/brand/logo-mark.png"
      alt=""
      aria-hidden="true"
      className={cn("size-8 shrink-0 object-contain", className)}
    />
  );
}

interface LogoProps extends LogoMarkProps {
  /** Hides the wordmark, leaving only the mark. For collapsed navigation. */
  markOnly?: boolean;
}

/**
 * Mark plus wordmark, laid out horizontally for headers and nav bars.
 *
 * The accessible name lives on the wrapper, and the mark and text are both
 * hidden from the accessibility tree — otherwise a screen reader announces
 * "Conditor" twice in a row.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      role="img"
      aria-label={APP.name}
    >
      <LogoMark />
      {!markOnly && (
        <span aria-hidden="true" className="text-[1.0625rem] font-bold tracking-tight">
          {APP.name}
        </span>
      )}
    </span>
  );
}

/**
 * The full official lockup — mark stacked above the "CONDITOR" wordmark
 * graphic, exactly as supplied. For large, deliberate placements: the
 * sign-in/onboarding hero, splash and loading screens.
 */
export function LogoLockup({ className }: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed local asset, no responsive/optimization needs
    <img
      src="/brand/logo-full.png"
      alt={APP.name}
      className={cn("w-48 object-contain", className)}
    />
  );
}
