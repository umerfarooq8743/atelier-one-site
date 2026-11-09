/**
 * Sample data for illustrative product previews. The company name matches the
 * product's own non-destructive demo seed ("Demo Tailors"); people and amounts
 * are fictional. Nothing here is customer data or a performance claim.
 */

export const sampleCompany = "Demo Tailors";

export type Period = "week" | "month" | "quarter" | "year";

export interface DashboardData {
  salesToday: number;
  receivedToday: number;
  pendingInvoices: number;
  expensesToday: number;
  periodSales: number;
  periodPurchases: number;
  periodExpenses: number;
  customers: number;
  trend: number[];
  trendLabels: string[];
  collections: number[];
}

export const dashboardByPeriod: Record<Period, DashboardData> = {
  week: {
    salesToday: 48_650, receivedToday: 31_200, pendingInvoices: 23, expensesToday: 4_300,
    periodSales: 286_400, periodPurchases: 92_000, periodExpenses: 38_500, customers: 412,
    trend: [32, 41, 36, 52, 47, 61, 49], collections: [24, 30, 28, 40, 35, 44, 31],
    trendLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  month: {
    salesToday: 48_650, receivedToday: 31_200, pendingInvoices: 23, expensesToday: 4_300,
    periodSales: 1_284_500, periodPurchases: 486_200, periodExpenses: 318_400, customers: 412,
    trend: [210, 265, 248, 302, 259], collections: [180, 214, 230, 251, 197],
    trendLabels: ["W1", "W2", "W3", "W4", "W5"],
  },
  quarter: {
    salesToday: 48_650, receivedToday: 31_200, pendingInvoices: 23, expensesToday: 4_300,
    periodSales: 3_742_000, periodPurchases: 1_390_000, periodExpenses: 941_000, customers: 412,
    trend: [1_120, 1_340, 1_282], collections: [1_010, 1_198, 1_164],
    trendLabels: ["Aug", "Sep", "Oct"],
  },
  year: {
    salesToday: 48_650, receivedToday: 31_200, pendingInvoices: 23, expensesToday: 4_300,
    periodSales: 13_960_000, periodPurchases: 5_120_000, periodExpenses: 3_610_000, customers: 412,
    trend: [820, 760, 1_480, 1_190, 980, 1_040, 1_120, 1_260, 1_340, 1_282, 1_610, 2_060],
    collections: [740, 700, 1_320, 1_080, 900, 960, 1_010, 1_150, 1_198, 1_164, 1_460, 1_890],
    trendLabels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  },
};

export const lowStock = [
  { name: "Premium Wash & Wear", unit: "m", stock: 18, min: 25 },
  { name: "Khaddar — Charcoal", unit: "m", stock: 9, min: 20 },
  { name: "Metal Buttons (set)", unit: "set", stock: 6, min: 15 },
];

export const staffLoad = [
  { name: "Usman", role: "Tailor", items: 14, delivered: 9 },
  { name: "Kamran", role: "Cutter", items: 11, delivered: 8 },
  { name: "Rashid", role: "Tailor", items: 9, delivered: 4 },
  { name: "Saleem", role: "Helper", items: 6, delivered: 5 },
];

export const topProducts = [
  { name: "Stitching — Shalwar Kameez", revenue: 398_000, share: 31 },
  { name: "Premium Wash & Wear", revenue: 282_600, share: 22 },
  { name: "Egyptian Cotton", revenue: 218_400, share: 17 },
  { name: "Stitching — Waistcoat", revenue: 141_300, share: 11 },
];

export const recentActivity = [
  { who: "Sana", what: "received PMT-0312 · PKR 8,500", when: "2m ago", tone: "ok" as const },
  { who: "Ali", what: "marked SI-0148 · Kurta Ready", when: "14m ago", tone: "brass" as const },
  { who: "Sana", what: "created SI-0148 for Ahmed Khan", when: "21m ago", tone: "info" as const },
  { who: "Ali", what: "adjusted Khaddar −1.5 m (cutting waste)", when: "1h ago", tone: "warn" as const },
];

export const customers = [
  { name: "Ahmed Khan", phone: "0300-1234567", orders: 12, balance: 18_000, last: "Today" },
  { name: "Hamza Iqbal", phone: "0321-5550192", orders: 7, balance: 26_750, last: "Yesterday" },
  { name: "Muhammad Ali", phone: "0311-1234567", orders: 19, balance: 0, last: "3 Nov" },
  { name: "Bilal Hassan", phone: "0321-1234567", orders: 5, balance: 0, last: "1 Nov" },
  { name: "Usama Riaz", phone: "0333-7781204", orders: 3, balance: 12_000, last: "29 Oct" },
  { name: "Fahad Mirza", phone: "0345-2209876", orders: 9, balance: 4_250, last: "27 Oct" },
  { name: "Zain Abbas", phone: "0302-6612340", orders: 2, balance: 0, last: "24 Oct" },
];

export const products = [
  { name: "Premium Wash & Wear", cat: "Fabric", brand: "House", unit: "meter", price: 1_450, stock: 18, min: 25 },
  { name: "Egyptian Cotton", cat: "Fabric", brand: "House", unit: "meter", price: 1_200, stock: 142, min: 40 },
  { name: "Khaddar — Charcoal", cat: "Fabric", brand: "House", unit: "meter", price: 980, stock: 9, min: 20 },
  { name: "Lawn — Off White", cat: "Fabric", brand: "House", unit: "meter", price: 850, stock: 96, min: 30 },
  { name: "Stitching — Shalwar Kameez", cat: "Stitching service", brand: "—", unit: "piece", price: 2_800, stock: null, min: null },
  { name: "Stitching — Waistcoat", cat: "Stitching service", brand: "—", unit: "piece", price: 4_500, stock: null, min: null },
  { name: "Metal Buttons", cat: "Accessory", brand: "—", unit: "set", price: 450, stock: 6, min: 15 },
];

export const movements = [
  { date: "03 Nov", type: "Sale", ref: "SI-0146", change: -4.5, running: 18 },
  { date: "02 Nov", type: "Sale", ref: "SI-0145", change: -3, running: 22.5 },
  { date: "01 Nov", type: "Adjustment", ref: "Count correction", change: -1.5, running: 25.5 },
  { date: "30 Oct", type: "Purchase", ref: "PI-0022", change: 20, running: 27 },
  { date: "28 Oct", type: "Sale", ref: "SI-0139", change: -6, running: 7 },
];

export const orderItems = [
  { inv: "SI-0148", customer: "Ahmed Khan", item: "Kurta Pajama — Egyptian Cotton", staff: "Usman", due: "06 Nov", stage: "ready" as const },
  { inv: "SI-0148", customer: "Ahmed Khan", item: "Waistcoat — Khaddar", staff: "Rashid", due: "08 Nov", stage: "in_process" as const },
  { inv: "SI-0146", customer: "Hamza Iqbal", item: "Shalwar Kameez — Wash & Wear", staff: "Usman", due: "05 Nov", stage: "in_process" as const },
  { inv: "SI-0144", customer: "Fahad Mirza", item: "Coat — Wool Blend", staff: "Kamran", due: "04 Nov", stage: "delivered" as const },
  { inv: "SI-0143", customer: "Usama Riaz", item: "Shalwar Kameez — Lawn", staff: "Rashid", due: "02 Nov", stage: "in_process" as const },
];

export const employees = [
  { name: "Usman", job: "Tailor", wage: 25_000, loan: 12_000, open: 5 },
  { name: "Kamran", job: "Cutter", wage: 20_000, loan: 8_000, open: 3 },
  { name: "Rashid", job: "Tailor", wage: 24_000, loan: 0, open: 5 },
  { name: "Saleem", job: "Helper", wage: 15_000, loan: 0, open: 1 },
  { name: "Sana", job: "Salesperson", wage: 22_000, loan: 0, open: 0 },
];

export const expenses = [
  { date: "01 Nov", cat: "Salary", desc: "Wage — Usman (October)", amount: 25_000, wage: true },
  { date: "01 Nov", cat: "Salary", desc: "Wage — Kamran (October)", amount: 20_000, wage: true },
  { date: "01 Nov", cat: "Rent", desc: "Shop rent — November", amount: 70_000, wage: false },
  { date: "31 Oct", cat: "Utilities", desc: "Electricity bill", amount: 18_400, wage: false },
  { date: "30 Oct", cat: "Supplies", desc: "Thread, chalk & needles", amount: 3_600, wage: false },
  { date: "29 Oct", cat: "Transport", desc: "Fabric delivery", amount: 1_800, wage: false },
];

export const vendors = [
  { name: "Al-Noor Fabrics", contact: "Imran", phone: "0300-4412093", invoices: 8, spend: 214_000, active: true },
  { name: "Crescent Textiles", contact: "Naveed", phone: "0321-8890121", invoices: 6, spend: 162_800, active: true },
  { name: "City Button House", contact: "Tariq", phone: "0333-1290455", invoices: 5, spend: 38_400, active: true },
  { name: "Madina Thread Co.", contact: "Javed", phone: "0345-6612098", invoices: 3, spend: 12_600, active: false },
];

export const payments = [
  { no: "PMT-0312", customer: "Ahmed Khan", inv: "SI-0148", method: "Cash", amount: 8_500, date: "03 Nov" },
  { no: "PMT-0311", customer: "Bilal Hassan", inv: "SI-0147", method: "Bank transfer", amount: 12_200, date: "03 Nov" },
  { no: "PMT-0310", customer: "Hamza Iqbal", inv: "SI-0146", method: "Cash", amount: 15_000, date: "02 Nov" },
  { no: "PMT-0309", customer: "Fahad Mirza", inv: "On account", method: "Cheque", amount: 5_000, date: "02 Nov" },
  { no: "PMT-0308", customer: "Muhammad Ali", inv: "SI-0145", method: "Cash", amount: 7_400, date: "01 Nov" },
];

export const users = [
  { name: "Imtiaz Ahmed", email: "owner@example.com", role: "Admin", owner: true, active: true, state: "Active" },
  { name: "Ali Raza", email: "manager@example.com", role: "Manager", owner: false, active: true, state: "Active" },
  { name: "Sana Tariq", email: "counter@example.com", role: "Staff", owner: false, active: true, state: "Active" },
  { name: "Workshop Lead", email: "workshop@example.com", role: "Workshop (custom)", owner: false, active: true, state: "Invited" },
  { name: "Former Staff", email: "former@example.com", role: "Staff", owner: false, active: false, state: "Inactive" },
];

export const activity = [
  { user: "Ali Raza", role: "Manager", action: "updated", entity: "Product · Premium Wash & Wear", when: "Today 11:42", diff: [{ f: "salePrice", from: "1,400", to: "1,450" }], tone: "brass" as const },
  { user: "Sana Tariq", role: "Staff", action: "received payment", entity: "PMT-0312 · Ahmed Khan", when: "Today 11:05", diff: [], tone: "ok" as const },
  { user: "Sana Tariq", role: "Staff", action: "created", entity: "Sale invoice · SI-0148", when: "Today 10:38", diff: [], tone: "brass" as const },
  { user: "Ali Raza", role: "Manager", action: "adjusted stock", entity: "Khaddar — Charcoal", when: "Today 09:51", diff: [{ f: "stockQty", from: "10.5", to: "9" }], tone: "brass" as const },
  { user: "Imtiaz Ahmed", role: "Admin", action: "deleted", entity: "Expense · Duplicate entry", when: "Yesterday 18:20", diff: [], tone: "bad" as const },
  { user: "Imtiaz Ahmed", role: "Admin", action: "signed in", entity: "Session", when: "Yesterday 09:02", diff: [], tone: "g" as const },
];
