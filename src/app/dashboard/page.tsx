import { Card } from "../components/Card";

export const metadata = {
  title: "Dashboard — GreenKudi",
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card padding="md">
      <p className="text-sm text-black/70">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <section className="grid gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Community & Government Dashboard</h1>
        <p className="text-black/70 text-sm">Real-time insights for planning and logistics.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Reported Hotspots" value="1,248" />
        <StatCard label="Active Users" value="5,320" />
        <StatCard label="Recycled (kg)" value="12,450" />
        <StatCard label="CO₂e avoided (t)" value="640" />
      </div>

      <Card>
        <h2 className="font-semibold">Notes</h2>
        <p className="text-sm text-black/70 mt-1">
          Connect data sources and mobile money providers to operationalize rewards and routing.
        </p>
      </Card>
    </section>
  );
}
