"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Building2, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const companies = [
  { id: "a", name: "Company A", kind: "Tailoring shop", users: 4, prefix: "SI-0148", currency: "PKR", roles: "Admin · Manager · Staff" },
  { id: "b", name: "Company B", kind: "Fabric retailer", users: 2, prefix: "SI-0031", currency: "PKR", roles: "Admin · Staff · Counter (custom)" },
  { id: "c", name: "Company C", kind: "Boutique workshop", users: 6, prefix: "SI-0007", currency: "AED", roles: "Admin · Manager · Workshop (custom)" },
];

/** Signed-in-as view: everything outside the current company is out of reach. */
export function WorkspaceSwitcher() {
  const [active, setActive] = useState("a");
  return (
    <div className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">View as a user signed in to:</p>
        <div className="inline-flex rounded-full border border-line bg-surface-2 p-1" role="group" aria-label="Choose a company">
          {companies.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={cn("rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors", active === c.id ? "bg-invert-bg text-invert-fg" : "text-muted hover:text-fg")}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {companies.map((c) => {
          const on = c.id === active;
          return (
            <m.div
              key={c.id}
              animate={{ opacity: on ? 1 : 0.45, scale: on ? 1 : 0.98 }}
              transition={{ duration: 0.35 }}
              className={cn("relative overflow-hidden rounded-2xl border p-5", on ? "border-brass/50 bg-surface-2 shadow-soft" : "border-dashed border-line-strong bg-surface")}
            >
              <div className="flex items-center gap-3">
                <span className={cn("grid size-10 place-items-center rounded-xl", on ? "bg-brass-soft text-brass-text" : "bg-surface-3 text-muted")}>
                  <Building2 aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="font-display font-semibold">{c.name}</p>
                  <p className="text-xs text-muted">{c.kind}</p>
                </div>
              </div>
              <dl className={cn("mt-5 space-y-2 text-sm transition-[filter] duration-500", !on && "blur-[5px] opacity-60 select-none")} aria-hidden={!on}>
                <div className="flex justify-between gap-2"><dt className="text-muted">Users</dt><dd className="font-semibold">{c.users}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">Next invoice</dt><dd className="font-semibold">{c.prefix}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted">Currency</dt><dd className="font-semibold">{c.currency}</dd></div>
                <div><dt className="text-muted">Roles</dt><dd className="mt-0.5 font-semibold">{c.roles}</dd></div>
              </dl>
              {!on && (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/90 px-3 py-1.5 text-xs font-semibold text-fg-2">
                    <Lock aria-hidden className="size-3.5" /> No access
                  </span>
                </div>
              )}
            </m.div>
          );
        })}
      </div>
      <p className="mt-5 flex items-start gap-2 text-sm text-muted" aria-live="polite">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-ok" />
        A user of {companies.find((c) => c.id === active)!.name} sees only {companies.find((c) => c.id === active)!.name}&apos;s records. Every business query is scoped to the signed-in user&apos;s company on the server.
      </p>
    </div>
  );
}
