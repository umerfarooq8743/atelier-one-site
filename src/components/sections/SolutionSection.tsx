import { SolutionFlow } from "@/components/interactive/SolutionFlow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const links = [
  { from: "Sale invoice", to: "Stock", text: "Fabric meters are deducted atomically when the invoice is saved." },
  { from: "Advance", to: "Payment receipt", text: "Money taken at the counter becomes a linked, numbered receipt." },
  { from: "Wage", to: "Salary expense", text: "Paying an employee records the expense — and it reaches the P&L." },
];

export function SolutionSection() {
  return (
    <section className="section relative" aria-labelledby="solution-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="The solution"
          title={<span id="solution-title">Everything Connected. <span className="text-gold">Everything Under Control.</span></span>}
          description="Records in Atelier One are linked to each other. Save a sale and the stock, the customer's balance and the receipt all move together — so there is nothing to reconcile later."
        />
        <Reveal className="mt-14">
          <SolutionFlow />
        </Reveal>
        <Reveal className="mt-5 grid gap-5 md:grid-cols-3">
          {links.map((l) => (
            <div key={l.from} className="card p-6">
              <p className="flex flex-wrap items-center gap-2 font-display text-[0.9375rem] font-semibold">
                <span className="rounded-lg bg-surface-3 px-2.5 py-1">{l.from}</span>
                <span aria-hidden className="stitch w-6" />
                <span className="sr-only">updates</span>
                <span className="rounded-lg bg-brass-soft px-2.5 py-1 text-brass-text">{l.to}</span>
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{l.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
