"use client";

import { PinIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Input } from "@/components/ui/input";
import type { Conversation } from "@/lib/mock-data";
import { MOCK_NOW } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/format";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | undefined;
  onSelect: (id: string) => void;
  className?: string;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  className,
}: ConversationListProps) {
  const [query, setQuery] = useState("");

  const filtered = conversations
    .filter((conversation) =>
      conversation.participantName.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
    });

  return (
    <div className={cn("flex h-full flex-col border-r", className)}>
      <div className="shrink-0 border-b p-3">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search messages…"
            className="h-9 pl-8"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map((conversation) => {
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          const isActive = conversation.id === activeId;

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors",
                isActive ? "bg-primary-subtle" : "hover:bg-muted",
              )}
            >
              <span className="relative shrink-0">
                <PersonaAvatar
                  name={conversation.participantName}
                  hue={conversation.participantHue}
                />
                {conversation.online && (
                  <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-success ring-2 ring-background" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">
                    {conversation.participantName}
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatRelativeTime(conversation.lastMessageAt, { now: MOCK_NOW })}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {conversation.typing ? (
                    <span className="text-primary">typing…</span>
                  ) : (
                    lastMessage?.content
                  )}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
                {conversation.pinned && (
                  <PinIcon
                    className="size-3 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
                {conversation.unreadCount > 0 && (
                  <span className="tabular flex size-4.5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No conversations found.
          </p>
        )}
      </div>
    </div>
  );
}
