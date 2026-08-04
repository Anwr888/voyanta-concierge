import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { BusinessSignupForm } from "./BusinessSignupForm";

export const metadata: Metadata = {
  title: "List Your Business",
  description: "Reach travelers already planning their Bahamas trip. Create a free listing or upgrade for featured placement.",
};

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Get discovered with a standard listing.",
    features: ["Free listing", "Business profile page", "Customer reviews", "Category placement"],
    highlight: false,
  },
  {
    name: "Standard",
    price: "Paid",
    description: "A richer profile with more visibility.",
    features: ["Everything in Basic", "Enhanced profile with more photos", "Priority in category search", "Social links"],
    highlight: false,
  },
  {
    name: "Premium",
    price: "Paid",
    description: "Maximum exposure and marketing tools.",
    features: [
      "Everything in Standard",
      "Featured placement sitewide",
      "Additional marketing tools",
      "Analytics dashboard",
      "Lead management",
    ],
    highlight: true,
  },
];

export default function ListYourBusinessPage() {
  return (
    <div>
      <section className="bg-navy-950 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p className="eyebrow eyebrow-on-dark">For Local Businesses</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl text-white">
            Get in front of travelers already planning their trip.
          </h1>
          <p className="mt-5 text-white/70 leading-relaxed max-w-2xl mx-auto">
            Voyanta Concierge is the planning and discovery platform travelers use before they
            arrive. Create a free profile, or upgrade for featured placement, marketing tools, and
            lead insights.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-6 flex flex-col ${
                tier.highlight ? "border-gold-500 bg-gold-300/5 shadow-lg" : "border-navy-900/10 bg-white"
              }`}
            >
              {tier.highlight && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-bold text-navy-950 uppercase">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl text-navy-900">{tier.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{tier.description}</p>
              <p className="mt-4 font-display text-3xl text-navy-900">{tier.price}</p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Icon name="Check" size={15} className="mt-0.5 shrink-0 text-teal-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand-100 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-navy-900 text-center">
            Tell us about your business
          </h2>
          <p className="mt-2 text-sm text-ink-soft text-center">
            We&apos;ll follow up by email to get your listing set up.
          </p>
          <div className="mt-8">
            <BusinessSignupForm />
          </div>
        </div>
      </section>
    </div>
  );
}
