"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCheckIcon,
  MoreVerticalIcon,
  PaperclipIcon,
  SendIcon,
  SmileIcon,
} from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Conversation, Message } from "@/lib/mock-data";
import { MOCK_NOW } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/format";

const CANNED_REPLIES = [
  "Sounds good — let me review and get back to you shortly.",
  "Thanks for the update, this is helpful.",
  "Can you share a bit more detail on that?",
  "Great, let's set up time to go deeper on this.",
];

interface MessageThreadProps {
  conversation: Conversation;
  onSendMessage: (conversationId: string, content: string) => void;
  className?: string;
  onBack?: () => void;
}

export function MessageThread({
  conversation,
  onSendMessage,
  className,
  onBack,
}: MessageThreadProps) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [conversation.messages.length]);

  function handleSend() {
    const content = draft.trim();
    if (!content) return;
    onSendMessage(conversation.id, content);
    setDraft("");
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex shrink-0 items-center gap-3 border-b px-4 py-3">
        {onBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={onBack}
            aria-label="Back"
          >
            ←
          </Button>
        )}
        <PersonaAvatar
          name={conversation.participantName}
          hue={conversation.participantHue}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{conversation.participantName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {conversation.typing ? (
              <span className="text-primary">typing…</span>
            ) : conversation.online ? (
              "Online"
            ) : (
              conversation.participantRole
            )}
          </p>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="More options">
          <MoreVerticalIcon />
        </Button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
        className="flex shrink-0 items-center gap-2 border-t p-3"
      >
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Attach file">
          <PaperclipIcon />
        </Button>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Add emoji">
          <SmileIcon />
        </Button>
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message…"
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!draft.trim()}
          aria-label="Send message"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isMine = message.senderId === "me";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className={cn("flex flex-col gap-1", isMine ? "items-end" : "items-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed text-pretty",
          isMine
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted",
        )}
      >
        {message.content}
        {message.attachment && (
          <div
            className={cn(
              "mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs",
              isMine ? "bg-white/15" : "bg-background",
            )}
          >
            <PaperclipIcon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{message.attachment.name}</span>
            <span className="shrink-0 opacity-70">{message.attachment.size}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 px-1 text-[0.6875rem] text-muted-foreground">
        {formatRelativeTime(message.createdAt, { now: MOCK_NOW })}
        {isMine && (
          <CheckCheckIcon
            className={cn(
              "size-3.5",
              message.read ? "text-primary" : "text-muted-foreground",
            )}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  );
}

export function pickCannedReply(seed: number): string {
  return CANNED_REPLIES[seed % CANNED_REPLIES.length] ?? CANNED_REPLIES[0]!;
}
