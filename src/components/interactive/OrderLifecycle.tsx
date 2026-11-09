"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { orderLifecycle } from "@/data/workflows";
import { cn, formatPKR } from "@/lib/utils";

type Stage = "in_process" | "ready" | "delivered";
const STAGES: { id: Stage; label: string }[] = [
  { id: "in_process", label: "In process" },
  { id: "ready", label: "Ready" },
  { id: "delivered", label: "Delivered" },
];

const TOTAL = 18_500;
const ADVANCE = 8_500;

/**
 * Interactive walk-through of the documented sale-order lifecycle. The demo
 * order mirrors product rules: stages move per item; payments reduce the
 * balance and can't exceed it.
 */
export function OrderLifecycle() {
  const [step, setStep] = useState(3);
  const [items, setItems] = useState<Stage[]>(["in_process", "in_process"]);
  const [paid, setPaid] = useState(ADVANCE);

  const advance = (i: number) => {
    const next = [...items];
    const idx = STAGES.findIndex((s) => s.id === next[i]);
    if (idx < STAGES.length - 1) next[i] = STAGES[idx + 1].id;
    const all = next.every((s) => s === "delivered");
    const anyReady = next.some((s) => s !== "in_process");
    setItems(next);
    setStep(all ? 5 : anyReady ? 4 : 3);
  };
  const receive = () => {
    setPaid(TOTAL);
    setStep(6);
  };
  const reset = () => {
    setItems(["in_process", "in_process"]);
    setPaid(ADVANCE);
    setStep(3);
  };

  const balance = TOTAL - paid;
  const lines = ["Kurta Pajama · Usman", "Waistcoat · Rashid"];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      <ol className="relative space-y-1" aria-label="Sale order lifecycle">
        <span aria-hidden className="stitch-v absolute left-[1.15rem] top-4 bottom-4" />
        {orderLifecycle.map((s, i) => {
          const done = i < step;
          const on = i === step;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={on ? "step" : undefined}
                className={cn("relative flex w-full items-start gap-4 rounded-2xl p-2.5 text-left transition-colors", on ? "bg-surface shadow-soft" : "hover:bg-surface/50")}
              >
                <span
                  className={cn(
                    "relative z-10 grid size-[1.9rem] shrink-0 place-items-center rounded-full border text-xs font-bold transition-all duration-500",
                    on ? "border-brass bg-[linear-gradient(135deg,#e6c98a,#a8843f)] text-on-brass" : done ? "border-ok/40 bg-ok/15 text-ok" : "border-line bg-bg text-muted",
                  )}
                >
                  {done ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : i + 1}
                  {done && <span className="sr-only">Completed:</span>}
                </span>
                <span className="pt-1">
                  <span className={cn("block font-display font-semibold", on ? "text-fg" : "text-fg-2")}>{s.title}</span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <m.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="block overflow-hidden text-[0.9375rem] leading-relaxed text-muted"
                      >
                        <span className="block pt-1">{s.detail}</span>
                      </m.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Working demo */}
      <div className="card self-start overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="font-display font-semibold">SI-0148 · Ahmed Khan</p>
            <p className="text-sm text-muted">Try it: move items through the workshop</p>
          </div>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-fg-2 hover:text-fg">
            <RotateCcw aria-hidden className="size-3.5" /> Reset
          </button>
        </div>
        <ul className="divide-y divide-line">
          {lines.map((l, i) => {
            const idx = STAGES.findIndex((s) => s.id === items[i]);
            const isDone = items[i] === "delivered";
            return (
              <li key={l} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{l.split(" · ")[0]}</p>
                  <p className="text-sm text-muted">Assigned to {l.split(" · ")[1]}</p>
                  <div className="mt-2.5 flex gap-1.5" aria-hidden>
                    {STAGES.map((s, si) => (
                      <span key={s.id} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", si <= idx ? (isDone ? "bg-ok" : "bg-brass") : "bg-surface-3")} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      items[i] === "in_process" && "bg-warn/15 text-warn",
                      items[i] === "ready" && "bg-[#7d9cf0]/15 text-[#5d7fe0] dark:text-[#9db4f5]",
                      isDone && "bg-ok/15 text-ok",
                    )}
                    aria-live="polite"
                  >
                    {STAGES[idx].label}
                  </span>
                  <button
                    type="button"
                    onClick={() => advance(i)}
                    disabled={isDone}
                    className="rounded-full bg-invert-bg px-3.5 py-1.5 text-xs font-semibold text-invert-fg transition-opacity disabled:opacity-35"
                  >
                    {isDone ? "Done" : `Mark ${STAGES[idx + 1].label.toLowerCase()}`}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="space-y-2 border-t border-line bg-surface-2 px-5 py-4 text-[0.9375rem]">
          <div className="flex justify-between"><span className="text-muted">Total</span><span className="font-semibold tabular-nums">{formatPKR(TOTAL)}</span></div>
          <div className="flex justify-between"><span className="text-muted">Paid (advance + receipts)</span><span className="font-semibold tabular-nums">{formatPKR(paid)}</span></div>
          <div className="flex items-center justify-between border-t border-dashed border-line-strong pt-2">
            <span className="font-semibold">Balance</span>
            <span className={cn("font-display text-xl font-semibold tabular-nums", balance ? "text-brass-text" : "text-ok")} aria-live="polite">{formatPKR(balance)}</span>
          </div>
          <button
            type="button"
            onClick={receive}
            disabled={balance === 0}
            className="mt-2 w-full rounded-full border border-line-strong py-2.5 text-sm font-semibold transition-colors hover:border-brass/60 disabled:opacity-40"
          >
            {balance ? `Receive final payment · ${formatPKR(balance)}` : "Invoice fully paid"}
          </button>
        </div>
      </div>
    </div>
  );
}
