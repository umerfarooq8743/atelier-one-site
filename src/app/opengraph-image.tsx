import { ImageResponse } from "next/og";

export const alt = "Atelier One — Tailoring & Fabric Business Management Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 90% at 50% 0%, #3a2f1c 0%, #141414 60%)",
          color: "#f7f5f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="76" height="76" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="13" fill="#17171A" />
            <path d="M14.5 36 L24 11.5 L33.5 36" fill="none" stroke="#d6b06a" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.4 27.6 H29.6" fill="none" stroke="#d6b06a" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="2.6 2.2" />
            <ellipse cx="24" cy="16.2" rx="1.05" ry="2.3" fill="#17171A" />
            <path d="M24 11.5 C27.5 6.2 34.5 5.8 36.4 10.6" fill="none" stroke="#d6b06a" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="36.6" cy="11.6" r="1.5" fill="#d6b06a" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            Atelier&nbsp;<span style={{ color: "#d6bc83" }}>One</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Every Detail of Your Tailoring Business.</div>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#d6bc83" }}>One Connected Workspace.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#b8b5ad" }}>
          Customers · Measurements · Fabric inventory · Orders · Payments · Staff · Reports
        </div>
      </div>
    ),
    size,
  );
}
