import Link from "next/link";
import { Icon } from "@/components/Icon";
import { getCategory } from "@/lib/data/categories";
import { formatDistanceFromPort, formatDurationMinutes } from "@/lib/format";
import { bandLabels } from "@/lib/cruise";
import { resultHref, resultTitle, type SearchResult } from "@/lib/search";

const typeMeta: Record<SearchResult["type"], { icon: string; label: string }> = {
  business: { icon: "MapPin", label: "Listing" },
  package: { icon: "Ship", label: "Cruise Package" },
  guide: { icon: "Compass", label: "Guide" },
};

export function SearchResultRow({ result, onNavigate }: { result: SearchResult; onNavigate?: () => void }) {
  const { icon } = typeMeta[result.type];

  let category = "";
  let location = "";
  const facts: { icon: string; label: string }[] = [];

  if (result.type === "business") {
    const b = result.item;
    category = getCategory(b.category)?.name ?? b.subcategory;
    location = `${b.area}, ${b.island}`;
    if (b.distanceFromCruisePortMinutes !== undefined) {
      facts.push({ icon: "Ship", label: formatDistanceFromPort(b.distanceFromCruisePortMinutes, b.distanceFromCruisePortIsEstimate) });
    }
    if (b.durationMinutes !== undefined) {
      facts.push({ icon: "Hourglass", label: formatDurationMinutes(b.durationMinutes) });
    }
    if (b.priceLevel !== undefined) {
      facts.push({ icon: "CircleDollarSign", label: "$".repeat(b.priceLevel) });
    }
  } else if (result.type === "package") {
    const p = result.item;
    category = p.category;
    location = p.meetingLocation;
    facts.push({ icon: "Ship", label: `${p.distanceFromPortMinutes} min from port` });
    facts.push({ icon: "Hourglass", label: `~${p.durationHours}h · ${bandLabels[p.durationBand]}` });
    facts.push({ icon: "CircleDollarSign", label: `from $${p.priceFrom}` });
  } else {
    const g = result.item;
    category = g.category;
    location = g.island ?? "The Bahamas";
    facts.push({ icon: "Clock", label: `${g.readMinutes} min read` });
  }

  return (
    <Link
      href={resultHref(result)}
      onClick={onNavigate}
      className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-sand-100 transition-colors"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-900/5 text-navy-700">
        <Icon name={icon} size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-navy-900">{resultTitle(result)}</p>
          {result.type === "business" && result.item.verified && (
            <Icon name="CircleCheck" size={13} className="shrink-0 text-teal-600" />
          )}
        </div>
        <p className="truncate text-xs text-ink-soft">
          {category}
          {location ? ` · ${location}` : ""}
        </p>
        {facts.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-ink-soft">
            {facts.map((f) => (
              <span key={f.label} className="flex items-center gap-1">
                <Icon name={f.icon} size={11} /> {f.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
