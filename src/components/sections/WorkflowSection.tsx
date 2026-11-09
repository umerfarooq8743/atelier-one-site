import { OrderLifecycle } from "@/components/interactive/OrderLifecycle";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const relations = [
  { label: "Customer", detail: "Balance rises by the invoice total", pos: "left-[4%] top-[6%]" },
  { label: "Product", detail: "Fabric meters deducted", pos: "right-[4%] top-[6%]" },
  { label: "Employee", detail: "Item appears in assigned work", pos: "left-[4%] bottom-[6%]" },
  { label: "Payment", detail: "Advance saved as a receipt", pos: "right-[4%] bottom-[6%]" },
];

/** How one sale invoice touches the rest of the business. */
export function InvoiceRelations() {
  return (
    <figure className="card relative mx-auto h-[19rem] max-w-3xl overflow-hidden sm:h-[16rem]">
      <svg aria-hidden className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[[18, 20], [82, 20], [18, 80], [82, 80]].map(([x, y]) => (
          <line key={`${x}${y}`} x1="50" y1="50" x2={x} y2={y} stroke="var(--brass)" strokeOpacity="0.5" strokeDasharray="1.4 1.6" vectorEffect="non-scaling-stroke" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-brass/50 bg-[linear-gradient(135deg,#e6c98a,#a8843f)] px-5 py-3 text-center text-on-brass shadow-lift">
        <div className="font-display font-semibold">Sale invoice</div>
        <div className="text-xs opacity-80">SI-0148</div>
      </div>
      {relations.map((r) => (
        <div key={r.label} className={`absolute ${r.pos} w-[42%] max-w-[13rem] rounded-xl border border-line bg-surface px-3 py-2.5 shadow-soft sm:w-auto`}>
          <div className="font-display text-sm font-semibold">{r.label}</div>
          <div className="text-xs text-muted">{r.detail}</div>
        </div>
      ))}
      <figcaption className="sr-only">
        Saving one sale invoice raises the customer balance, deducts product stock, adds the item to the employee&apos;s assigned work and records the advance as a payment receipt.
      </figcaption>
    </figure>
  );
}

export function WorkflowSection() {
  return (
    <section className="section" aria-labelledby="workflow-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="How orders work"
          title={<span id="workflow-title">From Measuring Tape to Final Payment</span>}
          description="The tailoring order lifecycle exactly as Atelier One runs it — item by item, with the money tracked alongside."
        />
        <Reveal className="mt-14">
          <OrderLifecycle />
        </Reveal>
        <Reveal className="mt-14">
          <h3 className="mb-5 text-center font-display text-lg font-semibold">One invoice, four records updated</h3>
          <InvoiceRelations />
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Button href="/workflows" variant="secondary" arrow>See How Orders Work</Button>
        </div>
      </div>
    </section>
  );
}
