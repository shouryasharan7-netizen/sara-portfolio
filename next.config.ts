import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * The site loads nothing from anywhere else — fonts, images, video and
 * scripts are all served from this origin — so every fetching directive is
 * locked to 'self'. YouTube and Instagram are only ever navigated to, which
 * a policy does not govern, so they need no allowance here.
 *
 * `'unsafe-eval'` is added in development only: React uses eval there to
 * reconstruct callstacks and drive other debugging features, and never uses
 * it in a production build. Production stays strict.
 *
 * `'unsafe-inline'` stays on scripts and styles because Next inlines its
 * bootstrap and the flight payload, and Tailwind injects style tags. The
 * alternative is a per-request nonce, which needs middleware and would make
 * every page dynamic — a poor trade for a static site with no user input and
 * no raw-HTML rendering anywhere in it. The policy still blocks loading
 * script, frame or object content from any other origin.
 */
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    /* Two years, covering www as well. `preload` is deliberately left off —
       it is a slow commitment to undo, so it should be a choice. */
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
