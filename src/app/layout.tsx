import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenKudi — Waste-to-Energy & Rewards",
  description:
    "Transforming waste into opportunity with mapping, rewards, and data dashboards.",
  metadataBase: new URL("https://greenkudi.local"),
  openGraph: {
    title: "GreenKudi — Waste-to-Energy & Rewards",
    description:
      "Transforming waste into opportunity with mapping, rewards, and data dashboards.",
    url: "/",
    siteName: "GreenKudi",
    images: [
      { url: "/vercel.svg", width: 1200, height: 630, alt: "GreenKudi" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenKudi — Waste-to-Energy & Rewards",
    description:
      "Transforming waste into opportunity with mapping, rewards, and data dashboards.",
    images: ["/vercel.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-40">
          <div className="container flex items-center justify-between h-14">
            <Link href="/" className="font-semibold">
              <span className="text-[--primary]">Green</span>Kudi
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/map" className="hover:underline">
                Map
              </Link>
              <Link href="/centers" className="hover:underline">
                Centers
              </Link>
              <Link href="/rewards" className="hover:underline">
                Rewards
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="mt-16 border-t border-black/10 py-8 text-sm text-black/70">
          <div className="container flex items-center justify-between">
            <p>© {new Date().getFullYear()} GreenKudi</p>
            <p>
              Built for <span className="font-medium">Climate & Sustainability</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
