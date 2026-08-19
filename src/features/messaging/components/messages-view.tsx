"use client";

import { useRouter } from "next/navigation";
import { MessageCircleIcon } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/feedback/empty-state";
import { ROUTES, dynamicRoutes } from "@/constants/routes";
import { CONVERSATIONS, type Conversation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { ConversationList } from "./conversation-list";
import { MessageThread, pickCannedReply } from "./message-thread";

export function MessagesView({ activeId }: { activeId?: string }) {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);

  const active = conversations.find((conversation) => conversation.id === activeId);

  function selectConversation(id: string) {
    router.push(dynamicRoutes.conversation(id));
  }

  function sendMessage(conversationId: string, content: string) {
    const outgoing = {
      id: crypto.randomUUID(),
      senderId: "me" as const,
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              lastMessageAt: outgoing.createdAt,
              messages: [...conversation.messages, outgoing],
            }
          : conversation,
      ),
    );

    // Simulated reply — gives the thread a pulse without a real backend.
    setTimeout(() => {
      setConversations((current) =>
        current.map((conversation) => {
          if (conversation.id !== conversationId) return conversation;

          const reply = {
            id: crypto.randomUUID(),
            senderId: "them" as const,
            content: pickCannedReply(conversation.messages.length),
            createdAt: new Date().toISOString(),
            read: true,
          };

          return {
            ...conversation,
            lastMessageAt: reply.createdAt,
            messages: [...conversation.messages, reply],
          };
        }),
      );
    }, 1800);
  }

  return (
    <div className="grid h-[calc(100svh-var(--spacing-header)-4rem)] grid-cols-1 md:h-[calc(100svh-var(--spacing-header))] md:grid-cols-[340px_1fr]">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelect={selectConversation}
        className={cn(active && "hidden md:flex")}
      />

      <div className={cn("flex-col", active ? "flex" : "hidden md:flex")}>
        {active ? (
          <MessageThread
            conversation={active}
            onSendMessage={sendMessage}
            onBack={() => router.push(ROUTES.messages)}
          />
        ) : (
          <EmptyState
            icon={MessageCircleIcon}
            title="Select a conversation"
            description="Choose a conversation from the list to see messages."
            className="h-full justify-center rounded-none border-none"
          />
        )}
      </div>
    </div>
  );
}
