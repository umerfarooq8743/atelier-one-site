"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { DashboardPreview } from "@/components/mockups/DashboardPreview";
import type { Period } from "@/data/sample";
import { cn } from "@/lib/utils";

const periods: { id: Period; label: string }[] = [
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "quarter", label: "Quarter" },
  { id: "year", label: "Year" },
];

/** Working period and theme switches over the dashboard preview. */
export function DashboardShowcase() {
  const [period, setPeriod] = useState<Period>("month");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const seg = "inline-flex rounded-full border border-line bg-surface p-1";
  const btn = (on: boolean) =>
    cn("rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300", on ? "bg-invert-bg text-invert-fg" : "text-muted hover:text-fg");

  return (
    <div>
      <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className={seg} role="group" aria-label="Dashboard period">
          {periods.map((p) => (
            <button key={p.id} type="button" aria-pressed={period === p.id} onClick={() => setPeriod(p.id)} className={btn(period === p.id)}>
              {p.label}
            </button>
          ))}
        </div>
        <div className={seg} role="group" aria-label="Preview theme">
          <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")} className={cn(btn(theme === "light"), "inline-flex items-center gap-1.5")}>
            <Sun aria-hidden className="size-4" /> Light
          </button>
          <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")} className={cn(btn(theme === "dark"), "inline-flex items-center gap-1.5")}>
            <Moon aria-hidden className="size-4" /> Dark
          </button>
        </div>
      </div>
      <div aria-live="polite" className="sr-only">Showing {period} figures in the {theme} theme.</div>
      <DashboardPreview period={period} theme={theme} />
    </div>
  );
}
