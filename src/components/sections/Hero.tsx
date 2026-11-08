"use client";

import { motion } from "motion/react";

import { MaskedLines } from "@/components/motion/MaskedLines";
import { Doodle } from "@/components/ui/Doodle";
import { Frame } from "@/components/ui/Frame";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { Showreel } from "@/components/ui/Showreel";
import { DURATION, riseVariants, transition, wipeVariants } from "@/lib/motion";
import { hero } from "@/content/site";

/** Eyebrow reads "Filmmaker / Director" — the divider is picked out in gold. */
const [eyebrowLead, ...eyebrowRest] = hero.eyebrow.split(" / ");

/** The hero plays on load, so it animates on a clock rather than on view. */
const enter = (delay: number, distance = 18) => ({
  initial: "hidden" as const,
  animate: "visible" as const,
  variants: riseVariants(distance),
  transition: transition(DURATION.slow, delay),
});

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[clamp(32rem,80vh,50rem)] overflow-hidden"
    >
      {/* Radiant ambient studio glow — lifts darkness and gives luminous depth */}
      <div className="ambient-glow" aria-hidden="true" />

      {hero.image ? (
        <>
          <Frame
            src={hero.image}
            alt={hero.imageAlt}
            priority
            sizes="100vw"
            className="absolute inset-0"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,24,0.85)_0%,rgba(20,20,24,0.6)_35%,transparent_65%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,20,24,0.75)_0%,rgba(20,20,24,0.15)_30%,transparent_60%)]"
          />
        </>
      ) : null}

      <div className="relative z-10 flex min-h-[clamp(32rem,80vh,50rem)] items-center px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-start gap-[clamp(2.5rem,5vw,5rem)] lg:flex-row lg:items-center lg:justify-between">
            
            {/* Left Headline & Bio Statement */}
            <div className="relative w-full max-w-2xl lg:w-fit">
              <motion.div
                {...enter(0.1)}
                className="flex items-center gap-2.5"
              >
                <span className="tally-dot" />
                <p className="u-eyebrow flex flex-wrap items-center gap-x-[0.6em] font-semibold text-cream">
                  <span>{eyebrowLead}</span>
                  {eyebrowRest.map((part) => (
                    <span key={part} className="flex items-center gap-x-[0.6em]">
                      <span aria-hidden className="text-crimson-bright">
                        /
                      </span>
                      <span>{part}</span>
                    </span>
                  ))}
                </p>
              </motion.div>

              {/* The headline is uncovered line by line */}
              <h1
                id="hero-heading"
                className="u-display mt-5 text-[length:var(--text-hero)] font-normal text-cream"
              >
                <MaskedLines
                  delay={0.2}
                  lines={hero.titleLines.map((line, i) =>
                    i === hero.titleLines.length - 1 ? (
                      <>
                        <span className="italic text-cream">{line}</span>
                        <span className="text-crimson-bright">.</span>
                      </>
                    ) : (
                      line
                    ),
                  )}
                />
              </h1>

              {/* High contrast, crisp readable body */}
              <motion.p
                {...enter(0.68)}
                className="mt-6 max-w-[38ch] text-[length:var(--text-body)] leading-[1.75] text-cream/90"
              >
                {hero.body}
              </motion.p>

              {/* Quick Actions */}
              <motion.div {...enter(0.8)} className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#films"
                  className="inline-flex items-center gap-2 rounded-full border border-crimson-bright bg-crimson-bright px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white shadow-[0_0_20px_rgba(255,59,48,0.35)] transition-all hover:bg-white hover:text-ink active:scale-95"
                >
                  <span>Explore Films</span>
                  <span aria-hidden>&rarr;</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-cream transition-all hover:border-gold-bright hover:text-gold-bright"
                >
                  <span>Get in Touch</span>
                </a>
              </motion.div>

              <motion.div {...enter(0.9)}>
                <Doodle kind="underline" className="mt-7 w-24 text-crimson-bright opacity-70" />
              </motion.div>
            </div>

            {/* Right Video Reel + Clean Margin Annotation */}
            <div className="relative w-full max-w-[17rem] shrink-0 sm:max-w-[19rem] lg:w-[clamp(16rem,24vw,22rem)] lg:max-w-none">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={wipeVariants}
                transition={transition(DURATION.cinematic, 0.35)}
              >
                <Showreel src={hero.reel} label={hero.reelAlt} />
              </motion.div>

              {/* Cleanly positioned margin note — placed beneath the showreel without overlapping */}
              <motion.div
                {...enter(0.95)}
                className="mt-5 flex items-center justify-end gap-2 pr-1"
              >
                <ScriptNote
                  text={hero.note}
                  rotate={-4}
                  className="text-right text-lg text-gold-bright"
                />
                <Doodle kind="star" className="w-5 text-crimson-bright shrink-0 -rotate-12" />
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
