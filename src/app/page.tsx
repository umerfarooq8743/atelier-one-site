import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ModulesSection } from "@/components/sections/ModulesSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { ReportsSection } from "@/components/sections/ReportsSection";
import { MultiCompanySection } from "@/components/sections/MultiCompanySection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { StorySection } from "@/components/sections/StorySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/config/site";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Atelier One — Tailoring & Fabric Business Management Software" },
  description: siteConfig.description,
  keywords: [
    "tailoring management software", "tailoring shop software", "tailoring business management system",
    "fabric inventory management software", "tailor shop billing software", "stitching order management",
    "garment measurement management", "fabric shop management software",
  ],
  alternates: { canonical: "/" },
  openGraph: { title: "Atelier One — Tailoring Business Suite", description: siteConfig.shortDescription, url: "/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Atelier One — Tailoring Business Suite", description: siteConfig.shortDescription, images: [ogImage.url] },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ModulesSection />
      <WorkflowSection />
      <DashboardSection />
      <ReportsSection />
      <MultiCompanySection />
      <ArchitectureSection />
      <ComparisonSection />
      <StorySection />
      <FaqSection limit={8} />
      <CTASection />
    </>
  );
}
