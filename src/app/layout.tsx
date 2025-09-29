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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-6 py-6">
          <aside className="hidden md:block sticky top-6 h-[calc(100dvh-3rem)]">
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <Link href="/" className="font-semibold block mb-3">
                <span className="text-[--primary]">Green</span>Kudi
              </Link>
              <nav className="grid gap-1 text-sm" aria-label="Primary">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href}>
                    {item.shortLabel ?? item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>
          <main className="min-w-0">{children}</main>
        </div>
        <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50">
          <div className="mx-auto max-w-md px-4">
            <div className="rounded-2xl border bg-white/95 backdrop-blur px-3 py-2 shadow-lg">
              <ul className="grid grid-cols-4 text-sm" role="menubar" aria-label="Primary mobile">
                {navItems.map((item) => (
                  <li key={item.href} role="none">
                    <NavLink href={item.href} compact>
                      {item.shortLabel ?? item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <footer className="mt-10 border-t border-black/10 py-6 text-sm text-black/70">
          <div className="container flex items-center justify-between gap-4">
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
