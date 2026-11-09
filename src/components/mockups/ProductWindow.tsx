import type { ReactNode } from "react";
import {
  BadgeCheck,
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  Lock,
  Menu,
  Moon,
  Receipt,
  Search,
  Settings2,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleCompany } from "@/data/sample";

export type AppNav =
  | "dashboard"
  | "customers"
  | "products"
  | "sales"
  | "purchases"
  | "payments"
  | "employees"
  | "expenses"
  | "reports"
  | "setup";

const NAV: { id: AppNav; label: string; Icon: typeof Users; section?: string }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard, section: "Main menu" },
  { id: "customers", label: "Customers", Icon: Users },
  { id: "products", label: "Products", Icon: Boxes },
  { id: "sales", label: "Sale Invoices", Icon: Receipt },
  { id: "purchases", label: "Purchase Invoices", Icon: ShoppingCart },
  { id: "payments", label: "Payments", Icon: CreditCard },
  { id: "employees", label: "Employees", Icon: BadgeCheck },
  { id: "expenses", label: "Expenses", Icon: Wallet },
  { id: "reports", label: "Reports", Icon: BarChart3 },
  { id: "setup", label: "Setup", Icon: Settings2, section: "System" },
];

function MiniMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="13" fill="#17171A" />
      <path d="M14.5 36 L24 11.5 L33.5 36" fill="none" stroke="#d6b06a" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.4 27.6 H29.6" fill="none" stroke="#d6b06a" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="2.6 2.2" />
      <ellipse cx="24" cy="16.2" rx="1.05" ry="2.3" fill="#17171A" />
      <path d="M24 11.5 C27.5 6.2 34.5 5.8 36.4 10.6" fill="none" stroke="#d6b06a" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="36.6" cy="11.6" r="1.5" fill="#d6b06a" />
    </svg>
  );
}

export interface ProductWindowProps {
  children: ReactNode;
  /** Highlighted sidebar item. */
  nav?: AppNav;
  /** Top-bar page title. */
  title?: string;
  /** Path shown in the browser bar, e.g. "/customers/ahmed-khan". */
  path?: string;
  /** Force a theme for this preview regardless of the site theme. */
  theme?: "light" | "dark";
  /** Hide the app shell (sidebar + top bar) for focused component previews. */
  bare?: boolean;
  size?: "default" | "compact" | "tiny";
  animate?: boolean;
  className?: string;
  /** Accessible description of the illustrated screen. */
  label: string;
  /** Hide the browser chrome. */
  chrome?: boolean;
}

/**
 * Frame for every illustrative screen: browser chrome + the app's real shell
 * (dark sidebar, top bar with global search and trial chip). Rendered as an
 * image to assistive tech, since the controls inside are illustrations.
 */
export function ProductWindow({
  children,
  nav = "dashboard",
  title,
  path = "/dashboard",
  theme,
  bare = false,
  size = "default",
  animate = false,
  className,
  label,
  chrome = true,
}: ProductWindowProps) {
  return (
    <div className={cn("mk-frame", className)} data-theme={theme}>
      <div
        role="img"
        aria-label={`Illustrative product preview: ${label}`}
        className={cn("mk", size === "compact" && "mk--compact", size === "tiny" && "mk--tiny", animate && "mk-animate")}
      >
        {chrome && (
          <div className="mk-chrome" aria-hidden>
            <span className="mk-dots"><i /><i /><i /></span>
            <span className="mk-url">
              <Lock className="size-[0.95em]" />
              atelier one{path}
            </span>
            <span className="mk-tag">Product preview</span>
          </div>
        )}
        <div aria-hidden>
          {bare ? (
            children
          ) : (
            <div className="mk-app">
              <aside className="mk-side">
                <div className="mk-side-brand">
                  <MiniMark />
                  <div>
                    <div className="mk-side-name">Atelier <b>One</b></div>
                    <div className="mk-side-co">{sampleCompany}</div>
                  </div>
                </div>
                {NAV.map(({ id, label: l, Icon, section }) => (
                  <div key={id}>
                    {section && <div className="mk-side-sec">{section}</div>}
                    <div className={cn("mk-nav", id === nav && "mk-nav--on")}>
                      <Icon />
                      {l}
                    </div>
                  </div>
                ))}
                <div className="mk-side-foot">
                  <span className="mk-avatar">IA</span>
                  <div className="mk-small">
                    <div style={{ color: "#f1eee8", fontWeight: 600 }}>Imtiaz A.</div>
                    <div style={{ color: "#8f8c86" }}>Owner · Admin</div>
                  </div>
                </div>
              </aside>
              <div className="mk-main">
                <div className="mk-top">
                  <Menu className="mk-burger" />
                  <span className="mk-top-title">{title}</span>
                  <span className="mk-search">
                    <Search />
                    <span>Search customers, invoices…</span>
                    <span className="mk-kbd">Ctrl K</span>
                  </span>
                  <span className="mk-trial mk-hide-sm">Trial · 9 days left</span>
                  <span className="mk-icon-btn mk-hide-sm"><Moon /></span>
                  <span className="mk-avatar mk-hide-sm" style={{ width: "2.1em", height: "2.1em" }}>IA</span>
                </div>
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
