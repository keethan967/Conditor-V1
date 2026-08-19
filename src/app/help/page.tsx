import type { Metadata } from "next";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";
import { APP } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Help center",
  description: "Answers to common questions about Conditor.",
};

const CATEGORIES = [
  {
    title: "Getting started",
    items: [
      {
        question: "How does sign up work?",
        answer:
          "After you sign up, tell us if you're a founder, investor, or accelerator, and answer a few quick questions. We'll set up your home page and matches right away.",
      },
      {
        question: "Can I switch my role later?",
        answer: "Yes — use the menu in the top right, or update your details in Settings → Profile.",
      },
    ],
  },
  {
    title: "For founders",
    items: [
      {
        question: "How is my 'Ready for investors' score worked out?",
        answer:
          "It looks at how complete your profile, pitch, and growth numbers are. Add your funding goal, a short pitch, and your growth numbers to raise your score.",
      },
      {
        question: "How does investor matching work?",
        answer:
          "We rank investors by how well they match your industry, stage, location, and how much they usually invest. Every match shows exactly why we picked them.",
      },
    ],
  },
  {
    title: "For investors",
    items: [
      {
        question: "How do I track startups I'm interested in?",
        answer:
          "Investment Opportunities gives you a simple board — from first look to invested — for every startup you're considering.",
      },
      {
        question: "Can I set what I'm looking for?",
        answer:
          "Yes — from sign up or Settings → Profile: industries, stages, how much you invest, and location all shape your recommendations.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <Container
          width="content"
          className="flex flex-col gap-4 py-16 text-center sm:py-24"
        >
          <h1 className="text-display-md font-bold text-balance">How can we help?</h1>
          <p className="mx-auto max-w-xl text-lg text-pretty text-muted-foreground">
            Simple answers to the questions we hear most from founders, investors and program
            teams.
          </p>
        </Container>

        <Container width="narrow" className="flex flex-col gap-10 pb-16">
          {CATEGORIES.map((category) => (
            <div key={category.title} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">{category.title}</h2>
              <Accordion type="single" collapsible>
                {category.items.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </Container>

        <Container
          width="narrow"
          className="mb-24 flex flex-col items-center gap-4 rounded-2xl border bg-card p-10 text-center"
        >
          <h2 className="text-xl font-semibold">Still need help?</h2>
          <p className="max-w-sm text-sm text-pretty text-muted-foreground">
            Reach out and we&apos;ll get back to you at {APP.supportEmail}.
          </p>
          <Button asChild>
            <Link href={ROUTES.contact}>Contact support</Link>
          </Button>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
