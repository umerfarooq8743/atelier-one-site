import { CountUp } from "@/components/interactive/CountUp";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { audiences, productFacts } from "@/data/comparison";

export function TrustSection() {
  const loop = [...audiences, ...audiences];
  return (
    <section aria-labelledby="built-for" className="border-y border-line bg-bg-raised/60 py-12">
      <div className="container-page">
        <h2 id="built-for" className="text-center text-sm font-medium text-muted">
          Designed around the daily work of
        </h2>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <ul className="marquee flex w-max gap-3" aria-label="Business types Atelier One supports">
            {loop.map((a, i) => (
              <li
                key={`${a}-${i}`}
                aria-hidden={i >= audiences.length || undefined}
                className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 font-display text-[0.9375rem] font-medium text-fg-2"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>

        <RevealGroup as="ul" className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {productFacts.map((f, i) => (
            <RevealItem as="li" key={f.label} className={`bg-surface px-5 py-6 text-center ${i === productFacts.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="font-display text-4xl font-semibold tracking-tight text-fg">
                <CountUp value={f.value} suffix={f.suffix} />
              </div>
              <div className="mt-1.5 text-sm text-muted">{f.label}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
