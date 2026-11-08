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
      className="relative isolate min-h-[clamp(30rem,78vh,46rem)] overflow-hidden"
    >
      {/* Ambient Radiant Glow with vivid crimson/amber contrast */}
      <div className="ambient-glow" aria-hidden="true" />

      {/* The scrims exist to hold copy off a photograph, so they only
          appear alongside one. Without it the hero sits on bare ink. */}
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
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,16,14,0.85)_0%,rgba(23,16,14,0.6)_35%,rgba(23,16,14,0)_65%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,16,14,0.75)_0%,rgba(23,16,14,0.15)_30%,rgba(23,16,14,0)_60%)]"
          />
        </>
      ) : null}

      <div className="relative z-10 flex min-h-[clamp(30rem,78vh,46rem)] items-center px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-start gap-[clamp(2.5rem,5vw,4.5rem)] lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-2xl lg:w-fit">
              <motion.p
                {...enter(0.1)}
                className="u-eyebrow flex flex-wrap items-center gap-x-[0.6em] text-cream/75"
              >
                <span>{eyebrowLead}</span>
                {eyebrowRest.map((part) => (
                  <span key={part} className="flex items-center gap-x-[0.6em]">
                    <span aria-hidden className="text-gold">
                      /
                    </span>
                    <span>{part}</span>
                  </span>
                ))}
              </motion.p>

              {/* The headline is uncovered line by line, like a title card. */}
              <h1
                id="hero-heading"
                className="u-display mt-4 text-[length:var(--text-hero)] text-cream"
              >
                <MaskedLines
                  delay={0.2}
                  lines={hero.titleLines.map((line, i) =>
                    i === hero.titleLines.length - 1 ? (
                      <>
                        {line}
                        <span className="text-gold">.</span>
                      </>
                    ) : (
                      line
                    ),
                  )}
                />
              </h1>

              <motion.p
                {...enter(0.72)}
                className="mt-5 max-w-[34ch] text-[length:var(--text-body)] text-cream/75"
              >
                {hero.body}
              </motion.p>

              <motion.div {...enter(0.82)}>
                <Doodle kind="underline" className="mt-5 w-20" />
              </motion.div>

              {/* Gold dot accent, trailing the headline block. */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition(DURATION.slow, 1)}
                className="absolute top-1/3 -right-6 hidden size-[10px] rounded-full bg-gold lg:block"
              />
            </div>

            {/* The reel, and the margin annotation that leans on it. */}
            <div className="relative w-full max-w-[16rem] shrink-0 sm:max-w-[19rem] lg:w-[clamp(15rem,23vw,21rem)] lg:max-w-none">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={wipeVariants}
                transition={transition(DURATION.cinematic, 0.35)}
              >
                <Showreel src={hero.reel} label={hero.reelAlt} />
              </motion.div>

              <motion.div
                {...enter(0.95)}
                className="mt-6 lg:absolute lg:bottom-6 lg:left-0 lg:mt-0 lg:w-48 lg:-translate-x-[88%]"
              >
                <ScriptNote
                  text={hero.note}
                  rotate={-14}
                  className="text-[length:clamp(1.5rem,1.1rem+1.4vw,1.875rem)]"
                />
                <Doodle
                  kind="underline"
                  className="mt-2 w-16 translate-x-2 -rotate-[10deg]"
                />
                <Doodle
                  kind="underline"
                  className="mt-1 w-16 translate-x-8 -rotate-[16deg] opacity-70"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
