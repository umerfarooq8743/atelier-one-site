import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/ui/Logo";
import { comparison } from "@/data/comparison";

export function ComparisonSection() {
  return (
    <section className="section" aria-labelledby="cmp-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="Workflow comparison"
          title={<span id="cmp-title">Generic Business Tools Were Not Designed Around Tailoring Workflows.</span>}
          description="How common manual or disconnected processes compare with the way Atelier One handles the same work."
        />
        <Reveal className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-panel border border-line bg-surface shadow-soft">
          <table className="w-full border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">Business activities handled by disconnected workflows versus Atelier One</caption>
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th scope="col" className="px-4 py-4 font-display text-sm font-semibold sm:px-6">Business activity</th>
                <th scope="col" className="px-4 py-4 font-display text-sm font-semibold text-muted sm:px-6">Disconnected workflow</th>
                <th scope="col" className="px-4 py-4 sm:px-6">
                  <span className="inline-flex items-center gap-2 font-display text-sm font-semibold">
                    <LogoMark size={20} id="cmp" /> Atelier One
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((r) => (
                <tr key={r.activity} className="border-b border-line last:border-0 transition-colors hover:bg-surface-2">
                  <th scope="row" className="px-4 py-4 font-semibold sm:px-6">{r.activity}</th>
                  <td className="px-4 py-4 text-muted sm:px-6">
                    <span className="inline-flex items-start gap-2"><Minus aria-hidden className="mt-1 size-3.5 shrink-0" />{r.before}</span>
                  </td>
                  <td className="bg-brass-soft/40 px-4 py-4 sm:px-6">
                    <span className="inline-flex items-start gap-2 font-medium"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brass-text" />{r.after}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-muted">
          This compares ways of working, not specific products. It is not an independent benchmark, and other tools may offer some of these capabilities.
        </p>
      </div>
    </section>
  );
}
