import { ItineraryTemplate } from "@/lib/types";

// Base 5-day itinerary templates by vacation type. The Vacation Planner quiz
// selects the closest-matching template and adjusts it to the traveler's
// chosen trip length.

const day = (
  n: number,
  title: string,
  activities: [string, string, string, string][]
) => ({
  day: n,
  title,
  activities: activities.map(([time, actTitle, description, category], i) => ({
    id: `d${n}-a${i}`,
    time,
    title: actTitle,
    description,
    category,
    editable: true as const,
  })),
});

export const itineraryTemplates: ItineraryTemplate[] = [
  {
    id: "it-family",
    slug: "five-days-nassau-family",
    title: "Five Days in Nassau — Family",
    island: "New Providence (Nassau)",
    vacationTypes: ["Family"],
    days: [
      day(1, "Arrival & Settling In", [
        ["10:00 AM", "Airport pickup", "Private transfer from Lynden Pindling International Airport to your hotel.", "Transportation"],
        ["1:00 PM", "Hotel check-in", "Settle in and get oriented at your Cable Beach resort.", "Accommodation"],
        ["6:30 PM", "Dinner reservation", "Family-friendly dinner near the hotel.", "Food"],
        ["8:00 PM", "Sunset walk", "An easy evening walk along the beach.", "Sightseeing"],
      ]),
      day(2, "Swimming Pigs & Beach", [
        ["8:00 AM", "Swimming Pigs excursion", "Boat excursion to swim with Exuma's famous pigs (day trip).", "Water Activities"],
        ["1:00 PM", "Local lunch", "Casual lunch back on New Providence.", "Food"],
        ["3:30 PM", "Beach afternoon", "Relaxed afternoon at Cable Beach.", "Beaches"],
      ]),
      day(3, "Adventure & Culture", [
        ["9:30 AM", "Jet skiing", "Guided jet ski tour along the Paradise Island coastline.", "Water Activities"],
        ["1:00 PM", "Fish Fry lunch", "Cracked conch and conch salad at Arawak Cay.", "Food"],
        ["7:00 PM", "Casino evening", "Family-friendly entertainment on Paradise Island.", "Nightlife"],
      ]),
      day(4, "Blue Lagoon & Shopping", [
        ["9:00 AM", "Blue Lagoon Island", "Beach day trip with kid-friendly activities.", "Beaches"],
        ["2:30 PM", "Shopping", "Browse the Straw Market and Bay Street.", "Shopping"],
        ["7:00 PM", "Private chef dinner", "In-villa dinner prepared by a local private chef.", "Food"],
      ]),
      day(5, "Beach Morning & Departure", [
        ["9:00 AM", "Beach morning", "One last relaxed morning on the sand.", "Beaches"],
        ["12:30 PM", "Airport transfer", "Private transfer to the airport for departure.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-romantic",
    slug: "five-days-nassau-romantic",
    title: "Five Days in Nassau — Romantic",
    island: "New Providence (Nassau)",
    vacationTypes: ["Romantic"],
    days: [
      day(1, "Arrival & Sunset", [
        ["11:00 AM", "Airport pickup", "Private transfer to your Paradise Island villa.", "Transportation"],
        ["2:00 PM", "Villa check-in", "Settle into your private villa.", "Accommodation"],
        ["7:00 PM", "Sunset dinner reservation", "Waterfront dinner reservation for two.", "Food"],
      ]),
      day(2, "Sail & Spa", [
        ["10:00 AM", "Private sailing charter", "Half-day charter to a quiet cay.", "Water Activities"],
        ["3:00 PM", "Couples spa treatment", "Beachfront spa afternoon.", "Wellness"],
        ["7:30 PM", "Private chef dinner", "In-villa multi-course dinner.", "Food"],
      ]),
      day(3, "Explore Nassau", [
        ["9:30 AM", "Historical walking tour", "A guided walk through downtown Nassau's history.", "Tours"],
        ["1:00 PM", "Local lunch", "Lunch at a downtown bistro.", "Food"],
        ["8:00 PM", "Rooftop lounge", "Cocktails with a harbor view.", "Nightlife"],
      ]),
      day(4, "Beach Day", [
        ["10:00 AM", "Beach loungers", "A slow morning at Cabbage Beach.", "Beaches"],
        ["1:00 PM", "Beachside lunch", "Casual lunch steps from the water.", "Food"],
        ["6:00 PM", "Sunset catamaran cruise", "An evening cruise along the coast.", "Water Activities"],
      ]),
      day(5, "Morning & Departure", [
        ["9:00 AM", "Slow morning", "Breakfast in and a final beach walk.", "Relaxation"],
        ["12:00 PM", "Airport transfer", "Private transfer to the airport.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-luxury",
    slug: "five-days-nassau-luxury",
    title: "Five Days in Nassau — Luxury",
    island: "Paradise Island",
    vacationTypes: ["Luxury"],
    days: [
      day(1, "Arrival in Style", [
        ["11:00 AM", "Luxury airport transfer", "Chauffeured SUV pickup at the airport.", "Luxury Services"],
        ["2:00 PM", "Resort check-in", "Check in to your Paradise Island suite.", "Accommodation"],
        ["7:30 PM", "Fine dining reservation", "Reservation at a top resort restaurant.", "Food"],
      ]),
      day(2, "Yacht Day", [
        ["9:00 AM", "Private yacht charter", "Full-day charter to nearby cays with lunch aboard.", "Luxury Services"],
        ["6:00 PM", "Spa treatment", "Evening spa session after a day on the water.", "Wellness"],
      ]),
      day(3, "Culture & Cuisine", [
        ["10:00 AM", "Private guided tour", "A privately guided history and culture tour.", "Tours"],
        ["1:30 PM", "Chef's table lunch", "A curated tasting lunch downtown.", "Food"],
        ["8:00 PM", "Casino & lounge evening", "An evening at the resort's casino and lounges.", "Nightlife"],
      ]),
      day(4, "Beach Club Day", [
        ["10:30 AM", "Private beach cabana", "A reserved cabana with dedicated service.", "Beaches"],
        ["7:00 PM", "Private chef dinner", "An in-villa tasting menu.", "Food"],
      ]),
      day(5, "Departure", [
        ["10:00 AM", "Late checkout", "A relaxed final morning.", "Accommodation"],
        ["1:00 PM", "Luxury airport transfer", "Chauffeured transfer to the airport.", "Luxury Services"],
      ]),
    ],
  },
  {
    id: "it-adventure",
    slug: "five-days-nassau-adventure",
    title: "Five Days in Nassau — Adventure",
    island: "New Providence (Nassau)",
    vacationTypes: ["Adventure"],
    days: [
      day(1, "Arrival", [
        ["11:00 AM", "Airport pickup", "Transfer to your hotel.", "Transportation"],
        ["2:00 PM", "Hotel check-in", "Settle in and gear up.", "Accommodation"],
        ["6:00 PM", "Local dinner", "Casual dinner to fuel up for the week.", "Food"],
      ]),
      day(2, "ATV & Snorkel", [
        ["9:00 AM", "ATV trail tour", "Backcountry ATV convoy tour.", "Tours"],
        ["1:30 PM", "Snorkeling excursion", "Small-group reef snorkeling trip.", "Water Activities"],
      ]),
      day(3, "Dive Day", [
        ["8:30 AM", "Scuba diving excursion", "Two-tank dive on Nassau's reefs.", "Water Activities"],
        ["6:30 PM", "Fish Fry dinner", "Dinner at Arawak Cay.", "Food"],
      ]),
      day(4, "Jet Ski & Parasail", [
        ["9:30 AM", "Jet ski tour", "Guided coastal jet ski tour.", "Water Activities"],
        ["1:00 PM", "Parasailing", "Afternoon parasailing session.", "Water Activities"],
      ]),
      day(5, "Departure", [
        ["9:00 AM", "Beach morning", "One last swim before departure.", "Beaches"],
        ["12:00 PM", "Airport transfer", "Transfer to the airport.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-relaxation",
    slug: "five-days-nassau-relaxation",
    title: "Five Days in Nassau — Relaxation",
    island: "New Providence (Nassau)",
    vacationTypes: ["Relaxation"],
    days: [
      day(1, "Arrival & Unwind", [
        ["11:00 AM", "Airport pickup", "Transfer to your resort.", "Transportation"],
        ["2:00 PM", "Hotel check-in", "Check in and unwind.", "Accommodation"],
        ["6:00 PM", "Quiet dinner", "Relaxed dinner near the resort.", "Food"],
      ]),
      day(2, "Spa & Beach", [
        ["10:00 AM", "Spa morning", "Massage and facial at the resort spa.", "Wellness"],
        ["2:00 PM", "Beach afternoon", "Loungers and a slow afternoon.", "Beaches"],
      ]),
      day(3, "Beach Yoga & Leisure", [
        ["6:30 AM", "Sunrise beach yoga", "A gentle group session on the sand.", "Wellness"],
        ["12:00 PM", "Poolside lunch", "Lunch by the pool.", "Food"],
      ]),
      day(4, "Slow Exploration", [
        ["10:00 AM", "Easy walking tour", "A relaxed downtown history walk.", "Tours"],
        ["3:00 PM", "Beach afternoon", "Another unhurried beach afternoon.", "Beaches"],
      ]),
      day(5, "Departure", [
        ["10:00 AM", "Late checkout", "A calm final morning.", "Accommodation"],
        ["1:00 PM", "Airport transfer", "Transfer to the airport.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-bachelor",
    slug: "five-days-nassau-bachelor",
    title: "Five Days in Nassau — Bachelor/Bachelorette",
    island: "Paradise Island",
    vacationTypes: ["Bachelor/Bachelorette"],
    days: [
      day(1, "Arrival & Kickoff", [
        ["3:00 PM", "Group airport pickup", "Group transfer to your villa.", "Transportation"],
        ["8:00 PM", "Welcome dinner", "Group dinner reservation.", "Food"],
      ]),
      day(2, "Boat Day", [
        ["10:00 AM", "Group boat charter", "A day on the water with music and snorkeling stops.", "Water Activities"],
        ["9:00 PM", "Nightlife", "A night out at a rooftop lounge.", "Nightlife"],
      ]),
      day(3, "Beach & Casino", [
        ["11:00 AM", "Beach day", "Reserved beach loungers for the group.", "Beaches"],
        ["9:00 PM", "Casino night", "An evening at the casino.", "Nightlife"],
      ]),
      day(4, "Adventure & Send-off", [
        ["10:00 AM", "Jet ski tour", "Group jet ski session.", "Water Activities"],
        ["8:00 PM", "Group dinner", "Final night group dinner.", "Food"],
      ]),
      day(5, "Departure", [
        ["11:00 AM", "Group airport transfer", "Transfer back to the airport.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-wedding",
    slug: "five-days-nassau-wedding",
    title: "Five Days in Nassau — Destination Wedding",
    island: "Paradise Island",
    vacationTypes: ["Wedding"],
    days: [
      day(1, "Arrival", [
        ["1:00 PM", "Airport pickup", "Transfer to your resort.", "Transportation"],
        ["6:00 PM", "Welcome dinner", "Dinner with arriving guests.", "Food"],
      ]),
      day(2, "Planning & Beach", [
        ["10:00 AM", "Wedding planner walkthrough", "Venue and timeline walkthrough with your planner.", "Events"],
        ["3:00 PM", "Beach afternoon", "Free time for guests.", "Beaches"],
      ]),
      day(3, "Rehearsal", [
        ["4:00 PM", "Rehearsal", "Ceremony rehearsal at the venue.", "Events"],
        ["7:00 PM", "Rehearsal dinner", "Dinner for the wedding party.", "Food"],
      ]),
      day(4, "Wedding Day", [
        ["4:00 PM", "Ceremony", "Beachfront ceremony.", "Events"],
        ["6:00 PM", "Reception", "Reception with dinner and dancing.", "Events"],
      ]),
      day(5, "Departure", [
        ["10:00 AM", "Farewell brunch", "Brunch with remaining guests.", "Food"],
        ["1:00 PM", "Airport transfer", "Transfers for departing guests.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-fishing",
    slug: "five-days-nassau-fishing",
    title: "Five Days in Nassau — Fishing",
    island: "New Providence (Nassau)",
    vacationTypes: ["Fishing"],
    days: [
      day(1, "Arrival", [
        ["11:00 AM", "Airport pickup", "Transfer to your hotel.", "Transportation"],
        ["6:00 PM", "Local dinner", "Seafood dinner to start the trip.", "Food"],
      ]),
      day(2, "Deep Sea Fishing", [
        ["6:30 AM", "Deep sea fishing charter", "Full-day offshore fishing charter.", "Water Activities"],
      ]),
      day(3, "Reef & Flats", [
        ["7:00 AM", "Flats fishing charter", "Guided flats fishing trip.", "Water Activities"],
        ["6:00 PM", "Catch-of-the-day dinner", "Restaurant that will cook your catch.", "Food"],
      ]),
      day(4, "Rest & Explore", [
        ["10:00 AM", "Beach morning", "A relaxed morning off the water.", "Beaches"],
        ["1:00 PM", "Downtown lunch", "Lunch downtown.", "Food"],
      ]),
      day(5, "Departure", [
        ["9:00 AM", "Final charter (half-day)", "One last half-day on the water.", "Water Activities"],
        ["2:00 PM", "Airport transfer", "Transfer to the airport.", "Transportation"],
      ]),
    ],
  },
  {
    id: "it-diving",
    slug: "five-days-nassau-diving",
    title: "Five Days in Nassau — Diving",
    island: "New Providence (Nassau)",
    vacationTypes: ["Diving"],
    days: [
      day(1, "Arrival", [
        ["11:00 AM", "Airport pickup", "Transfer to your hotel.", "Transportation"],
        ["6:00 PM", "Dive briefing dinner", "Meet your dive operator over dinner.", "Food"],
      ]),
      day(2, "Reef Dives", [
        ["8:00 AM", "Two-tank reef dive", "Morning reef dive charter.", "Water Activities"],
      ]),
      day(3, "Wreck Dive", [
        ["8:00 AM", "Wreck dive charter", "Guided wreck dive excursion.", "Water Activities"],
        ["6:00 PM", "Local dinner", "Dinner downtown.", "Food"],
      ]),
      day(4, "Shark Dive & Rest", [
        ["8:00 AM", "Shark dive excursion", "Guided shark dive with an experienced operator.", "Water Activities"],
        ["3:00 PM", "Beach afternoon", "Rest and recovery time.", "Beaches"],
      ]),
      day(5, "Departure", [
        ["9:00 AM", "Beach morning", "A final relaxed morning.", "Beaches"],
        ["1:00 PM", "Airport transfer", "Transfer to the airport.", "Transportation"],
      ]),
    ],
  },
];

export const getItineraryTemplate = (vacationType: string) =>
  itineraryTemplates.find((t) => t.vacationTypes.includes(vacationType)) ?? itineraryTemplates[0];
