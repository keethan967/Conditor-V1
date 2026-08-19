import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { APP } from "@/constants/app";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms that govern your use of ${APP.name}.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <Container width="prose" className="flex flex-col gap-8 py-16 sm:py-24">
          <div className="flex flex-col gap-2">
            <h1 className="text-display-sm font-bold">Terms of service</h1>
            <p className="text-sm text-muted-foreground">Last updated August 1, 2026</p>
          </div>

          <div className="flex flex-col gap-6 text-sm leading-relaxed text-pretty text-muted-foreground [&_h2]:mt-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5">
            <p>
              These terms govern your access to and use of {APP.name}, operated by{" "}
              {APP.legalName}. By creating an account, you agree to these terms.
            </p>

            <section>
              <h2>1. Eligibility</h2>
              <p>
                You must be at least 18 years old and able to form a binding contract to
                use Conditor. If you use Conditor on behalf of an organization, you
                represent that you have authority to bind that organization to these
                terms.
              </p>
            </section>

            <section>
              <h2>2. Your account</h2>
              <ul>
                <li>
                  You are responsible for the accuracy of information in your profile.
                </li>
                <li>
                  You are responsible for maintaining the security of your account
                  credentials.
                </li>
                <li>
                  One account per individual or organization, unless otherwise agreed in
                  writing.
                </li>
              </ul>
            </section>

            <section>
              <h2>3. Acceptable use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>
                  Misrepresent your identity, affiliation, or investment/funding
                  capacity.
                </li>
                <li>Use Conditor to send unsolicited bulk messages or spam.</li>
                <li>
                  Scrape, resell, or redistribute data from the platform without
                  permission.
                </li>
                <li>
                  Interfere with the platform&apos;s security or normal operation.
                </li>
              </ul>
            </section>

            <section>
              <h2>4. Content ownership</h2>
              <p>
                You retain ownership of content you upload, including pitch decks and
                profile information. By publishing content on Conditor, you grant us a
                license to display it to other users as part of operating the platform.
              </p>
            </section>

            <section>
              <h2>5. No investment advice</h2>
              <p>
                Conditor is a discovery and communication platform. Nothing on Conditor
                constitutes investment, legal, or financial advice, and Conditor is not
                a party to any transaction between founders and investors.
              </p>
            </section>

            <section>
              <h2>6. Termination</h2>
              <p>
                You may close your account at any time from Settings → Account. We may
                suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2>7. Disclaimers and limitation of liability</h2>
              <p>
                Conditor is provided &ldquo;as is&rdquo; without warranties of any kind.
                To the maximum extent permitted by law, {APP.legalName} is not liable
                for indirect, incidental, or consequential damages arising from your use
                of the platform.
              </p>
            </section>

            <section>
              <h2>8. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. Material changes will be
                communicated through the platform or by email.
              </p>
            </section>

            <section>
              <h2>9. Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a
                  href={`mailto:${APP.supportEmail}`}
                  className="text-foreground underline underline-offset-4"
                >
                  {APP.supportEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
