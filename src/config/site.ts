/**
 * Central site configuration.
 *
 * Contact details are NOT hard-coded: they come from environment variables
 * so no invented numbers ever reach production. See `.env.example`.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  // Vercel sets this automatically for production deployments (server only).
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

export const siteConfig = {
  name: "Atelier One",
  tagline: "Tailoring Business Suite",
  description:
    "Atelier One is tailoring and fabric business management software: customers and garment measurements, fabric inventory, sale invoices, stitching order tracking, payments, employees, expenses and 13 business reports in one connected workspace.",
  shortDescription:
    "One connected workspace for managing every detail of a tailoring and fabric business.",
  url: resolveSiteUrl(),
  locale: "en",
  owner: "Umer Farooq",
  repository: "https://github.com/umerfarooq8743/RobeApp",
  firstCustomer: "ROBE Cloth & Tailoring",
  trialDays: 14,
  contact: {
    /** International format digits, e.g. 923001234567 (no +, spaces or dashes). */
    whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  },
  /** Optional — only used for local structured data when genuinely provided. */
  location: clean(process.env.NEXT_PUBLIC_BUSINESS_LOCATION),
} as const;

export type SiteConfig = typeof siteConfig;
