"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type ShowreelProps = {
  src: string;
  /** Describes the reel for anyone who can't see it. */
  label: string;
  className?: string;
};

function formatSMPTE(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const frames = Math.floor((seconds % 1) * 24);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

/**
 * The showreel, playing in the margin of the hero.
 * Upgraded with live SMPTE timecode (24 FPS), interactive scrubber, and theater controls.
 */
export function Showreel({ src, label, className = "" }: ShowreelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;
    void video.play().catch(() => undefined);
  }, [prefersReducedMotion]);

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

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (!duration && video.duration) {
      setDuration(video.duration);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrubber = scrubberRef.current;
    const video = videoRef.current;
    if (!scrubber || !video || !duration) return;

    const rect = scrubber.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = pos * duration;
    setCurrentTime(video.currentTime);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <figure className={`group relative ${className}`}>
      {/* Sleek rounded cinema monitor container */}
      <div className="viewfinder-card relative overflow-hidden rounded-lg border border-white/15 bg-ink-soft shadow-[0_24px_50px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-crimson-bright/70">
        {/* Subtle camera corner viewfinder brackets on the frame */}
        <span className="vf-bracket vf-top-left" />
        <span className="vf-bracket vf-top-right" />
        <span className="vf-bracket vf-bottom-left" />
        <span className="vf-bracket vf-bottom-right" />

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
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
          className="aspect-[9/16] h-full w-full object-cover"
        />

        {/* Gradient scrim for control legibility */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(20,20,24,0.92)_0%,transparent_100%)]"
        />

        {/* Interactive Razor-Thin Scrubber Bar */}
        <div
          ref={scrubberRef}
          onClick={handleScrub}
          title="Click to seek timecode"
          className="group/scrub absolute inset-x-0 bottom-0 z-30 h-3 cursor-pointer flex items-end"
        >
          <div className="h-1 w-full bg-white/20 transition-all group-hover/scrub:h-1.5">
            <div
              style={{ width: `${progressPercent}%` }}
              className="relative h-full bg-crimson-bright shadow-[0_0_8px_rgba(217,59,47,0.6)]"
            >
              <span className="absolute -top-1 right-0 size-2.5 rounded-full bg-white opacity-0 transition-opacity group-hover/scrub:opacity-100 shadow-[0_0_6px_rgba(217,59,47,0.7)]" />
            </div>
          </div>
        </div>

        {/* Floating play & mute controls */}
        <div className="absolute inset-x-0 bottom-2.5 flex items-center justify-between gap-2 p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100 z-20">
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

      {/* Clean, neat, professional monitor status bar with live SMPTE timecode */}
      <figcaption className="mt-3.5 flex items-center justify-between px-0.5 text-muted">
        <div className="flex items-center gap-2.5">
          <span className="tally-dot" />
          <span className="u-eyebrow text-[0.72rem] tracking-[0.16em] text-cream font-semibold">
            Showreel
          </span>
          <span className="text-xs text-muted/50">&bull;</span>
          <span className="font-mono text-[0.6875rem] tracking-wider text-muted/90">
            Directing Cut
          </span>
        </div>

        {/* Live SMPTE 24FPS Timecode */}
        <div className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-wider">
          <span className="text-muted/60">TC</span>
          <span className="font-medium text-gold-bright">
            {formatSMPTE(currentTime)}
          </span>
          <span className="text-xs text-muted/40">&bull;</span>
          <span className="text-muted/80">24 FPS</span>
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
      className="grid size-10 min-w-[40px] min-h-[40px] place-items-center rounded-full border border-white/20 bg-ink/80 text-cream backdrop-blur-md transition-all hover:border-crimson-bright hover:bg-crimson-bright hover:text-white active:scale-90"
    >
      {children}
    </button>
  );
}

const ICON_PROPS = {
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": true,
  className: "size-4",
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
