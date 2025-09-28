export const metadata = {
  title: "Recycling & Energy Centers — GreenKudi",
};

interface Center {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  materials: string[];
  hours: string;
}

const centers: Center[] = [
  {
    id: "c1",
    name: "Mainland Recycling Hub",
    address: "Yaba, Lagos",
    lat: 6.5175,
    lng: 3.3784,
    materials: ["Plastic", "Metal", "Paper"],
    hours: "Mon–Sat 8:00–18:00",
  },
  {
    id: "c2",
    name: "Eco Energy Transfer Station",
    address: "Lekki Phase 1, Lagos",
    lat: 6.4433,
    lng: 3.4683,
    materials: ["Organic", "Mixed"],
    hours: "Daily 7:00–19:00",
  },
];

export default function CentersPage() {
  return (
    <section className="grid gap-4">
      <header>
        <h1 className="text-2xl font-semibold">Recycling & Waste-to-Energy Centers</h1>
        <p className="text-black/70 text-sm">Find collection points near you.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-4">
        {centers.map((c) => (
          <div key={c.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{c.name}</h2>
            <p className="text-sm text-black/70">{c.address}</p>
            <p className="mt-2 text-sm"><span className="font-medium">Accepts:</span> {c.materials.join(", ")}</p>
            <p className="text-sm"><span className="font-medium">Hours:</span> {c.hours}</p>
            <div className="mt-3 flex gap-2">
              <a
                className="btn-primary"
                href={`https://www.google.com/maps?q=${c.lat},${c.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm"
                href={`/map?lat=${c.lat}&lng=${c.lng}`}
              >
                View on Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
