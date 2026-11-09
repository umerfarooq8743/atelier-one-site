"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { icons } from "@/lib/icons";
import { solutionFlow } from "@/data/workflows";
import { moduleById } from "@/data/modules";
import { cn } from "@/lib/utils";
import type { ModuleId } from "@/data/types";

const iconFor: Record<string, keyof typeof icons> = {
  customers: "customers", sales: "sales", inventory: "products", employees: "employees", payments: "payments", reports: "reports",
};

export function SolutionFlow() {
  const [active, setActive] = useState(0);
  const node = solutionFlow[active];
  const mod = moduleById[node.id as ModuleId];

  return (
    <div className="card relative overflow-hidden p-5 sm:p-8">
      <div aria-hidden className="absolute inset-0 opacity-60" style={{ background: "var(--glow)" }} />
      <div className="relative">
        <ol className="relative grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-2" aria-label="How records connect">
          <span aria-hidden className="stitch absolute left-[8%] right-[8%] top-8 hidden sm:block" />
          {solutionFlow.map((n, i) => {
            const Icon = icons[iconFor[n.id]];
            const on = i === active;
            return (
              <li key={n.id} className="relative flex justify-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={on}
                  className="group flex w-full flex-col items-center gap-3 rounded-2xl p-2 text-center"
                >
                  <span
                    className={cn(
                      "relative grid size-16 place-items-center rounded-2xl border transition-all duration-500 ease-out-soft",
                      on
                        ? "border-brass/60 bg-[linear-gradient(135deg,#e6c98a,#a8843f)] text-on-brass shadow-[0_16px_40px_-14px_rgba(184,154,90,0.9)] -translate-y-1"
                        : "border-line bg-surface text-fg-2 group-hover:border-line-strong",
                    )}
                  >
                    <Icon aria-hidden className="size-6" />
                    <span className={cn("absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full text-[0.625rem] font-bold", on ? "bg-invert-bg text-invert-fg" : "bg-surface-3 text-muted")}>
                      {i + 1}
                    </span>
                  </span>
                  <span className={cn("font-display text-sm font-semibold transition-colors", on ? "text-fg" : "text-muted")}>{n.label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 min-h-[7.5rem] rounded-2xl border border-line bg-surface-2/70 p-5 sm:p-6" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.div
              key={node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="eyebrow">Step {active + 1} · {node.label}</p>
                <p className="mt-2 max-w-2xl text-[1.0625rem] leading-relaxed text-fg">{node.detail}</p>
              </div>
              <Link href={`/modules#${mod.id}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brass-text hover:underline">
                {mod.name} module <ArrowRight aria-hidden className="size-4" />
              </Link>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
