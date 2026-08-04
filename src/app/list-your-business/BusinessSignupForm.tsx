"use client";

import { useState, FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { categories } from "@/lib/data/categories";
import { islands } from "@/lib/data/islands";

export function BusinessSignupForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal-500/30 bg-teal-500/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/15 text-teal-600">
          <Icon name="Check" size={22} />
        </div>
        <h3 className="mt-4 font-display text-xl text-navy-900">Thanks for reaching out.</h3>
        <p className="mt-2 text-sm text-ink-soft max-w-sm mx-auto">
          We&apos;ve received your business details and will follow up by email to get your listing set up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business name" required>
          <input required type="text" className="input" placeholder="e.g. Blue Water Charters" />
        </Field>
        <Field label="Contact email" required>
          <input required type="email" className="input" placeholder="you@business.com" />
        </Field>
        <Field label="Category" required>
          <select required className="input">
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Island">
          <select className="input">
            <option value="">Select an island</option>
            {islands.map((i) => (
              <option key={i.slug} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Phone">
          <input type="tel" className="input" placeholder="+1 (242) 555-0100" />
        </Field>
        <Field label="Website (optional)">
          <input type="url" className="input" placeholder="https://" />
        </Field>
      </div>
      <Field label="Tell us about your business">
        <textarea rows={4} className="input resize-none" placeholder="What do you offer, and what makes it worth featuring?" />
      </Field>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
      >
        Submit listing request
        <Icon name="ArrowRight" size={15} />
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy-900">
        {label} {required && <span className="text-gold-600">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
