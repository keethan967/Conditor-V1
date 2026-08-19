"use client";

import { useState } from "react";
import {
  BellIcon,
  CalendarIcon,
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
  SparklesIcon,
  TrendingUpIcon,
  type LucideIcon,
} from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { EmptyState } from "@/components/feedback/empty-state";
import { Button } from "@/components/ui/button";
import {
  NOTIFICATIONS,
  MOCK_NOW,
  type AppNotification,
  type NotificationType,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/format";

const TYPE_ICON: Record<NotificationType, LucideIcon> = {
  message: MessageCircleIcon,
  match: SparklesIcon,
  view: EyeIcon,
  save: HeartIcon,
  meeting: CalendarIcon,
  milestone: TrendingUpIcon,
  system: BellIcon,
};

export function NotificationsContent() {
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
        </p>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setNotifications((current) => current.map((n) => ({ ...n, read: true })))
            }
          >
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={BellIcon}
          title="No notifications yet"
          description="You're all caught up."
        />
      ) : (
        <div className="flex flex-col divide-y rounded-xl border bg-card">
          {notifications.map((notification) => {
            const Icon = TYPE_ICON[notification.type];

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() =>
                  setNotifications((current) =>
                    current.map((n) =>
                      n.id === notification.id ? { ...n, read: true } : n,
                    ),
                  )
                }
                className={cn(
                  "flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted",
                  !notification.read && "bg-primary-subtle/40",
                )}
              >
                <span className="relative shrink-0">
                  <PersonaAvatar
                    name={notification.actorName}
                    hue={notification.actorHue}
                    size="sm"
                  />
                  <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-background ring-1 ring-border">
                    <Icon
                      className="size-2.5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-pretty">
                    <span className="font-medium">{notification.actorName}</span>{" "}
                    <span className="text-muted-foreground">
                      {notification.message}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatRelativeTime(notification.createdAt, { now: MOCK_NOW })}
                  </p>
                </div>

                {!notification.read && (
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
