import { MarketplaceCategory } from "@/lib/types";

export const categories: MarketplaceCategory[] = [
  {
    id: "accommodation",
    name: "Accommodation",
    description: "Hotels, resorts, vacation rentals, and villas.",
    subcategories: ["Hotels", "Resorts", "Vacation Rentals", "Villas"],
    icon: "BedDouble",
  },
  {
    id: "transportation",
    name: "Transportation",
    description: "Airport transfers, private drivers, rental cars, and golf carts.",
    subcategories: ["Airport Transfers", "Private Drivers", "Rental Cars", "Golf Carts"],
    icon: "Car",
  },
  {
    id: "water-activities",
    name: "Water Activities",
    description: "Boat charters, snorkeling, diving, jet skiing, and more.",
    subcategories: [
      "Boat Charters",
      "Fishing Charters",
      "Snorkeling",
      "Scuba Diving",
      "Swimming Pigs",
      "Jet Skiing",
      "Parasailing",
      "Paddleboarding",
    ],
    icon: "Waves",
  },
  {
    id: "tours",
    name: "Tours",
    description: "Island tours, food tours, historical tours, and nature tours.",
    subcategories: ["Island Tours", "Food Tours", "Historical Tours", "Nature Tours", "ATV Tours"],
    icon: "Map",
  },
  {
    id: "food",
    name: "Food",
    description: "Restaurants, private chefs, catering, and grocery delivery.",
    subcategories: ["Restaurants", "Private Chefs", "Catering", "Grocery Delivery"],
    icon: "UtensilsCrossed",
  },
  {
    id: "events",
    name: "Events",
    description: "Weddings, event planners, DJs, photographers, and decorators.",
    subcategories: ["Weddings", "Event Planners", "DJs", "Photographers", "Decorators"],
    icon: "PartyPopper",
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Massage therapists, yoga, personal trainers, and spa services.",
    subcategories: ["Massage Therapists", "Yoga", "Personal Trainers", "Spa Services"],
    icon: "Sparkles",
  },
  {
    id: "family-services",
    name: "Family Services",
    description: "Babysitting and childcare for family vacations.",
    subcategories: ["Babysitting", "Childcare"],
    icon: "Users",
  },
  {
    id: "luxury-services",
    name: "Luxury Services",
    description: "Yacht charters, luxury transportation, and concierge services.",
    subcategories: ["Yacht Charters", "Luxury Transportation", "Concierge Services"],
    icon: "Gem",
  },
  {
    id: "shopping",
    name: "Shopping",
    description: "Souvenirs and local artisan goods.",
    subcategories: ["Souvenirs", "Local Artisans"],
    icon: "ShoppingBag",
  },
  {
    id: "nightlife",
    name: "Nightlife",
    description: "Bars, clubs, and live music.",
    subcategories: ["Bars", "Clubs", "Live Music"],
    icon: "Music",
  },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
