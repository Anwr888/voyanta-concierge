import { Icon } from "@/components/Icon";

const trustPoints = [
  {
    icon: "Compass",
    title: "Local Bahamas Expertise",
    body: "Guides, itineraries, and cruise-day plans built around real island knowledge — not generic travel content.",
  },
  {
    icon: "Handshake",
    title: "Independent Local Providers",
    body: "Every listing is a real, independent Bahamian business — not a fabricated storefront.",
  },
  {
    icon: "Sparkles",
    title: "Personalized Planning",
    body: "Plans built around your dates, group, budget, and — for cruise days — the hours you actually have ashore.",
  },
  {
    icon: "Wallet",
    title: "Free to Use for Travelers",
    body: "Planning tools, guides, and the full marketplace are free to browse — no account or fee required.",
  },
] as const;

export function WhyVoyanta() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow">Why Voyanta</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900 text-balance">
          Plan The Bahamas with local knowledge.
        </h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          Voyanta brings accommodations, excursions, restaurants, transportation, and local
          experiences together so travelers don&apos;t have to search dozens of websites to plan
          one trip.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {trustPoints.map((point) => (
          <div key={point.title} className="text-center sm:text-left">
            <div className="mx-auto sm:mx-0 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
              <Icon name={point.icon} size={20} />
            </div>
            <h3 className="mt-3 font-display text-base text-navy-900">{point.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{point.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
