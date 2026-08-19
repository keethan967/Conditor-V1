import type { NextConfig } from "next";

/**
 * Response headers applied to every route.
 *
 * These are cheap, high-value defences that cost nothing at runtime. A strict
 * Content-Security-Policy is deliberately NOT here: doing it properly requires
 * per-request nonces threaded through middleware, and a half-configured CSP
 * either breaks the app or lulls you into thinking you have one. It is
 * scheduled as its own piece of work in the hardening phase.
 */
const securityHeaders = [
  {
    // Stops the browser from second-guessing Content-Type, which is how a
    // user-uploaded file ends up executed as script.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Send the full URL within our own origin, only the origin cross-site.
    // Prevents private paths and query params leaking through Referer.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Clickjacking defence. Levant is never legitimately framed by a third
    // party, so the strictest value is also the correct one.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Deny powerful APIs the product does not use. Narrow this list rather
    // than widening it when a feature genuinely needs one.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Ignored over plain HTTP, so it is safe in development.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * Supabase Storage is the only remote image source. Deriving the hostname from
 * the configured URL — rather than hard-coding it — means staging and
 * production are correct automatically, and a typo fails loudly here instead
 * of rendering broken images in production.
 */
function supabaseImagePattern() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return [];

  try {
    return [
      {
        protocol: "https" as const,
        hostname: new URL(url).hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Removes the `X-Powered-By: Next.js` fingerprint.
  poweredByHeader: false,

  images: {
    remotePatterns: supabaseImagePattern(),
    // AVIF first — roughly 20% smaller than WebP at equivalent quality, with
    // WebP as the fallback for older browsers.
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    // Import only the icons actually used rather than the whole barrel file.
    // Without this, a single Lucide import pulls in thousands of modules and
    // measurably slows dev compilation.
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
