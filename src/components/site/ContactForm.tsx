"use client";

import { useState, useRef, useEffect } from "react";
import { site } from "@/content/site";

const PROJECT_TYPES = [
  "Film Collaboration",
  "Directing / Production",
  "Script Inquiry",
  "General Message",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>("Film Collaboration");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(80, textareaRef.current.scrollHeight)}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use Web3Forms or gracefully trigger mailto client
      const formData = new FormData();
      formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
      formData.append("name", trimmedName);
      formData.append("email", trimmedEmail);
      formData.append("subject", `[${subject}] Inquiry from ${trimmedName}`);
      formData.append("message", trimmedMessage);
      formData.append("from_name", "Sara Dhandore Portfolio");

      let succeeded = false;

      // Attempt async submission if configured, else fallback cleanly
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          succeeded = true;
        } else {
          throw new Error("Web3Forms fallback");
        }
      } catch {
        // Fallback: construct mailto trigger
        const mailtoSubject = encodeURIComponent(`[${subject}] Message from ${trimmedName}`);
        const mailtoBody = encodeURIComponent(
          `Hello Sara,\n\n${trimmedMessage}\n\n---\nFrom: ${trimmedName}\nEmail: ${trimmedEmail}\nInquiry: ${subject}`
        );
        window.location.href = `mailto:${site.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
        succeeded = true;
      }

      if (succeeded) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to send. Please email directly at dhandoresara@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("Film Collaboration");
    setMessage("");
    setIsSubmitted(false);
    setErrorMessage("");
  };

  if (isSubmitted) {
    return (
      <div className="rounded-md border border-crimson/30 bg-ink-soft p-8 text-center sm:p-10">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full border border-crimson-bright bg-crimson/10 text-crimson-bright">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="u-display text-2xl text-cream italic">Message received</h3>
        <p className="mt-2 font-serif text-lg italic text-gold-bright">
          &ldquo;let&apos;s create something beautiful.&rdquo;
        </p>
        <p className="mt-2 text-xs text-muted">
          Thank you for reaching out. Sara will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 inline-block rounded-full border border-rule-dark px-5 py-2 text-xs tracking-wider uppercase text-cream transition-colors hover:border-crimson-bright hover:text-crimson-bright"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-md border border-rule-dark bg-ink-soft/90 p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between border-b border-rule-dark pb-3">
        <span className="u-eyebrow text-crimson-bright">Interactive Terminal</span>
        <span className="u-eyebrow text-muted">Send a Message</span>
      </div>

      {/* Name */}
      <div className="group relative mb-6">
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
          required
          className="peer w-full border-b border-rule-dark bg-transparent py-2.5 text-sm text-cream transition-colors outline-none focus:border-crimson-bright"
        />
        <label
          htmlFor="contact-name"
          className="pointer-events-none absolute top-2.5 left-0 text-xs text-muted transition-all peer-focus:-top-4 peer-focus:text-[0.6875rem] peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-crimson-bright peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:text-gold-bright"
        >
          Name *
        </label>
      </div>

      {/* Email */}
      <div className="group relative mb-6">
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
          required
          className="peer w-full border-b border-rule-dark bg-transparent py-2.5 text-sm text-cream transition-colors outline-none focus:border-crimson-bright"
        />
        <label
          htmlFor="contact-email"
          className="pointer-events-none absolute top-2.5 left-0 text-xs text-muted transition-all peer-focus:-top-4 peer-focus:text-[0.6875rem] peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-crimson-bright peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:text-gold-bright"
        >
          Email Address *
        </label>
      </div>

      {/* Subject / Project Type Pill Selector */}
      <div className="mb-6">
        <span className="u-eyebrow mb-2.5 block text-[0.6875rem] text-muted">
          Project Type / Inquiry *
        </span>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => {
            const isSelected = subject === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSubject(type)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                  isSelected
                    ? "border-crimson-bright bg-crimson/15 text-crimson-bright font-medium shadow-[0_0_12px_rgba(255,59,48,0.2)]"
                    : "border-rule-dark bg-ink/40 text-muted hover:border-cream/40 hover:text-cream"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div className="group relative mb-6">
        <textarea
          ref={textareaRef}
          id="contact-message"
          value={message}
          onChange={handleMessageChange}
          placeholder=" "
          rows={3}
          required
          className="peer w-full resize-none border-b border-rule-dark bg-transparent py-2.5 text-sm text-cream transition-colors outline-none focus:border-crimson-bright"
        />
        <label
          htmlFor="contact-message"
          className="pointer-events-none absolute top-2.5 left-0 text-xs text-muted transition-all peer-focus:-top-4 peer-focus:text-[0.6875rem] peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-crimson-bright peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[0.6875rem] peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:text-gold-bright"
        >
          Message / Project Details *
        </label>
      </div>

      {/* Error Feedback */}
      {errorMessage && (
        <p className="mb-4 text-xs font-medium text-crimson-bright">{errorMessage}</p>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full border border-crimson-bright bg-crimson-bright px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white shadow-[0_0_16px_rgba(255,59,48,0.35)] transition-all hover:bg-white hover:text-ink active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="size-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <span aria-hidden>→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

