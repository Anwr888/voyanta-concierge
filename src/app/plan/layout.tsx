import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacation Planner",
  description: "Answer a few questions and get a personalized, editable Bahamas itinerary.",
};

export default function PlanLayout({ children }: LayoutProps<"/plan">) {
  return children;
}
