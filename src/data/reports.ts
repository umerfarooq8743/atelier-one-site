import type { ReportDef } from "./types";

/** The 13 reports in the product (backend/routes reports + reports-overview). Values are illustrative sample data. */
export const reports: ReportDef[] = [
  {
    id: "sales", title: "Sales Report", group: "Sales & Purchases", tag: "Sales",
    purpose: "Every sale invoice with totals, collections and pending balances for any date range.",
    value: "See what was billed, what was collected and what is still outstanding — invoice by invoice.",
    metrics: [{ label: "Invoices", value: "148" }, { label: "Billed", value: "PKR 1,284,500" }, { label: "Pending", value: "PKR 212,300" }],
    preview: { kind: "table", columns: ["Invoice", "Customer", "Total", "Paid", "Balance"], numeric: [2, 3, 4], rows: [
      ["SI-0148", "Ahmed Khan", "18,500", "8,500", "10,000"],
      ["SI-0147", "Bilal Hassan", "12,200", "12,200", "0"],
      ["SI-0146", "Hamza Iqbal", "26,750", "15,000", "11,750"],
      ["SI-0145", "Muhammad Ali", "7,400", "7,400", "0"],
    ] },
  },
  {
    id: "purchases", title: "Purchase Report", group: "Sales & Purchases", tag: "Purchases",
    purpose: "Vendor purchases over a period — what was bought, from whom and how much was spent.",
    value: "Know your cost of stock for any month without opening a single supplier bill.",
    metrics: [{ label: "Purchases", value: "22" }, { label: "Spent", value: "PKR 486,200" }, { label: "Vendors", value: "6" }],
    preview: { kind: "bars", labels: ["W1", "W2", "W3", "W4"], values: [142, 96, 168, 80], unit: "K" },
  },
  {
    id: "product-sales", title: "Product-wise Sales", group: "Sales & Purchases", tag: "Sales",
    purpose: "Which products and services bring in the most revenue, with quantity and share.",
    value: "Stock more of what sells and price stitching services with evidence.",
    metrics: [{ label: "Products sold", value: "34" }, { label: "Top item", value: "Stitching — SK" }, { label: "Share", value: "31%" }],
    preview: { kind: "split", items: [
      { label: "Stitching — Shalwar Kameez", value: 31, tone: "brass" },
      { label: "Premium Wash & Wear", value: 22, tone: "info" },
      { label: "Egyptian Cotton", value: 17, tone: "ok" },
      { label: "Khaddar", value: 12, tone: "warn" },
      { label: "Other", value: 18, tone: "muted" },
    ] },
  },
  {
    id: "daily-sales", title: "Daily Sales", group: "Sales & Purchases", tag: "Sales",
    purpose: "Day-by-day billing and collections, with the daily average and best day.",
    value: "Spot busy days, slow days and the run-up to festive seasons.",
    metrics: [{ label: "Daily average", value: "PKR 42,800" }, { label: "Best day", value: "PKR 96,400" }, { label: "Days", value: "30" }],
    preview: { kind: "line", labels: ["1", "5", "10", "15", "20", "25", "30"], values: [32, 41, 38, 55, 49, 72, 64], secondary: [24, 30, 33, 41, 38, 58, 51] },
  },
  {
    id: "vendor-purchases", title: "Vendor Purchases", group: "Sales & Purchases", tag: "Purchases",
    purpose: "Spend and outstanding dues per supplier.",
    value: "Negotiate from facts and never lose track of what you owe a supplier.",
    metrics: [{ label: "Vendors", value: "6" }, { label: "Total spend", value: "PKR 486,200" }, { label: "Due", value: "PKR 64,000" }],
    preview: { kind: "table", columns: ["Vendor", "Invoices", "Spend", "Due"], numeric: [1, 2, 3], rows: [
      ["Al-Noor Fabrics", "8", "214,000", "40,000"],
      ["City Button House", "5", "38,400", "0"],
      ["Crescent Textiles", "6", "162,800", "24,000"],
    ] },
  },
  {
    id: "customer-balances", title: "Customer Balances", group: "Customers & Staff", tag: "Receivables",
    purpose: "Outstanding amount per customer — who owes what, with billed and collected totals.",
    value: "Follow up on the right customers and keep receivables under control.",
    metrics: [{ label: "Customers owing", value: "37" }, { label: "Receivable", value: "PKR 212,300" }, { label: "Largest", value: "PKR 26,750" }],
    preview: { kind: "table", columns: ["Customer", "Billed", "Collected", "Balance"], numeric: [1, 2, 3], rows: [
      ["Hamza Iqbal", "64,200", "37,450", "26,750"],
      ["Ahmed Khan", "48,000", "30,000", "18,000"],
      ["Usama Riaz", "21,000", "9,000", "12,000"],
    ] },
  },
  {
    id: "employee-balances", title: "Employee Balances", group: "Customers & Staff", tag: "Payroll",
    purpose: "Wages paid, loans given and repaid, and the balance still due from each employee.",
    value: "Settle month-end wages and staff advances with no arguments.",
    metrics: [{ label: "Employees", value: "8" }, { label: "Wages paid", value: "PKR 196,000" }, { label: "Loans due", value: "PKR 35,000" }],
    preview: { kind: "table", columns: ["Employee", "Wages", "Loans", "Due"], numeric: [1, 2, 3], rows: [
      ["Usman (Tailor)", "25,000", "20,000", "12,000"],
      ["Kamran (Cutter)", "20,000", "15,000", "8,000"],
      ["Saleem (Helper)", "15,000", "0", "0"],
    ] },
  },
  {
    id: "staff-work", title: "Staff Work", group: "Customers & Staff", tag: "Staff",
    purpose: "Items assigned to each employee and how much of it is delivered.",
    value: "Balance workload across the workshop and see who is falling behind.",
    metrics: [{ label: "Items assigned", value: "212" }, { label: "Delivered", value: "164" }, { label: "In process", value: "31" }],
    preview: { kind: "bars", labels: ["Usman", "Kamran", "Rashid", "Saleem"], values: [64, 52, 48, 30] },
  },
  {
    id: "inventory", title: "Inventory Report", group: "Inventory & Orders", tag: "Stock",
    purpose: "Current stock on hand per product with low-stock alerts and stock valuation.",
    value: "Know exactly what's on the shelf and what it's worth before you buy more.",
    metrics: [{ label: "Products", value: "86" }, { label: "Low stock", value: "5" }, { label: "Stock value", value: "PKR 1.42M" }],
    preview: { kind: "table", columns: ["Product", "Unit", "In stock", "Min"], numeric: [2, 3], rows: [
      ["Premium Wash & Wear", "meter", "18", "25"],
      ["Egyptian Cotton", "meter", "142", "40"],
      ["Khaddar", "meter", "9", "20"],
    ] },
  },
  {
    id: "order-status", title: "Order Status", group: "Inventory & Orders", tag: "Tailoring",
    purpose: "Every tailoring item — in process, ready or delivered — with overdue flags.",
    value: "Promise delivery dates you can keep and catch late orders early.",
    metrics: [{ label: "In process", value: "31" }, { label: "Ready", value: "17" }, { label: "Overdue", value: "4" }],
    preview: { kind: "split", items: [
      { label: "Delivered", value: 164, tone: "ok" },
      { label: "In process", value: 31, tone: "warn" },
      { label: "Ready", value: 17, tone: "info" },
    ] },
  },
  {
    id: "payment-collections", title: "Payment Collections", group: "Finance", tag: "Finance",
    purpose: "Money received and paid out, split by cash, bank and cheque.",
    value: "Reconcile the drawer and the bank account in minutes.",
    metrics: [{ label: "Received", value: "PKR 1,072,200" }, { label: "Cash", value: "64%" }, { label: "Bank", value: "29%" }],
    preview: { kind: "split", items: [
      { label: "Cash", value: 64, tone: "brass" },
      { label: "Bank transfer", value: 29, tone: "info" },
      { label: "Cheque", value: 5, tone: "ok" },
      { label: "Other", value: 2, tone: "muted" },
    ] },
  },
  {
    id: "expenses", title: "Expense Report", group: "Finance", tag: "Expenses",
    purpose: "Business expenses by category and date — rent, utilities, salaries and more.",
    value: "See where the money goes each month, salaries included automatically.",
    metrics: [{ label: "Expenses", value: "PKR 318,400" }, { label: "Salaries", value: "PKR 196,000" }, { label: "Categories", value: "6" }],
    preview: { kind: "bars", labels: ["Salary", "Rent", "Utilities", "Supplies", "Transport"], values: [196, 70, 28, 16, 8], unit: "K" },
  },
  {
    id: "profit-loss", title: "Profit & Loss", group: "Finance", tag: "Finance",
    purpose: "Sales minus purchases and expenses — the net profit picture for any period.",
    value: "One honest number for the month, built from records you already keep.",
    metrics: [{ label: "Sales", value: "PKR 1,284,500" }, { label: "Costs", value: "PKR 804,600" }, { label: "Net", value: "PKR 479,900" }],
    preview: { kind: "line", labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], values: [38, 44, 41, 52, 47, 60], secondary: [26, 29, 30, 33, 31, 37] },
  },
];

export const reportGroups = ["Sales & Purchases", "Customers & Staff", "Inventory & Orders", "Finance"] as const;
