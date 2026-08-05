// Shared content types for Voyanta Concierge sample data.
// All data in src/lib/data is illustrative sample content used to demonstrate
// the product experience — not live business listings.

export type Island =
  | "New Providence (Nassau)"
  | "Paradise Island"
  | "Grand Bahama (Freeport)"
  | "Exuma"
  | "Abaco"
  | "Eleuthera"
  | "Bimini"
  | "Harbour Island";

export type MarketplaceCategoryId =
  | "accommodation"
  | "transportation"
  | "water-activities"
  | "tours"
  | "food"
  | "events"
  | "wellness"
  | "family-services"
  | "luxury-services"
  | "shopping"
  | "nightlife";

export interface MarketplaceCategory {
  id: MarketplaceCategoryId;
  name: string;
  description: string;
  subcategories: string[];
  icon: string; // lucide-style icon name, rendered via Icon component
}

export type TravelerTag =
  | "family-friendly"
  | "luxury"
  | "outdoor"
  | "water-activities"
  | "kid-friendly"
  | "pet-friendly"
  | "accessible";

export type PriceLevel = 1 | 2 | 3 | 4;

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

// Outbound links to a business's real, independent review pages. Used instead
// of an in-house rating/review count whenever we haven't verified a live
// figure to display as our own — see `verified` below.
export interface ReviewLinks {
  google?: string;
  tripadvisor?: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: MarketplaceCategoryId;
  subcategory: string;
  island: Island;
  area: string; // neighborhood / locality
  shortDescription: string;
  description: string;
  // Undefined = price range not publicly verified (shown as "not published"),
  // not "free" or "unknown-but-cheap" — never inferred.
  priceLevel?: PriceLevel;
  // Legacy sample-data rating fields. Real, verified listings omit these in
  // favor of `reviewLinks` (see `verified`) rather than showing a fabricated
  // or scraped-and-stale rating.
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  reviewLinks?: ReviewLinks;
  tags: TravelerTag[];
  images: string[];
  address: string;
  location: { lat: number; lng: number };
  distanceFromCruisePortMinutes?: number;
  // True when distanceFromCruisePortMinutes is Voyanta's own estimate from a
  // verified address rather than a figure published by the business.
  distanceFromCruisePortIsEstimate?: boolean;
  // Short suggested way to get there from the cruise port (e.g. "Walking
  // distance", "Taxi recommended", "Transfer included with booking").
  // Omitted for on-demand/mobile services with no single fixed venue, where
  // a cruise-port distance isn't a meaningful concept.
  suggestedTransport?: string;
  phone?: string;
  website?: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
  hours: string; // always a real, sourced value — or an explicit "not published" note
  durationMinutes?: number;
  whatsIncluded?: string[];
  whatsNotIncluded?: string[];
  requirements?: string[];
  cancellationPolicy?: string;
  featured?: boolean;
  subscriptionTier: "basic" | "standard" | "premium";
  // True for independently verified real businesses (name, address, phone,
  // and website cross-checked against public sources). Listings without this
  // flag are illustrative sample data, not live businesses.
  verified?: boolean;
}

export type CruiseDurationBand = "under-3" | "3-to-4" | "4-to-6" | "6-plus";

export type CruisePackageCategory =
  | "Nassau Highlights"
  | "Beach Escape"
  | "Taste of The Bahamas"
  | "Adventure Day"
  | "Family Cruise Day"
  | "Luxury Cruise Day";

export interface CruisePackage {
  id: string;
  slug: string;
  name: string;
  category: CruisePackageCategory;
  tagline: string;
  description: string;
  durationHours: number; // planned activity duration
  minPortTimeHours: number; // recommended minimum available port time
  durationBand: CruiseDurationBand;
  distanceFromPortMinutes: number;
  priceFrom: number;
  image: string;
  images: string[];
  providerName: string;
  meetingLocation: string;
  transportationInfo: string;
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  requirements: string[];
  cancellationPolicy: string;
  interests: string[];
  familyFriendly: boolean;
  luxury: boolean;
}

export type GuideCategory =
  | "Best Beaches"
  | "Best Restaurants"
  | "Best Hidden Gems"
  | "Rainy Day Activities"
  | "Family Activities"
  | "Free Things to Do"
  | "Nightlife"
  | "Shopping"
  | "Local Food"
  | "Island Guides"
  | "Travel Tips"
  | "Safety Tips"
  | "Transportation Tips"
  | "Packing Lists";

// Optional cruise-passenger quick facts for a guide section (e.g. a single
// beach or attraction within a broader guide) — same three facts shown on
// marketplace listings, for the same reason: how it fits a short port day.
export interface GuideSectionQuickFacts {
  distanceFromPort: string; // pre-formatted, e.g. "~10 min walk from cruise port"
  duration?: string; // e.g. "45–60 min"
  transport?: string; // e.g. "Walking distance"
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: GuideCategory;
  island?: Island;
  excerpt: string;
  heroImage: string;
  readMinutes: number;
  sections: { heading: string; body: string[]; quickFacts?: GuideSectionQuickFacts }[];
  tips?: string[];
}

export type EventCategory =
  | "Festival"
  | "Concert"
  | "Sporting Event"
  | "Cultural Event"
  | "Holiday Celebration"
  | "Farmers Market";

export interface VoyantaEvent {
  id: string;
  title: string;
  category: EventCategory;
  island: Island;
  location: string;
  startDate: string; // ISO date
  endDate?: string;
  description: string;
  image: string;
}

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  category: string;
  editable: true;
  // The structured link to the real Marketplace taxonomy — set when a
  // traveler picks a category in the Trip Builder. `marketplaceListingId`
  // is reserved for the next step (a specific business/experience chosen
  // for this slot) and is cleared whenever the category changes.
  marketplaceCategoryId?: MarketplaceCategoryId | null;
  marketplaceListingId?: string | null;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: ItineraryActivity[];
}

export interface ItineraryTemplate {
  id: string;
  slug: string;
  title: string;
  island: Island;
  days: ItineraryDay[];
  vacationTypes: string[];
}
