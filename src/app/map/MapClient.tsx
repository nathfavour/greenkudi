"use client";
import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface Hotspot {
  id: string;
  position: LatLngExpression;
  note?: string;
}

function ClickToAdd({ onAdd }: { onAdd: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onAdd(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapClient() {
  const center = useMemo<LatLngExpression>(() => [6.5244, 3.3792], []); // Lagos
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    { id: "1", position: [6.5255, 3.3679], note: "Community dump" },
    { id: "2", position: [6.5122, 3.3928], note: "Plastic buildup" },
  ]);

  function handleAdd(lat: number, lng: number) {
    const id = String(Date.now());
    setHotspots((prev) => [...prev, { id, position: [lat, lng], note: "New report" }]);
  }

  const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileAttribution = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ||
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="w-full h-[70vh] rounded-lg overflow-hidden border">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
        <TileLayer url={tileUrl} attribution={tileAttribution} />
        <ClickToAdd onAdd={handleAdd} />
        {hotspots.map((h) => (
          <Marker key={h.id} position={h.position}>
            <Popup>
              <div className="space-y-1">
                <p className="font-medium">Reported hotspot</p>
                {h.note ? <p className="text-sm text-black/70">{h.note}</p> : null}
                <button className="btn-primary mt-2">Claim points</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
