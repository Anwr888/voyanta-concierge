"use client";

import { useState, FormEvent } from "react";
import { Icon } from "@/components/Icon";

export function ContactForm() {
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
        <h3 className="mt-4 font-display text-xl text-navy-900">Message sent.</h3>
        <p className="mt-2 text-sm text-ink-soft">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-semibold text-navy-900">Name</span>
          <input required type="text" className="input mt-2" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-navy-900">Email</span>
          <input required type="email" className="input mt-2" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-navy-900">What can we help with?</span>
        <select className="input mt-2">
          <option>General question</option>
          <option>Trip planning help</option>
          <option>Premium concierge services</option>
          <option>Business listing</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-navy-900">Message</span>
        <textarea required rows={5} className="input mt-2 resize-none" />
      </label>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
      >
        Send message
        <Icon name="Send" size={15} />
      </button>
    </form>
  );
}
