"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type ShowreelProps = {
  src: string;
  /** Describes the reel for anyone who can't see it. */
  label: string;
  className?: string;
};

/**
 * The showreel, playing in the margin of the hero.
 *
 * It behaves like a loop running on a monitor in the corner of an edit
 * suite: muted, continuous, no chrome until you reach for it. Sound and
 * playback are both reachable, and the loop pauses whenever it scrolls out
 * of view so it isn't burning battery below the fold.
 */
export function Showreel({ src, label, className = "" }: ShowreelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay is applied here rather than via the attribute so the server and
  // client render the same markup, and so reduced motion can opt out.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // A blocked autoplay promise is not an error worth surfacing — the
    // play control is already on screen.
    void video.play().catch(() => undefined);
  }, [prefersReducedMotion]);

  // Only run the loop while it's actually on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }
        video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => undefined);
      return;
    }
    video.pause();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const next = !video.muted;
    video.muted = next;
    setIsMuted(next);
  };

  return (
    <figure className={`viewfinder-card group relative ${className}`}>
      {/* 4 L-shaped corner brackets */}
      <span className="vf-bracket vf-top-left" />
      <span className="vf-bracket vf-top-right" />
      <span className="vf-bracket vf-bottom-left" />
      <span className="vf-bracket vf-bottom-right" />

      {/* Offset gold/crimson rule — the print sits slightly proud of its frame. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-2.5 -right-2.5 -top-2.5 left-2.5 border border-crimson/30 transition-colors group-hover:border-crimson-bright/60"
      />

      <div className="relative overflow-hidden bg-ink-soft shadow-[0_28px_60px_-26px_rgba(0,0,0,0.85)]">
        <video
          ref={videoRef}
          src={src}
          aria-label={label}
          loop
          muted
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="aspect-[9/16] h-full w-full object-cover"
        />

        {/* Grades the foot of the frame so the controls stay legible. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(23,16,14,0.8)_0%,rgba(23,16,14,0)_100%)]"
        />

        {/* Controls surface on hover and whenever focus lands inside. */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 opacity-0 transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100">
          <ReelButton
            onClick={togglePlay}
            label={isPlaying ? "Pause showreel" : "Play showreel"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </ReelButton>

          <ReelButton
            onClick={toggleSound}
            label={isMuted ? "Unmute showreel" : "Mute showreel"}
          >
            {isMuted ? <MutedIcon /> : <SoundIcon />}
          </ReelButton>
        </div>
      </div>

      <figcaption className="u-eyebrow mt-3 flex items-center justify-between text-cream/70">
        <div className="flex items-center gap-2.5">
          <span className="tally-badge">
            <span className="tally-dot" />
            REC &bull; 24FPS
          </span>
          <span className="text-cream font-medium tracking-[0.16em]">Showreel</span>
        </div>
      </figcaption>
    </figure>
  );
}

type ReelButtonProps = {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
};

function ReelButton({ onClick, label, children }: ReelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-8 place-items-center rounded-full border border-cream/25 bg-ink/55 text-cream/80 backdrop-blur-sm transition-colors duration-[var(--duration-fast)] hover:border-gold hover:text-gold active:scale-95"
    >
      {children}
    </button>
  );
}

const ICON_PROPS = {
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": true,
  className: "size-3.5",
} as const;

function PlayIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 3.5v9l8-4.5-8-4.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4.5 3h2.2v10H4.5V3Zm4.8 0h2.2v10H9.3V3Z" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M8 2.5 4.8 5.2H2.5v5.6h2.3L8 13.5v-11Z" />
      <path d="M10.4 5.4a3.4 3.4 0 0 1 0 5.2l.9 1.1a4.8 4.8 0 0 0 0-7.4l-.9 1.1Z" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M8 2.5 4.8 5.2H2.5v5.6h2.3L8 13.5v-11Z" />
      <path d="M10.3 6.3 11.7 7.7l1.4-1.4.9.9-1.4 1.4 1.4 1.4-.9.9-1.4-1.4-1.4 1.4-.9-.9L10.8 8.6 9.4 7.2l.9-.9Z" />
    </svg>
  );
}
