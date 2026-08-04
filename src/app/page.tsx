import { Hero } from "@/components/home/Hero";
import { TravelerFork } from "@/components/home/TravelerFork";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { DestinationGallery } from "@/components/home/DestinationGallery";
import { CruiseCallout } from "@/components/home/CruiseCallout";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { BusinessCTA } from "@/components/home/BusinessCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TravelerFork />
      <HowItWorks />
      <CategoryGrid />
      <FeaturedListings />
      <DestinationGallery />
      <CruiseCallout />
      <GuidesTeaser />
      <BusinessCTA />
    </>
  );
}
