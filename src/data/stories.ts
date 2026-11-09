/**
 * Customer stories. No verified outcome data or quotations exist yet, so the
 * only entry is an illustrative workflow built from documented capabilities.
 * To publish a verified case study later, add an entry with `verified: true`
 * and fill `quote` / `outcomes` only with confirmed facts.
 */
export interface Story {
  id: string;
  verified: boolean;
  label: string;
  business: string;
  context: string;
  scenes: { time: string; title: string; detail: string }[];
  quote?: { text: string; author: string; role: string };
  outcomes?: { value: string; label: string }[];
}

export const stories: Story[] = [
  {
    id: "illustrative-day",
    verified: false,
    label: "Illustrative Business Workflow",
    business: "A day in a tailoring & fabric shop",
    context:
      "Atelier One's first customer is ROBE Cloth & Tailoring, whose data from the original single-shop version now lives in its own company workspace. The day below is an illustrative scenario of how a shop like it uses the product — not a record of its results.",
    scenes: [
      { time: "10:05", title: "A returning customer walks in", detail: "The counter searches by phone with Ctrl+K and opens the 360° page: last Eid's Kurta measurements and a small balance are right there." },
      { time: "10:12", title: "An order for two garments", detail: "A sale invoice gets fabric by the meter, two stitching lines with measurement snapshots, Usman and Rashid assigned, and an advance in cash." },
      { time: "13:30", title: "Fabric runs low", detail: "The dashboard flags Khaddar under its minimum. Reorder opens a purchase pre-filled for the supplier." },
      { time: "17:45", title: "The workshop finishes the kurta", detail: "Usman's item is marked Ready on his assigned-work tab; the waistcoat stays In Process." },
      { time: "Month end", title: "Wages and the numbers", detail: "Wages are paid from each employee's ledger, salary expenses appear on their own, and the Profit & Loss report shows the month." },
    ],
  },
];

/** Replaces testimonials until genuine, attributable quotes exist. */
export const workflowProof = [
  { title: "Measurement snapshots", detail: "Every order line keeps the measurement it was cut from." },
  { title: "Atomic stock", detail: "A sale is refused rather than allowed to oversell fabric." },
  { title: "Invoice-linked money", detail: "An invoice's paid amount always equals its linked receipts." },
  { title: "Wages to expenses", detail: "Paying a wage creates the salary expense — it reaches the P&L." },
];
