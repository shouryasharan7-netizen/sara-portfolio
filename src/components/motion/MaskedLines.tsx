"use client";

import { motion } from "motion/react";

import {
  DURATION,
  IN_VIEW,
  maskedLineVariants,
  staggerParent,
  transition,
} from "@/lib/motion";

type MaskedLinesProps = {
  /** One entry per visual line — each gets its own mask. */
  lines: readonly React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Type that climbs out from behind its own baseline, a line at a time.
 *
 * The title-card move: each line sits in an `overflow-hidden` box and
 * translates up from below it, so the letters appear to be uncovered rather
 * than to fade in.
 */
export function MaskedLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: MaskedLinesProps) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
      variants={staggerParent(0.09, delay)}
      className={`block ${className}`}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            variants={maskedLineVariants}
            transition={transition(DURATION.cinematic)}
            className={`block ${lineClassName}`}
          >
            {line}{" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
