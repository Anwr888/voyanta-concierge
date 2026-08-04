import Link from "next/link";
import Image from "next/image";
import { CruisePackage } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { bandLabels } from "@/lib/cruise";

export function CruisePackageCard({ pkg }: { pkg: CruisePackage }) {
  return (
    <Link
      href={`/cruise/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-navy-800 uppercase">
          {pkg.category}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/75 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-white">
          {bandLabels[pkg.durationBand]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg leading-snug text-navy-900 group-hover:text-navy-700">{pkg.name}</h3>
        <p className="mt-1 text-sm text-ink-soft line-clamp-2">{pkg.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
          <span className="flex items-center gap-1"><Icon name="Clock" size={12} /> ~{pkg.durationHours}h activity</span>
          <span className="flex items-center gap-1"><Icon name="MapPin" size={12} /> {pkg.distanceFromPortMinutes} min from port</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-xs text-ink-soft">Needs {pkg.minPortTimeHours}h+ in port</span>
          <span className="font-display text-lg text-navy-900">from ${pkg.priceFrom}</span>
        </div>
      </div>
    </Link>
  );
}
