"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";

import { getNavItems, type NavGroup } from "@/components/shell/nav-items";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface MobileTabBarProps {
  group: NavGroup;
  counts: Partial<Record<"messages" | "notifications", number>>;
}

/** Instagram-style bottom tab bar, shown below `md`. The sidebar covers the same items on larger screens. */
export function MobileTabBar({ group, counts }: MobileTabBarProps) {
  const pathname = usePathname();
  const [dashboard, second, , messages] = getNavItems(group);

  const tabs = [dashboard, second, messages].filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center justify-around border-t bg-background/95 backdrop-blur-md md:hidden">
      {tabs.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const count = item.countKey ? counts[item.countKey] : undefined;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-muted-foreground"
          >
            <item.icon
              className={cn("size-5", isActive && "text-primary")}
              aria-hidden="true"
              fill={isActive ? "currentColor" : "none"}
              fillOpacity={isActive ? 0.12 : 0}
            />
            {!!count && (
              <span className="absolute top-0.5 right-[calc(50%-14px)] flex size-2 rounded-full bg-destructive" />
            )}
          </Link>
        );
      })}

      <Link
        href={ROUTES.notifications}
        aria-current={pathname === ROUTES.notifications ? "page" : undefined}
        className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-muted-foreground"
      >
        <BellIcon
          className={cn("size-5", pathname === ROUTES.notifications && "text-primary")}
          aria-hidden="true"
        />
        {!!counts.notifications && (
          <span className="absolute top-0.5 right-[calc(50%-14px)] flex size-2 rounded-full bg-destructive" />
        )}
      </Link>
    </nav>
  );
}
