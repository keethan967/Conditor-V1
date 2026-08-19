"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { AuthHero } from "@/components/layout/auth-hero";
import { MOTION } from "@/components/motion/fade-in";
import { ThemeToggle } from "@/components/theme-toggle";
import { ROUTES } from "@/constants/routes";

/** Minimal chrome plus a brand hero for sign-in, sign-up and onboarding — the flow itself is the content. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex min-h-svh w-full">
      <AuthHero />

      <div className="flex flex-1 flex-col">
        <header className="flex h-(--spacing-header) shrink-0 items-center justify-between px-4 sm:px-6 lg:justify-end">
          <Link href={ROUTES.home} className="rounded-md lg:hidden">
            <Logo />
          </Link>
          <ThemeToggle />
        </header>

        <main id="main" className="flex flex-1 items-center justify-center px-4 py-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: MOTION.duration, ease: MOTION.ease }}
              className="flex w-full flex-col items-center"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
