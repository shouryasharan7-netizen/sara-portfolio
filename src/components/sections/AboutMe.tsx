import { Reveal } from "@/components/motion/Reveal";
import { TapedPrint } from "@/components/motion/TapedPrint";
import { Doodle } from "@/components/ui/Doodle";
import { GoldLink } from "@/components/ui/GoldLink";
import { Polaroid } from "@/components/ui/Polaroid";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about } from "@/content/site";

/**
 * Section 05 — about.
 *
 * Laid out like a scrapbook spread: a margin column carrying the label, the
 * handwriting and a single tilted print, with the prose set beside it. The
 * section clips its own overflow so the rotations never push a horizontal
 * scrollbar onto the page.
 */
export function AboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-label"
      className="relative w-full overflow-hidden bg-blush px-[var(--space-gutter)] py-[var(--space-section)]"
    >
      <div className="grid grid-cols-1 items-start gap-[var(--space-gutter)] gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-x-[clamp(2rem,5vw,5rem)]">
        {/* Column 1 — the margin: label, handwriting, the print. */}
        <div className="relative">
          <SectionLabel
            index="05"
            label="About me"
            labelId="about-label"
            onLight
          />

          <ScriptNote
            text={about.note}
            rotate={-12}
            className="mt-6 text-2xl"
          />

          {/* The star is pinned to the print, so it goes with it. */}
          {about.photo ? (
            <TapedPrint className="relative z-10 mt-14 w-full max-w-[22rem] lg:mt-16">
              <Polaroid
                src={about.photo}
                alt={about.photoAlt}
                aspect="4/3"
                rotate={-4}
                sizes="(max-width: 1024px) 80vw, 22rem"
              />

              <Doodle
                kind="star"
                className="pointer-events-none absolute -top-5 -right-4 w-7 rotate-12"
              />
            </TapedPrint>
          ) : null}
        </div>

        {/* Column 2 — the prose. */}
        <div className="lg:pt-2">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph} index={i}>
              <p className="max-w-[46ch] text-cocoa-muted [&:not(:first-child)]:mt-5">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal className="mt-8" delay={0.1}>
            <GoldLink href={about.moreHref} onLight>
              Learn more
            </GoldLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
