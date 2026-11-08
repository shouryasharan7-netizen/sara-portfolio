import { parseScreenplay } from "@/lib/screenplay";

type ScreenplayProps = {
  source: string;
};

/**
 * A screenplay, set the way a screenplay is set.
 * Courier / Monospace, scene headings in bold against the left margin with crimson cues,
 * action full measure, and centered dialogue character blocks in an editorial container.
 */
export function Screenplay({ source }: ScreenplayProps) {
  const blocks = parseScreenplay(source);

  return (
    <div className="u-screenplay my-8 max-w-3xl border-t border-[var(--color-rule-light)] pt-10 text-cocoa">
      {blocks.map((block, i) => {
        if (block.kind === "scene") {
          return (
            <h2
              key={i}
              className="mt-10 mb-4 flex items-center border-l-[3px] border-crimson-bright pl-3.5 font-mono text-[0.95rem] font-bold tracking-[0.08em] text-cocoa uppercase first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if (block.kind === "transition") {
          return (
            <p
              key={i}
              className="mt-8 mb-6 text-right font-mono text-[0.9rem] font-bold tracking-[0.12em] text-crimson-bright uppercase"
            >
              {block.text}
            </p>
          );
        }

        if (block.kind === "title") {
          return (
            <p
              key={i}
              className="my-10 text-center font-mono text-base font-bold tracking-[0.16em] text-gold-deep uppercase"
            >
              {block.text}
            </p>
          );
        }

        if (block.kind === "dialogue") {
          return (
            <div key={i} className="mx-auto mt-6 max-w-[26rem] sm:ml-[18%]">
              {/* Centered character cue */}
              <p className="pl-[3.5rem] font-mono font-bold tracking-[0.14em] text-cocoa uppercase">
                {block.who}
              </p>
              {block.parenthetical ? (
                <p className="pl-[2.25rem] font-mono text-[0.875rem] italic text-cocoa-muted">
                  ({block.parenthetical})
                </p>
              ) : null}
              {block.lines.map((line, j) => (
                <p key={j} className="mt-1.5 font-mono leading-[1.65] text-cocoa">
                  {line}
                </p>
              ))}
            </div>
          );
        }

        return (
          <p key={i} className="mt-4 max-w-[64ch] font-mono leading-[1.75] text-cocoa-muted">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
