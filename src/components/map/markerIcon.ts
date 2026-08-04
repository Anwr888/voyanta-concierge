import L from "leaflet";

// Custom teardrop pin as an inline SVG divIcon — avoids Leaflet's default
// marker image path issue entirely (no bundler asset-path workaround
// needed) and lets the pin match the brand palette.
export function createPinIcon({ color = "#0d2140", size = 32 }: { color?: string; size?: number } = {}) {
  const height = Math.round(size * (34 / 24));
  const svg = `
    <svg width="${size}" height="${height}" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 22 12 22s12-13 12-22c0-6.6-5.4-12-12-12z" fill="${color}" stroke="#fbf8f2" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4.5" fill="#fbf8f2"/>
    </svg>`;

  return L.divIcon({
    html: svg,
    className: "voyanta-pin",
    iconSize: [size, height],
    iconAnchor: [size / 2, height],
    popupAnchor: [0, -height + 4],
  });
}
