import { Card } from "../components/Card";

export const metadata = {
  title: "Rewards — GreenKudi",
};

export default function RewardsPage() {
  const points = 120; // mock
  const tiers = [
    { id: "t1", name: "Airtime Top-up", cost: 100 },
    { id: "t2", name: "Mobile Money Voucher", cost: 300 },
    { id: "t3", name: "Eco Shop Discount", cost: 200 },
  ];

  return (
    <section className="grid gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Rewards</h1>
        <p className="text-black/70 text-sm">Earn points by reporting and recycling.</p>
      </header>

      <Card>
        <p className="text-sm text-black/70">Your balance</p>
        <p className="text-4xl font-bold text-[--primary]">{points} pts</p>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <Card key={t.id}>
            <h2 className="text-lg font-semibold">{t.name}</h2>
            <p className="text-sm text-black/70">Cost: {t.cost} pts</p>
            <button className="btn-primary mt-3" disabled={points < t.cost}>
              Redeem
            </button>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-semibold">How to earn</h3>
        <ul className="list-disc list-inside text-sm text-black/80 mt-2">
          <li>Report a waste hotspot with photo (+20 pts)</li>
          <li>Drop off recyclable items at a center (+50 pts)</li>
          <li>Verify a community report (+10 pts)</li>
        </ul>
      </Card>
    </section>
  );
}
