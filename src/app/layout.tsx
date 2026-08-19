import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";
import { APP } from "@/constants/app";
import { env } from "@/lib/env";

import "./globals.css";

/**
 * Geist — Vercel's variable typeface, chosen for the rename to Conditor. It
 * carries a full 100–900 weight range in one family, which is what makes a
 * "bold, modern, minimal, premium" hierarchy possible from weight and
 * tracking alone, without a second display face (see the "one family" note
 * in `globals.css`).
 *
 * `display: "swap"` renders text immediately in the fallback face and swaps
 * when the webfont arrives. The alternative — invisible text for up to three
 * seconds — is a far worse experience than one reflow.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${APP.name} — ${APP.tagline}`,
    // Every child route supplies only its own title; the suffix is applied here.
    template: `%s · ${APP.name}`,
  },
  description: APP.description,
  applicationName: APP.name,
  authors: [{ name: APP.legalName }],
  openGraph: {
    type: "website",
    siteName: APP.name,
    title: `${APP.name} — ${APP.tagline}`,
    description: APP.description,
    url: env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP.name} — ${APP.tagline}`,
    description: APP.description,
  },
  robots: {
    // Only the production origin should be indexed; preview deployments must
    // never compete with it in search results.
    index: env.NEXT_PUBLIC_SITE_URL.includes(APP.domain),
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches the resolved theme so the mobile browser chrome blends with the
  // page instead of framing it in a mismatched bar.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /**
     * `suppressHydrationWarning` is required, not optional: `next-themes`
     * writes the theme class onto <html> in a blocking script before React
     * hydrates, so server and client markup differ by design. The suppression
     * is scoped to this element only.
     */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* First tab stop on every page — keyboard users should not have to
            traverse the entire navigation to reach content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>

        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
