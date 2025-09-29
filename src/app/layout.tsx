import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { navItems } from "@/navigation";
import { NavLink } from "./nav/NavLink";
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
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "GreenKudi" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenKudi — Waste-to-Energy & Rewards",
    description:
      "Transforming waste into opportunity with mapping, rewards, and data dashboards.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} app-container`}>
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Desktop Sidebar */}
          <aside className="w-80 border-r border-[--border] bg-[--surface] p-6 flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--primary] to-[--primary-dark] flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[--text-primary]">
                  <span className="text-[--primary]">Green</span>Kudi
                </h1>
                <p className="text-xs text-[--text-muted]">Waste to Energy</p>
              </div>
            </Link>
            
            <nav className="flex-1 space-y-2" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} variant="desktop" />
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-[--border-light]">
              <div className="p-4 rounded-xl bg-gradient-to-r from-[--primary-50] to-emerald-50 border border-[--primary]/20">
                <h3 className="font-semibold text-[--primary] text-sm mb-1">
                  Make an Impact
                </h3>
                <p className="text-xs text-[--text-secondary] mb-3">
                  Report waste hotspots and earn rewards for a cleaner city.
                </p>
                <Link href="/map" className="btn-primary text-xs px-4 py-2">
                  Start Reporting
                </Link>
              </div>
            </div>
          </aside>

          {/* Desktop Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Mobile Header */}
          <header className="safe-top border-b border-[--border-light] bg-[--surface] px-4 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[--primary] to-[--primary-dark] flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-[--text-primary]">
                  <span className="text-[--primary]">Green</span>Kudi
                </h1>
                <p className="text-xs text-[--text-muted]">Waste to Energy</p>
              </div>
            </Link>
          </header>

          {/* Mobile Main Content */}
          <main className="flex-1 overflow-auto content-safe">
            <div className="p-4">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </main>

          {/* Mobile Bottom Navigation */}
          <nav className="safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-[--border-light] glass-effect">
            <div className="grid grid-cols-5 px-2 py-2">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} variant="mobile" />
              ))}
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
