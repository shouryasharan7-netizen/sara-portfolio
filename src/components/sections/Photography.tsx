"use client";

import Link from "next/link";
import { useState } from "react";

import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Wipe } from "@/components/motion/Wipe";
import { Frame } from "@/components/ui/Frame";
import { GoldLink } from "@/components/ui/GoldLink";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { photography } from "@/content/site";

/** How many stills the contact sheet shows before "More photography". */
const SHEET_COUNT = 3;

/**
 * Section 04 — photography.
 *
 * A full-width band: the caption rail on the left, three portrait stills
 * standing in for the full set on the right. Any of them — or the "More
 * photography" link — opens the viewer, where the whole run can be read one
 * frame at a time at a size worth looking at.
 */
export function Photography() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sheet = photography.images.slice(0, SHEET_COUNT);

  return (
    <section
      id="photography"
      aria-labelledby="photography-label"
      className="flex w-full flex-col bg-ink px-[var(--space-gutter)] py-[var(--space-section)] md:flex-row md:gap-[clamp(1.5rem,3.5vw,3.5rem)]"
    >
      {/* Caption rail. */}
      <div className="md:flex md:w-[19%] md:shrink-0 md:flex-col md:justify-center">
        <Reveal>
          <SectionLabel
            index="04"
            label="Photography"
            labelId="photography-label"
          />
        </Reveal>

        <Reveal index={1} as="div" className="mt-3">
          <Link
            href={photography.leadHref}
            className="group inline-flex w-fit items-center gap-1.5 text-[0.8125rem] text-cream/80 transition-colors hover:text-crimson-bright"
          >
            {photography.lead}
            <span
              aria-hidden
              className="inline-block text-gold-bright transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-crimson-bright"
            >
              →
            </span>
          </Link>
        </Reveal>

        <Reveal index={2} className="mt-6 hidden md:block">
          <GoldLink onClick={() => setOpenIndex(0)}>More photography</GoldLink>
        </Reveal>
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-6 md:mt-0">
        <ul className="grid grid-cols-3 gap-2 sm:gap-3">
          {sheet.map((img, i) => (
            <li key={img.src}>
              <Parallax distance={i === 1 ? 26 : -14}>
                <Wipe index={i}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Open photograph: ${img.alt}`}
                    className="group relative block w-full overflow-hidden bg-ink-soft"
                  >
                    <Frame
                      src={img.src}
                      alt={img.alt}
                      sizes="(max-width:768px) 30vw, 25vw"
                      className="aspect-[3/4] w-full transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />

                    {/* Lifts to full colour as you reach for it. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-ink/15 transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:opacity-0 group-focus-visible:opacity-0"
                    />
                  </button>
                </Wipe>
              </Parallax>
            </li>
          ))}
        </ul>

        <Reveal className="md:hidden">
          <GoldLink onClick={() => setOpenIndex(0)}>More photography</GoldLink>
        </Reveal>
      </div>

      <Lightbox
        photos={photography.images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
