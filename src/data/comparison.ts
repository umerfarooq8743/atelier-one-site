/** Workflow comparison — manual/disconnected processes vs. Atelier One. Not a competitor benchmark. */
export const comparison = [
  { activity: "Customer records", before: "Separate registers", after: "Centralized customers" },
  { activity: "Measurements", before: "Paper records", after: "Digital measurement history" },
  { activity: "Fabric stock", before: "Manual tracking", after: "Stock movement management" },
  { activity: "Stitching orders", before: "Manual follow-up", after: "Item-level order stages" },
  { activity: "Payments", before: "Separate calculations", after: "Invoice-linked receipts" },
  { activity: "Employees", before: "Separate records", after: "Work, loans and wages" },
  { activity: "Expenses", before: "Manual registers", after: "Centralized expense records" },
  { activity: "Reporting", before: "Manual calculations", after: "13 dedicated reports" },
  { activity: "Access", before: "Shared credentials", after: "Individual users and roles" },
] as const;

export const problems = [
  { title: "Manual customer records", detail: "Names, numbers and balances spread across registers and phones." },
  { title: "Disorganized measurements", detail: "Slips that fade, get lost or are overwritten for the next order." },
  { title: "Inventory uncertainty", detail: "Meters cut every day, but the stock count is updated by hand." },
  { title: "Untracked stitching orders", detail: "No single place to see what is in process, ready or delivered." },
  { title: "Payment confusion", detail: "Advances and part-payments that never quite match the order." },
  { title: "Disconnected expenses", detail: "Rent, supplies and salaries recorded somewhere else — or not at all." },
  { title: "Limited business visibility", detail: "Profit is a guess until someone adds up the month by hand." },
] as const;

export const audiences = [
  "Tailoring Shops",
  "Fabric Retailers",
  "Boutique Businesses",
  "Clothing Workshops",
  "Stitching Businesses",
  "Bespoke Tailors",
] as const;

/** Documented, verifiable product facts for stat strips. */
export const productFacts = [
  { value: 15, suffix: "", label: "Connected modules" },
  { value: 13, suffix: "", label: "Built-in reports" },
  { value: 4, suffix: "", label: "Garment variants" },
  { value: 3, suffix: "", label: "Order item stages" },
  { value: 14, suffix: "-day", label: "Trial for new companies" },
] as const;

export const personas = [
  {
    role: "Tailoring business owner",
    pains: ["Customer records in registers", "Measurements hard to manage", "No order visibility", "Unclear outstanding payments"],
    outcome: "One system to control the whole tailoring business.",
    modules: ["customers", "workshop", "payments"] as const,
  },
  {
    role: "Fabric shop owner",
    pains: ["Manual fabric inventory", "Meter-based sales hard to track", "Stock discrepancies", "Missing purchase history"],
    outcome: "Accurate inventory with connected sales and purchases.",
    modules: ["inventory", "purchases", "vendors"] as const,
  },
  {
    role: "Business manager",
    pains: ["Little operational visibility", "Staff performance unclear", "Manual reporting", "Disconnected financial records"],
    outcome: "A unified dashboard with operational and financial insight.",
    modules: ["dashboard", "reports", "employees"] as const,
  },
  {
    role: "Counter staff",
    pains: ["Slow invoice creation", "Hard to locate customers", "Manual payment tracking", "Complicated daily workflows"],
    outcome: "Simple, fast and intuitive daily operations.",
    modules: ["sales", "customers", "payments"] as const,
  },
  {
    role: "Growing operator",
    pains: ["More than one business to run", "Need separate books per business", "Separate staff per business"],
    outcome: "Independent, isolated workspaces — one per company.",
    modules: ["users", "settings", "activity"] as const,
  },
] as const;
