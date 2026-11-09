import { ModuleTabs, type ModuleTab } from "@/components/interactive/ModuleTabs";
import { Screen } from "@/components/mockups/registry";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { moduleById } from "@/data/modules";
import type { ModuleId } from "@/data/types";

const showcase: ModuleId[] = ["dashboard", "customers", "measurements", "inventory", "sales", "workshop", "employees", "reports", "users"];

export function ModulesSection() {
  const tabs: ModuleTab[] = showcase.map((id, i) => {
    const mod = moduleById[id];
    return {
      id: mod.id,
      label: mod.name,
      icon: mod.icon,
      summary: mod.summary,
      capabilities: mod.capabilities,
      cta: mod.cta,
      screen: mod.screen,
      panel: i === 0 ? <Screen id={mod.screen} /> : undefined,
    };
  });

  return (
    <section className="section relative bg-bg-raised/50" aria-labelledby="modules-title">
      <div aria-hidden className="stitch absolute inset-x-0 top-0" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Module showcase"
          title={<span id="modules-title">Real Software for Real Shop Floors</span>}
          description="Explore the screens your team will use every day. Each one is an illustrative preview of the actual Atelier One module, filled with sample data."
        />
        <Reveal className="mt-14">
          <ModuleTabs tabs={tabs} />
        </Reveal>
        <div className="mt-12 flex justify-center">
          <Button href="/modules" variant="secondary" arrow>See all 15 modules</Button>
        </div>
      </div>
    </section>
  );
}
