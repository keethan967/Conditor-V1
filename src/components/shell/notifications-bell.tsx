"use client";

import Link from "next/link";
import { BellIcon } from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { MOCK_NOW, NOTIFICATIONS } from "@/lib/mock-data";
import { formatRelativeTime } from "@/utils/format";

export function NotificationsBell() {
  const unread = NOTIFICATIONS.filter((notification) => !notification.read);
  const preview = NOTIFICATIONS.slice(0, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative text-muted-foreground hover:text-foreground"
          aria-label={`Notifications${unread.length ? `, ${unread.length} unread` : ""}`}
        >
          <BellIcon />
          {unread.length > 0 && (
            <span className="absolute top-1 right-1 flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-destructive" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unread.length > 0 && (
            <span className="text-xs font-normal text-muted-foreground">
              {unread.length} unread
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {preview.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className="items-start gap-2.5 py-2"
            asChild
          >
            <Link href={ROUTES.notifications}>
              <PersonaAvatar
                name={notification.actorName}
                hue={notification.actorHue}
                size="sm"
              />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm leading-snug text-pretty">
                  <span className="font-medium">{notification.actorName}</span>{" "}
                  <span className="text-muted-foreground">{notification.message}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(notification.createdAt, { now: MOCK_NOW })}
                </span>
              </span>
              {!notification.read && (
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.notifications} className="justify-center text-primary">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
