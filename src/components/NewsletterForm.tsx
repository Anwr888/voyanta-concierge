"use client";

import { useState, FormEvent } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-md">
      <h3 className="eyebrow eyebrow-on-dark">Stay in the loop</h3>
      <p className="mt-2 text-sm text-white/60">
        Bahamas travel tips and new guides, a couple of times a month.
      </p>
      {submitted ? (
        <p className="mt-3 text-sm font-medium text-teal-400">You&apos;re on the list — thank you.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            required
            placeholder="you@email.com"
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 transition-colors"
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}
