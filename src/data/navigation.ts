export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

/** Product menu (header dropdown + footer column). */
export const productNav: NavLink[] = [
  { label: "Features", href: "/features", description: "Every capability, grouped by how a shop works" },
  { label: "Modules", href: "/modules", description: "Fifteen modules, one connected workspace" },
  { label: "Screens", href: "/screenshots", description: "A gallery of illustrative product previews" },
  { label: "Reports", href: "/reports", description: "13 reports with date ranges and CSV export" },
];

export const mainNav: NavLink[] = [
  { label: "How It Works", href: "/workflows" },
  { label: "Technology", href: "/technology" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const allPages: NavLink[] = [{ label: "Home", href: "/" }, ...productNav, ...mainNav];
