"use client";

import { MaskedLines } from "@/components/motion/MaskedLines";
import { Reveal } from "@/components/motion/Reveal";
import { Wipe } from "@/components/motion/Wipe";
import { Doodle } from "@/components/ui/Doodle";
import { Frame } from "@/components/ui/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { shortFilm } from "@/content/site";

/**
 * Section 01 — the featured short film.
 * Elevated A24-style spotlight card: high contrast, clear hierarchy, dual CTAs.
 */
export function ShortFilm() {

  return (
    <section
      id="films"
      aria-labelledby="short-film-title"
      className="viewfinder-card group relative grid h-full grid-cols-1 overflow-hidden border-b border-white/10 bg-wine transition-all duration-300 lg:border-r lg:border-b-0 md:grid-cols-1"
    >
      {/* 4 L-shaped corner brackets */}
      <span className="vf-bracket vf-top-left" />
      <span className="vf-bracket vf-top-right" />
      <span className="vf-bracket vf-bottom-left" />
      <span className="vf-bracket vf-bottom-right" />

      {/* Subtle interior radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(229,57,53,0.18)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-between p-[var(--space-gutter)] py-[calc(var(--space-gutter)*1.4)]">
        <div>
          <Reveal>
            <div className="flex items-center justify-between">
              <SectionLabel index="01" label="Featured Short Film" />
              <span className="rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[0.6875rem] font-medium tracking-wider text-crimson-bright uppercase">
                {shortFilm.genre}
              </span>
            </div>
          </Reveal>

          <h3
            id="short-film-title"
            className="u-display mt-6 text-[length:clamp(2rem,1.6rem+2vw,3rem)] font-normal text-cream italic"
          >
            <MaskedLines lines={[shortFilm.title]} delay={0.08} />
          </h3>

          {/* Crisp, high-contrast readable synopsis */}
          {shortFilm.synopsis ? (
            <Reveal index={2}>
              <p className="mt-5 max-w-[36ch] text-[length:var(--text-body)] leading-[1.75] text-cream/90">
                {shortFilm.synopsis}
              </p>
            </Reveal>
          ) : null}
        </div>

        {/* Dual Elevated Call to Actions — Full touch width on mobile */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <Reveal index={3} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href={shortFilm.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-crimson-bright bg-crimson-bright px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white shadow-[0_0_16px_rgba(255,59,48,0.3)] transition-all hover:bg-white hover:text-ink active:scale-95 text-center cursor-pointer"
            >
              <span className="size-2 rounded-full bg-white animate-pulse" />
              <span>Watch Film</span>
              <span aria-hidden>&rarr;</span>
            </a>
            <a
              href="/writing/everything"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/25 bg-ink/50 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-cream backdrop-blur-sm transition-all hover:border-gold-bright hover:text-gold-bright text-center"
            >
              <span>Read Screenplay</span>
              <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>

          <Reveal index={4}>
            <Doodle kind="squiggle" className="mt-6 w-16 text-crimson-bright opacity-60 -rotate-6" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
