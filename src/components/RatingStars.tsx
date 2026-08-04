import { Icon } from "@/components/Icon";

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Icon name="Star" size={size} className="absolute inset-0 text-gold-300" />
            {(filled || half) && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: half ? "50%" : "100%" }}>
                <Icon name="Star" size={size} className="text-gold-500 fill-gold-500" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function PriceLevel({ level }: { level: number }) {
  return (
    <span className="text-sm font-semibold tracking-wide text-navy-700">
      {"$".repeat(level)}
      <span className="text-navy-700/25">{"$".repeat(4 - level)}</span>
    </span>
  );
}
