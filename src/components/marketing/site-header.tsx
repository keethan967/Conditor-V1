import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
  { label: "Pricing", href: ROUTES.pricing },
  { label: "About", href: ROUTES.about },
  { label: "Help", href: ROUTES.help },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <Container
        as="nav"
        className="flex h-(--spacing-header) items-center justify-between"
      >
        <Link href={ROUTES.home} className="rounded-md">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href={ROUTES.signIn}>Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={ROUTES.signUp}>Get started</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
