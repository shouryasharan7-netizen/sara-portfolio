"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type CinemaFilm = {
  title: string;
  href: string;
  genre: string;
};

type CinemaContextType = {
  openCinema: (film: CinemaFilm) => void;
  closeCinema: () => void;
  activeFilm: CinemaFilm | null;
};

const CinemaContext = createContext<CinemaContextType>({
  openCinema: () => {},
  closeCinema: () => {},
  activeFilm: null,
});

export function useCinema() {
  return useContext(CinemaContext);
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? match[1] : null;
}

export function CinemaProvider({ children }: { children: React.ReactNode }) {
  const [activeFilm, setActiveFilm] = useState<CinemaFilm | null>(null);

  const openCinema = useCallback((film: CinemaFilm) => {
    setActiveFilm(film);
  }, []);

  const closeCinema = useCallback(() => {
    setActiveFilm(null);
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!activeFilm) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCinema();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFilm, closeCinema]);

  const youtubeId = activeFilm ? getYouTubeId(activeFilm.href) : null;

  return (
    <CinemaContext.Provider value={{ openCinema, closeCinema, activeFilm }}>
      {children}

      <AnimatePresence>
        {activeFilm && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Cinema Theater: ${activeFilm.title}`}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-10"
          >
            {/* Darkroom Cinema Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeCinema}
              className="absolute inset-0 bg-[#070709]/95 backdrop-blur-2xl"
            />

            {/* Ambient Projector Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(229,57,53,0.14)_0%,transparent_60%)]"
              aria-hidden="true"
            />

            {/* Cinema Theater Card */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/15 bg-ink-soft shadow-[0_32px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(229,57,53,0.2)]"
            >
              {/* Theater Monitor Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-ink/90 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="tally-dot" />
                  <div>
                    <h2 className="font-serif text-base sm:text-lg italic text-cream">
                      {activeFilm.title}
                    </h2>
                    <span className="font-mono text-[0.6875rem] tracking-wider text-crimson-bright uppercase">
                      {activeFilm.genre} &bull; Cinema Screening
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeFilm.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-gold-bright hover:text-gold-bright"
                  >
                    <span>YouTube</span>
                    <span aria-hidden>&rarr;</span>
                  </a>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={closeCinema}
                    aria-label="Close cinema theater"
                    className="grid size-9 min-w-[36px] min-h-[36px] place-items-center rounded-full border border-white/20 bg-ink text-cream transition-all hover:border-crimson-bright hover:bg-crimson-bright hover:text-white active:scale-90"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 16:9 Cinema Viewport */}
              <div className="relative aspect-video w-full bg-black">
                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                    title={`${activeFilm.title} — Short Film by Sara Dhandore`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-muted">
                    <p className="font-mono text-sm">Screening file unavailable for direct playback.</p>
                    <a
                      href={activeFilm.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-crimson-bright bg-crimson-bright px-5 py-2 text-xs font-semibold uppercase text-white"
                    >
                      Watch on external player &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Theater Lower Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-ink/90 px-4 py-2.5 sm:px-6 font-mono text-[0.6875rem] text-muted">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-crimson-bright animate-pulse" />
                  <span className="text-cream">DIRECTED BY SARA DHANDORE</span>
                </span>
                <span className="text-gold-bright">PRESS ESC TO EXIT THEATER</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CinemaContext.Provider>
  );
}
