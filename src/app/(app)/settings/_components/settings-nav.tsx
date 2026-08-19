"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  CreditCardIcon,
  ShieldIcon,
  UserIcon,
  UserCogIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Profile", href: ROUTES.settingsProfile, icon: UserIcon },
  { label: "Account", href: ROUTES.settingsAccount, icon: UserCogIcon },
  { label: "Notifications", href: ROUTES.settingsNotifications, icon: BellIcon },
  { label: "Billing", href: ROUTES.settingsBilling, icon: CreditCardIcon },
  { label: "Security", href: ROUTES.settingsSecurity, icon: ShieldIcon },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary-subtle text-primary-subtle-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
