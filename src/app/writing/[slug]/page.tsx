import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MaskedLines } from "@/components/motion/MaskedLines";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Essay } from "@/components/writing/Essay";
import { Screenplay } from "@/components/writing/Screenplay";
import { Doodle } from "@/components/ui/Doodle";
import { blogs, findWriting, scripts } from "@/content/writing";

/** Every piece is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return [...scripts, ...blogs].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findWriting(slug);

  if (!found) return { title: "Not found — Sara Dhandore" };

  const { title, description } =
    found.kind === "script"
      ? { title: found.script.title, description: found.script.logline }
      : { title: found.blog.title, description: found.blog.standfirst };

  return { title: `${title} — Sara Dhandore`, description };
}

/**
 * One piece of writing, read on its own page.
 *
 * Scripts and blogs share the paper treatment and the masthead, and differ
 * only in how the body is set — Courier and screenplay indents for one, a
 * single serif column for the other.
 */
export default async function WritingPage({
  params,
}: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const found = findWriting(slug);

  if (!found) notFound();

  const isScript = found.kind === "script";
  const title = isScript ? found.script.title : found.blog.title;
  const standfirst = isScript ? found.script.logline : found.blog.standfirst;

  return (
    <>
      <Header />

      <main className="flex-1 bg-blush">
        <article className="mx-auto w-full max-w-3xl px-[var(--space-gutter)] py-[var(--space-section)]">
          <Link
            href={isScript ? "/writing#scripts" : "/writing#blogs"}
            className="group u-eyebrow inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold tracking-wider text-cocoa transition-colors duration-[var(--duration-fast)] hover:text-crimson-bright"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:-translate-x-1"
            >
              &larr;
            </span>
            {isScript ? "Scripts" : "Blogs"}
          </Link>

          <header className="mt-8 border-b border-[var(--color-rule-light)] pb-10">
            {isScript ? (
              <p className="u-eyebrow font-mono text-[0.7rem] font-semibold tracking-widest text-crimson-bright uppercase">
                {found.script.form}
              </p>
            ) : null}

            <h1 className="u-display mt-3 text-[length:clamp(2.2rem,1.4rem+2.6vw,3.5rem)] font-normal text-cocoa italic">
              <MaskedLines lines={[title]} delay={0.08} />
            </h1>

            <Reveal delay={0.3}>
              <p className="mt-4 max-w-[52ch] text-[length:var(--text-body)] font-normal leading-relaxed text-cocoa-muted">
                {standfirst}
              </p>
            </Reveal>

            <p className="u-eyebrow mt-6 font-mono text-[0.72rem] tracking-wider text-cocoa-muted">
              Written by <span className="font-semibold text-cocoa">Sara Dhandore</span>
            </p>

            <Doodle kind="underline" className="mt-4 w-20 text-crimson-bright opacity-85" />
          </header>

          <Reveal className="mt-12" delay={0.1}>
            {isScript ? (
              <Screenplay source={found.script.source} />
            ) : (
              <Essay paragraphs={found.blog.paragraphs} />
            )}
          </Reveal>
        </article>
      </main>

      <Footer />
    </>
  );
}
