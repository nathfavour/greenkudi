import Link from "next/link";
import { Card } from "./components/Card";

export default function Home() {
  return (
    <section className="grid gap-10 md:gap-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            GreenKudi: Waste-to-Energy & Rewards Platform
          </h1>
          <p className="text-lg text-black/70">
            Map waste hotspots, earn rewards for recycling, and power data-driven
            clean cities across Africa.
          </p>
          <div className="flex gap-3">
            <Link href="/map" className="btn-primary">
              Explore Waste Map
            </Link>
            <Link
              href="/rewards"
              className="inline-flex items-center justify-center rounded-lg border px-4 py-2"
            >
              View Rewards
            </Link>
          </div>
        </div>
        <Card padding="lg">
          <ul className="grid gap-4 text-sm">
            <li>
              <span className="font-semibold">Waste Hotspot Mapping:</span> Upload
              photos and locations to build a live map.
            </li>
            <li>
              <span className="font-semibold">Recycling & Energy Center Locator:</span>
              Find nearby facilities with directions.
            </li>
            <li>
              <span className="font-semibold">Gamified Rewards:</span> Earn points
              redeemable for airtime, mobile money, or vouchers.
            </li>
            <li>
              <span className="font-semibold">Dashboards:</span> Real‑time data for
              municipalities, NGOs, and recyclers.
            </li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-4">
        <h2 className="text-2xl font-semibold">Why GreenKudi</h2>
        <p className="text-black/70">
          Urban waste overwhelms Nigerian and African cities—causing pollution,
          floods, and lost energy opportunities. GreenKudi turns waste into value
          by engaging citizens, mapping hotspots, and routing recyclables to the
          circular economy.
        </p>
      </div>
    </section>
  );
}
