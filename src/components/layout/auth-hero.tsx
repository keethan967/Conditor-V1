"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon, TrendingUpIcon } from "lucide-react";

import { LogoMark } from "@/components/brand/logo";
import { MatchScoreBadge } from "@/components/entity/match-score-badge";
import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Sparkline } from "@/components/dashboard/sparkline";
import { APP } from "@/constants/app";
import { cn } from "@/lib/utils";

interface FloatCardProps {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

/** A glass card that drifts gently in place — decorative, never load-bearing. */
function FloatCard({ className, delay = 0, duration = 5, children }: FloatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "absolute hidden rounded-2xl border border-white/15 bg-white/10 p-3.5 shadow-xl backdrop-blur-md lg:block",
        className,
      )}
      initial={{ opacity: 0, y: 16 }}
      animate={
        prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.5 }
          : {
              opacity: { duration: 0.6, delay },
              y: { duration, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
    >
      {children}
    </motion.div>
  );
}

const HEADLINE_WORDS = [
  "Where",
  "founders",
  "and",
  "investors",
  "find",
  "each",
  "other.",
];

/**
 * Left-hand hero panel for every unauthenticated screen — sign-in, sign-up,
 * onboarding. Decorative only: the floating cards reuse real product
 * components (`MatchScoreBadge`, `PersonaAvatar`, `Sparkline`) so the
 * illustration is built from the actual design system rather than a one-off
 * asset, and stays honest about what the product looks like.
 */
export function AuthHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative hidden overflow-hidden bg-aurora lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12 xl:w-[42%]">
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid"
        aria-hidden="true"
      />

      {/* Ambient glow — a second, slower-breathing light behind the headline. */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute top-1/3 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center gap-3"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/90 p-1.5 shadow-lg">
          <LogoMark className="size-full" />
        </span>
        <span className="text-xl font-bold tracking-tight text-white">{APP.name}</span>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-5">
        <h1 className="max-w-md text-display-md font-bold text-balance text-white">
          {HEADLINE_WORDS.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 0.15 + index * 0.05,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-sm text-base leading-relaxed text-pretty text-white/70"
        >
          {APP.description}
        </motion.p>
      </div>

      {/* Floating proof cards — purely decorative, built from real UI. */}
      <div className="relative h-56 shrink-0">
        <FloatCard className="top-0 left-0" duration={5.5}>
          <div className="flex items-center gap-2.5">
            <PersonaAvatar name="Amara Chen" hue={258} size="sm" />
            <div>
              <p className="text-sm font-medium text-white">Amara Chen</p>
              <p className="text-xs text-white/60">Kestrel Ventures</p>
            </div>
            <MatchScoreBadge score={98} size="sm" className="ml-2" />
          </div>
        </FloatCard>

        <FloatCard className="top-28 left-8" delay={0.8} duration={6}>
          <div className="flex items-center gap-2 text-white">
            <TrendingUpIcon className="size-4 text-emerald-300" aria-hidden="true" />
            <span className="text-xs text-white/60">Profile views</span>
          </div>
          <div className="mt-1 flex items-end gap-2">
            <span className="tabular text-lg font-bold text-white">1,284</span>
            <Sparkline
              values={[62, 74, 68, 91, 103, 88, 122]}
              className="mb-0.5 h-6 w-16"
              strokeClassName="stroke-emerald-300"
            />
          </div>
        </FloatCard>

        <FloatCard className="top-4 right-0" delay={1.4} duration={5}>
          <div className="flex items-center gap-2 text-sm text-white">
            <CheckIcon className="size-3.5 text-emerald-300" aria-hidden="true" />
            Ready for investors
          </div>
          <p className="mt-1 text-xs text-white/60">86 / 100 — strong</p>
        </FloatCard>
      </div>
    </div>
  );
}
