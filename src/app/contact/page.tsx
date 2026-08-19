import type { Metadata } from "next";
import { MailIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { APP } from "@/constants/app";

import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Conditor team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <Container
          width="content"
          className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-display-md font-bold text-balance">Get in touch</h1>
            <p className="text-lg text-pretty text-muted-foreground">
              Questions about pricing, partnerships or your account — we usually reply
              within one business day.
            </p>
            <a
              href={`mailto:${APP.supportEmail}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <MailIcon className="size-4" aria-hidden="true" />
              {APP.supportEmail}
            </a>
          </div>

          <ContactForm />
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
