"use client";

import Link from "next/link";
import { useState } from "react";

import { contact, nav, site } from "@/content/site";
import { Doodle } from "@/components/ui/Doodle";
import { ScriptNote } from "@/components/ui/ScriptNote";
import { ContactForm } from "@/components/site/ContactForm";

const linkStyles =
  "text-cream/90 transition-colors duration-[var(--duration-fast)] hover:text-crimson-bright";

const iconProps = {
  "aria-hidden": true as const,
  focusable: "false" as const,
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "shrink-0 text-crimson-bright",
};

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative border-t border-rule-dark bg-ink">
      <div className="px-[var(--space-gutter)] py-[var(--space-section)]">
        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Existing Invitation, Links & Tagline */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <span className="u-eyebrow flex items-center gap-2 text-crimson-bright font-semibold">
                <span>06</span>
                <span className="inline-block h-px w-3 bg-crimson-bright" />
                <span>Contact</span>
              </span>
              <h2 className="u-display mt-3 text-[length:var(--text-title)] text-cream italic">
                Get in touch
              </h2>
              <span aria-hidden className="mt-3 block h-px w-14 bg-crimson-bright" />
              <p className="mt-4 max-w-[28ch] text-[length:var(--text-body)] text-muted">
                {contact.body}
              </p>
            </div>

            {/* Email & Instagram Channels with Copy / External Icons */}
            <ul className="flex flex-col gap-4">
              <li className="flex items-center justify-between rounded border border-rule-dark bg-ink-soft/60 px-4 py-3 transition-colors hover:border-crimson/50">
                <div className="flex items-center gap-3">
                  <svg {...iconProps}>
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
                    <path d="M2 4.5 8 9l6-4.5" />
                  </svg>
                  <a href={`mailto:${site.email}`} className={`${linkStyles} break-all text-sm font-medium`}>
                    {site.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  className="rounded p-1.5 text-muted transition-colors hover:bg-crimson/15 hover:text-crimson-bright"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <span className="text-[0.6875rem] font-mono text-crimson-bright">Copied!</span>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </li>

              <li className="flex items-center justify-between rounded border border-rule-dark bg-ink-soft/60 px-4 py-3 transition-colors hover:border-crimson/50">
                <div className="flex items-center gap-3">
                  <svg {...iconProps}>
                    <rect x="1.5" y="1.5" width="13" height="13" rx="4" />
                    <circle cx="8" cy="8" r="3.25" />
                    <circle cx="11.9" cy="4.1" r="0.6" fill="currentColor" />
                  </svg>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkStyles} text-sm font-medium`}
                  >
                    {site.instagram}
                  </a>
                </div>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1.5 text-muted transition-colors hover:bg-crimson/15 hover:text-crimson-bright"
                  aria-label="Open Instagram profile"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </li>
            </ul>

            {/* Handwritten Sign-off */}
            <div className="mt-2 flex items-start gap-3">
              <ScriptNote
                text={contact.note}
                rotate={-6}
                className="text-2xl text-gold-bright"
              />
              <Doodle kind="star" className="mt-1 w-6 shrink-0 text-crimson-bright" />
            </div>
          </div>

          {/* Right Column: Functional Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

        <Doodle kind="flourish" className="mt-14 h-8 w-full text-crimson opacity-40" />
      </div>

      {/* Subfooter */}
      <div className="border-t border-[var(--color-rule-dark)] px-[var(--space-gutter)] py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] text-muted">
            &copy; 2026 Sara Dhandore. All rights reserved. &bull; Cinema Darkroom Edition.
          </p>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`u-eyebrow tracking-[0.16em] transition-colors duration-[var(--duration-fast)] ${
                      i === 0 ? "text-crimson-bright" : "text-cream/60 hover:text-cream hover:text-crimson-bright"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
