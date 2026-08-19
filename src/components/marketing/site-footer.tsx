import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { APP, SOCIAL } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Sign in", href: ROUTES.signIn },
      { label: "Create account", href: ROUTES.signUp },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Help center", href: ROUTES.help },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: ROUTES.privacy },
      { label: "Terms of service", href: ROUTES.terms },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <Logo />
            <p className="max-w-[22ch] text-sm text-muted-foreground">{APP.tagline}</p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <p className="text-sm font-medium">{column.title}</p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP.legalName}
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a
              href={SOCIAL.x}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-foreground"
            >
              X
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
