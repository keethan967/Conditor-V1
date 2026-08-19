"use client";

import { useState } from "react";
import {
  BookOpenIcon,
  FileTextIcon,
  MailIcon,
  SendIcon,
  SearchIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  COPILOT_SUGGESTIONS,
  getCopilotReply,
  type CopilotMessage,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SUGGESTION_ICONS = {
  search: SearchIcon,
  sparkles: SparklesIcon,
  file: FileTextIcon,
  mail: MailIcon,
  book: BookOpenIcon,
  trending: TrendingUpIcon,
} as const;

interface CopilotPanelProps {
  className?: string;
  /** `page` gives messages more breathing room; `panel` is tuned for the slide-over. */
  variant?: "panel" | "page";
}

export function CopilotPanel({ className, variant = "panel" }: CopilotPanelProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  function send(content: string, suggestionId: string | null = null) {
    const trimmed = content.trim();
    if (!trimmed || isThinking) return;

    const userMessage: CopilotMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulated latency — long enough to read as "thinking", short enough not to feel broken.
    setTimeout(() => {
      const reply = getCopilotReply(suggestionId, trimmed);
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
      setIsThinking(false);
    }, 900);
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex items-center gap-2.5 border-b px-4 py-3.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
          <SparklesIcon className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Conditor Copilot</p>
          <p className="truncate text-xs text-muted-foreground">
            Investors, profile, pitch and strategy — ask anything.
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto px-4 py-4",
          variant === "page" && "mx-auto w-full max-w-2xl",
        )}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Try one of these, or ask your own question below.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {COPILOT_SUGGESTIONS.map((suggestion) => {
                const Icon = SUGGESTION_ICONS[suggestion.icon];
                return (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => send(suggestion.prompt, suggestion.id)}
                    className="flex lift items-start gap-2.5 rounded-xl border bg-card p-3 text-left text-sm"
                  >
                    <Icon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="font-medium">{suggestion.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex flex-col gap-1",
                  message.role === "user" ? "items-end" : "items-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed text-pretty",
                    message.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground",
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                <Spinner className="size-3.5" label={null} />
                Thinking…
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className={cn(
          "flex items-end gap-2 border-t p-3",
          variant === "page" && "mx-auto w-full max-w-2xl",
        )}
      >
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask Conditor Copilot anything…"
          rows={1}
          className="max-h-32 min-h-9 flex-1 resize-none"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isThinking}
          aria-label="Send"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}
