"use client";

import { useState } from "react";

import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface Preference {
  key: string;
  label: string;
  description: string;
  defaultChecked: boolean;
}

const EMAIL_PREFS: Preference[] = [
  {
    key: "email-messages",
    label: "New messages",
    description: "Get an email when someone messages you.",
    defaultChecked: true,
  },
  {
    key: "email-matches",
    label: "New investor matches",
    description: "A weekly email about your best new matches.",
    defaultChecked: true,
  },
  {
    key: "email-views",
    label: "Profile views",
    description: "Notify when an investor views your profile.",
    defaultChecked: false,
  },
];

const PRODUCT_PREFS: Preference[] = [
  {
    key: "app-messages",
    label: "Messages",
    description: "Show a badge for unread messages.",
    defaultChecked: true,
  },
  {
    key: "app-rooms",
    label: "Founder Rooms activity",
    description: "Replies and reactions on your posts.",
    defaultChecked: true,
  },
  {
    key: "app-milestones",
    label: "Milestone alerts",
    description: "When your 'Ready for investors' score changes.",
    defaultChecked: true,
  },
];

function PreferenceRow({ preference }: { preference: Preference }) {
  const [checked, setChecked] = useState(preference.defaultChecked);

  return (
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor={preference.key}>{preference.label}</FieldLabel>
        <FieldDescription>{preference.description}</FieldDescription>
      </FieldContent>
      <Switch id={preference.key} checked={checked} onCheckedChange={setChecked} />
    </Field>
  );
}

export function NotificationsContent() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Email notifications</h2>
        {EMAIL_PREFS.map((preference) => (
          <PreferenceRow key={preference.key} preference={preference} />
        ))}
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">In-app notifications</h2>
        {PRODUCT_PREFS.map((preference) => (
          <PreferenceRow key={preference.key} preference={preference} />
        ))}
      </section>
    </div>
  );
}
