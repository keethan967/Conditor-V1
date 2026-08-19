"use client";

import { useState } from "react";
import { SendIcon } from "lucide-react";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { FeedPost } from "@/lib/mock-data";
import { MOCK_NOW } from "@/lib/mock-data";
import { useDemoSession } from "@/providers/demo-session-provider";
import { formatRelativeTime } from "@/utils/format";

interface CommentsDialogProps {
  post: FeedPost | null;
  onOpenChange: (open: boolean) => void;
  onAddComment: (postId: string, content: string) => void;
}

export function CommentsDialog({
  post,
  onOpenChange,
  onAddComment,
}: CommentsDialogProps) {
  const { session } = useDemoSession();
  const [draft, setDraft] = useState("");

  return (
    <Dialog open={!!post} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>

        {post && (
          <div className="flex flex-col gap-4">
            <div className="flex max-h-80 flex-col gap-4 overflow-y-auto">
              {post.comments.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No comments yet — be the first to weigh in.
                </p>
              )}

              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5">
                  <PersonaAvatar
                    name={comment.authorName}
                    hue={comment.authorHue}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{comment.authorName}</span>{" "}
                      <span className="text-muted-foreground">{comment.content}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatRelativeTime(comment.createdAt, { now: MOCK_NOW })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!draft.trim()) return;
                onAddComment(post.id, draft.trim());
                setDraft("");
              }}
              className="flex items-center gap-2 border-t pt-3"
            >
              <PersonaAvatar name={session?.fullName ?? "You"} hue={220} size="sm" />
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Add a comment…"
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon-sm"
                disabled={!draft.trim()}
                aria-label="Post comment"
              >
                <SendIcon />
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
