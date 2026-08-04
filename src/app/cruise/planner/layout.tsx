import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cruise Day Planner",
  description: "Enter your ship's docking and all-aboard times to get a recommended activity window and matching experiences.",
};

export default function CruisePlannerLayout({ children }: LayoutProps<"/cruise/planner">) {
  return children;
}
