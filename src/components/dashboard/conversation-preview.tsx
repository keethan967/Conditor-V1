import Link from "next/link";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { dynamicRoutes } from "@/constants/routes";
import type { Conversation } from "@/lib/mock-data";
import { formatRelativeTime } from "@/utils/format";

export function ConversationPreview({
  conversation,
  now,
}: {
  conversation: Conversation;
  now: Date;
}) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <Link
      href={dynamicRoutes.conversation(conversation.id)}
      className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
    >
      <PersonaAvatar
        name={conversation.participantName}
        hue={conversation.participantHue}
        size="sm"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{conversation.participantName}</p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatRelativeTime(conversation.lastMessageAt, { now })}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{lastMessage?.content}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="mt-1 flex size-2 shrink-0 rounded-full bg-primary" />
      )}
    </Link>
  );
}
