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
    <div className="screenplay-paper u-screenplay my-8 p-6 text-cream sm:p-12">
      {blocks.map((block, i) => {
        if (block.kind === "scene") {
          return (
            <h2
              key={i}
              className="mt-10 mb-4 flex items-center border-l-2 border-crimson-bright pl-3 font-mono font-bold tracking-[0.08em] text-cream uppercase first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if (block.kind === "transition") {
          return (
            <p
              key={i}
              className="mt-6 mb-6 text-right font-mono font-bold tracking-[0.1em] text-crimson-bright uppercase"
            >
              {block.text}
            </p>
          );
        }

        if (block.kind === "title") {
          return (
            <p
              key={i}
              className="my-8 text-center font-mono tracking-[0.15em] text-gold-bright uppercase"
            >
              {block.text}
            </p>
          );
        }

        if (block.kind === "dialogue") {
          return (
            <div key={i} className="mx-auto mt-6 max-w-[24rem] sm:ml-[18%]">
              {/* Centered character cue */}
              <p className="pl-[3.5rem] font-mono font-bold tracking-[0.12em] text-gold-bright uppercase">
                {block.who}
              </p>
              {block.parenthetical ? (
                <p className="pl-[2.25rem] italic text-muted">
                  ({block.parenthetical})
                </p>
              ) : null}
              {block.lines.map((line, j) => (
                <p key={j} className="mt-1 text-cream/90">{line}</p>
              ))}
            </div>
          );
        }

        return (
          <p key={i} className="mt-4 max-w-[62ch] font-mono text-cream/75">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
