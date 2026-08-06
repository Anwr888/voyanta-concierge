"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Business } from "@/lib/types";
import { RatingStars, PriceLevel } from "@/components/RatingStars";
import { createPinIcon } from "./markerIcon";

const NASSAU_CENTER: [number, number] = [25.0782, -77.3383];

function FitToMarkers({ businesses }: { businesses: Business[] }) {
  const map = useMap();

  useEffect(() => {
    if (!businesses.length) {
      map.setView(NASSAU_CENTER, 11);
      return;
    }
    if (businesses.length === 1) {
      map.setView([businesses[0].location.lat, businesses[0].location.lng], 14);
      return;
    }
    const bounds = businesses.map((b) => [b.location.lat, b.location.lng] as [number, number]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [businesses, map]);

  return null;
}

export default function MarketplaceMap({ businesses }: { businesses: Business[] }) {
  return (
    <MapContainer center={NASSAU_CENTER} zoom={11} scrollWheelZoom className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitToMarkers businesses={businesses} />
      {businesses.map((b) => (
        <Marker
          key={b.id}
          position={[b.location.lat, b.location.lng]}
          icon={createPinIcon({ color: b.featured ? "#c69a4e" : "#0d2140" })}
        >
          <Popup minWidth={200}>
            <div className="min-w-[180px]">
              <p className="text-[11px] font-bold uppercase tracking-wide text-teal-700">{b.subcategory}</p>
              <p className="mt-0.5 font-semibold text-navy-900 leading-snug">{b.name}</p>
              <div className="mt-1.5 flex items-center justify-between">
                {b.rating !== undefined ? (
                  <span className="flex items-center gap-1 text-xs text-ink-soft">
                    <RatingStars rating={b.rating} size={11} />
                    {b.rating.toFixed(1)}
                  </span>
                ) : (
                  <span className="text-xs text-ink-soft/60">{b.reviewLinks ? "See reviews" : "Reviews N/A"}</span>
                )}
                {b.priceLevel !== undefined && <PriceLevel level={b.priceLevel} />}
              </div>
              <Link
                href={`/marketplace/business/${b.slug}`}
                className="mt-2 inline-block text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                View listing →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
