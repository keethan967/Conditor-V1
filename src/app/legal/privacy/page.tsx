import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { APP } from "@/constants/app";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${APP.legalName} collects, uses and protects your data on ${APP.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main id="main" className="flex-1">
        <Container width="prose" className="flex flex-col gap-8 py-16 sm:py-24">
          <div className="flex flex-col gap-2">
            <h1 className="text-display-sm font-bold">Privacy policy</h1>
            <p className="text-sm text-muted-foreground">Last updated August 1, 2026</p>
          </div>

          <div className="flex flex-col gap-6 text-sm leading-relaxed text-pretty text-muted-foreground [&_h2]:mt-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5">
            <p>
              {APP.legalName} (&ldquo;{APP.name}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) provides a platform connecting founders with investors,
              accelerators and funding institutions. This policy explains what we
              collect, how we use it, and the choices you have.
            </p>

            <section>
              <h2>1. Information we collect</h2>
              <ul>
                <li>
                  Account information: name, email, role, and onboarding answers you
                  provide.
                </li>
                <li>
                  Profile content: startup or investor details, pitch materials, and
                  traction metrics you choose to publish.
                </li>
                <li>
                  Usage data: pages viewed, matches shown, and actions taken within the
                  product.
                </li>
                <li>
                  Messages: content of conversations sent through Conditor Messaging.
                </li>
              </ul>
            </section>

            <section>
              <h2>2. How we use information</h2>
              <p>We use the information above to:</p>
              <ul>
                <li>
                  Operate and personalize your dashboard, matches and recommendations.
                </li>
                <li>
                  Facilitate introductions and messaging between founders and investors.
                </li>
                <li>Maintain platform security and prevent abuse.</li>
                <li>Improve matching quality and product features over time.</li>
              </ul>
            </section>

            <section>
              <h2>3. Sharing of information</h2>
              <p>
                Profile information you mark as public is visible to other users
                consistent with your account type. We do not sell personal information
                to third parties. We may share data with service providers who help us
                operate the platform, bound by confidentiality obligations.
              </p>
            </section>

            <section>
              <h2>4. Your choices</h2>
              <ul>
                <li>Update or correct your profile at any time from Settings.</li>
                <li>Control notification preferences from Settings → Notifications.</li>
                <li>Request account deletion from Settings → Account.</li>
              </ul>
            </section>

            <section>
              <h2>5. Data retention</h2>
              <p>
                We retain account data for as long as your account is active, and for a
                reasonable period afterward to comply with legal obligations and resolve
                disputes.
              </p>
            </section>

            <section>
              <h2>6. Contact</h2>
              <p>
                Questions about this policy can be sent to{" "}
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
