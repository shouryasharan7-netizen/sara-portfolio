"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

export function getYouTubeId(url: string): string | null {
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

  return (
    <CinemaContext.Provider value={{ openCinema, closeCinema, activeFilm }}>
      {children}

      <AnimatePresence>
        {activeFilm && (
          <CinemaModalDialog film={activeFilm} onClose={closeCinema} />
        )}
      </AnimatePresence>
    </CinemaContext.Provider>
  );
}

type DialogProps = {
  film: CinemaFilm;
  onClose: () => void;
};

function CinemaModalDialog({ film, onClose }: DialogProps) {
  // Capture escape key reliably, even when iframes or other inputs have focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const youtubeId = getYouTubeId(film.href);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Cinema Theater: ${film.title}`}
      style={{ zIndex: 99999 }}
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 md:p-8"
      onClick={onClose}
    >
      {/* Darkroom Cinema Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-[#070709]/95 backdrop-blur-2xl"
      />

      {/* Ambient Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(229,57,53,0.18)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      {/* Cinema Theater Card */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/20 bg-[#121216] shadow-[0_32px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(229,57,53,0.25)]"
      >
        {/* Theater Monitor Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0D0D10] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="tally-dot" />
            <div>
              <h2 className="font-serif text-base sm:text-lg italic text-[#F4F0EA]">
                {film.title}
              </h2>
              <span className="font-mono text-[0.6875rem] tracking-wider text-[#FF453A] uppercase">
                {film.genre} &bull; Cinema Screening
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={film.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-[#8E8C84] transition-colors hover:border-[#D4A359] hover:text-[#D4A359]"
            >
              <span>YouTube</span>
              <span aria-hidden>&rarr;</span>
            </a>

            {/* Prominent Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close cinema theater"
              title="Close (Esc)"
              className="group/btn grid size-10 min-w-[40px] min-h-[40px] place-items-center rounded-full border border-white/25 bg-white/10 text-[#F4F0EA] transition-all hover:border-[#FF453A] hover:bg-[#FF453A] hover:text-white active:scale-90 cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="pointer-events-none transition-transform group-hover/btn:rotate-90"
              >
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
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
              title={`${film.title} — Short Film by Sara Dhandore`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#8E8C84]">
              <p className="font-mono text-sm">
                Screening file unavailable for direct playback.
              </p>
              <a
                href={film.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FF453A] bg-[#FF453A] px-5 py-2 text-xs font-semibold uppercase text-white"
              >
                Watch on YouTube &rarr;
              </a>
            </div>
          )}
        </div>

        {/* Theater Lower Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#0D0D10] px-4 py-2.5 sm:px-6 font-mono text-[0.6875rem] text-[#8E8C84]">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#FF453A] animate-pulse" />
            <span className="text-[#F4F0EA]">DIRECTED BY SARA DHANDORE</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-[#D4A359] hover:text-[#FF453A] transition-colors cursor-pointer"
          >
            PRESS ESC OR CLICK HERE TO EXIT [✕]
          </button>
        </div>
      </motion.div>
    </div>
  );
}
