"use client";

import { useState } from "react";
import { MeasurementPreview } from "@/components/mockups/MeasurementPreview";
import { variants, type VariantId } from "@/data/measurements";
import { cn } from "@/lib/utils";

/** Working variant switcher over the measurement screen. */
export function MeasurementExplorer() {
  const [variant, setVariant] = useState<VariantId>("shalwarKameez");
  const current = variants.find((v) => v.id === variant)!;
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Garment variant">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={variant === v.id}
            onClick={() => setVariant(v.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              variant === v.id ? "border-brass/50 bg-brass-soft text-brass-text" : "border-line text-muted hover:text-fg",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {current.label}: {13 + current.extraFields.length} body measurements and {current.styles.length} style options.
      </p>
      <MeasurementPreview variant={variant} />
      <p className="mt-3 text-sm text-muted">
        {current.label}: 13 body measurements{current.extraFields.length ? ` + ${current.extraFields.map((f) => f.label.toLowerCase()).join(" and ")}` : ""} ·{" "}
        {current.styles.map((s) => s.label.toLowerCase()).join(", ")} styles.
      </p>
    </div>
  );
}
