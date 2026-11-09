"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { nav } from "@/content/site";
import { Doodle } from "@/components/ui/Doodle";

/**
 * Responsive top bar:
 * - Desktop: letterspaced navigation links with active crimson underline indicators.
 * - Mobile: 44px touch target hamburger button with animated slide-out glass drawer,
 *   touch-optimized links, and direct contact CTA.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule-dark)] bg-ink/90 backdrop-blur-lg transition-colors duration-300">
      <div className="flex h-16 sm:h-18 items-center justify-between px-[var(--space-gutter)]">
        <Link
          href="/#home"
          onClick={() => setMobileOpen(false)}
          className="relative inline-block pb-1.5 leading-none"
        >
          <span className="font-script text-[1.4rem] sm:text-[1.5rem] text-gold-bright transition-colors hover:text-crimson-bright">
            Sara Dhandore
          </span>
          <Doodle
            kind="underline"
            className="absolute -bottom-0.5 left-0 w-24 sm:w-28 text-crimson-bright opacity-80"
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item, i) => {
              const isActive = i === 0;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`u-eyebrow relative inline-block pb-1 tracking-[0.16em] transition-colors duration-[var(--duration-fast)] ${
                      isActive
                        ? "text-crimson-bright font-semibold"
                        : "text-cream/70 hover:text-cream hover:text-crimson-bright"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 block h-px w-full bg-crimson-bright"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button — 44x44px touch target */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="grid size-11 place-items-center rounded-full border border-white/20 bg-ink-soft text-cream transition-all md:hidden hover:border-crimson-bright hover:text-crimson-bright active:scale-90"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 sm:top-18 bottom-0 z-50 flex flex-col justify-between border-t border-white/10 bg-ink/98 px-[var(--space-gutter)] py-8 backdrop-blur-2xl md:hidden overflow-y-auto">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col divide-y divide-white/10">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 text-base tracking-[0.14em] uppercase text-cream/90 transition-colors hover:text-crimson-bright active:text-crimson-bright"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-muted/60">0{i + 1} &rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 border-t border-white/10 pt-6">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-crimson-bright bg-crimson-bright py-3 text-xs font-semibold tracking-wider uppercase text-white shadow-[0_0_16px_rgba(217,59,47,0.25)]"
            >
              <span>Get in Touch</span>
              <span aria-hidden>&rarr;</span>
            </Link>
            <p className="mt-4 text-center text-[0.7rem] text-muted">
              Sara Dhandore &bull; Filmmaker &amp; Director
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
