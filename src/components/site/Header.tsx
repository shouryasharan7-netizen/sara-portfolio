"use client";

import Link from "next/link";
import { useState } from "react";

import { nav } from "@/content/site";
import { Doodle } from "@/components/ui/Doodle";

/**
 * Sticky glassmorphic top bar: handwritten wordmark on the left, letterspaced nav on the right.
 * Responsive mobile menu drawer with backdrop blur.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule-dark)] bg-ink/85 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-18 items-center justify-between px-[var(--space-gutter)]">
        <Link href="/#home" className="relative inline-block pb-2 leading-none">
          <span className="font-script text-[1.5rem] text-gold-bright transition-colors hover:text-crimson-bright">
            Sara Dhandore
          </span>
          <Doodle
            kind="underline"
            className="absolute -bottom-0.5 left-0 w-28 text-crimson-bright opacity-80"
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
                        ? "text-crimson-bright"
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="grid size-9 place-items-center rounded-full border border-cream/20 bg-ink-soft text-cream transition-colors md:hidden hover:border-crimson-bright hover:text-crimson-bright"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-rule-dark bg-ink/95 px-[var(--space-gutter)] py-6 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="u-eyebrow block py-2 text-sm tracking-[0.16em] text-cream/80 transition-colors hover:text-crimson-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
