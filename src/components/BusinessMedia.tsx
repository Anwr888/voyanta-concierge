import { Icon } from "@/components/Icon";
import { getCategory } from "@/lib/data/categories";
import { MarketplaceCategoryId } from "@/lib/types";

// Sample marketplace listings don't have licensed photography, so each
// category gets a deliberate, consistent gradient + icon treatment instead of
// mismatched stock photos. Angle varies per-listing (via `seed`) so grids of
// cards from the same category don't look identical.

const gradients: Record<MarketplaceCategoryId, string> = {
  accommodation: "from-navy-800 via-navy-700 to-teal-600",
  transportation: "from-navy-900 via-navy-700 to-navy-600",
  "water-activities": "from-teal-600 via-teal-500 to-navy-700",
  tours: "from-gold-600 via-navy-800 to-navy-900",
  food: "from-gold-600 via-gold-500 to-navy-800",
  events: "from-navy-800 via-gold-600 to-navy-900",
  wellness: "from-teal-500 via-teal-400 to-navy-800",
  "family-services": "from-navy-700 via-teal-500 to-navy-800",
  "luxury-services": "from-navy-950 via-navy-800 to-gold-600",
  shopping: "from-gold-500 via-gold-600 to-navy-800",
  nightlife: "from-navy-950 via-navy-800 to-teal-600",
};

export function BusinessMedia({
  category,
  seed = 0,
  className = "",
  iconSize = 40,
}: {
  category: MarketplaceCategoryId;
  seed?: number;
  className?: string;
  iconSize?: number;
}) {
  const cat = getCategory(category);
  const angle = [135, 155, 115, 145][seed % 4];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[category]} ${className}`}
      style={{ backgroundImage: `linear-gradient(${angle}deg, var(--tw-gradient-stops))` }}
    >
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
      <Icon name={cat?.icon ?? "MapPin"} size={iconSize} className="text-white/90 drop-shadow-sm" strokeWidth={1.5} />
    </div>
  );
}
