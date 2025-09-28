import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export const metadata = {
  title: "Waste Hotspot Map — GreenKudi",
};

export default function Page() {
  return (
    <section className="grid gap-4">
      <header>
        <h1 className="text-2xl font-semibold">Waste Hotspot Map</h1>
        <p className="text-black/70 text-sm">Report dumps and view community reports.</p>
      </header>
      <MapClient />
    </section>
  );
}
