"use client";

import { useState } from "react";
import { parseScreenplay } from "@/lib/screenplay";

type ScreenplayProps = {
  source: string;
};

/**
 * Screenplay Reader Suite:
 * - Direct on-page manuscript typography with maximum contrast.
 * - Live Scene Navigator dropdown to jump between scenes.
 * - Dynamic font scaler (A- / A+).
 * - Print / Export PDF button with Hollywood standard print stylesheet.
 */
export function Screenplay({ source }: ScreenplayProps) {
  const [fontSize, setFontSize] = useState<number>(0.92);
  const [isSceneNavOpen, setIsSceneNavOpen] = useState(false);
  const blocks = parseScreenplay(source);

  // Collect scenes for the navigator
  let sceneCount = 0;
  const blocksWithSceneMeta = blocks.map((block) => {
    if (block.kind === "scene") {
      sceneCount++;
      return { ...block, sceneIndex: sceneCount, id: `scene-${sceneCount}` };
    }
    return block;
  });

  const sceneList = blocksWithSceneMeta.filter(
    (b): b is { kind: "scene"; text: string; sceneIndex: number; id: string } =>
      b.kind === "scene",
  );

  const handlePrint = () => {
    window.print();
  };

  const jumpToScene = (id: string) => {
    setIsSceneNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative">
      {/* Floating Reader Suite Toolbar */}
      <div className="sticky top-20 z-40 my-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cocoa/15 bg-blush/90 p-2.5 shadow-md backdrop-blur-md print:hidden">
        {/* Left: Scene Navigator Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsSceneNavOpen(!isSceneNavOpen)}
            className="flex items-center gap-2 rounded-lg border border-cocoa/15 bg-white/70 px-3 py-1.5 font-mono text-xs font-semibold text-cocoa transition-colors hover:border-crimson-bright hover:text-crimson-bright"
          >
            <span className="size-2 rounded-full bg-crimson-bright" />
            <span>Scenes ({sceneList.length})</span>
            <span className="text-[10px] text-muted">&darr;</span>
          </button>

          {isSceneNavOpen && (
            <div className="absolute left-0 top-full mt-2 max-h-64 w-72 overflow-y-auto rounded-lg border border-cocoa/20 bg-blush p-2 shadow-2xl z-50">
              <span className="block px-2 py-1 font-mono text-[0.65rem] font-bold tracking-wider uppercase text-cocoa-muted">
                Jump to Scene
              </span>
              <ul className="mt-1 flex flex-col gap-1">
                {sceneList.map((sc) => (
                  <li key={sc.id}>
                    <button
                      type="button"
                      onClick={() => jumpToScene(sc.id)}
                      className="w-full truncate rounded px-2.5 py-1.5 text-left font-mono text-xs text-cocoa transition-colors hover:bg-crimson/10 hover:text-crimson-bright"
                    >
                      <span className="mr-1.5 font-bold text-crimson-bright">{sc.sceneIndex}.</span>
                      {sc.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Font Scale Controls + Print PDF */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center rounded-lg border border-cocoa/15 bg-white/70">
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.max(0.8, s - 0.05))}
              title="Decrease font size"
              className="px-2.5 py-1 text-cocoa transition-colors hover:text-crimson-bright"
            >
              A-
            </button>
            <span className="border-x border-cocoa/10 px-2 py-1 text-[0.7rem] text-cocoa-muted">
              {Math.round((fontSize / 0.92) * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.min(1.2, s + 0.05))}
              title="Increase font size"
              className="px-2.5 py-1 text-cocoa transition-colors hover:text-crimson-bright"
            >
              A+
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            title="Print or Save PDF"
            className="flex items-center gap-1.5 rounded-lg border border-cocoa/15 bg-white/70 px-3 py-1 text-xs font-semibold text-cocoa transition-colors hover:border-crimson-bright hover:text-crimson-bright"
          >
            <span>⎙</span>
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Screenplay Body */}
      <div
        className="u-screenplay max-w-3xl border-t border-[var(--color-rule-light)] pt-8 text-cocoa print:pt-0 print:border-none"
        style={{ fontSize: `${fontSize}rem` }}
      >
        {blocksWithSceneMeta.map((block, i) => {
          if (block.kind === "scene") {
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-10 mb-4 flex scroll-mt-28 items-center border-l-[3px] border-crimson-bright pl-3.5 font-mono text-[0.95rem] font-bold tracking-[0.08em] text-cocoa uppercase first:mt-0"
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
    </div>
  );
}
