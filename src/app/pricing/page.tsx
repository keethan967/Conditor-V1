import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for founders, investors and accelerators.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For founders exploring the network.",
    features: [
      "Full profile & pitch builder",
      "5 investor introductions / month",
      "Discover feed & Founder Rooms",
      "1 active conversation thread",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/ month",
    description: "For founders actively fundraising.",
    features: [
      "Unlimited investor introductions",
      "Full 'Ready for investors' tools",
      "AI helper — pitch review & outreach",
      "Priority placement in investor search",
      "Unlimited messaging",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For accelerators, funds and institutions.",
    features: [
      "Everything in Pro",
      "Applications & group management",
      "Dedicated account manager",
      "Single sign-on & custom data retention",
      "API access",
    ],
    cta: "Contact sales",
    featured: false,
  },
] as const;

const FAQS = [
  {
    question: "Is Conditor free for investors?",
    answer:
      "Yes — Discover, investment opportunities, your investments and messaging are all free for angel investors, VCs and family offices. Enterprise pricing only applies to funds that need single sign-on or API access.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade, downgrade or cancel at any time from Settings → Billing.",
  },
  {
    question: "Do accelerators get a discount for multiple programs?",
    answer:
      "Yes — contact sales for a discount across multiple groups and programs.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <Container
          width="content"
          className="flex flex-col gap-4 py-16 text-center sm:py-24"
        >
          <h1 className="text-display-md font-bold text-balance">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto max-w-xl text-lg text-pretty text-muted-foreground">
            Start free. Upgrade when you&apos;re actively raising.
          </p>
        </Container>

        <Container width="content" className="pb-16 sm:pb-24">
          <Stagger className="grid grid-cols-1 gap-6 lg:grid-cols-3" whileInView>
            {PLANS.map((plan) => (
              <StaggerItem key={plan.name}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-6 rounded-2xl border p-6",
                    plan.featured
                      ? "border-primary bg-primary-subtle/40 shadow-lg"
                      : "bg-card",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{plan.name}</p>
                    {plan.featured && <Badge>Most popular</Badge>}
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-display-xs font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">{plan.description}</p>

                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckIcon
                          className="mt-0.5 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="mt-auto"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    <Link
                      href={plan.name === "Enterprise" ? ROUTES.contact : ROUTES.signUp}
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>

        <Container width="narrow" className="flex flex-col gap-6 pb-24">
          <h2 className="text-center text-2xl font-semibold">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
