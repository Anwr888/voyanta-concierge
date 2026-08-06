import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { BusinessMedia } from "@/components/BusinessMedia";
import { RatingStars, PriceLevel } from "@/components/RatingStars";
import { LocationPanel } from "@/components/LocationPanel";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getBusiness, businesses } from "@/lib/data/businesses";
import { getCategory } from "@/lib/data/categories";
import { formatDistanceFromPort, formatDurationMinutes } from "@/lib/format";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/marketplace/business/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return {};
  return { title: business.name, description: business.shortDescription };
}

export default async function BusinessProfilePage({ params }: PageProps<"/marketplace/business/[slug]">) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const cat = getCategory(business.category);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Link href={`/marketplace/${business.category}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-900">
        <Icon name="ArrowLeft" size={14} /> {cat?.name}
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl overflow-hidden">
        <BusinessMedia category={business.category} seed={0} className="h-64 sm:h-80" iconSize={48} />
        <div className="hidden sm:grid grid-rows-2 gap-2">
          <BusinessMedia category={business.category} seed={1} className="h-full" iconSize={32} />
          <BusinessMedia category={business.category} seed={2} className="h-full" iconSize={32} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            {business.featured && (
              <span className="rounded-full bg-gold-300/30 px-2.5 py-1 text-[11px] font-bold tracking-wide text-gold-600 uppercase">Featured</span>
            )}
            {business.verified && (
              <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-teal-700 uppercase">
                <Icon name="CircleCheck" size={12} />
                Verified business
              </span>
            )}
            <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-[11px] font-semibold text-navy-800">{business.subcategory}</span>
          </div>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h1 className="font-display text-3xl sm:text-4xl text-navy-900">{business.name}</h1>
            <FavoriteButton slug={business.slug} className="shrink-0 !bg-navy-900/5 hover:!bg-navy-900/10" />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={14} /> {business.area}, {business.island}
            </span>
            {business.rating !== undefined ? (
              <span className="flex items-center gap-1.5">
                <RatingStars rating={business.rating} />
                {business.rating.toFixed(1)} ({business.reviewCount} reviews)
              </span>
            ) : business.reviewLinks ? (
              <span className="flex items-center gap-1 font-medium text-teal-700">
                See real reviews below
              </span>
            ) : (
              <span className="text-ink-soft/60">Reviews unavailable</span>
            )}
            {business.priceLevel !== undefined ? (
              <PriceLevel level={business.priceLevel} />
            ) : (
              <span className="text-ink-soft/60">Price range not published</span>
            )}
          </div>

          <p className="mt-6 text-ink-soft leading-relaxed">{business.description}</p>

          {business.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {business.tags.map((t) => (
                <span key={t} className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-700 capitalize">
                  {t.replace("-", " ")}
                </span>
              ))}
            </div>
          )}

          {(business.whatsIncluded || business.whatsNotIncluded) && (
            <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {business.whatsIncluded && (
                <div>
                  <h3 className="font-display text-lg text-navy-900 flex items-center gap-1.5">
                    <Icon name="CheckCircle2" size={17} className="text-teal-600" /> What&apos;s included
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                    {business.whatsIncluded.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Icon name="Check" size={14} className="mt-0.5 shrink-0 text-teal-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {business.whatsNotIncluded && (
                <div>
                  <h3 className="font-display text-lg text-navy-900 flex items-center gap-1.5">
                    <Icon name="XCircle" size={17} className="text-navy-900/40" /> Not included
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                    {business.whatsNotIncluded.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Icon name="X" size={14} className="mt-0.5 shrink-0 text-navy-900/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {business.requirements && (
            <section className="mt-8">
              <h3 className="font-display text-lg text-navy-900">Requirements</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {business.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Icon name="Info" size={14} className="mt-0.5 shrink-0 text-gold-600" /> {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {business.cancellationPolicy && (
            <section className="mt-8">
              <h3 className="font-display text-lg text-navy-900">Cancellation policy</h3>
              <p className="mt-2 text-sm text-ink-soft">{business.cancellationPolicy}</p>
            </section>
          )}

          <section className="mt-10">
            <h3 className="font-display text-lg text-navy-900">Reviews</h3>
            {business.reviews ? (
              <div className="mt-4 space-y-4">
                {business.reviews.map((r) => (
                  <div key={r.author + r.date} className="rounded-xl border border-navy-900/8 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-navy-900">{r.author}</p>
                      <RatingStars rating={r.rating} size={12} />
                    </div>
                    <p className="mt-1.5 text-sm text-ink-soft">{r.text}</p>
                    <p className="mt-1.5 text-xs text-ink-soft/60">{r.date}</p>
                  </div>
                ))}
              </div>
            ) : business.reviewLinks ? (
              <div className="mt-4 rounded-xl border border-navy-900/8 bg-sand-50 p-4">
                <p className="text-sm text-ink-soft leading-relaxed">
                  Voyanta doesn&apos;t display a rating or review count for {business.name} — it isn&apos;t
                  something we can keep accurate or verified on our end. See real, current reviews directly
                  from the source:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {business.reviewLinks.google && (
                    <a
                      href={business.reviewLinks.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-3.5 py-2 text-xs font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
                    >
                      See reviews on Google
                      <Icon name="ArrowUpRight" size={12} />
                    </a>
                  )}
                  {business.reviewLinks.tripadvisor && (
                    <a
                      href={business.reviewLinks.tripadvisor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-3.5 py-2 text-xs font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
                    >
                      See reviews on Tripadvisor
                      <Icon name="ArrowUpRight" size={12} />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-ink-soft/60">No review information available.</p>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-navy-900/10 bg-white p-5 sticky top-24">
            <h3 className="font-display text-lg text-navy-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-navy-800">
                <Icon name="Clock" size={15} className="mt-0.5 text-navy-700 shrink-0" /> {business.hours}
              </li>
              <li className="flex items-center gap-2 text-navy-800">
                <Icon name="Info" size={15} className="text-navy-700 shrink-0" />
                {business.phone ?? "Phone not publicly listed"}
              </li>
              <li className="flex items-center gap-2 text-navy-800">
                <Icon name="Ship" size={15} className="text-navy-700 shrink-0" />
                {business.distanceFromCruisePortMinutes !== undefined
                  ? formatDistanceFromPort(business.distanceFromCruisePortMinutes, business.distanceFromCruisePortIsEstimate)
                  : "Distance from cruise port not available"}
              </li>
              <li className="flex items-center gap-2 text-navy-800">
                <Icon name="Hourglass" size={15} className="text-navy-700 shrink-0" />
                {business.durationMinutes !== undefined
                  ? `Recommended visit: ~${formatDurationMinutes(business.durationMinutes)}`
                  : "Visit duration not specified — contact directly"}
              </li>
              {business.suggestedTransport && (
                <li className="flex items-start gap-2 text-navy-800">
                  <Icon name="Car" size={15} className="mt-0.5 text-navy-700 shrink-0" />
                  {business.suggestedTransport}
                </li>
              )}
            </ul>
            <div className="mt-5 space-y-2">
              {business.website ? (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
                >
                  Visit website
                  <Icon name="ArrowUpRight" size={14} />
                </a>
              ) : business.social.facebook ? (
                <a
                  href={`https://facebook.com/${business.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors"
                >
                  Visit Facebook page
                  <Icon name="ArrowUpRight" size={14} />
                </a>
              ) : (
                <p className="text-center text-xs text-ink-soft/60">No official website or social page listed.</p>
              )}
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-navy-900/15 px-4 py-3 text-sm font-semibold text-navy-800 hover:bg-sand-100 transition-colors"
              >
                Ask the concierge
              </Link>
            </div>
            {(business.social.instagram || business.social.facebook) && (
              <div className="mt-4 flex gap-2">
                {business.social.instagram && (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 text-navy-700">
                    <Icon name="Instagram" size={16} />
                  </span>
                )}
                {business.social.facebook && (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 text-navy-700">
                    <Icon name="Facebook" size={16} />
                  </span>
                )}
              </div>
            )}
          </div>

          <LocationPanel address={business.address} island={business.island} location={business.location} />

          <p className="text-xs text-ink-soft leading-relaxed px-1">
            {business.name} is an independent local business. Voyanta Concierge helps travelers
            discover and plan with local providers — it does not directly operate this service.
          </p>
        </aside>
      </div>
    </div>
  );
}
