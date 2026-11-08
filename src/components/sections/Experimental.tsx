import { Reveal } from "@/components/motion/Reveal";
import { Wipe } from "@/components/motion/Wipe";
import { Doodle } from "@/components/ui/Doodle";
import { Frame } from "@/components/ui/Frame";
import { GoldLink } from "@/components/ui/GoldLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experimental } from "@/content/site";

/**
 * Section 02 — the shorter experimental pieces.
 *
 * Shares the films row with `ShortFilm`, so it carries no id of its own and
 * fills its cell. Light blush ground, dark cocoa type — the tonal inverse of
 * its neighbour.
 */
export function Experimental() {

  return (
    <section
      aria-labelledby="experimental-label"
      className="relative flex h-full flex-col overflow-hidden bg-blush p-[var(--space-gutter)] py-[calc(var(--space-gutter)*1.5)]"
    >
      <Reveal className="relative z-10">
        <SectionLabel
          index="02"
          label="Experimental work"
          labelId="experimental-label"
          onLight
        />
      </Reveal>

      <ul className="mt-8 grid grid-cols-1 gap-[var(--space-gutter)] sm:grid-cols-2">
        {experimental.map((film, i) => (
          <li key={film.title} className="group flex flex-col">
            <Reveal index={i}>
              <h3 className="u-display text-xl text-cocoa italic">
                {film.title}
              </h3>
            </Reveal>

            <Reveal index={i} delay={0.06} as="div" className="mt-2">
              <p className="text-[0.6875rem] tracking-[0.1em] text-cocoa-muted">
                {film.runtime ? (
                  <>
                    <span>{film.runtime}</span>
                    <span aria-hidden className="mx-2 text-gold-deep">
                      /
                    </span>
                  </>
                ) : null}
                <span>{film.genre}</span>
              </p>
            </Reveal>

            {film.poster ? (
              <Wipe
                index={i}
                delay={0.08}
                className="viewfinder-card relative mt-3 overflow-hidden rounded-[2px] border border-cocoa/15 transition-all hover:border-crimson-bright group"
              >
                <a
                  href={film.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${film.title} on YouTube`}
                  className="block cursor-pointer"
                >
                  <span className="vf-bracket vf-top-left" />
                  <span className="vf-bracket vf-top-right" />
                  <span className="vf-bracket vf-bottom-left" />
                  <span className="vf-bracket vf-bottom-right" />
                  <Frame
                    src={film.poster}
                    alt={film.posterAlt}
                    sizes="(max-width:768px) 45vw, 20vw"
                    className="aspect-[16/10] w-full transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                </a>
              </Wipe>
            ) : null}

            <Reveal index={i} delay={0.14} className="mt-4">
              <GoldLink href={film.href} onLight>
                Watch
              </GoldLink>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Hand-drawn accent in the top-right margin. */}
      <Doodle
        kind="squiggle"
        className="pointer-events-none absolute right-[var(--space-gutter)] top-[calc(var(--space-gutter)*1.5)] w-14 rotate-12"
      />
    </section>
  );
}
