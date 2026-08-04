import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cruise Packages",
  description: "Curated cruise-day packages across Nassau Highlights, Beach Escape, Adventure, and more.",
};

export default function CruisePackagesLayout({ children }: LayoutProps<"/cruise/packages">) {
  return children;
}
