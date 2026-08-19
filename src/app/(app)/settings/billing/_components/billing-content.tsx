"use client";

import { CreditCardIcon, ReceiptIcon } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/feedback/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function BillingContent() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Plan</h2>
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold">Free</p>
              <Badge variant="secondary">Current plan</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Unlimited browsing, 5 investor introductions per month.
            </p>
          </div>
          <Button
            onClick={() =>
              toast.info("Not available in this preview", {
                description: "Plan upgrades require a connected billing provider.",
              })
            }
          >
            Upgrade to Pro
          </Button>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Payment method</h2>
        <EmptyState
          icon={CreditCardIcon}
          size="sm"
          title="No payment method on file"
          description="Add a card to upgrade your plan when you're ready."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                toast.info("Not available in this preview", {
                  description: "Card details require a connected billing provider.",
                })
              }
            >
              Add payment method
            </Button>
          }
        />
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Invoices</h2>
        <EmptyState
          icon={ReceiptIcon}
          size="sm"
          title="No invoices yet"
          description="Invoices appear here once you're on a paid plan."
        />
      </section>
    </div>
  );
}
