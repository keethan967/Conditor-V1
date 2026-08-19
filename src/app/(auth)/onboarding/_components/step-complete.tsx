"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MOTION } from "@/components/motion/fade-in";

interface StepCompleteProps {
  headline: string;
  description: string;
  onFinish: () => void;
  isFinishing: boolean;
}

export function StepComplete({
  headline,
  description,
  onFinish,
  isFinishing,
}: StepCompleteProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.div
        initial={prefersReducedMotion ? undefined : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: MOTION.duration, ease: MOTION.ease }}
        className="flex size-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
      >
        <CheckIcon className="size-7" aria-hidden="true" strokeWidth={2.5} />
      </motion.div>

      <div className="flex flex-col gap-2">
        <h1 className="text-display-sm font-bold text-balance">{headline}</h1>
        <p className="max-w-sm text-base text-pretty text-muted-foreground">
          {description}
        </p>
      </div>

      <Button
        size="lg"
        onClick={onFinish}
        disabled={isFinishing}
        className="w-full max-w-xs"
      >
        {isFinishing ? "Setting things up…" : "Go to my home page"}
      </Button>
    </div>
  );
}
