"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { navGroupFor } from "@/components/shell/nav-items";
import { MOTION } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/constants/routes";
import type { AccountType } from "@/constants/taxonomy";
import { useDemoSession } from "@/providers/demo-session-provider";

import { StepComplete } from "./step-complete";
import { StepFounder, type FounderDraft } from "./step-founder";
import { StepInvestor, type InvestorDraft } from "./step-investor";
import { StepProgram, type ProgramDraft } from "./step-program";
import { StepRole } from "./step-role";

const EMPTY_FOUNDER: FounderDraft = {
  startupName: "",
  industry: "",
  country: "",
  fundingStage: "",
  website: "",
  teamSize: "",
  fundingGoal: "",
  traction: "",
};

const EMPTY_INVESTOR: InvestorDraft = {
  industries: [],
  stages: [],
  countriesInput: "",
  avgCheque: "",
  portfolioSize: "",
  interests: "",
};

const EMPTY_PROGRAM: ProgramDraft = {
  programName: "",
  industries: [],
  regions: [],
  focusAreas: "",
};

export function OnboardingFlow() {
  const router = useRouter();
  const { session, setAccountType, completeOnboarding } = useDemoSession();

  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<AccountType | null>(null);
  const [founder, setFounder] = useState(EMPTY_FOUNDER);
  const [investor, setInvestor] = useState(EMPTY_INVESTOR);
  const [program, setProgram] = useState(EMPTY_PROGRAM);
  const [isFinishing, setIsFinishing] = useState(false);

  if (!session) return null;

  const group = navGroupFor(selectedRole ?? "founder");

  function selectRole(accountType: AccountType) {
    setSelectedRole(accountType);
    setAccountType(accountType);
    setStep(1);
  }

  const canContinueDetails =
    group === "founder"
      ? founder.startupName.trim() !== "" &&
        founder.industry !== "" &&
        founder.fundingStage !== "" &&
        founder.country.trim() !== ""
      : group === "investor"
        ? investor.industries.length > 0 &&
          investor.stages.length > 0 &&
          investor.countriesInput.trim() !== ""
        : program.programName.trim() !== "" &&
          program.industries.length > 0 &&
          program.regions.length > 0;

  function finish() {
    setIsFinishing(true);

    if (group === "founder") {
      completeOnboarding({
        founder: {
          startupName: founder.startupName,
          industry: founder.industry || "saas",
          country: founder.country,
          fundingStage: founder.fundingStage || "pre_seed",
          website: founder.website,
          teamSize: founder.teamSize || "1-5",
          fundingGoal: Number(founder.fundingGoal) || 500_000,
          traction: founder.traction,
        },
      });
    } else if (group === "investor") {
      completeOnboarding({
        investor: {
          industries: investor.industries,
          stages: investor.stages,
          countries: investor.countriesInput
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean),
          avgCheque: investor.avgCheque,
          portfolioSize: investor.portfolioSize,
          interests: investor.interests,
        },
      });
    } else {
      completeOnboarding({
        program: {
          programName: program.programName,
          industries: program.industries,
          regions: program.regions,
          focusAreas: program.focusAreas,
        },
      });
    }

    setTimeout(() => {
      router.push(ROUTES.dashboard);
    }, 700);
  }

  const totalSteps = 3;
  const progressValue = ((step + 1) / totalSteps) * 100;

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {step < 2 && (
        <div className="flex flex-col gap-2">
          <Progress value={progressValue} />
          <p className="text-xs text-muted-foreground">
            Step {step + 1} of {totalSteps}
          </p>
        </div>
      )}

      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: MOTION.duration, ease: MOTION.ease }}
          >
            {step === 0 && <StepRole value={selectedRole} onSelect={selectRole} />}

            {step === 1 && group === "founder" && (
              <StepFounder
                value={founder}
                onChange={(patch) =>
                  setFounder((current) => ({ ...current, ...patch }))
                }
              />
            )}

            {step === 1 && group === "investor" && (
              <StepInvestor
                value={investor}
                onChange={(patch) =>
                  setInvestor((current) => ({ ...current, ...patch }))
                }
              />
            )}

            {step === 1 && group === "program" && (
              <StepProgram
                value={program}
                onChange={(patch) =>
                  setProgram((current) => ({ ...current, ...patch }))
                }
              />
            )}

            {step === 2 && (
              <StepComplete
                headline={`You're all set, ${session.fullName.split(" ")[0]}.`}
                description="Everything is set up just for you. Your matches and recommendations are already waiting."
                onFinish={finish}
                isFinishing={isFinishing}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {step === 1 && (
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button variant="ghost" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)} disabled={!canContinueDetails}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
