import type { Metadata } from "next";
import Link from "next/link";

import { MaskedLines } from "@/components/motion/MaskedLines";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Doodle } from "@/components/ui/Doodle";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { blogs, scripts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing — Sara Dhandore",
  description:
    "Screenplays and essays by Sara Dhandore — short film scripts and writing on cinema, cities and the stories we tell.",
};

/**
 * The writing index: scripts first, then blogs, each anchored so the links
 * in section 03 of the home page land on the right half of the page.
 */
export default function WritingIndex() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-blush">
        <div className="mx-auto w-full max-w-4xl px-[var(--space-gutter)] py-[var(--space-section)]">
          <Reveal>
            <p className="u-eyebrow font-mono text-crimson-bright font-semibold">Sara Dhandore</p>
          </Reveal>
          <h1 className="u-display mt-3 text-[length:clamp(2.5rem,1.6rem+3.4vw,4rem)] text-cocoa font-normal">
            <MaskedLines
              delay={0.1}
              lines={[
                <>
                  Writing<span className="text-crimson-bright">.</span>
                </>,
              ]}
            />
          </h1>
          <Reveal delay={0.35}>
            <Doodle kind="underline" className="mt-4 w-24 text-crimson-bright opacity-80" />
          </Reveal>

          <section id="scripts" className="mt-16 scroll-mt-28">
            <Reveal>
              <SectionLabel index="01" label="Scripts" onLight />
            </Reveal>

            <ul className="mt-8 divide-y divide-[var(--color-rule-light)] border-t border-[var(--color-rule-light)]">
              {scripts.map((script, i) => (
                <Reveal as="li" key={script.slug} index={i}>
                  <Link
                    href={`/writing/${script.slug}`}
                    className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="u-display text-[length:var(--text-title)] text-cocoa font-medium italic transition-colors duration-[var(--duration-normal)] group-hover:text-crimson-bright sm:w-[38%] sm:shrink-0">
                      {script.title}
                    </span>

                    <span className="flex-1">
                      <span className="u-eyebrow block font-mono text-[0.6875rem] font-semibold tracking-wider text-crimson-bright uppercase">
                        {script.form}
                      </span>
                      <span className="mt-2 block max-w-[52ch] text-cocoa-muted leading-relaxed font-normal">
                        {script.logline}
                      </span>
                    </span>

                    <span
                      aria-hidden
                      className="text-cocoa font-bold transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-crimson-bright"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>

          <section id="blogs" className="mt-20 scroll-mt-28">
            <Reveal>
              <SectionLabel index="02" label="Blogs" onLight />
            </Reveal>

            <ul className="mt-8 divide-y divide-[var(--color-rule-light)] border-t border-[var(--color-rule-light)]">
              {blogs.map((blog, i) => (
                <Reveal as="li" key={blog.slug} index={i}>
                  <Link
                    href={`/writing/${blog.slug}`}
                    className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="u-display text-[length:var(--text-title)] text-cocoa font-medium italic transition-colors duration-[var(--duration-normal)] group-hover:text-crimson-bright sm:w-[38%] sm:shrink-0">
                      {blog.title}
                    </span>

                    <span className="mt-1 max-w-[52ch] flex-1 text-cocoa-muted leading-relaxed font-normal">
                      {blog.standfirst}
                    </span>

                    <span
                      aria-hidden
                      className="text-cocoa font-bold transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-crimson-bright"
                    >
                      &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
