type ScriptNoteProps = {
  /** Newline characters in the text become visual line breaks. */
  text: string;
  /** Rotation in degrees — these notes sit off-axis, like margin scribbles. */
  rotate?: number;
  className?: string;
};

/**
 * A handwritten gold annotation in the margin.
 *
 * These are decorative asides in Sara's own voice, so they're rendered as
 * text (selectable, translatable, readable by a screen reader) rather than
 * baked into an image.
 */
export function ScriptNote({ text, rotate = -8, className = "" }: ScriptNoteProps) {
  return (
    <p
      className={`u-script ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}{" "}
        </span>
      ))}
    </p>
  );
}
