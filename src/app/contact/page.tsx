import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact & Concierge",
  description: "Reach the Voyanta Concierge team, or ask about premium VIP trip planning.",
};

const concierge = [
  { icon: "Sparkles", title: "Premium vacation planning", body: "A dedicated planner builds and refines your itinerary end-to-end." },
  { icon: "MessageSquare", title: "Travel consultation", body: "Talk through island choice, timing, and trip style before you book anything." },
  { icon: "ListChecks", title: "Custom itinerary planning", body: "Tell us the occasion — we'll build a day-by-day plan around it." },
  { icon: "Gem", title: "VIP planning", body: "White-glove coordination for weddings, groups, and milestone trips." },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p className="eyebrow">Get in Touch</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-navy-900">Contact & Concierge</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Questions about planning, a business listing, or interested in premium concierge
        services? Send us a message.
      </p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-navy-900/10 bg-white p-5">
            <h3 className="font-display text-lg text-navy-900">Reach us directly</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-800">
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={15} className="text-navy-700" /> hello@voyantaconcierge.com
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={15} className="text-navy-700" /> +1 (242) 555-0100
              </li>
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={15} className="text-navy-700" /> Nassau, The Bahamas
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-navy-900 p-5">
            <p className="eyebrow eyebrow-on-dark">Premium Concierge Services</p>
            <div className="mt-4 space-y-4">
              {concierge.map((c) => (
                <div key={c.title} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold-400">
                    <Icon name={c.icon} size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className="text-xs text-white/55 mt-0.5">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
