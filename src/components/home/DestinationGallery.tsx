import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";

const spots = [
  {
    href: "/guides/new-providence-island-guide",
    image: "/images/baha-mar-resort-1.jpg",
    title: "Cable Beach & Baha Mar",
    subtitle: "Resort corridor",
    span: "lg:col-span-2 lg:row-span-2",
    height: "h-64 lg:h-full",
  },
  {
    href: "/guides/hidden-gems-new-providence",
    image: "/images/fort-charlotte-aerial-1.jpg",
    title: "Fort Charlotte",
    subtitle: "History & hidden gems",
    span: "",
    height: "h-48",
  },
  {
    href: "/cruise",
    image: "/images/nassau-cruise-terminal-1.jpg",
    title: "Prince George Wharf",
    subtitle: "The cruise port",
    span: "",
    height: "h-48",
  },
  {
    href: "/guides/best-beaches-nassau-paradise-island",
    image: "/images/nassau-oceanfront-1.jpg",
    title: "Cable Beach Shoreline",
    subtitle: "Best beaches",
    span: "sm:col-span-2 lg:col-span-2",
    height: "h-48",
  },
];

export function DestinationGallery() {
  return (
    <section className="bg-sand-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="eyebrow">Where You&apos;re Headed</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy-900">
            A first look at Nassau & Paradise Island.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {spots.map((spot) => (
            <Link
              key={spot.title}
              href={spot.href}
              className={`group relative overflow-hidden rounded-2xl ${spot.height} ${spot.span}`}
            >
              <Image
                src={spot.image}
                alt={spot.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <p className="text-xs font-semibold tracking-wide text-gold-300 uppercase">{spot.subtitle}</p>
                <h3 className="mt-1 font-display text-xl text-white flex items-center gap-1.5">
                  {spot.title}
                  <Icon name="ArrowUpRight" size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
