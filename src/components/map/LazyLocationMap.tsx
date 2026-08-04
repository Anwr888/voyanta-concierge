"use client";

import dynamic from "next/dynamic";

const SingleLocationMap = dynamic(() => import("./SingleLocationMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-navy-900/10" />,
});

export function LazyLocationMap({ lat, lng }: { lat: number; lng: number }) {
  return <SingleLocationMap lat={lat} lng={lng} />;
}
