import { CalendarRange, Download, LayoutList, Sigma } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ReportCardPreview } from "@/components/mockups/ReportsPreview";
import { Screen } from "@/components/mockups/registry";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reportGroups, reports } from "@/data/reports";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Reports — 13 Tailoring & Fabric Business Reports",
  description:
    "Atelier One includes 13 reports: sales, purchases, customer balances, expenses, inventory, employee balances, profit & loss, product-wise sales, daily sales, payment collections, order status, staff work and vendor purchases — with date ranges and CSV export.",
  path: "/reports",
  keywords: ["tailoring business reports", "fabric shop inventory report", "tailor shop profit and loss"],
});

const traits = [
  { Icon: CalendarRange, t: "Date-range filters", d: "Pick any period — a day, a month, a festive season." },
  { Icon: Sigma, t: "Summary metrics", d: "Totals and key figures in tiles at the top of every report." },
  { Icon: LayoutList, t: "Detailed tables", d: "Every row behind the totals, sortable and searchable." },
  { Icon: Download, t: "CSV export", d: "Download for your accountant or your own spreadsheets." },
];

export default function ReportsPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Reports", path: "/reports" }}
        eyebrow="Reports & analytics"
        title={<>Thirteen Reports, <span className="text-gold">Built From Records You Already Keep</span></>}
        description="No separate data entry. Atelier One reads the invoices, receipts, stock movements, wages and expenses your team records every day."
      />

      <section className="pb-16" aria-label="Report capabilities">
        <div className="container-page">
          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {traits.map(({ Icon, t, d }) => (
              <RevealItem as="li" key={t} className="card p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-brass-soft text-brass-text"><Icon aria-hidden className="size-5" /></span>
                <h2 className="mt-4 font-display text-lg font-semibold">{t}</h2>
                <p className="mt-1.5 text-[0.9375rem] text-muted">{d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10"><Screen id="reports-overview" /></Reveal>
        </div>
      </section>

      {reportGroups.map((g, gi) => (
        <section key={g} className={`py-20 ${gi % 2 === 0 ? "bg-bg-raised/50" : ""}`} aria-labelledby={`rg-${gi}`}>
          <div className="container-page">
            <SectionHeading align="left" eyebrow={`Group ${gi + 1}`} title={<span id={`rg-${gi}`}>{g}</span>} size="md" />
            <RevealGroup as="ul" className="mt-10 grid gap-5 lg:grid-cols-2">
              {reports.filter((r) => r.group === g).map((r) => (
                <RevealItem as="li" key={r.id} id={r.id} className="card flex scroll-mt-28 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                    <span className="rounded-full bg-brass-soft px-2.5 py-0.5 text-xs font-semibold text-brass-text">{r.tag}</span>
                  </div>
                  <dl className="mt-4 grid gap-3 text-[0.9375rem] sm:grid-cols-2">
                    <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted">Purpose</dt><dd className="mt-1 text-fg-2">{r.purpose}</dd></div>
                    <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted">Business value</dt><dd className="mt-1 text-fg-2">{r.value}</dd></div>
                  </dl>
                  <div className="mt-6"><ReportCardPreview report={r} /></div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      <section className="section" aria-labelledby="deep-title">
        <div className="container-page">
          <SectionHeading eyebrow="Full report views" title={<span id="deep-title">A Closer Look</span>} description="Profit & Loss, Inventory and Staff Work, as they appear in the application." />
          <div className="mt-12 space-y-10">
            <Reveal><Screen id="profit-loss" /></Reveal>
            <div className="grid gap-10 xl:grid-cols-2">
              <Reveal><Screen id="inventory-report" /></Reveal>
              <Reveal><Screen id="staff-work" /></Reveal>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted">All figures are illustrative sample data, not customer results. Exports are CSV; Excel export is not available.</p>
        </div>
      </section>

      <CTASection title="Get Clear Numbers for Your Shop" description="Tell us which numbers you track today and we'll show you the reports that answer them." primary={{ label: "Talk to Our Team", href: "/contact" }} secondary={{ label: "Explore Features", href: "/features" }} />
    </>
  );
}
