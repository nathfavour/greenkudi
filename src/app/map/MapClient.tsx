"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L, { type LatLngExpression, type LeafletMouseEvent, type Map as LeafletMap } from "leaflet";

interface Hotspot {
  id: string;
  position: LatLngExpression;
  note?: string;
  createdAt?: number;
}

export default function MapClient() {
  const center = useMemo<LatLngExpression>(() => [6.5244, 3.3792], []); // Lagos
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const tileUrl =
    process.env.NEXT_PUBLIC_MAP_TILE_URL ||
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileAttribution =
    process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ||
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const fetchHotspots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hotspots");
      if (!res.ok) throw new Error("Failed to load hotspots");
      const data = await res.json();
      const fetched: Hotspot[] = (data.hotspots || []).map((h: { id: string; lat: number; lng: number; note?: string; createdAt?: number }) => ({
        id: h.id,
        position: [h.lat, h.lng],
        note: h.note,
        createdAt: h.createdAt,
      }));
      setHotspots(fetched);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error fetching hotspots");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current).setView(center as [number, number], 12);
    mapRef.current = map;

    // initial load
    fetchHotspots();

    L.tileLayer(tileUrl, { attribution: tileAttribution }).addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);

    const onClick = async (e: LeafletMouseEvent) => {
      setSaving(true);
      const optimistic: Hotspot = {
        id: `temp-${Date.now()}`,
        position: [e.latlng.lat, e.latlng.lng],
        note: "New report",
        createdAt: Date.now(),
      };
      setHotspots((prev) => [...prev, optimistic]);
      try {
        const res = await fetch("/api/hotspots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng, note: optimistic.note }),
        });
        if (!res.ok) throw new Error();
        const saved = await res.json();
        setHotspots((prev) =>
          prev.map((h) => (h.id === optimistic.id ? { ...h, id: saved.id, createdAt: saved.createdAt } : h))
        );
      } catch {
        setError("Failed to save hotspot");
        setHotspots((prev) => prev.filter((h) => h.id !== optimistic.id));
      } finally {
        setSaving(false);
      }
    };
    map.on("click", onClick);

    return () => {
      map.off("click", onClick);
      map.remove();
      mapRef.current = null;
    };
  }, [center, tileUrl, tileAttribution, fetchHotspots]);

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

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[600px] rounded-lg overflow-hidden"
        aria-label="Interactive waste hotspot map"
        role="application"
      />
      <div className="sr-only" aria-live="polite">
        {loading
          ? "Loading hotspots"
          : saving
          ? "Saving hotspot"
          : error
          ? `Error: ${error}`
          : "Map ready"}
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[--surface]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-lg">
            <div className="w-6 h-6 border-2 border-[--primary] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-[--text-primary]">Loading hotspots...</span>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[--surface]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 px-8 py-6 bg-white rounded-xl shadow-lg text-center max-w-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="font-bold text-[--text-primary] mb-2">Connection Error</h3>
              <p className="text-sm text-red-600 mb-4">{error}</p>
            </div>
            <button
              type="button"
              onClick={fetchHotspots}
              className="btn-primary"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      )}
      
      {/* Saving Indicator */}
      {saving && !loading && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-[--border]">
            <div className="w-4 h-4 border-2 border-[--primary] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-[--text-primary]">Saving report...</span>
          </div>
        </div>
      )}
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button 
          className="btn-icon bg-white/90 backdrop-blur-sm shadow-lg border border-[--border]"
          title="Center on Lagos"
          onClick={() => mapRef.current?.setView(center as [number, number], 12)}
        >
          🎯
        </button>
        <button 
          className="btn-icon bg-white/90 backdrop-blur-sm shadow-lg border border-[--border]"
          title="Refresh hotspots"
          onClick={fetchHotspots}
          disabled={loading}
        >
          🔄
        </button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-[--border] p-3">
          <h4 className="text-xs font-bold text-[--text-primary] mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-[--text-secondary]">Active Hotspots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-[--text-secondary]">Click to Report</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-[--border] px-3 py-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-[--text-primary]">{hotspots.length} hotspots</span>
          </div>
        </div>
      </div>
    </div>
  );
}
