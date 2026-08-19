import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { APP } from "@/constants/app";

export const metadata: Metadata = {
  title: "About",
  description:
    "Conditor is built by Aurellus Industries to make raising money more direct.",
};

const VALUES = [
  {
    title: "Direct, not gatekept",
    description:
      "A personal introduction shouldn't be the only way to reach a great investor. A good match should be easy to see and easy to explain.",
  },
  {
    title: "Clear, not noisy",
    description:
      "Every match comes with a reason. Every profile is built to be read in under a minute.",
  },
  {
    title: "Built for both sides",
    description:
      "Founders and investors have different needs — we take both seriously, equally.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <Container width="content" className="flex flex-col gap-6 py-16 sm:py-24">
          <h1 className="max-w-2xl text-display-md font-bold text-balance">
            {APP.tagline}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {APP.description}
          </p>
        </Container>

        <Container width="narrow" className="flex flex-col gap-6 pb-16">
          <p className="text-base leading-relaxed text-pretty text-muted-foreground">
            Raising money still mostly depends on who you already know. {APP.name}{" "}
            exists because a good match between a founder and an investor can be
            figured out from real facts — industry, stage, location, and how much
            they usually invest — instead of luck and cold emails.
          </p>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground">
            {APP.name} is built by {APP.legalName}, a technology company focused on
            making it easier for startups to find funding.
          </p>
        </Container>

        <Container width="content" className="pb-24">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" whileInView>
            {VALUES.map((value) => (
              <StaggerItem key={value.title}>
                <div className="flex h-full flex-col gap-2 rounded-2xl border bg-card p-6">
                  <p className="font-semibold">{value.title}</p>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
