import { Icon } from "@/components/Icon";
import { LazyLocationMap } from "@/components/map/LazyLocationMap";

export function LocationPanel({
  address,
  island,
  location,
}: {
  address: string;
  island: string;
  location: { lat: number; lng: number };
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-900/10">
      <div className="relative isolate z-0 h-40 bg-navy-900">
        <LazyLocationMap lat={location.lat} lng={location.lng} />
      </div>
      <div className="flex items-start gap-2 bg-white p-4">
        <Icon name="MapPin" size={15} className="mt-0.5 shrink-0 text-navy-700" />
        <div className="text-sm">
          <p className="font-medium text-navy-900">{address}</p>
          <p className="text-ink-soft">{island}</p>
        </div>
      </div>
    </div>
  );
}
