import type { Metadata } from "next";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CinemaProvider } from "@/components/ui/CinemaModal";
import "./globals.css";

/*
 * Self-hosted typography:
 * Playfair Display (Serif display headlines),
 * Inter (Editorial utility & body),
 * Dancing Script (Handwritten director wordmark & notes).
 */
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
  metadataBase: new URL("https://saradhandore.com"),
  title: "Sara Dhandore — Filmmaker & Director",
  description:
    "Films, writing and photography by Sara Dhandore. Stories in motion — real, raw and a little bit dreamlike.",
  openGraph: {
    title: "Sara Dhandore — Filmmaker & Director",
    description:
      "Films, writing and photography by Sara Dhandore. Stories in motion — real, raw and a little bit dreamlike.",
    url: "https://saradhandore.com",
    siteName: "Sara Dhandore Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/photography/photo-01.jpg",
        width: 1200,
        height: 630,
        alt: "Sara Dhandore — Filmmaker & Director Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sara Dhandore — Filmmaker & Director",
    description:
      "Films, writing and photography by Sara Dhandore. Stories in motion — real, raw and a little bit dreamlike.",
    images: ["/images/photography/photo-01.jpg"],
    creator: "@sara_wdymsiri",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://saradhandore.com/#sara",
      "name": "Sara Dhandore",
      "jobTitle": "Filmmaker & Director",
      "description": "Filmmaker and storyteller creating raw, cinematic short films and visual stories.",
      "url": "https://saradhandore.com",
      "sameAs": [
        "https://instagram.com/sara_wdymsiri",
        "https://youtube.com/@sara_wdymsiri",
      ],
    },
    {
      "@type": "CreativeWork",
      "name": "Everything",
      "genre": "Psychological Thriller",
      "director": { "@id": "https://saradhandore.com/#sara" },
      "creator": { "@id": "https://saradhandore.com/#sara" },
    },
    {
      "@type": "CreativeWork",
      "name": "Domus",
      "genre": "No Dialogue",
      "director": { "@id": "https://saradhandore.com/#sara" },
    },
    {
      "@type": "CreativeWork",
      "name": "Who's Watching?",
      "genre": "Concept Video",
      "director": { "@id": "https://saradhandore.com/#sara" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dancing.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative flex min-h-full flex-col bg-ink text-cream">
        <MotionProvider>
          <CinemaProvider>
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
          </CinemaProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
