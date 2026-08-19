"use client";

import { useRouter } from "next/navigation";
import { BriefcaseIcon, GraduationCapIcon, RocketIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { QUICK_DEMO_PERSONAS } from "@/lib/session/quick-personas";
import { useDemoSession } from "@/providers/demo-session-provider";

const PERSONA_META: Record<
  keyof typeof QUICK_DEMO_PERSONAS,
  { label: string; description: string; icon: LucideIcon }
> = {
  founder: {
    label: "Founder",
    description: "Orbital Health — Series A, healthtech",
    icon: RocketIcon,
  },
  investor: {
    label: "Investor",
    description: "Kestrel Ventures — Partner",
    icon: BriefcaseIcon,
  },
  accelerator: {
    label: "Accelerator",
    description: "Ignition Labs — Program lead",
    icon: GraduationCapIcon,
  },
};

/** Instant, fully-populated demo access — no credentials required. */
export function DemoPersonaCards() {
  const router = useRouter();
  const { setSession } = useDemoSession();

  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
      {(Object.keys(QUICK_DEMO_PERSONAS) as (keyof typeof QUICK_DEMO_PERSONAS)[]).map(
        (key) => {
          const meta = PERSONA_META[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSession(QUICK_DEMO_PERSONAS[key]);
                router.push(ROUTES.dashboard);
              }}
              className="flex lift flex-col items-start gap-2 rounded-xl border bg-card p-3.5 text-left"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary-subtle text-primary-subtle-foreground">
                <meta.icon className="size-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium">{meta.label}</p>
                <p className="text-xs text-muted-foreground">{meta.description}</p>
              </div>
            </button>
          );
        },
      )}
    </div>
  );
}
