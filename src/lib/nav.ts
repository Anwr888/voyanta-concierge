export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links?: NavLink[];
}

export const primaryNav: NavGroup[] = [
  {
    label: "Plan Your Trip",
    href: "/plan",
    links: [
      { label: "Vacation Planner", href: "/plan", description: "Answer a few questions, get a personalized itinerary." },
      { label: "Trip Builder", href: "/trip-builder", description: "Drag, drop, and edit your day-by-day plan." },
      { label: "Group Planning", href: "/group-planning", description: "Vote, split costs, and coordinate with your group." },
    ],
  },
  {
    label: "Cruise Passengers",
    href: "/cruise",
    links: [
      { label: "Cruise Day Planner", href: "/cruise/planner", description: "Build a plan around your ship's time in port." },
      { label: "Cruise Packages", href: "/cruise/packages", description: "Curated cruise-day experiences." },
    ],
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Guides",
    href: "/guides",
  },
  {
    label: "Events",
    href: "/events",
  },
];

export const secondaryNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact & Concierge", href: "/contact" },
  { label: "List Your Business", href: "/list-your-business" },
];
