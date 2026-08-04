import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { categories } from "@/lib/data/categories";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2 pr-4">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
              Your Bahamas vacation, expertly planned — personalized itineraries, a dedicated
              planner for cruise passengers, and trusted local providers in one place.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { name: "Instagram", href: "#" },
                { name: "Facebook", href: "#" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-gold-400 hover:border-gold-400/50 transition-colors"
                >
                  <Icon name={s.name === "Instagram" ? "Instagram" : "Facebook"} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow eyebrow-on-dark">Plan</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/plan" className="hover:text-white transition-colors">Vacation Planner</Link></li>
              <li><Link href="/cruise" className="hover:text-white transition-colors">Cruise Passengers</Link></li>
              <li><Link href="/cruise/planner" className="hover:text-white transition-colors">Cruise Day Planner</Link></li>
              <li><Link href="/trip-builder" className="hover:text-white transition-colors">Trip Builder</Link></li>
              <li><Link href="/group-planning" className="hover:text-white transition-colors">Group Planning</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow eyebrow-on-dark">Discover</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Local Guides</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events Calendar</Link></li>
              <li><Link href="/cruise/packages" className="hover:text-white transition-colors">Cruise Packages</Link></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h3 className="eyebrow eyebrow-on-dark">Marketplace</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href={`/marketplace/${c.id}`} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/marketplace" className="text-gold-400 hover:text-gold-300 transition-colors">View all →</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="eyebrow eyebrow-on-dark">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Concierge</Link></li>
              <li><Link href="/list-your-business" className="hover:text-white transition-colors">List Your Business</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <NewsletterForm />
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs leading-relaxed text-white/45 space-y-3">
          <p>
            Voyanta Concierge is a planning and discovery platform that connects travelers with
            independent, locally owned Bahamian businesses. Tours, transportation, and other
            services listed on this site are provided by independent local operators — Voyanta
            Concierge does not directly operate these services.
          </p>
          <p>
            For cruise passengers: recommended activity windows are provided to help with
            planning and include a suggested return buffer. Voyanta Concierge does not guarantee
            that any activity, tour, or transportation will return you to your ship by a specific
            time. You remain responsible for knowing your cruise line&apos;s official all-aboard
            and departure times.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <p>© {new Date().getFullYear()} Voyanta Concierge. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/contact" className="hover:text-white/70 transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-white/70 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
