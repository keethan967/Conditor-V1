import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const WIDTHS = {
  /** Long-form reading — capped near 75 characters per line. */
  prose: "max-w-prose",
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: keyof typeof WIDTHS;
  /** Renders as a different element — `section`, `main`, `header`. */
  as?: ElementType;
}

/**
 * Horizontal page gutter and max width.
 *
 * Exists so page width is a decision made once rather than re-litigated with a
 * different `max-w-*` on every route. Gutters step up with the viewport: 16px
 * on phones is tight but necessary, 32px on desktop is comfortable.
 */
export function Container({
  children,
  className,
  width = "wide",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", WIDTHS[width], className)}
    >
      {children}
    </Component>
  );
}
