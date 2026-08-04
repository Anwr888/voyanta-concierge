import { Icon } from "@/components/Icon";

const steps = [
  {
    icon: "MessageCircleQuestionMark",
    title: "Tell us about your trip",
    description:
      "Your island, dates, group, budget, and travel style — or your ship, docking time, and all-aboard time if you're in port for the day.",
  },
  {
    icon: "CalendarCheck2",
    title: "Get a personalized plan",
    description:
      "We build a day-by-day itinerary — or a time-aware cruise-day plan — that you can edit, reorder, and save as you go.",
  },
  {
    icon: "Handshake",
    title: "Connect with local providers",
    description:
      "Every recommendation links to a trusted, independent Bahamian business — tours, drivers, restaurants, and more.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="max-w-xl">
        <p className="eyebrow">How Voyanta Works</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
          Three steps from idea to itinerary.
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {steps.map((step, i) => (
          <div key={step.title} className="relative pl-1">
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl text-gold-500/80">0{i + 1}</span>
              <div className="h-px flex-1 bg-navy-900/10" />
            </div>
            <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900/5 text-navy-800">
              <Icon name={step.icon} size={22} />
            </div>
            <h3 className="mt-4 font-display text-xl text-navy-900">{step.title}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
