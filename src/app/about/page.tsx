import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "About",
  description: "Voyanta Concierge is the Bahamas vacation concierge platform — personalized planning, trusted local providers, one place.",
};

const values = [
  { icon: "Compass", title: "Concierge, not agency", body: "We help you plan and discover — connecting you with trusted local providers rather than operating services ourselves." },
  { icon: "Handshake", title: "Local first", body: "Every provider on Voyanta is an independent Bahamian business. Our growth is tied to theirs." },
  { icon: "Clock", title: "Honest about time", body: "Especially for cruise passengers — we'd rather under-promise on your schedule than have you miss the ship." },
  { icon: "Sparkles", title: "Effortless, not overwhelming", body: "A few questions in, a full plan out. Every activity stays editable." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden bg-navy-950">
        <Image src="/images/nassau-oceanfront-1.jpg" alt="Nassau coastline" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/20" />
        <div className="relative z-10 flex h-full flex-col justify-end">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pb-14 text-center">
            <p className="eyebrow eyebrow-on-dark">About Voyanta Concierge</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl text-white">
              The premier way to plan a Bahamas trip.
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="font-display text-2xl sm:text-3xl text-navy-900">Our mission</h2>
        <p className="mt-4 text-ink-soft leading-relaxed text-lg">
          Help travelers experience the very best of The Bahamas while making vacation planning
          simple, enjoyable, and stress-free — with authentic local recommendations and trusted
          service providers, all in one platform.
        </p>
      </section>

      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400">
                <Icon name={v.icon} size={18} />
              </div>
              <h3 className="mt-4 font-display text-lg text-white">{v.title}</h3>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl sm:text-3xl text-navy-900 text-center">Where we&apos;re starting</h2>
        <p className="mt-4 text-ink-soft leading-relaxed text-center max-w-2xl mx-auto">
          Voyanta Concierge is built first for travelers from the United States, Canada, and the
          United Kingdom planning trips to The Bahamas — including cruise passengers with only a
          few hours ashore. From there, our long-term goal is to become the largest digital
          tourism marketplace dedicated to The Bahamas: a place where travelers plan an entire
          vacation, and local businesses reach visitors from around the world.
        </p>
      </section>
    </div>
  );
}
