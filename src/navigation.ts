export interface NavItem {
  href: string;
  label: string;
  shortLabel?: string; // optional shorter label for compact/mobile nav
}

export const navItems: NavItem[] = [
  { href: "/map", label: "Waste Hotspot Map", shortLabel: "Map" },
  { href: "/centers", label: "Centers" },
  { href: "/rewards", label: "Rewards" },
  { href: "/dashboard", label: "Dashboard", shortLabel: "Dash" },
];
