export interface NavItem {
  href: string;
  label: string;
  shortLabel?: string;
  icon: string;
  description?: string;
}

export const navItems: NavItem[] = [
  { 
    href: "/", 
    label: "Home", 
    shortLabel: "Home", 
    icon: "🏠",
    description: "Welcome to GreenKudi"
  },
  { 
    href: "/map", 
    label: "Waste Hotspot Map", 
    shortLabel: "Map", 
    icon: "🗺️",
    description: "Report and view waste hotspots"
  },
  { 
    href: "/centers", 
    label: "Centers", 
    shortLabel: "Centers", 
    icon: "♻️",
    description: "Find recycling centers"
  },
  { 
    href: "/rewards", 
    label: "Rewards", 
    shortLabel: "Rewards", 
    icon: "🎁",
    description: "Earn points and redeem rewards"
  },
  { 
    href: "/dashboard", 
    label: "Dashboard", 
    shortLabel: "Data", 
    icon: "📊",
    description: "Analytics and insights"
  },
];
