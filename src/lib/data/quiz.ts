export const vacationTypes = [
  { id: "Family", label: "Family", icon: "Users", blurb: "Kid-friendly pace, beaches, and easy days" },
  { id: "Romantic", label: "Romantic", icon: "Heart", blurb: "Sunsets, private dinners, quiet beaches" },
  { id: "Luxury", label: "Luxury", icon: "Gem", blurb: "Top-tier resorts and private experiences" },
  { id: "Adventure", label: "Adventure", icon: "Mountain", blurb: "ATVs, diving, and full days outdoors" },
  { id: "Relaxation", label: "Relaxation", icon: "Sparkles", blurb: "Spa, slow mornings, minimal itinerary" },
  { id: "Bachelor/Bachelorette", label: "Bachelor/Bachelorette", icon: "PartyPopper", blurb: "Group energy, boat days, nightlife" },
  { id: "Wedding", label: "Wedding", icon: "Church", blurb: "Destination wedding & guest coordination" },
  { id: "Fishing", label: "Fishing", icon: "Fish", blurb: "Charters, flats fishing, and reef trips" },
  { id: "Diving", label: "Diving", icon: "Waves", blurb: "Reef, wreck, and shark dive excursions" },
] as const;

export const budgetOptions = [
  { id: "budget-friendly", label: "Budget-Friendly", range: "Under $150/day", icon: "PiggyBank" },
  { id: "moderate", label: "Moderate", range: "$150–$300/day", icon: "Wallet" },
  { id: "premium", label: "Premium", range: "$300–$600/day", icon: "CreditCard" },
  { id: "luxury", label: "Luxury", range: "$600+/day", icon: "Gem" },
] as const;

export type VacationTypeId = (typeof vacationTypes)[number]["id"];
export type BudgetId = (typeof budgetOptions)[number]["id"];
