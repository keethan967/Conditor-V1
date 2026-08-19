"use client";

import { MenuIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CopilotTrigger } from "@/components/copilot/copilot-trigger";
import { NotificationsBell } from "@/components/shell/notifications-bell";
import { UserMenu } from "@/components/shell/user-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ROUTES } from "@/constants/routes";
import type { DemoSession } from "@/lib/session/demo-session";

interface TopbarProps {
  session: DemoSession;
  onOpenMobileNav: () => void;
  onSwitchPersona: (persona: DemoSession) => void;
  onSignOut: () => void;
}

export function Topbar({
  session,
  onOpenMobileNav,
  onSwitchPersona,
  onSignOut,
}: TopbarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 flex h-(--spacing-header) shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        aria-label="Open navigation"
        onClick={onOpenMobileNav}
      >
        <MenuIcon />
      </Button>

      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          router.push(
            query.trim()
              ? `${ROUTES.search}?q=${encodeURIComponent(query.trim())}`
              : ROUTES.search,
          );
        }}
        className="relative hidden max-w-sm flex-1 sm:block"
      >
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search startups, investors, programs…"
          className="h-8 w-full rounded-lg border border-input bg-transparent pr-3 pl-8 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </form>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground sm:hidden"
          aria-label="Search"
          onClick={() => router.push(ROUTES.search)}
        >
          <SearchIcon />
        </Button>
        <CopilotTrigger />
        <NotificationsBell />
        <ThemeToggle />
        <div className="ml-1">
          <UserMenu
            session={session}
            onSwitchPersona={onSwitchPersona}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </header>
  );
}
