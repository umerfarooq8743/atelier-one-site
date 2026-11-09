import Link from "next/link";
import { ArrowRight, Check, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Screen } from "@/components/mockups/registry";
import { MeasurementExplorer } from "@/components/interactive/MeasurementExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { moduleById, modules } from "@/data/modules";
import type { ScreenId } from "@/data/types";
import { icons } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Modules — Customers, Measurements, Inventory, Invoices & More",
  description:
    "Explore all 15 Atelier One modules: dashboard, customers, measurements, products and inventory, sale invoices, workshop order tracking, purchases, payments, employees, expenses, vendors, reports, users and permissions, activity log and settings.",
  path: "/modules",
  keywords: ["tailoring business management system", "stitching order management", "tailoring invoice management", "fabric inventory management software"],
});

/** Extra screens shown under some modules. */
const secondary: Partial<Record<string, ScreenId>> = {
  customers: "customers-list",
  inventory: "stock-movements",
  sales: "invoice-detail",
  employees: "wages",
  users: "users",
};

export default function ModulesPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Modules", path: "/modules" }}
        eyebrow="15 modules"
        title={<>One Workspace. <span className="text-gold">Fifteen Connected Modules.</span></>}
        description="Each module solves a specific problem in a tailoring or fabric business — and shares its records with the others. Jump to any module below."
      >
        <nav aria-label="Modules" className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
          {modules.map((m) => (
            <a key={m.id} href={`#${m.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-fg-2 transition-colors hover:border-brass/50 hover:text-fg">
              <span className="font-display text-xs font-semibold text-brass-text">{m.letter}</span>
              {m.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {modules.map((m, i) => {
        const Icon = icons[m.icon];
        const extra = secondary[m.id];
        return (
          <section key={m.id} id={m.id} className={`scroll-mt-20 py-20 sm:py-24 ${i % 2 ? "bg-bg-raised/50" : ""}`} aria-labelledby={`${m.id}-title`}>
            <div className="container-page">
              <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brass-soft text-brass-text"><Icon aria-hidden className="size-6" /></span>
                    <span className="eyebrow">Module {m.letter} · {m.category}</span>
                  </div>
                  <h2 id={`${m.id}-title`} className="display-lg mt-5">{m.name}</h2>
                  <p className="lead mt-4">{m.intro}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:self-end">
                  <div className="card p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-fg"><TriangleAlert aria-hidden className="size-4 text-warn" /> The problem</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{m.problem}</p>
                  </div>
                  <div className="card p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-fg"><Lightbulb aria-hidden className="size-4 text-brass-text" /> The solution</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{m.solution}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal className="mt-12">
                {m.id === "measurements" ? <MeasurementExplorer /> : <Screen id={m.screen} />}
              </Reveal>

              <Reveal className="mt-12 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <h3 className="font-display text-lg font-semibold">Key capabilities</h3>
                  <ul className="mt-4 space-y-2.5">
                    {m.capabilities.map((c) => (
                      <li key={c} className="flex gap-2.5 text-[0.9375rem] text-fg-2"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-1">
                  <h3 className="font-display text-lg font-semibold">How it works</h3>
                  <ol className="mt-4 space-y-3">
                    {m.workflow.map((w, wi) => (
                      <li key={w} className="flex gap-3 text-[0.9375rem] text-fg-2">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line font-display text-xs font-semibold text-brass-text">{wi + 1}</span>
                        {w}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="lg:col-span-1">
                  <h3 className="font-display text-lg font-semibold">Related modules</h3>
                  <ul className="mt-4 space-y-2">
                    {m.related.map((r) => {
                      const rel = moduleById[r];
                      const RIcon = icons[rel.icon];
                      return (
                        <li key={r}>
                          <a href={`#${r}`} className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-brass/40">
                            <RIcon aria-hidden className="size-4 text-brass-text" />
                            <span className="flex-1 text-[0.9375rem] font-medium">{rel.name}</span>
                            <ArrowRight aria-hidden className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  {m.note && (
                    <p className="mt-4 flex gap-2 rounded-xl border border-line bg-surface-2 p-3 text-sm text-muted"><Info aria-hidden className="mt-0.5 size-4 shrink-0" />{m.note}</p>
                  )}
                  <div className="mt-6"><Button href="/contact" size="sm" arrow>{m.cta === "Explore Reports" ? "Discuss reporting needs" : "Talk to Our Team"}</Button></div>
                </div>
              </Reveal>

              {extra && (
                <Reveal className="mt-12">
                  <Screen id={extra} />
                </Reveal>
              )}
              {m.id === "reports" && (
                <p className="mt-6 text-center text-[0.9375rem] text-muted">
                  See all 13 reports with sample previews on the <Link href="/reports" className="font-semibold text-brass-text hover:underline">Reports page</Link>.
                </p>
              )}
            </div>
          </section>
        );
      })}

      <CTASection title="See the Modules Working Together" description="Every module shares its records with the rest. Tell us about your shop and we'll walk through the workflows that matter to you." secondary={{ label: "See How It Works", href: "/workflows" }} />
    </>
  );
}
