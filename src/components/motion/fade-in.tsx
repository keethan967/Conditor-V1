"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared motion constants.
 *
 * Every entrance animation in the product uses these values. Centralising them
 * is what makes the interface feel like one system rather than a collection of
 * screens that each animate slightly differently.
 *
 * The easing is a quart-out curve: fast departure, gentle settle. Durations sit
 * in the 150–250ms band, below the threshold where motion starts to feel like
 * waiting.
 */
export const MOTION = {
  duration: 0.25,
  ease: [0.25, 1, 0.5, 1] as const,
  distance: 8,
  stagger: 0.05,
} as const;

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Prefer `Stagger` over hand-tuning delays on siblings. */
  delay?: number;
  /** Direction the element travels from. `none` fades in place. */
  from?: "bottom" | "top" | "left" | "right" | "none";
  /** Defers the animation until the element scrolls into view. */
  whileInView?: boolean;
}

function offsetFor(from: FadeInProps["from"], distance: number) {
  switch (from) {
    case "top":
      return { y: -distance };
    case "left":
      return { x: -distance };
    case "right":
      return { x: distance };
    case "none":
      return {};
    default:
      return { y: distance };
  }
}

/**
 * Entrance animation for a single element.
 *
 * When the OS requests reduced motion this renders a plain `div` — no
 * transform, no opacity ramp, no animation frames at all. Merely shortening
 * the duration is not equivalent: vestibular triggers are about movement, not
 * its length.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  from = "bottom",
  whileInView = false,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const hidden = { opacity: 0, ...offsetFor(from, MOTION.distance) };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(whileInView
        ? {
            whileInView: visible,
            // `once` matters: re-animating on every scroll direction change is
            // the fastest way to make a page feel cheap.
            viewport: { once: true, margin: "-80px" },
          }
        : { animate: visible })}
      transition={{ duration: MOTION.duration, ease: MOTION.ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION.stagger },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: MOTION.distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.duration, ease: MOTION.ease },
  },
};

/**
 * Animates children in sequence.
 *
 * Use for lists and card grids, where a single simultaneous fade reads as a
 * flash. Children must be wrapped in `StaggerItem` — variants propagate by
 * name, so a plain child simply will not animate.
 */
export function Stagger({
  children,
  className,
  whileInView = false,
}: {
  children: ReactNode;
  className?: string;
  whileInView?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      {...(whileInView
        ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
        : { animate: "visible" })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
