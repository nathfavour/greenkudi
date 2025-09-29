import type { Metadata } from "next";
import { Card } from "../components/Card";
import MapWrapper from "./MapWrapper";

export const metadata: Metadata = {
  title: "Waste Hotspot Map — GreenKudi",
  description: "Report waste hotspots and view community reports on an interactive map",
};

export default function MapPage() {
  const stats = [
    { label: "Active Reports", value: "342", icon: "📍", color: "text-red-600" },
    { label: "Resolved", value: "1,847", icon: "✅", color: "text-green-600" },
    { label: "This Week", value: "+28", icon: "📈", color: "text-blue-600" },
    { label: "Your Reports", value: "12", icon: "👤", color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Waste Hotspot Map</h1>
        <p className="page-subtitle">Report waste dumps and track community cleanup efforts</p>
      </header>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="default" padding="md" className="text-center animate-scale-in">
            <div className={`w-12 h-12 mx-auto bg-[--primary-50] rounded-xl flex items-center justify-center text-2xl mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-[--text-secondary]">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <button className="btn-primary">📍 Report Hotspot</button>
        <button className="btn-secondary">🗺️ View All Reports</button>
        <button className="btn-secondary">📊 Analytics</button>
        <button className="btn-ghost">🔍 Search Location</button>
      </div>

      {/* Map Container */}
      <Card variant="elevated" className="overflow-hidden p-0">
        <div className="h-[600px] relative">
          <MapWrapper />
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-6">
        <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xl">📱</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Report via Mobile</h3>
              <p className="text-blue-700 text-sm mb-4">
                Use our mobile app to quickly report waste hotspots with GPS location and photos.
              </p>
              <button className="btn-primary bg-blue-500 hover:bg-blue-600 border-0">
                📲 Download App
              </button>
            </div>
          </div>
        </Card>

        <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
              <span className="text-white text-xl">👥</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800 mb-2">Community Validation</h3>
              <p className="text-green-700 text-sm mb-4">
                Help verify reported hotspots and earn points for accurate community monitoring.
              </p>
              <button className="btn-primary bg-green-500 hover:bg-green-600 border-0">
                🔍 Start Validating
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
