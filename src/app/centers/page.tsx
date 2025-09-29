import type { Metadata } from "next";
import { Card } from "../components/Card";

export const metadata: Metadata = {
  title: "Recycling & Energy Centers — GreenKudi",
  description: "Find recycling and waste-to-energy centers near you",
};

interface Center {
  id: string;
  name: string;
  type: "recycling" | "energy" | "hybrid";
  address: string;
  lat: number;
  lng: number;
  materials: string[];
  hours: string;
  status: "open" | "closed" | "busy";
  capacity: number;
  distance?: string;
  contact?: string;
}

const centers: Center[] = [
  {
    id: "c1",
    name: "Mainland Recycling Hub",
    type: "recycling",
    address: "15 Abiola Way, Yaba, Lagos State",
    lat: 6.5175,
    lng: 3.3784,
    materials: ["Plastic", "Metal", "Paper", "Glass"],
    hours: "Mon–Sat 8:00–18:00",
    status: "open",
    capacity: 75,
    distance: "2.3 km",
    contact: "+234 803 123 4567",
  },
  {
    id: "c2",
    name: "Eco Energy Transfer Station",
    type: "energy",
    address: "Plot 45, Admiralty Road, Lekki Phase 1, Lagos",
    lat: 6.4433,
    lng: 3.4683,
    materials: ["Organic", "Mixed Waste", "Biomass"],
    hours: "Daily 7:00–19:00",
    status: "busy",
    capacity: 40,
    distance: "5.7 km",
    contact: "+234 815 987 6543",
  },
  {
    id: "c3",
    name: "Victoria Island Green Center",
    type: "hybrid",
    address: "12B Adeola Odeku Street, Victoria Island, Lagos",
    lat: 6.4269,
    lng: 3.4215,
    materials: ["Electronics", "Batteries", "Hazardous"],
    hours: "Mon–Fri 9:00–17:00",
    status: "open",
    capacity: 90,
    distance: "8.1 km",
    contact: "+234 817 456 7890",
  },
];

function CenterCard({ center }: { center: Center }) {
  const statusColors = {
    open: "bg-green-100 text-green-800",
    busy: "bg-yellow-100 text-yellow-800", 
    closed: "bg-red-100 text-red-800",
  };

  const typeIcons = {
    recycling: "♻️",
    energy: "⚡",
    hybrid: "🔄",
  };

  const typeColors = {
    recycling: "bg-blue-50 border-blue-200",
    energy: "bg-amber-50 border-amber-200",
    hybrid: "bg-purple-50 border-purple-200",
  };

  return (
    <Card 
      variant="elevated" 
      padding="lg" 
      className={`hover:scale-[1.02] transition-transform duration-200 ${typeColors[center.type]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[--primary-50] flex items-center justify-center text-2xl">
            {typeIcons[center.type]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[--text-primary]">{center.name}</h3>
            <p className="text-sm text-[--text-secondary] capitalize">{center.type} Center</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`status-badge text-xs ${statusColors[center.status]}`}>
            {center.status.charAt(0).toUpperCase() + center.status.slice(1)}
          </span>
          {center.distance && (
            <span className="text-xs text-[--text-muted] font-medium">{center.distance}</span>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-[--text-muted] text-sm">📍</span>
          <p className="text-sm text-[--text-secondary] flex-1">{center.address}</p>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="text-[--text-muted] text-sm">🕒</span>
          <p className="text-sm text-[--text-secondary]">{center.hours}</p>
        </div>

        {center.contact && (
          <div className="flex items-center gap-2">
            <span className="text-[--text-muted] text-sm">📞</span>
            <a href={`tel:${center.contact}`} className="text-sm text-[--primary] hover:underline">
              {center.contact}
            </a>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-[--text-primary] mb-2">Accepts:</p>
        <div className="flex flex-wrap gap-2">
          {center.materials.map((material, i) => (
            <span key={i} className="status-badge bg-[--surface-elevated] text-[--text-secondary] text-xs">
              {material}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[--text-primary]">Capacity</span>
          <span className="text-sm text-[--text-secondary]">{center.capacity}%</span>
        </div>
        <div className="w-full bg-[--surface-secondary] rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              center.capacity > 80 ? 'bg-red-500' : 
              center.capacity > 60 ? 'bg-yellow-500' : 
              'bg-[--primary]'
            }`}
            style={{ width: `${center.capacity}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <a
          className="btn-primary flex-1 text-center"
          href={`https://www.google.com/maps?q=${center.lat},${center.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 Directions
        </a>
        <a
          className="btn-secondary"
          href={`/map?lat=${center.lat}&lng=${center.lng}`}
        >
          🗺️ View Map
        </a>
      </div>
    </Card>
  );
}

export default function CentersPage() {
  const stats = [
    { label: "Active Centers", value: "24", icon: "🏢" },
    { label: "Materials Accepted", value: "12+", icon: "📦" },
    { label: "Avg Distance", value: "3.2km", icon: "📍" },
    { label: "Open Now", value: "18", icon: "🕒" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Collection Centers</h1>
        <p className="page-subtitle">Find recycling and waste-to-energy centers near you</p>
      </header>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="default" padding="md" className="text-center animate-scale-in">
            <div className="w-12 h-12 mx-auto bg-[--primary-50] rounded-xl flex items-center justify-center text-2xl mb-3">
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-[--text-primary] mb-1">{stat.value}</p>
            <p className="text-sm text-[--text-secondary]">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Centers Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[--text-primary]">Nearby Centers</h2>
          <div className="flex gap-2">
            <button className="btn-secondary text-sm">📍 Near Me</button>
            <button className="btn-secondary text-sm">🔍 Filter</button>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {centers.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      </div>

      {/* Action Card */}
      <Card variant="elevated" padding="lg" className="bg-gradient-to-r from-[--primary-50] to-blue-50 border-[--primary]/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[--primary] flex items-center justify-center">
            <span className="text-white text-xl">🎯</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[--primary] mb-2">Cannot Find a Center?</h3>
            <p className="text-[--text-secondary] mb-4">
              Help us expand our network! Suggest a new location or partner with us to establish 
              collection points in underserved areas.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">📍 Suggest Location</button>
              <button className="btn-secondary">🤝 Partner With Us</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
