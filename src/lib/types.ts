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
  priceLevel: PriceLevel;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: TravelerTag[];
  images: string[];
  address: string;
  location: { lat: number; lng: number };
  distanceFromCruisePortMinutes?: number;
  phone: string;
  website: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
  hours: string;
  durationMinutes?: number;
  whatsIncluded?: string[];
  whatsNotIncluded?: string[];
  requirements?: string[];
  cancellationPolicy?: string;
  featured?: boolean;
  subscriptionTier: "basic" | "standard" | "premium";
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

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: GuideCategory;
  island?: Island;
  excerpt: string;
  heroImage: string;
  readMinutes: number;
  sections: { heading: string; body: string[] }[];
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
