"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Logo, LogoMark } from "@/components/brand/logo";
import { MobileTabBar } from "@/components/shell/mobile-tab-bar";
import { getNavItems, navGroupFor } from "@/components/shell/nav-items";
import { SidebarNav } from "@/components/shell/sidebar-nav";
import { Topbar } from "@/components/shell/topbar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { CONVERSATIONS, NOTIFICATIONS } from "@/lib/mock-data";
import type { DemoSession } from "@/lib/session/demo-session";
import { useDemoSession } from "@/providers/demo-session-provider";

/**
 * The authenticated app shell: sidebar, topbar, mobile nav.
 *
 * Lives under `app/` rather than `components/shell` — it's the one place
 * that reads `DemoSessionProvider` directly, and the architecture's boundary
 * rules only let `app`-level code import a provider. Everything it renders
 * (`Topbar`, `SidebarNav`, `UserMenu`, ...) stays presentational and lives in
 * `shared`, receiving the session as props instead of reaching for it themselves.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { session, isHydrated, setSession, signOut } = useDemoSession();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const group = session ? navGroupFor(session.accountType) : "founder";
  const navItems = getNavItems(group);
  const counts = {
    messages: CONVERSATIONS.reduce((sum, c) => sum + c.unreadCount, 0),
    notifications: NOTIFICATIONS.filter((n) => !n.read).length,
  };

  function switchPersona(persona: DemoSession) {
    setSession(persona);
    router.push(ROUTES.dashboard);
    router.refresh();
  }

  function handleSignOut() {
    signOut();
    router.push(ROUTES.home);
    router.refresh();
  }

  if (!isHydrated || !session) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <LogoMark className="size-10 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full">
      <aside className="sticky top-0 hidden h-svh w-(--spacing-sidebar) shrink-0 flex-col border-r bg-sidebar md:flex">
        <div className="flex h-(--spacing-header) shrink-0 items-center border-b border-sidebar-border px-5">
          <Link
            href={ROUTES.dashboard}
            aria-label={`${APP.name} home`}
            className="rounded-md transition-transform duration-base ease-out-quart hover:scale-105 active:scale-95"
          >
            <LogoMark className="size-9" />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <SidebarNav items={navItems} counts={counts} />
        </div>
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetHeader className="h-(--spacing-header) justify-center border-b px-5">
            <SheetTitle asChild>
              <Link href={ROUTES.dashboard} onClick={() => setMobileNavOpen(false)}>
                <Logo markOnly />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-3">
            <SidebarNav
              items={navItems}
              counts={counts}
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-h-svh min-w-0 flex-1 flex-col">
        <Topbar
          session={session}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onSwitchPersona={switchPersona}
          onSignOut={handleSignOut}
        />
        <main id="main" className="min-w-0 flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <MobileTabBar group={group} counts={counts} />
      </div>
    </div>
  );
}
