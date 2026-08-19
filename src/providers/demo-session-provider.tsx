"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  clearDemoSessionCookie,
  readDemoSessionCookie,
  writeDemoSessionCookie,
} from "@/lib/session/client";
import type { DemoSession } from "@/lib/session/demo-session";
import type { AccountType } from "@/constants/taxonomy";

interface DemoSessionContextValue {
  session: DemoSession | null;
  /** False until the cookie has been read on the client — gate first render on this to avoid a flash of the wrong state. */
  isHydrated: boolean;
  /** Starts a fresh, not-yet-onboarded session — the sign-up path. Role defaults to founder until onboarding step 1 sets it. */
  startSession: (input: { fullName: string; email: string }) => void;
  /** Replaces the session outright — used by the one-click demo personas on sign-in. */
  setSession: (session: DemoSession) => void;
  /** Onboarding step 1 — "What best describes you?" */
  setAccountType: (accountType: AccountType) => void;
  /** Merges onboarding answers in and marks the flow complete. */
  completeOnboarding: (
    patch: Partial<Pick<DemoSession, "founder" | "investor" | "program">>,
  ) => void;
  /** Settings → Profile edits — same shape as onboarding but without forcing `onboardingComplete`. */
  updateProfile: (
    patch: Partial<Pick<DemoSession, "fullName" | "founder" | "investor" | "program">>,
  ) => void;
  signOut: () => void;
}

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<DemoSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // `document.cookie` doesn't exist during SSR, so the session can only be
    // read after mount. Setting state here (once, on mount) is the standard
    // fix for the hydration mismatch that would follow from reading it during
    // render instead — not the cascading-render pattern this rule targets.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionState(readDemoSessionCookie());
    setIsHydrated(true);
  }, []);

  const persist = useCallback((next: DemoSession | null) => {
    setSessionState(next);

    if (next) {
      writeDemoSessionCookie(next);
    } else {
      clearDemoSessionCookie();
    }
  }, []);

  const startSession = useCallback<DemoSessionContextValue["startSession"]>(
    ({ fullName, email }) => {
      persist({
        accountType: "founder",
        fullName,
        email,
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
      });
    },
    [persist],
  );

  const setSession = useCallback<DemoSessionContextValue["setSession"]>(
    (next) => persist(next),
    [persist],
  );

  const setAccountType = useCallback<DemoSessionContextValue["setAccountType"]>(
    (accountType) => {
      setSessionState((current) => {
        if (!current) return current;
        const next: DemoSession = { ...current, accountType };
        writeDemoSessionCookie(next);
        return next;
      });
    },
    [],
  );

  const completeOnboarding = useCallback<DemoSessionContextValue["completeOnboarding"]>(
    (patch) => {
      setSessionState((current) => {
        if (!current) return current;

        const next: DemoSession = { ...current, ...patch, onboardingComplete: true };
        writeDemoSessionCookie(next);
        return next;
      });
    },
    [],
  );

  const updateProfile = useCallback<DemoSessionContextValue["updateProfile"]>(
    (patch) => {
      setSessionState((current) => {
        if (!current) return current;

        const next: DemoSession = {
          ...current,
          ...patch,
          founder: patch.founder
            ? { ...current.founder, ...patch.founder }
            : current.founder,
          investor: patch.investor
            ? { ...current.investor, ...patch.investor }
            : current.investor,
          program: patch.program
            ? { ...current.program, ...patch.program }
            : current.program,
        };
        writeDemoSessionCookie(next);
        return next;
      });
    },
    [],
  );

  const signOut = useCallback(() => persist(null), [persist]);

  return (
    <DemoSessionContext.Provider
      value={{
        session,
        isHydrated,
        startSession,
        setSession,
        setAccountType,
        completeOnboarding,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </DemoSessionContext.Provider>
  );
}

export function useDemoSession(): DemoSessionContextValue {
  const context = useContext(DemoSessionContext);

  if (!context) {
    throw new Error("useDemoSession must be used within a DemoSessionProvider");
  }

  return context;
}
