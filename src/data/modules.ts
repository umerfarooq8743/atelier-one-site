import type { ModuleId, ProductModule } from "./types";

/**
 * Single source for module content. Powers homepage tabs, the /modules page,
 * feature links and related-module suggestions. Every capability listed here
 * is taken from the product documentation and checked against the source.
 */
export const modules: ProductModule[] = [
  {
    id: "dashboard",
    letter: "A",
    name: "Dashboard",
    icon: "dashboard",
    category: "Dashboard",
    summary: "Today's sales, collections, pending orders and low stock — at a glance.",
    intro:
      "The dashboard is the first screen of the working day: what was sold, what was collected, which orders are still open and which fabrics are running low.",
    problem:
      "Owners piece the day together from the cash drawer, a register and memory. By the time numbers are added up, the moment to act has passed.",
    solution:
      "Atelier One calculates the day's position from the invoices, payments and stock already recorded, and every KPI card opens the matching filtered list.",
    capabilities: [
      "Today's sales, collections and pending orders",
      "Week, month, quarter and year period switch",
      "Low-stock list with one-click reorder",
      "Staff workload across assigned order items",
      "Top products by revenue",
      "Every KPI card opens the matching filtered list",
    ],
    workflow: [
      "Open the dashboard to see today's sales and collections",
      "Switch the period to compare the week, month, quarter or year",
      "Click a KPI card to jump to the filtered invoices behind it",
      "Use Reorder on a low-stock row to start a pre-filled purchase",
    ],
    screen: "dashboard",
    related: ["sales", "inventory", "reports"],
    cta: "See the Dashboard",
  },
  {
    id: "customers",
    letter: "B",
    name: "Customers",
    icon: "customers",
    category: "Customers",
    summary: "A 360° customer page: measurements, invoices, payments, balance and activity.",
    intro:
      "Every customer has one record that brings together their contact details, garment measurements, invoices, payments and a running-balance statement.",
    problem:
      "Customer details live in registers, phone contacts and measurement slips. Finding what someone owes — or what they ordered last Eid — takes too long at the counter.",
    solution:
      "The customer 360° page keeps the full relationship on one screen, with a running-balance statement that can be exported to CSV.",
    capabilities: [
      "Customer records with phone, email and address",
      "Live customer balance from invoices and payments",
      "Garment measurements per variant, with history",
      "Invoice history and payment history",
      "Running-balance statement with CSV export",
      "Per-record activity panel",
    ],
    workflow: [
      "Search by name or phone, or press Ctrl+K from anywhere",
      "Open the customer to see balance, measurements and orders",
      "Start a sale invoice or receive a payment from the same page",
      "Export the running-balance statement as CSV when needed",
    ],
    screen: "customer-360",
    related: ["measurements", "sales", "payments"],
    cta: "Explore Customer Management",
  },
  {
    id: "measurements",
    letter: "C",
    name: "Measurements",
    icon: "measurements",
    category: "Customers",
    summary: "Shalwar Kameez, Kurta Pajama, Coat and Waistcoat — with style details and history.",
    intro:
      "Measurements are stored per garment variant on the customer record, together with the style choices a tailor needs to cut and stitch correctly.",
    problem:
      "Paper measurement slips get lost, are hard to read and are overwritten when a customer's size changes — so old orders lose the measurements they were made with.",
    solution:
      "Atelier One keeps measurements per variant with a history, and every order line carries a snapshot of the measurement used, so later changes never alter old orders.",
    capabilities: [
      "Four variants: Shalwar Kameez, Kurta Pajama, Coat and Waistcoat",
      "Thirteen body measurements on every variant, in quarter-inch steps",
      "Thigh and knee for Shalwar Kameez and Kurta Pajama",
      "Collar, daman, sleeve, pocket, button and fit styles",
      "Lapel style for Coat and Waistcoat; vent style for Coat",
      "Measurement history for alterations and repeat orders",
      "Measurement snapshot saved on each sale-invoice line",
    ],
    workflow: [
      "Open the customer and choose a garment variant",
      "Record measurements and style choices",
      "Add the variant to a sale-invoice line — a snapshot is stored with it",
      "Update measurements later without changing past orders",
    ],
    screen: "measurements",
    related: ["customers", "sales", "workshop"],
    cta: "See Measurement Management",
  },
  {
    id: "inventory",
    letter: "D",
    name: "Products & Inventory",
    icon: "products",
    category: "Inventory",
    summary: "Fabric by the meter, services and accessories — with stock movements and alerts.",
    intro:
      "The catalogue covers fabric, stitching services, accessories and other items, each with a unit, prices, stock quantity and a minimum-stock alert.",
    problem:
      "Fabric is sold by the meter, bought in bulk and cut every day. Without a running record, stock on the shelf and stock on paper drift apart.",
    solution:
      "Sales deduct meters, purchases add quantity and adjustments are logged with before and after — so stock is never typed over, and every movement is traceable.",
    capabilities: [
      "Categories: fabric, stitching service, accessory, other",
      "Brands and units: meter, piece, pair, set, kg, yard",
      "Opening stock for new products; stock is read-only after that",
      "Minimum-stock alerts and a low-stock filter",
      "Manual adjustments (+/−) that cannot go below zero",
      "Stock movement history: sales, purchases and adjustments with running stock",
      "Atomic stock deduction — a sale is refused if stock is short",
    ],
    workflow: [
      "Create a product with an opening stock and minimum alert",
      "Purchases add stock; sales deduct meters automatically",
      "Adjust stock with a reason when a physical count differs",
      "Review the movement history and reorder low-stock items",
    ],
    screen: "inventory",
    related: ["purchases", "sales", "vendors"],
    cta: "Discover Inventory Management",
  },
  {
    id: "sales",
    letter: "E",
    name: "Sale Invoices",
    icon: "sales",
    category: "Sales",
    summary: "Multi-line orders with measurements, assigned staff, advances and PDF invoices.",
    intro:
      "A sale invoice records what a customer ordered — fabric, stitching and accessories — together with who will make it and what has been paid in advance.",
    problem:
      "Hand-written bills miss lines, totals are added on a calculator, advances are noted in the margin and the slip is the only record of who is stitching what.",
    solution:
      "Invoices are numbered automatically, totals are computed by the server, an advance becomes a linked payment receipt and a PDF invoice uses your business profile.",
    capabilities: [
      "Automatic numbering (SI-0001, SI-0002 …) per company",
      "Multiple line items with per-line customer",
      "Measurement snapshot per line",
      "Assigned employees for workshop work",
      "Line discounts with server-side totals",
      "Advance payment recorded as a linked receipt",
      "Remaining balance and PDF invoice",
    ],
    workflow: [
      "Choose the customer (or Same as bill to for each line)",
      "Add fabric, stitching and accessory lines with quantities",
      "Attach measurements and assign employees",
      "Record the advance and save — stock, balance and receipt update together",
    ],
    screen: "sale-invoice-form",
    related: ["workshop", "payments", "customers"],
    cta: "See How Invoices Work",
  },
  {
    id: "workshop",
    letter: "F",
    name: "Workshop Order Tracking",
    icon: "workshop",
    category: "Workshop",
    summary: "Every order item moves through In Process → Ready → Delivered.",
    intro:
      "Each line of a sale invoice has its own stage, so a three-piece order can show one item delivered while another is still being stitched.",
    problem:
      "\"Is my suit ready?\" usually means a phone call to the workshop and a search through slips. Orders slip through when nobody owns the follow-up.",
    solution:
      "Item-level stages — In Process, Ready and Delivered — are visible on the invoice, the employee's assigned work and the Order Status report.",
    capabilities: [
      "Three stages per order item: In Process, Ready, Delivered",
      "Stages update per line, not per invoice",
      "Line status stays attached when an invoice is edited",
      "Employee assigned-work tab with each item's stage",
      "Order Status report with overdue flags",
    ],
    workflow: [
      "New invoice lines start In Process",
      "Mark an item Ready when the workshop finishes it",
      "Mark it Delivered when the customer collects",
      "Track open items in the Order Status and Staff Work reports",
    ],
    screen: "order-tracking",
    related: ["sales", "employees", "reports"],
    cta: "See How Orders Work",
  },
  {
    id: "purchases",
    letter: "G",
    name: "Purchase Invoices",
    icon: "purchases",
    category: "Sales",
    summary: "Stock bought from vendors — catalogue lines add to stock automatically.",
    intro:
      "Purchase invoices record stock bought from suppliers. Lines linked to catalogue products add their quantity to stock; free-text lines don't touch stock.",
    problem:
      "Supplier bills pile up in a drawer and stock is updated by hand — if at all — so the shelf, the books and the supplier's dues never agree.",
    solution:
      "A purchase invoice updates stock as it is saved, keeps the vendor's purchase history and can be started straight from a low-stock alert.",
    capabilities: [
      "Automatic numbering (PI-0001 …)",
      "Vendor chosen from the vendor list, or typed",
      "Product selection with quantity and purchase price",
      "Catalogue lines add quantity to stock",
      "Reorder pre-fill: 2 × minimum − current stock",
    ],
    workflow: [
      "Choose the vendor and the date",
      "Add catalogue products with quantity and price",
      "Save — stock increases for every linked line",
      "See the purchase in Vendor Purchases and the P&L",
    ],
    screen: "purchase-invoice",
    related: ["inventory", "vendors", "reports"],
    cta: "See Purchase Invoices",
  },
  {
    id: "payments",
    letter: "H",
    name: "Payments",
    icon: "payments",
    category: "Payments",
    summary: "Receipts against an open invoice, or on account — cash, bank, cheque or other.",
    intro:
      "Receive a payment by picking the customer: their open invoices appear, and choosing one pre-fills the amount with its remaining balance.",
    problem:
      "Partial payments and advances are where tailoring accounts go wrong — money is received, but nobody is sure which order it belongs to.",
    solution:
      "Every receipt is numbered and linked to a customer and optionally one invoice. A receipt can't exceed the balance or target another customer's invoice.",
    capabilities: [
      "Automatic numbering (PMT-0001 …)",
      "Customer selection with their open invoices",
      "Invoice-linked receipts or on-account payments",
      "Cash, bank transfer, cheque and other methods",
      "Receipts can't exceed the invoice balance",
      "An invoice's paid amount always equals its linked payments",
    ],
    workflow: [
      "Choose the customer",
      "Pick an open invoice — the amount pre-fills — or choose On account",
      "Select the method and add a reference",
      "Save — the invoice and customer balance update together",
    ],
    screen: "receive-payment",
    related: ["sales", "customers", "reports"],
    cta: "See Payment Management",
  },
  {
    id: "employees",
    letter: "I",
    name: "Employees",
    icon: "employees",
    category: "Employees",
    summary: "Staff records, assigned work, loans, repayments and a wage ledger.",
    intro:
      "Employee records hold the job type and monthly wage, the work assigned to them, any loans and repayments, and every wage payment.",
    problem:
      "Advances to staff, wage payments and who-is-working-on-what are usually tracked in three different notebooks — or not at all.",
    solution:
      "One employee profile shows assigned order items with their stage, loan balances and the wage ledger. Paying a wage records the salary expense automatically.",
    capabilities: [
      "Job types: tailor, cutter, helper, manager, salesperson, other",
      "Monthly wage",
      "Loans and repayments (can't exceed what is owed)",
      "Wage ledger linked to salary expenses",
      "Assigned work with each item's stage",
    ],
    workflow: [
      "Create the employee with a job type and monthly wage",
      "Assign them to order lines on sale invoices",
      "Record loans and repayments as they happen",
      "Pay wages — a linked salary expense is created",
    ],
    screen: "employee-profile",
    related: ["workshop", "expenses", "reports"],
    cta: "See Employee Management",
  },
  {
    id: "expenses",
    letter: "J",
    name: "Expenses",
    icon: "expenses",
    category: "Payments",
    summary: "Shop expenses by category — and wages appear here automatically.",
    intro:
      "Record rent, utilities, supplies, maintenance, transport and other costs by category and date. Wage payments arrive as salary expenses on their own.",
    problem:
      "Small daily costs go unrecorded, and salaries are kept separately — so the month's profit is always a guess.",
    solution:
      "Expenses are categorised in one list and flow into the Expense and Profit & Loss reports. Salary expenses created from wages are locked and link back to the employee.",
    capabilities: [
      "Categories: rent, utilities, salary, supplies, maintenance, transport, other",
      "Expense records with date and description",
      "Salary expenses created from wage payments",
      "Wage-sourced expenses are managed from the employee",
      "Feeds the Expense report and Profit & Loss",
    ],
    workflow: [
      "Record an expense with category, amount and date",
      "Pay a wage — the salary expense appears automatically",
      "Delete the wage and its expense is removed with it",
      "Review the totals in the Expense report and P&L",
    ],
    screen: "expenses",
    related: ["employees", "reports", "payments"],
    cta: "See Expense Management",
  },
  {
    id: "vendors",
    letter: "K",
    name: "Vendors",
    icon: "vendors",
    category: "Inventory",
    summary: "Supplier records with contact details and purchase history.",
    intro:
      "Vendors are the suppliers you buy fabric and accessories from, with their contact details, notes and the purchase invoices recorded against them.",
    problem:
      "Supplier phone numbers sit in one place and what you bought from them in another, which makes comparing spend and dues difficult.",
    solution:
      "Vendor records connect to purchase invoices and the Vendor Purchases report, showing spend and outstanding dues per supplier.",
    capabilities: [
      "Vendor name, company, phone, email and address",
      "Notes and active / inactive status",
      "Related purchase invoices",
      "Vendor Purchases report",
      "Vendors in use can be marked inactive instead of deleted",
    ],
    workflow: [
      "Add the vendor from Setup → Vendors",
      "Choose them on a purchase invoice",
      "Review spend in Vendor Purchases",
      "Mark inactive when you stop buying from them",
    ],
    screen: "vendors",
    related: ["purchases", "inventory", "reports"],
    cta: "See Vendor Management",
  },
  {
    id: "reports",
    letter: "L",
    name: "Reports",
    icon: "reports",
    category: "Reports",
    summary: "13 reports with date ranges, summary tiles, detailed tables and CSV export.",
    intro:
      "Thirteen reports cover sales, purchases, balances, stock, staff, collections and profit — each with a date range, summary figures and CSV export.",
    problem:
      "Month-end means adding up registers by hand, and questions like \"which fabric sells best?\" or \"who owes us most?\" go unanswered.",
    solution:
      "Every report is built from the same records the shop already keeps, so there is nothing extra to enter — choose a range and read the answer.",
    capabilities: [
      "Sales, Purchases and Product-wise Sales",
      "Daily Sales and Payment Collections",
      "Customer Balances and Employee Balances",
      "Inventory and Order Status",
      "Staff Work and Vendor Purchases",
      "Expenses and Profit & Loss",
      "Date-range filters and CSV export",
    ],
    workflow: [
      "Open Reports and choose a report",
      "Pick a date range",
      "Read the summary tiles and the detailed table",
      "Export to CSV for your accountant or records",
    ],
    screen: "reports-overview",
    related: ["dashboard", "sales", "expenses"],
    cta: "Explore Reports",
  },
  {
    id: "users",
    letter: "M",
    name: "Users & Permissions",
    icon: "roles",
    category: "Administration",
    summary: "Individual sign-ins, built-in and custom roles, module × action permissions.",
    intro:
      "Everyone signs in with their own email. Admin, Manager and Staff roles are created for every company, and custom roles use a module × action matrix.",
    problem:
      "A shared login means everyone can see and change everything, and there is no way to know who did what.",
    solution:
      "Permissions are enforced by the server on every request and reflected in the interface. Changing a user's role signs out their other sessions immediately.",
    capabilities: [
      "User invitations by email with a set-password link",
      "Built-in Admin, Manager and Staff roles",
      "Custom roles with module × action permissions",
      "User activation and deactivation",
      "The company owner can't be demoted or deactivated",
      "At least one active Admin always remains",
    ],
    workflow: [
      "Add a user — they receive an invitation email",
      "Assign a built-in or custom role",
      "Adjust permissions in Setup → Roles & permissions",
      "Deactivate a user to end their access at once",
    ],
    screen: "roles",
    related: ["activity", "settings", "dashboard"],
    cta: "See Roles & Permissions",
  },
  {
    id: "activity",
    letter: "N",
    name: "Activity Log",
    icon: "activity",
    category: "Administration",
    summary: "Who changed what and when — with field-level differences.",
    intro:
      "Every create, update, delete and business action is written to the activity log with the user, their role and the time.",
    problem:
      "When a balance looks wrong or a price changed, there is no trail to find out what happened.",
    solution:
      "Updates record field-level changes (from → to). The log is visible per record and in Setup → Activity log, with filters and links back to each record.",
    capabilities: [
      "Record creation, updates and deletions",
      "Field-level changes for updates",
      "Business actions: payment received, stock adjusted, sign-in, password changes",
      "User and role attribution with timestamps",
      "Per-record activity panel and a filtered log",
    ],
    workflow: [
      "Work as normal — entries are written automatically",
      "Open a record's Activity panel to see its history",
      "Filter the full log by user, module or action",
      "Follow a row's link straight to the record",
    ],
    screen: "activity-log",
    related: ["users", "settings", "inventory"],
    cta: "See the Activity Log",
  },
  {
    id: "settings",
    letter: "O",
    name: "Business Settings",
    icon: "settings",
    category: "Administration",
    summary: "Business profile, currency, invoice text and dropdown values.",
    intro:
      "Each company sets its own business profile — name, tagline, contact details, tax number, currency, invoice footer and terms — which appear on invoices and PDFs.",
    problem:
      "Generic software prints someone else's wording, and dropdowns never match the styles your workshop actually uses.",
    solution:
      "Setup holds the business profile and the dropdown values (product types, collar, daman, sleeve, pocket, button, lapel, fit, vent, job types) for your company only.",
    capabilities: [
      "Business name and tagline",
      "Contact information and tax number",
      "Currency",
      "Invoice footer and invoice terms",
      "Dropdown management for styles and categories",
    ],
    workflow: [
      "Open Setup → Business profile",
      "Enter your business details and currency",
      "Write the invoice footer and terms",
      "Adjust dropdown values to match your workshop",
    ],
    screen: "settings",
    related: ["users", "sales", "activity"],
    cta: "See Business Settings",
    note: "Company logo upload is not available yet — the business profile is text only.",
  },
];

export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<ModuleId, ProductModule>;
