"use client";

import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/ui/Frame";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photography } from "@/content/site";

/**
 * Section 04 — Photography & Stills.
 *
 * An innovative 35mm celluloid filmstrip reel showcasing all 10 photographs.
 * Features continuous cinema drift, auto-play toggle, frame counter, prev/next steppers,
 * corner viewfinder brackets, and full-resolution interactive lightbox.
 */
export function Photography() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const reelRef = useRef<HTMLDivElement>(null);

  const images = photography.images;
  const total = images.length;

  // Track active item on manual scroll
  const handleScroll = () => {
    const el = reelRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 320;
    const scrollPos = el.scrollLeft;
    const idx = Math.round(scrollPos / (cardWidth + 24));
    setActiveIndex(Math.max(0, Math.min(idx, total - 1)));
  };

  const scrollToIndex = (index: number) => {
    const el = reelRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 320;
    el.scrollTo({
      left: index * (cardWidth + 24),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handleNext = () => {
    const next = (activeIndex + 1) % total;
    scrollToIndex(next);
  };

  const handlePrev = () => {
    const prev = (activeIndex - 1 + total) % total;
    scrollToIndex(prev);
  };

  // Continuous auto-glide interval
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const timer = setInterval(() => {
      const el = reelRef.current;
      if (!el) return;
      const cardWidth = el.firstElementChild?.clientWidth || 320;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        setActiveIndex(0);
      } else {
        const next = (activeIndex + 1) % total;
        scrollToIndex(next);
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, activeIndex, total]);

  return (
    <section
      id="photography"
      aria-labelledby="photography-label"
      className="relative w-full overflow-hidden bg-ink py-[var(--space-section)]"
    >
      {/* Top Header & Interactive Control Bar */}
      <div className="px-[var(--space-gutter)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel
              index="04"
              label="Photography & Stills"
              labelId="photography-label"
            />
            <p className="mt-2 text-sm text-muted">
              {photography.lead} &bull; 35mm visual studies &amp; real, raw celluloid moments.
            </p>
          </div>

          {/* Action & Control Console — Wraps cleanly on mobile */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Live Frame Counter */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-soft/80 px-3 py-1.5 font-mono text-[0.72rem] sm:text-xs text-muted backdrop-blur-md">
              <span className="tally-dot" />
              <span className="font-medium text-cream">FRAME</span>
              <span className="font-bold text-crimson-bright">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-muted/40">/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>

            {/* Auto Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? "Pause auto reel" : "Play auto reel"}
              className={`flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.72rem] sm:text-xs font-medium uppercase transition-all ${
                isAutoPlaying
                  ? "border-crimson-bright/40 bg-crimson-bright/10 text-crimson-bright"
                  : "border-white/15 bg-ink-soft text-muted hover:text-cream"
              }`}
            >
              <span className="text-[10px]">{isAutoPlaying ? "❚❚" : "▶"}</span>
              <span>{isAutoPlaying ? "Auto Reel" : "Paused"}</span>
            </button>

            {/* Prev / Next Steppers */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="grid size-9 min-w-[36px] min-h-[36px] place-items-center rounded-full border border-white/15 bg-ink-soft text-cream transition-all hover:border-crimson-bright hover:bg-crimson-bright hover:text-white active:scale-90"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photograph"
                className="grid size-9 min-w-[36px] min-h-[36px] place-items-center rounded-full border border-white/15 bg-ink-soft text-cream transition-all hover:border-crimson-bright hover:bg-crimson-bright hover:text-white active:scale-90"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 35mm Celluloid Contact Strip (All 10 Photos) */}
      <div
        className="relative mt-8 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Filmstrip Sprockets Top Accent */}
        <div className="flex h-3 w-full items-center justify-between border-y border-white/10 bg-black/40 px-2 opacity-50 overflow-hidden">
          {Array.from({ length: 42 }).map((_, i) => (
            <span key={i} className="h-1.5 w-2 shrink-0 rounded-xs border border-white/20 bg-white/5" />
          ))}
        </div>

        {/* Horizontal Film Carousel */}
        <div
          ref={reelRef}
          onScroll={handleScroll}
          className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto px-[var(--space-gutter)] py-6 scroll-smooth"
        >
          {images.map((img, i) => {
            const isCurrent = i === activeIndex;

            return (
              <div
                key={img.src}
                onClick={() => setOpenIndex(i)}
                className={`group/card viewfinder-card relative w-[min(280px,78vw)] shrink-0 cursor-pointer snap-center rounded-lg border bg-ink-soft transition-all duration-500 sm:w-[340px] md:w-[380px] ${
                  isCurrent
                    ? "scale-[1.01] border-crimson-bright/70 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_24px_rgba(255,59,48,0.2)]"
                    : "border-white/10 hover:border-crimson-bright/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* 4 Camera Corner Viewfinder Brackets */}
                <span className="vf-bracket vf-top-left" />
                <span className="vf-bracket vf-top-right" />
                <span className="vf-bracket vf-bottom-left" />
                <span className="vf-bracket vf-bottom-right" />

                {/* 35mm Header Meta */}
                <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2 font-mono text-[0.65rem] tracking-wider text-muted/80">
                  <span className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-crimson-bright opacity-80" />
                    <span>EXP {String(i + 1).padStart(2, "0")} &bull; 35MM</span>
                  </span>
                  <span className="font-medium text-gold-bright">KODAK 400</span>
                </div>

                {/* Frame Image with Zoom & Hover Lighting */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60">
                  <Frame
                    src={img.src}
                    alt={img.alt}
                    sizes="(max-width:768px) 80vw, 380px"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-105"
                  />

                  {/* Gradient Scrim */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/card:opacity-90" />

                  {/* Hover Caption Card */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300">
                    <p className="line-clamp-2 text-xs font-medium leading-relaxed text-cream/90">
                      {img.alt}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between font-mono text-[0.65rem] text-gold-bright">
                      <span className="flex items-center gap-1">
                        <span>Click to expand</span>
                        <span aria-hidden>&rarr;</span>
                      </span>
                      <span className="rounded border border-white/20 bg-ink/70 px-1.5 py-0.5 uppercase text-cream/80">
                        View
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Monospace Ticker */}
                <div className="flex items-center justify-between border-t border-white/10 px-3.5 py-1.5 font-mono text-[0.625rem] text-muted/60">
                  <span>ISO 400</span>
                  <span>f/2.8 &bull; 1/250s</span>
                  <span>SARA DHANDORE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filmstrip Sprockets Bottom Accent */}
        <div className="flex h-3 w-full items-center justify-between border-y border-white/10 bg-black/40 px-2 opacity-50 overflow-hidden">
          {Array.from({ length: 42 }).map((_, i) => (
            <span key={i} className="h-1.5 w-2 shrink-0 rounded-xs border border-white/20 bg-white/5" />
          ))}
        </div>
      </div>

      {/* Bottom Scrubber & Gallery Trigger */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 px-[var(--space-gutter)] sm:flex-row">
        {/* Scrubber dots for all 10 images */}
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Jump to photograph ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-crimson-bright shadow-[0_0_10px_rgba(255,59,48,0.5)]"
                  : "w-2 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Action Link to open in Lightbox */}
        <button
          type="button"
          onClick={() => setOpenIndex(activeIndex)}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-gold-bright uppercase transition-all hover:text-crimson-bright"
        >
          <span>Open Fullscreen Gallery</span>
          <span aria-hidden>&rarr;</span>
        </button>
      </div>

      {/* Fullscreen Interactive Lightbox */}
      <Lightbox
        photos={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
