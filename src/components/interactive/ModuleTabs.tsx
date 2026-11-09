"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ScreenId } from "@/data/types";
import { LazyScreen } from "./LazyScreen";

export interface ModuleTab {
  id: string;
  label: string;
  icon: IconName;
  summary: string;
  capabilities: string[];
  cta: string;
  screen: ScreenId;
  /** Server-rendered panel for the first tab; others load on demand. */
  panel?: ReactNode;
}

/** Accessible tabs (roving focus, arrow keys) whose panels are server-rendered product screens. */
export function ModuleTabs({ tabs }: { tabs: ModuleTab[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
      <div
        role="tablist"
        aria-label="Atelier One modules"
        aria-orientation="vertical"
        onPointerEnter={() => void import("@/components/mockups/registry")}
        onFocus={() => void import("@/components/mockups/registry")}
        className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {tabs.map((t, i) => {
          const Icon = icons[t.icon];
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative flex shrink-0 snap-start items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300",
                on ? "border-brass/40 bg-surface shadow-soft" : "border-transparent text-muted hover:bg-surface/60 hover:text-fg",
              )}
            >
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl transition-colors", on ? "bg-brass-soft text-brass-text" : "bg-surface-3 text-muted")}>
                <Icon aria-hidden className="size-[18px]" />
              </span>
              <span className="whitespace-nowrap font-display text-[0.9375rem] font-semibold">{t.label}</span>
              {on && <span aria-hidden className="absolute -left-px top-3 bottom-3 hidden w-0.5 rounded-full bg-brass lg:block" />}
            </button>
          );
        })}
      </div>

      <div className="min-w-0">
        {tabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`${base}-panel-${i}`}
            aria-labelledby={`${base}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className="rounded-panel focus-visible:outline-offset-8"
          >
            {i === active && (
              <m.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                  <div className="max-w-xl">
                    <h3 className="display-md">{t.label}</h3>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg-2">{t.summary}</p>
                  </div>
                  <Link href={`/modules#${t.id}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brass-text hover:underline">
                    {t.cta} <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
                {t.panel ?? <LazyScreen id={t.screen} />}
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {t.capabilities.slice(0, 6).map((c) => (
                    <li key={c} className="flex gap-2.5 text-[0.9375rem] text-fg-2">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" /> {c}
                    </li>
                  ))}
                </ul>
              </m.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
