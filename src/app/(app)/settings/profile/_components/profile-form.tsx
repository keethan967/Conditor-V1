"use client";

import { useState } from "react";
import { toast } from "sonner";

import { PersonaAvatar } from "@/components/entity/persona-avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDemoSession } from "@/providers/demo-session-provider";

export function ProfileForm() {
  const { session, updateProfile } = useDemoSession();
  const [fullName, setFullName] = useState(session?.fullName ?? "");
  const [startupName, setStartupName] = useState(session?.founder?.startupName ?? "");
  const [website, setWebsite] = useState(session?.founder?.website ?? "");
  const [interests, setInterests] = useState(session?.investor?.interests ?? "");
  const [avgCheque, setAvgCheque] = useState(session?.investor?.avgCheque ?? "");
  const [programName, setProgramName] = useState(session?.program?.programName ?? "");
  const [focusAreas, setFocusAreas] = useState(session?.program?.focusAreas ?? "");
  const [isSaving, setIsSaving] = useState(false);

  if (!session) return null;

  async function handleSave() {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    updateProfile({
      fullName,
      ...(session?.founder && {
        founder: { ...session.founder, startupName, website },
      }),
      ...(session?.investor && {
        investor: { ...session.investor, interests, avgCheque },
      }),
      ...(session?.program && {
        program: { ...session.program, programName, focusAreas },
      }),
    });

    setIsSaving(false);
    toast.success("Profile updated");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <PersonaAvatar name={fullName} hue={220} size="lg" />
        <div>
          <p className="text-sm font-medium">Profile photo</p>
          <p className="text-xs text-muted-foreground">
            Generated from your name — upload support coming with real accounts.
          </p>
        </div>
      </div>

      <Field>
        <FieldLabel htmlFor="fullName">Full name</FieldLabel>
        <Input
          id="fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" value={session.email} disabled />
      </Field>

      {session.founder && (
        <>
          <Field>
            <FieldLabel htmlFor="startupName">Startup name</FieldLabel>
            <Input
              id="startupName"
              value={startupName}
              onChange={(event) => setStartupName(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="website">Website</FieldLabel>
            <Input
              id="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </Field>
        </>
      )}

      {session.investor && (
        <>
          <Field>
            <FieldLabel htmlFor="avgCheque">Usual amount you invest</FieldLabel>
            <Input
              id="avgCheque"
              value={avgCheque}
              onChange={(event) => setAvgCheque(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="interests">What you&apos;re looking for</FieldLabel>
            <Textarea
              id="interests"
              rows={3}
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
            />
          </Field>
        </>
      )}

      {session.program && (
        <>
          <Field>
            <FieldLabel htmlFor="programName">Program name</FieldLabel>
            <Input
              id="programName"
              value={programName}
              onChange={(event) => setProgramName(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="focusAreas">
              What you look for in applicants
            </FieldLabel>
            <Textarea
              id="focusAreas"
              rows={3}
              value={focusAreas}
              onChange={(event) => setFocusAreas(event.target.value)}
            />
          </Field>
        </>
      )}

      <Button onClick={handleSave} disabled={isSaving} className="w-fit">
        {isSaving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
