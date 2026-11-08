import type { Metadata } from "next";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "./globals.css";

/*
 * The three faces are self-hosted rather than fetched from Google at build
 * time: the build then needs no network, which keeps it reproducible, and
 * the browser makes no third-party request to render the page.
 *
 * Each file is the latin subset of the variable font, so one file covers
 * every weight the design uses.
 */

/* Editorial serif — hero headline and film titles. */
const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    {
      path: "./fonts/playfair-display-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "./fonts/playfair-display-italic-latin.woff2",
      weight: "400 600",
      style: "italic",
    },
  ],
});

/* Utility face — navigation, eyebrows, body copy. */
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    {
      path: "./fonts/inter-latin.woff2",
      weight: "300 500",
      style: "normal",
    },
  ],
});

/* The gold handwriting: wordmark and margin annotations. */
const dancing = localFont({
  variable: "--font-dancing",
  display: "swap",
  src: [
    {
      path: "./fonts/dancing-script-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Sara Dhandore — Filmmaker & Director",
  description:
    "Films, writing and photography by Sara Dhandore. Stories in motion — real, raw and a little bit dreamlike.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-cream relative">
        <MotionProvider>
          {/* 35mm Analog Film Grain Overlay */}
          <div className="film-grain pointer-events-none fixed inset-0 z-[9999] opacity-[0.038]" aria-hidden="true">
            <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <filter id="filmGrainFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#filmGrainFilter)" />
            </svg>
          </div>
          <ScrollProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
