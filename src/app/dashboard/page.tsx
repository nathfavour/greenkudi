import type { Metadata } from "next";
import { Card } from "../components/Card";

export const metadata: Metadata = {
  title: "Dashboard — GreenKudi",
};

function StatCard({ 
  label, 
  value, 
  trend, 
  icon 
}: { 
  label: string; 
  value: string; 
  trend: string;
  icon: string;
}) {
  return (
    <Card variant="elevated" padding="md" className="animate-scale-in">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[--primary-50] flex items-center justify-center">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="status-badge status-success text-xs">
          {trend}
        </div>
      </div>
      <p className="text-sm text-[--text-secondary] mb-1">{label}</p>
      <p className="text-3xl font-bold text-[--text-primary]">{value}</p>
    </Card>
  );
}

export default function DashboardPage() {
  const stats = [
    { label: "Reported Hotspots", value: "1,248", trend: "+12%", icon: "🗺️" },
    { label: "Active Users", value: "5,320", trend: "+8%", icon: "👥" },
    { label: "Recycled (kg)", value: "12,450", trend: "+15%", icon: "♻️" },
    { label: "CO₂e Avoided (t)", value: "640", trend: "+22%", icon: "🌱" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-subtitle">Real-time insights for community impact and city planning</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card variant="elevated" padding="lg">
          <h2 className="text-xl font-bold text-[--text-primary] mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">📊</span>
            Activity Trends
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-[--surface-elevated]">
              <span className="text-sm font-medium">Daily Reports</span>
              <span className="text-lg font-bold text-[--primary]">47</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-[--surface-elevated]">
              <span className="text-sm font-medium">Weekly Collection</span>
              <span className="text-lg font-bold text-[--primary]">2.3t</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-[--surface-elevated]">
              <span className="text-sm font-medium">Rewards Claimed</span>
              <span className="text-lg font-bold text-[--primary]">₦12,400</span>
            </div>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <h2 className="text-xl font-bold text-[--text-primary] mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">🚀</span>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="btn-primary w-full justify-start">
              📋 Generate Weekly Report
            </button>
            <button className="btn-secondary w-full justify-start">
              📍 Review Pending Hotspots
            </button>
            <button className="btn-secondary w-full justify-start">
              💰 Process Reward Payouts
            </button>
            <button className="btn-secondary w-full justify-start">
              📊 Export Analytics Data
            </button>
          </div>
        </Card>
      </div>

      <Card variant="elevated" padding="lg" className="bg-gradient-to-r from-[--primary-50] to-emerald-50 border-[--primary]/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[--primary] flex items-center justify-center">
            <span className="text-white text-xl">💡</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[--primary] mb-2">Integration Opportunities</h3>
            <p className="text-[--text-secondary] mb-4">
              Connect with mobile money providers (MTN MoMo, Paystack) and municipal data systems 
              to automate rewards distribution and enhance routing efficiency.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="status-badge bg-blue-100 text-blue-800">API Ready</span>
              <span className="status-badge bg-purple-100 text-purple-800">Mobile Money</span>
              <span className="status-badge bg-green-100 text-green-800">Municipality</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}