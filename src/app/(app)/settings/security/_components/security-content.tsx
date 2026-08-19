"use client";

import { useState } from "react";
import { LaptopIcon, SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const SESSIONS = [
  {
    id: "s1",
    device: "This device",
    detail: "Windows · Chrome",
    icon: LaptopIcon,
    current: true,
  },
  {
    id: "s2",
    device: "iPhone 16",
    detail: "Last active 2 days ago",
    icon: SmartphoneIcon,
    current: false,
  },
];

export function SecurityContent() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Two-factor authentication</h2>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="2fa">Require a code at sign-in</FieldLabel>
            <FieldDescription>
              Adds an extra step when signing in from a new device.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="2fa"
            checked={twoFactor}
            onCheckedChange={(checked) => {
              setTwoFactor(checked);
              toast.success(
                checked
                  ? "Two-factor authentication enabled"
                  : "Two-factor authentication disabled",
              );
            }}
          />
        </Field>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Active sessions</h2>
        <div className="flex flex-col divide-y">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center gap-3 py-3">
              <session.icon
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {session.device}{" "}
                  {session.current && <span className="text-primary">(current)</span>}
                </p>
                <p className="text-xs text-muted-foreground">{session.detail}</p>
              </div>
              {!session.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSessions((current) =>
                      current.filter((item) => item.id !== session.id),
                    );
                    toast.success("Session signed out");
                  }}
                >
                  Sign out
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
