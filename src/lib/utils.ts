import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** Sample-data currency formatting used by product previews. */
export function formatPKR(value: number, withSymbol = true): string {
  const n = pkr.format(Math.round(value));
  return withSymbol ? `PKR ${n}` : n;
}

/** Compact figure for chart axes and KPI chips (e.g. 1.2M, 86K). */
export function compact(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(value);
}
