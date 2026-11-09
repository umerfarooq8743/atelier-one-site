import type { IconName } from "@/lib/icons";

/** Every illustrative product screen available to the site. */
export type ScreenId =
  | "dashboard"
  | "customers-list"
  | "customer-360"
  | "measurements"
  | "products-list"
  | "inventory"
  | "stock-movements"
  | "sale-invoice-form"
  | "invoice-detail"
  | "order-tracking"
  | "purchase-invoice"
  | "receive-payment"
  | "payments-list"
  | "employees-list"
  | "employee-profile"
  | "wages"
  | "expenses"
  | "vendors"
  | "reports-overview"
  | "profit-loss"
  | "inventory-report"
  | "staff-work"
  | "users"
  | "roles"
  | "activity-log"
  | "settings";

export type ScreenCategory =
  | "Dashboard"
  | "Customers"
  | "Inventory"
  | "Sales"
  | "Workshop"
  | "Employees"
  | "Payments"
  | "Reports"
  | "Administration";

export type ModuleId =
  | "dashboard"
  | "customers"
  | "measurements"
  | "inventory"
  | "sales"
  | "workshop"
  | "purchases"
  | "payments"
  | "employees"
  | "expenses"
  | "vendors"
  | "reports"
  | "users"
  | "activity"
  | "settings";

export interface ProductModule {
  id: ModuleId;
  letter: string;
  name: string;
  icon: IconName;
  category: ScreenCategory;
  /** One line for cards and tabs. */
  summary: string;
  intro: string;
  problem: string;
  solution: string;
  capabilities: string[];
  /** Short ordered steps explaining how the module is used. */
  workflow: string[];
  screen: ScreenId;
  related: ModuleId[];
  cta: string;
  /** Honest boundary of what exists today, when relevant. */
  note?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  module: ModuleId;
  group: "Front counter" | "Workshop" | "Stock" | "Money" | "People" | "Control";
}

export interface ReportDef {
  id: string;
  title: string;
  group: "Sales & Purchases" | "Customers & Staff" | "Inventory & Orders" | "Finance";
  tag: string;
  purpose: string;
  value: string;
  metrics: { label: string; value: string }[];
  preview:
    | { kind: "bars"; labels: string[]; values: number[]; unit?: string }
    | { kind: "line"; labels: string[]; values: number[]; secondary?: number[] }
    | { kind: "split"; items: { label: string; value: number; tone: "brass" | "ok" | "info" | "warn" | "bad" | "muted" }[] }
    | { kind: "table"; columns: string[]; rows: string[][]; numeric?: number[] };
}

export interface JourneyStep {
  title: string;
  detail: string;
  module: ModuleId;
}

export interface Journey {
  id: string;
  title: string;
  eyebrow: string;
  intro: string;
  steps: JourneyStep[];
}

export interface Shot {
  id: string;
  screen: ScreenId;
  title: string;
  caption: string;
  category: ScreenCategory;
}

export interface Faq {
  q: string;
  a: string;
}
