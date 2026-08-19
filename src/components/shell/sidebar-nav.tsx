"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import type { NavItem } from "@/components/shell/nav-items";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  items: NavItem[];
  counts: Partial<Record<NonNullable<NavItem["countKey"]>, number>>;
  onNavigate?: () => void;
  className?: string;
}

export function SidebarNav({ items, counts, onNavigate, className }: SidebarNavProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav className={cn("flex flex-col gap-0.5", className)}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const count = item.countKey ? counts[item.countKey] : undefined;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors",
              "hover:text-sidebar-accent-foreground",
              isActive && "text-sidebar-accent-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="sidebar-active-pill"
                className="absolute inset-0 rounded-lg bg-sidebar-accent"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 500, damping: 34 }
                }
              />
            )}

            <item.icon
              className={cn(
                "relative z-10 size-4 shrink-0 text-sidebar-foreground/50 transition-colors group-hover:text-sidebar-primary",
                isActive && "text-sidebar-primary",
              )}
              aria-hidden="true"
            />
            <span className="relative z-10 min-w-0 flex-1 truncate">{item.label}</span>
            {!!count && (
              <Badge
                variant="secondary"
                className="tabular relative z-10 h-5 min-w-5 justify-center px-1"
              >
                {count > 99 ? "99+" : count}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
