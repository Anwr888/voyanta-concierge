import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";

const paths = [
  {
    href: "/plan",
    image: "/images/baha-mar-resort-1.jpg",
    kicker: "Staying in The Bahamas",
    title: "Planning a vacation",
    description:
      "Tell us your island, dates, and travel style — we'll build a full itinerary with accommodations, excursions, and restaurants.",
    cta: "Build my vacation plan",
  },
  {
    href: "/cruise",
    image: "/images/nassau-cruise-terminal-1.jpg",
    kicker: "Arriving by Cruise Ship",
    title: "Ashore for the day",
    description:
      "Enter your ship's docking and all-aboard times — we'll recommend activities that reasonably fit, with a buffer built in to get you back.",
    cta: "Plan my day in port",
  },
];

export function TravelerFork() {
  return (
    <section className="relative z-20 -mt-28 sm:-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="hidden md:flex absolute left-1/2 top-1/2 z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-500 shadow-lg shadow-navy-950/30 ring-4 ring-sand-50">
            <Icon name="Sparkle" size={22} className="text-navy-950" />
          </div>

          {paths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group relative flex h-80 sm:h-96 flex-col justify-end overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/25 ring-1 ring-navy-950/5"
            >
              <Image
                src={path.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/10" />
              <div className="relative p-6 sm:p-8">
                <span className="eyebrow eyebrow-on-dark">{path.kicker}</span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl text-white">{path.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-white/75 leading-relaxed">{path.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 group-hover:gap-2.5 transition-all">
                  {path.cta}
                  <Icon name="ArrowRight" size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
