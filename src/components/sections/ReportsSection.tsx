import { ReportCardPreview } from "@/components/mockups/ReportsPreview";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { reports } from "@/data/reports";

const highlight = ["profit-loss", "product-sales", "customer-balances"];

export function ReportsSection() {
  const picks = highlight.map((id) => reports.find((r) => r.id === id)!);
  return (
    <section className="section" aria-labelledby="reports-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="Reports & analytics"
          title={<span id="reports-title">13 Reports. Zero Extra Data Entry.</span>}
          description="Every report is built from the invoices, payments, stock movements and wages you already record. Choose a date range, read the summary, export to CSV."
        />
        <RevealGroup as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
          {picks.map((r) => (
            <RevealItem as="li" key={r.id} className="card flex flex-col p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">{r.purpose}</p>
                </div>
              </div>
              <div className="mt-auto"><ReportCardPreview report={r} /></div>
            </RevealItem>
          ))}
        </RevealGroup>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2" aria-label="All reports">
          {reports.map((r) => (
            <li key={r.id} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-fg-2">{r.title}</li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button href="/reports" variant="secondary" arrow>Explore Reports</Button>
        </div>
      </div>
    </section>
  );
}
