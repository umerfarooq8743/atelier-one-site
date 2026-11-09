import type { Journey } from "./types";

/** The order lifecycle exactly as documented (§8.2). */
export const orderLifecycle = [
  { id: "customer", title: "Customer & measurements", detail: "Find or add the customer and record measurements for the garment variant." },
  { id: "invoice", title: "Sale invoice", detail: "Add fabric, stitching and accessory lines. Each line keeps a measurement snapshot." },
  { id: "assign", title: "Assign employees", detail: "Assign tailors and cutters to the order so it shows in their assigned work." },
  { id: "process", title: "In process", detail: "New lines start In Process. Stock for fabric lines has already been deducted." },
  { id: "ready", title: "Ready", detail: "The workshop marks each finished item Ready — line by line, not invoice by invoice." },
  { id: "delivered", title: "Delivered", detail: "The customer collects and the item is marked Delivered." },
  { id: "paid", title: "Payments completed", detail: "Receipts against the invoice reduce the balance until it reaches zero." },
] as const;

export const journeys: Journey[] = [
  {
    id: "customer-to-delivery",
    eyebrow: "Journey 1",
    title: "New customer to delivered order",
    intro: "From the first visit to the final payment, every step lands in the same customer record.",
    steps: [
      { title: "Customer registration", detail: "Add name and phone — or find an existing customer with Ctrl+K.", module: "customers" },
      { title: "Customer measurements", detail: "Record measurements for Shalwar Kameez, Kurta Pajama, Coat or Waistcoat with style details.", module: "measurements" },
      { title: "Sale invoice creation", detail: "Start a numbered invoice for the customer.", module: "sales" },
      { title: "Product selection", detail: "Add fabric by the meter, the stitching service and accessories.", module: "inventory" },
      { title: "Employee assignment", detail: "Assign the tailor and cutter who will make it.", module: "employees" },
      { title: "Advance payment", detail: "The advance is saved as a linked payment receipt.", module: "payments" },
      { title: "Order processing", detail: "Lines start In Process and appear in each employee's assigned work.", module: "workshop" },
      { title: "Ready status", detail: "The workshop marks each item Ready.", module: "workshop" },
      { title: "Delivery", detail: "Items are marked Delivered when the customer collects.", module: "workshop" },
      { title: "Final payment", detail: "Receive the remaining balance against the invoice — it reaches zero.", module: "payments" },
    ],
  },
  {
    id: "inventory",
    eyebrow: "Journey 2",
    title: "Inventory management",
    intro: "Stock changes only through records — so the number on screen matches the shelf.",
    steps: [
      { title: "Create product", detail: "Fabric, service or accessory with unit, prices and a minimum-stock alert.", module: "inventory" },
      { title: "Define opening stock", detail: "Set the opening quantity once; afterwards stock is read-only on the form.", module: "inventory" },
      { title: "Record purchase", detail: "A purchase invoice from a vendor with catalogue lines.", module: "purchases" },
      { title: "Stock increases", detail: "Every linked purchase line adds its quantity to stock.", module: "purchases" },
      { title: "Sell fabric", detail: "A sale invoice line takes meters of fabric.", module: "sales" },
      { title: "Stock decreases", detail: "Meters are deducted atomically — a sale is refused if stock is short.", module: "inventory" },
      { title: "Monitor low-stock alerts", detail: "Products under their minimum appear on the dashboard.", module: "dashboard" },
      { title: "Reorder", detail: "One click opens a pre-filled purchase: 2 × minimum − current stock.", module: "purchases" },
      { title: "Review stock movements", detail: "Sales, purchases and adjustments with the running stock.", module: "inventory" },
    ],
  },
  {
    id: "employee-finance",
    eyebrow: "Journey 3",
    title: "Employee financial management",
    intro: "Work, advances and wages for each employee — connected to the shop's expenses.",
    steps: [
      { title: "Create employee", detail: "Name, phone, job type and monthly wage.", module: "employees" },
      { title: "Assign work", detail: "Assign them to order lines; progress appears on their profile.", module: "workshop" },
      { title: "Record employee loan", detail: "Give a loan and see the balance owed.", module: "employees" },
      { title: "Record repayment", detail: "Repayments can't exceed what is owed.", module: "employees" },
      { title: "Pay wages", detail: "Add a wage payment to the employee's ledger.", module: "employees" },
      { title: "Salary expense created", detail: "A linked salary expense appears in Expenses automatically.", module: "expenses" },
      { title: "Review financial reports", detail: "Employee Balances, Expenses and Profit & Loss reflect it.", module: "reports" },
    ],
  },
  {
    id: "business-finance",
    eyebrow: "Journey 4",
    title: "Business financial management",
    intro: "Sales, receipts, purchases and expenses add up to one profit-and-loss picture.",
    steps: [
      { title: "Record sales", detail: "Sale invoices add to each customer's balance.", module: "sales" },
      { title: "Receive payments", detail: "Receipts reduce invoice and customer balances.", module: "payments" },
      { title: "Record purchases", detail: "Purchase invoices record stock costs per vendor.", module: "purchases" },
      { title: "Record expenses", detail: "Rent, utilities and other costs — plus salaries from wages.", module: "expenses" },
      { title: "Track outstanding balances", detail: "Customer Balances shows who owes what.", module: "reports" },
      { title: "Review profit and loss", detail: "Sales minus purchases and expenses for any period.", module: "reports" },
    ],
  },
];

/** Homepage "everything connected" flow. */
export const solutionFlow = [
  { id: "customers", label: "Customers", detail: "Records, measurements and balances — the starting point of every order." },
  { id: "sales", label: "Orders", detail: "Sale invoices with item-level stages, measurement snapshots and advances." },
  { id: "inventory", label: "Inventory", detail: "Fabric meters are deducted as orders are saved and added back by purchases." },
  { id: "employees", label: "Employees", detail: "Assigned work, loans and wages — with salary expenses created automatically." },
  { id: "payments", label: "Payments", detail: "Receipts linked to invoices keep every balance exact." },
  { id: "reports", label: "Reports", detail: "13 reports built from the same records, with date ranges and CSV export." },
] as const;
