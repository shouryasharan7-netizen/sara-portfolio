import Link from "next/link";

type GoldLinkProps = {
  children: React.ReactNode;
  /** Destination. Omit when the action is handled by `onClick` instead. */
  href?: string;
  /** Renders the call to action as a button — for in-page actions. */
  onClick?: () => void;
  /**
   * Set on the blush sections. The bright gold only clears contrast against
   * the dark surfaces; on light ones it drops to ~1.5:1, so the deeper bronze
   * is used instead.
   */
  onLight?: boolean;
  className?: string;
};

/**
 * The gold call-to-action used throughout: WATCH, VIEW, LEARN MORE.
 *
 * The underline is a pseudo-element so it can animate on transform alone,
 * and the arrow nudges on hover. An empty href means the destination isn't
 * wired up yet, so it renders as inert rather than a dead link. Off-site
 * destinations (YouTube, Vimeo) open in a new tab so the portfolio isn't
 * left behind.
 */
export function GoldLink({
  children,
  href,
  onClick,
  onLight = false,
  className = "",
}: GoldLinkProps) {
  const tone = onLight
    ? "text-gold-deep hover:text-crimson-bright"
    : "text-gold hover:text-crimson-bright";
  const rule = onLight ? "bg-gold-deep" : "bg-gold";
  const ruleHover = onLight ? "bg-crimson-bright" : "bg-crimson-bright";

  const inner = (
    <>
      <span className="u-eyebrow transition-colors">{children}</span>
      <span
        aria-hidden
        className="u-eyebrow inline-block transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-hover:text-crimson-bright"
      >
        →
      </span>
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 ${rule} transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:scale-x-0 group-focus-visible:scale-x-0`}
      />
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 ${ruleHover} transition-transform delay-[120ms] duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100`}
      />
    </>
  );

  const shared = `group relative inline-flex items-center gap-2 pb-1 ${tone} ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={shared}>
        {inner}
      </button>
    );
  }

  if (!href) {
    return (
      <span className={`${shared} cursor-default opacity-60`} aria-disabled>
        {inner}
      </span>
    );
  }

  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      className={shared}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
      {isExternal ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </Link>
  );
}
