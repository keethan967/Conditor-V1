"use client";

import Link from "next/link";
import { LogOutIcon, RefreshCwIcon, SettingsIcon } from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCOUNT_TYPES, labelFor } from "@/constants/taxonomy";
import { ROUTES } from "@/constants/routes";
import type { DemoSession } from "@/lib/session/demo-session";
import { QUICK_DEMO_PERSONAS } from "@/lib/session/quick-personas";

interface UserMenuProps {
  session: DemoSession;
  onSwitchPersona: (persona: DemoSession) => void;
  onSignOut: () => void;
}

/**
 * Account menu, plus a "Preview as" role switcher.
 *
 * There is no real multi-account backend behind this — it swaps between the
 * three fixture personas in `quick-personas.ts` so reviewers can see every
 * dashboard variant without signing out and re-onboarding each time.
 *
 * Presentational by design: the session and its mutators are owned by
 * `AppShell` (an `app`-level component, since it consumes `DemoSessionProvider`
 * directly) and passed down as props — this component lives under `shared`,
 * which the architecture's boundary rules never let import a provider.
 */
export function UserMenu({ session, onSwitchPersona, onSignOut }: UserMenuProps) {
  const roleLabel = labelFor(ACCOUNT_TYPES, session.accountType);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-sidebar-accent"
        >
          <PersonaAvatar name={session.fullName} hue={220} size="sm" />
          <span className="hidden min-w-0 flex-col items-start text-left sm:flex">
            <span className="truncate text-xs font-medium text-sidebar-foreground">
              {session.fullName}
            </span>
            <span className="truncate text-[0.6875rem] text-sidebar-foreground/50">
              {roleLabel}
            </span>
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>{session.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={ROUTES.settingsProfile}>
            <SettingsIcon />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-1.5">
          <RefreshCwIcon className="size-3" />
          Preview as
        </DropdownMenuLabel>

        {(
          Object.entries(QUICK_DEMO_PERSONAS) as [
            keyof typeof QUICK_DEMO_PERSONAS,
            (typeof QUICK_DEMO_PERSONAS)[keyof typeof QUICK_DEMO_PERSONAS],
          ][]
        ).map(([key, persona]) => (
          <DropdownMenuItem
            key={key}
            data-variant={
              session.accountType === persona.accountType ? undefined : "default"
            }
            className="capitalize"
            onSelect={() => onSwitchPersona(persona)}
          >
            <PersonaAvatar
              name={persona.fullName}
              hue={220}
              size="sm"
              className="size-4"
            />
            {key}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onSignOut}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
