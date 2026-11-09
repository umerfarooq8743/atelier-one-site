import type { ScreenCategory, Shot } from "./types";

/**
 * Gallery entries. No genuine application screenshots exist in the
 * repository, so every entry is an illustrative product preview rendered from
 * code with sample data. To use a real screenshot later, add an `image` path
 * and render it in the gallery instead of the preview.
 */
export const shots: Shot[] = [
  { id: "dashboard", screen: "dashboard", category: "Dashboard", title: "Main dashboard", caption: "Today's sales, collections and pending orders, with period switch, low stock, staff workload and top products." },
  { id: "customers-list", screen: "customers-list", category: "Customers", title: "Customer listing", caption: "Searchable customer list with phone, order count and live balance." },
  { id: "customer-360", screen: "customer-360", category: "Customers", title: "Customer 360° profile", caption: "Balance, measurements, invoices, payments and activity for one customer." },
  { id: "measurements", screen: "measurements", category: "Customers", title: "Measurement management", caption: "Per-variant measurements with collar, daman, sleeve, pocket, button and fit styles." },
  { id: "products-list", screen: "products-list", category: "Inventory", title: "Product listing", caption: "Fabric, services and accessories with unit, price and stock status." },
  { id: "inventory", screen: "inventory", category: "Inventory", title: "Inventory management", caption: "Low-stock filter with the Adjust stock dialog." },
  { id: "stock-movements", screen: "stock-movements", category: "Inventory", title: "Stock movement history", caption: "Sales, purchases and adjustments with the running stock." },
  { id: "vendors", screen: "vendors", category: "Inventory", title: "Vendor management", caption: "Supplier records with purchase totals and status." },
  { id: "sale-invoice-form", screen: "sale-invoice-form", category: "Sales", title: "Sale invoice creation", caption: "Line cards with measurement snapshots, assigned staff and a sticky summary." },
  { id: "invoice-detail", screen: "invoice-detail", category: "Sales", title: "Sale invoice details", caption: "Invoice view with items, item stages, payments and PDF download." },
  { id: "purchase-invoice", screen: "purchase-invoice", category: "Sales", title: "Purchase invoice", caption: "Vendor purchase with a stock-impact note for catalogue lines." },
  { id: "order-tracking", screen: "order-tracking", category: "Workshop", title: "Order tracking", caption: "Order items by stage: In Process, Ready and Delivered." },
  { id: "staff-work", screen: "staff-work", category: "Workshop", title: "Staff work report", caption: "Items assigned per employee and how many are delivered." },
  { id: "employees-list", screen: "employees-list", category: "Employees", title: "Employee management", caption: "Staff list with job type, wage, loan balance and open work." },
  { id: "employee-profile", screen: "employee-profile", category: "Employees", title: "Employee profile", caption: "Assigned work, loans and wage ledger for one employee." },
  { id: "wages", screen: "wages", category: "Employees", title: "Wage management", caption: "Wage payments with their linked salary expenses." },
  { id: "receive-payment", screen: "receive-payment", category: "Payments", title: "Receive payment", caption: "Pick the customer, choose an open invoice and record the method." },
  { id: "payments-list", screen: "payments-list", category: "Payments", title: "Payments", caption: "Receipts with method, linked invoice and reference." },
  { id: "expenses", screen: "expenses", category: "Payments", title: "Expense management", caption: "Expenses by category, with locked salary expenses from wages." },
  { id: "reports-overview", screen: "reports-overview", category: "Reports", title: "Reports dashboard", caption: "All 13 reports, grouped and searchable." },
  { id: "profit-loss", screen: "profit-loss", category: "Reports", title: "Profit & Loss report", caption: "Sales minus purchases and expenses for the chosen range." },
  { id: "inventory-report", screen: "inventory-report", category: "Reports", title: "Inventory report", caption: "Stock on hand, low-stock alerts and stock valuation." },
  { id: "users", screen: "users", category: "Administration", title: "User management", caption: "Users with role, status and invitation state." },
  { id: "roles", screen: "roles", category: "Administration", title: "Roles & permissions", caption: "Module × action permission matrix for a custom role." },
  { id: "activity-log", screen: "activity-log", category: "Administration", title: "Activity log", caption: "Creates, updates with field-level changes, deletes and business actions." },
  { id: "settings", screen: "settings", category: "Administration", title: "Business settings", caption: "Business profile, currency and invoice text." },
];

export const shotCategories: ScreenCategory[] = [
  "Dashboard", "Customers", "Inventory", "Sales", "Workshop", "Employees", "Payments", "Reports", "Administration",
];
