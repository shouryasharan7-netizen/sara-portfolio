import { MaskedLines } from "@/components/motion/MaskedLines";
import { Reveal } from "@/components/motion/Reveal";
import { Wipe } from "@/components/motion/Wipe";
import { Doodle } from "@/components/ui/Doodle";
import { Frame } from "@/components/ui/Frame";
import { GoldLink } from "@/components/ui/GoldLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { shortFilm } from "@/content/site";

/**
 * Section 01 — the featured short film.
 *
 * Fills its cell in the parent films row: copy on the left, poster on the
 * right, collapsing to a single stacked column below `md`. The poster is
 * given a fixed ratio on small screens so it cannot collapse to zero height
 * once the two halves stop sharing a row.
 */
export function ShortFilm() {
  return (
    <section
      id="films"
      aria-labelledby="short-film-title"
      className={`viewfinder-card relative group grid h-full grid-cols-1 bg-wine border border-crimson/25 transition-all hover:border-crimson-bright/60 ${
        shortFilm.poster ? "md:grid-cols-2" : ""
      }`}
    >
      {/* 4 L-shaped corner brackets */}
      <span className="vf-bracket vf-top-left" />
      <span className="vf-bracket vf-top-right" />
      <span className="vf-bracket vf-bottom-left" />
      <span className="vf-bracket vf-bottom-right" />

      <div className="flex flex-col justify-center p-[var(--space-gutter)] py-[calc(var(--space-gutter)*1.5)]">
        <Reveal>
          <SectionLabel index="01" label="Short film" />
        </Reveal>

        <h3
          id="short-film-title"
          className="u-display mt-5 text-[length:var(--text-title)] text-cream italic"
        >
          <MaskedLines lines={[shortFilm.title]} delay={0.08} />
        </h3>

        <Reveal index={1} as="div" className="mt-3">
          <p className="text-[0.6875rem] tracking-[0.1em] text-cream/65">
            {shortFilm.runtime ? (
              <>
                <span>{shortFilm.runtime}</span>
                <span aria-hidden className="mx-2 text-gold">
                  /
                </span>
              </>
            ) : null}
            <span>{shortFilm.genre}</span>
          </p>
        </Reveal>

        {shortFilm.synopsis ? (
          <Reveal index={2}>
            <p className="mt-4 max-w-[32ch] text-[length:var(--text-body)] text-cream/70">
              {shortFilm.synopsis}
            </p>
          </Reveal>
        ) : null}

        <Reveal index={3} className="mt-6 flex flex-wrap items-center gap-6">
          <GoldLink href={shortFilm.href}>Watch</GoldLink>
          <a
            href="/writing/everything"
            className="watch-link text-[length:var(--text-label)] font-medium text-gold-bright hover:text-crimson-bright"
          >
            Read Script <span className="arrow">&rarr;</span>
          </a>
        </Reveal>

        {/* Hand-drawn accent, tucked under the call to action. */}
        <Reveal index={4}>
          <Doodle kind="squiggle" className="mt-7 w-16 -rotate-6" />
        </Reveal>
      </div>

      {shortFilm.poster ? (
        <Wipe className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full">
          <Frame
            src={shortFilm.poster}
            alt={shortFilm.posterAlt}
            sizes="(max-width:768px) 100vw, 30vw"
            className="h-full min-h-[16rem] w-full transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        </Wipe>
      ) : null}
    </section>
  );
}
