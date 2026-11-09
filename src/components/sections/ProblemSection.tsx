import { BookOpen, Calculator, FileQuestion, NotebookPen, Phone, ReceiptText, StickyNote } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/data/comparison";

const scattered = [
  { Icon: BookOpen, label: "Customer register", rot: "-6deg", x: "6%", y: "8%" },
  { Icon: StickyNote, label: "Measurement slips", rot: "5deg", x: "54%", y: "4%" },
  { Icon: NotebookPen, label: "Stock notebook", rot: "-3deg", x: "30%", y: "34%" },
  { Icon: Calculator, label: "Calculator totals", rot: "7deg", x: "64%", y: "40%" },
  { Icon: Phone, label: "Workshop phone calls", rot: "-8deg", x: "4%", y: "62%" },
  { Icon: ReceiptText, label: "Hand-written bills", rot: "4deg", x: "44%", y: "70%" },
];

const connected = ["Customers", "Measurements", "Orders", "Stock", "Payments", "Staff", "Expenses", "Reports"];

export function ProblemSection() {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="The problem"
          title={<span id="problem-title">Running a Tailoring Business Shouldn&apos;t Mean Managing a Dozen Different Systems.</span>}
          description="Registers, slips, notebooks and phone calls each hold one piece of the business. Nothing adds up on its own — and someone has to keep it all in their head."
        />

        <Reveal className="mt-16 grid gap-5 lg:grid-cols-2">
          {/* Fragmented */}
          <figure className="card relative min-h-[22rem] overflow-hidden p-6">
            <figcaption className="flex items-center gap-2 text-sm font-semibold text-fg-2">
              <FileQuestion aria-hidden className="size-4 text-bad" /> Disconnected today
            </figcaption>
            <div className="relative mt-4 h-[17rem]" aria-hidden>
              {scattered.map(({ Icon, label, rot, x, y }) => (
                <div
                  key={label}
                  className="absolute flex items-center gap-2 rounded-xl border border-dashed border-line-strong bg-surface-2 px-3 py-2.5 text-sm text-fg-2 shadow-soft"
                  style={{ left: x, top: y, transform: `rotate(${rot})` }}
                >
                  <Icon className="size-4 text-muted" /> {label}
                </div>
              ))}
            </div>
            <p className="sr-only">Customer registers, measurement slips, stock notebooks, calculators, phone calls and hand-written bills, each kept separately.</p>
          </figure>

          {/* Connected */}
          <figure className="card relative min-h-[22rem] overflow-hidden p-6">
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 50% 55%, rgba(184,154,90,0.16), transparent 70%)" }} />
            <figcaption className="relative flex items-center gap-2 text-sm font-semibold text-fg-2">
              <span aria-hidden className="size-2 rounded-full bg-ok" /> Connected in Atelier One
            </figcaption>
            <div className="relative mx-auto mt-4 grid h-[17rem] max-w-md place-items-center" aria-hidden>
              <div className="absolute inset-6 rounded-full border border-dashed border-brass/35" />
              <div className="absolute inset-16 rounded-full border border-line" />
              <div className="relative z-10 grid place-items-center rounded-3xl bg-surface p-3 shadow-lift">
                <LogoMark size={56} id="problem" />
              </div>
              {connected.map((c, i) => {
                const angle = (i / connected.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <span
                    key={c}
                    className="absolute rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-fg shadow-soft"
                    style={{ left: `calc(50% + ${Math.cos(angle) * 42}% )`, top: `calc(50% + ${Math.sin(angle) * 40}%)`, transform: "translate(-50%,-50%)" }}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
            <p className="sr-only">Customers, measurements, orders, stock, payments, staff, expenses and reports connected in one workspace.</p>
          </figure>
        </Reveal>

        <RevealGroup as="ul" className="mt-5 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <RevealItem as="li" key={p.title} className={`bg-surface p-6 ${i === problems.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <span className="font-display text-sm font-semibold text-brass-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.detail}</p>
            </RevealItem>
          ))}
          <li className="hidden bg-surface p-6 lg:flex lg:flex-col lg:justify-center" aria-hidden />
        </RevealGroup>
      </div>
    </section>
  );
}
