"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";
import { useDemoSession } from "@/providers/demo-session-provider";

export function AccountContent() {
  const router = useRouter();
  const { session, signOut } = useDemoSession();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Email</h2>
        <Field>
          <FieldLabel htmlFor="email">Current email</FieldLabel>
          <Input id="email" value={session.email} disabled />
        </Field>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Password</h2>
        <Field>
          <FieldLabel htmlFor="new-password">New password</FieldLabel>
          <Input id="new-password" type="password" placeholder="••••••••" />
        </Field>
        <Button
          variant="outline"
          className="w-fit"
          onClick={() =>
            toast.info("Not available in this preview", {
              description: "Password changes require a connected account.",
            })
          }
        >
          Update password
        </Button>
      </section>

      <Separator />

      <section className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive-subtle/30 p-4">
        <h2 className="text-sm font-semibold text-destructive">Danger zone</h2>
        <p className="text-sm text-muted-foreground">
          Deleting your account signs you out and clears this preview session.
        </p>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-fit">
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription>
                This clears your current session. This cannot be undone in this preview.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton>
              <Button
                variant="destructive"
                onClick={() => {
                  signOut();
                  router.push(ROUTES.home);
                }}
              >
                Delete account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
