import Link from "next/link";
import { Icon } from "@/components/Icon";
import { categories } from "@/lib/data/categories";

export function CategoryGrid() {
  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-on-dark">The Marketplace</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-white">
              Every kind of local experience, in one place.
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 whitespace-nowrap"
          >
            Browse the full marketplace
            <Icon name="ArrowRight" size={15} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/marketplace/${cat.id}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.07] hover:border-gold-400/30 transition-colors"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-gold-400 group-hover:bg-gold-400/15">
                <Icon name={cat.icon} size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{cat.name}</h3>
                <p className="mt-1 text-xs text-white/50 leading-relaxed">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
