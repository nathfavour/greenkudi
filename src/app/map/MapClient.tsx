"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L, { type LatLngExpression, type LeafletMouseEvent, type Map as LeafletMap } from "leaflet";
import { Box, Button, IconButton, CircularProgress } from "@mui/material";

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
      
      {loading && (
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: 'rgba(var(--surface-rgb), 0.8)', 
          backdropFilter: 'blur(4px)' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 3, py: 2, bgcolor: 'white', borderRadius: 3, boxShadow: 3 }}>
            <CircularProgress size={24} />
            <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Loading hotspots...
            </Box>
          </Box>
        </Box>
      )}
      
      {error && !loading && (
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          bgcolor: 'rgba(var(--surface-rgb), 0.8)', 
          backdropFilter: 'blur(4px)' 
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, px: 4, py: 3, bgcolor: 'white', borderRadius: 3, boxShadow: 3, textAlign: 'center', maxWidth: '24rem' }}>
            <Box sx={{ width: 48, height: 48, bgcolor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              ⚠️
            </Box>
            <Box>
              <Box component="h3" sx={{ fontWeight: 'bold', color: 'var(--text-primary)', mb: 1 }}>
                Connection Error
              </Box>
              <Box component="p" sx={{ fontSize: '0.875rem', color: '#dc2626', mb: 2 }}>
                {error}
              </Box>
            </Box>
            <Button variant="contained" onClick={fetchHotspots}>
              🔄 Try Again
            </Button>
          </Box>
        </Box>
      )}
      
      {saving && !loading && (
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', borderRadius: 2, boxShadow: 3, border: '1px solid var(--border)' }}>
            <CircularProgress size={16} />
            <Box component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              Saving report...
            </Box>
          </Box>
        </Box>
      )}
      
      {/* Map Controls */}
      <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <IconButton 
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', boxShadow: 3, border: '1px solid var(--border)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' } }}
          title="Center on Lagos"
          onClick={() => mapRef.current?.setView(center as [number, number], 12)}
        >
          🎯
        </IconButton>
        <IconButton 
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', boxShadow: 3, border: '1px solid var(--border)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.95)' } }}
          title="Refresh hotspots"
          onClick={fetchHotspots}
          disabled={loading}
        >
          🔄
        </IconButton>
      </Box>
      
      {/* Legend */}
      <Box sx={{ position: 'absolute', bottom: 16, left: 16, zIndex: 10 }}>
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', borderRadius: 2, boxShadow: 3, border: '1px solid var(--border)', p: 1.5 }}>
          <Box component="h4" sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-primary)', mb: 1 }}>
            Legend
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, fontSize: '0.75rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#ef4444', borderRadius: '50%' }} />
              <Box component="span" sx={{ color: 'var(--text-secondary)' }}>Active Hotspots</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#9ca3af', borderRadius: '50%' }} />
              <Box component="span" sx={{ color: 'var(--text-secondary)' }}>Click to Report</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Status Bar */}
      <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 10 }}>
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', borderRadius: 2, boxShadow: 3, border: '1px solid var(--border)', px: 1.5, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.75rem' }}>
            <Box sx={{ width: 8, height: 8, bgcolor: '#22c55e', borderRadius: '50%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <Box component="span" sx={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {hotspots.length} hotspots
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
