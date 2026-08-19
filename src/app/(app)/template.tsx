"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { MOTION } from "@/components/motion/fade-in";

/**
 * Re-mounts on every navigation (unlike `layout.tsx`, which persists) — the
 * one hook Next.js gives us to animate between pages without re-animating
 * the sidebar/topbar that live in the layout around it.
 */
export default function AppTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION.duration, ease: MOTION.ease }}
    >
      {children}
    </motion.div>
  );
}
