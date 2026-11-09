import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ScreenGallery, type GalleryItem } from "@/components/interactive/ScreenGallery";
import { Screen } from "@/components/mockups/registry";
import { shotCategories, shots } from "@/data/screenshots";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Product Screens — Atelier One Interface Gallery",
  description:
    "Browse 26 illustrative Atelier One screens: dashboard, customer 360, measurements, inventory, sale invoices, order tracking, payments, employees, reports and administration.",
  path: "/screenshots",
  keywords: ["tailoring software screenshots", "tailor shop software interface", "tailoring POS software"],
});

export default function ScreenshotsPage() {
  const items: GalleryItem[] = shots.map((s) => ({
    id: s.id,
    title: s.title,
    caption: s.caption,
    category: s.category,
    node: <Screen id={s.screen} />,
  }));

  return (
    <>
      <PageHero
        crumb={{ name: "Screens", path: "/screenshots" }}
        eyebrow="Product gallery"
        title={<>See Atelier One <span className="text-gold">Screen by Screen</span></>}
        description="Twenty-six screens across every module. Filter by area, then open any screen to view it full size — use the arrow keys to move between them."
      >
        <p className="mx-auto inline-flex max-w-xl items-start gap-2 rounded-2xl border border-line bg-surface/70 px-4 py-3 text-left text-sm text-muted">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brass-text" />
          These are illustrative product previews built from the application&apos;s real structure, labels and rules, filled with sample data — not screenshots of a live customer account.
        </p>
      </PageHero>
      <section className="pb-24" aria-label="Screen gallery">
        <div className="container-page">
          <ScreenGallery items={items} categories={shotCategories} />
        </div>
      </section>
      <CTASection title="Want to See It With Your Own Workflow?" description="Get in touch and we'll walk through the screens that matter most to your shop." />
    </>
  );
}
