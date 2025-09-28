"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import L, { type LatLngExpression, type LeafletMouseEvent, type Map as LeafletMap } from "leaflet";

interface Hotspot {
  id: string;
  position: LatLngExpression;
  note?: string;
}

export default function MapClient() {
  const center = useMemo<LatLngExpression>(() => [6.5244, 3.3792], []); // Lagos
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [hotspots, setHotspots] = useState<Hotspot[]>([
    { id: "1", position: [6.5255, 3.3679], note: "Community dump" },
    { id: "2", position: [6.5122, 3.3928], note: "Plastic buildup" },
  ]);

  const tileUrl =
    process.env.NEXT_PUBLIC_MAP_TILE_URL ||
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileAttribution =
    process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ||
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current).setView(center as [number, number], 12);
    mapRef.current = map;

    L.tileLayer(tileUrl, { attribution: tileAttribution }).addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);

    const onClick = (e: LeafletMouseEvent) => {
      const id = String(Date.now());
      const newHotspot: Hotspot = { id, position: [e.latlng.lat, e.latlng.lng], note: "New report" };
      setHotspots((prev) => [...prev, newHotspot]);
    };
    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
      map.remove();
      mapRef.current = null;
    };
  }, [center, tileUrl, tileAttribution]);

  useEffect(() => {
    const layer = markersLayerRef.current;
    const map = mapRef.current;
    if (!layer || !map) return;
    layer.clearLayers();
    hotspots.forEach((h) => {
      const marker = L.marker(h.position as [number, number]).bindPopup(
        `<div><strong>Reported hotspot</strong><div style="color:#333">${h.note ?? ""}</div></div>`
      );
      marker.addTo(layer);
    });
  }, [hotspots]);

  return <div ref={containerRef} className="w-full h-[70vh] rounded-lg overflow-hidden border" />;
}
