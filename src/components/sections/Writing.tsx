import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { GoldLink } from "@/components/ui/GoldLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { blogs, scripts } from "@/content/writing";

/**
 * Section 03 — writing.
 *
 * A full-width band: the label held in a narrow rail on the left, and the
 * two bodies of work set beside it as indexes you can read rather than two
 * bare category links. The zigzag rides the outer edge so the block reads
 * as annotated by hand.
 */
export function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-label"
      className="relative flex w-full flex-col overflow-hidden bg-ink-soft px-[var(--space-gutter)] py-[var(--space-section)] md:flex-row md:gap-[clamp(1.5rem,3.5vw,3.5rem)]"
    >
      <Doodle
        kind="zigzag"
        className="absolute top-1/2 left-0 h-20 w-8 -translate-y-1/2"
      />

      <Reveal className="relative pl-3 md:w-[19%] md:shrink-0 md:pl-2">
        <SectionLabel index="03" label="Writing" labelId="writing-label" />
      </Reveal>

      <div className="mt-8 grid flex-1 grid-cols-1 gap-x-[clamp(2rem,5vw,4rem)] gap-y-10 sm:grid-cols-2 md:mt-0">
        <WritingColumn
          heading="Scripts"
          href="/writing#scripts"
          items={scripts.map(({ slug, title, form }) => ({
            slug,
            title,
            meta: form,
          }))}
        />

        <WritingColumn
          heading="Blogs"
          href="/writing#blogs"
          items={blogs.map(({ slug, title, standfirst }) => ({
            slug,
            title,
            meta: standfirst,
          }))}
        />
      </div>
    </section>
  );
}

type WritingColumnProps = {
  heading: string;
  href: string;
  items: readonly { slug: string; title: string; meta: string }[];
};

function WritingColumn({ heading, href, items }: WritingColumnProps) {
  return (
    <div>
      <Reveal>
        <h3 className="u-eyebrow text-crimson-bright font-semibold">{heading}</h3>
      </Reveal>

      <ul className="mt-5 divide-y divide-[var(--color-rule-dark)] border-t border-[var(--color-rule-dark)]">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} index={i} delay={0.05}>
            <Link
              href={`/writing/${item.slug}`}
              className="group block py-4 focus-visible:outline-offset-4"
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="u-display text-lg text-cream italic transition-colors duration-[var(--duration-normal)] group-hover:text-crimson-bright">
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-gold-bright transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-crimson-bright"
                >
                  →
                </span>
              </span>

              <span className="mt-1.5 block max-w-[42ch] text-[0.8125rem] text-cream/55">
                {item.meta}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-5" delay={0.2}>
        <GoldLink href={href}>All {heading.toLowerCase()}</GoldLink>
      </Reveal>
    </div>
  );
}
