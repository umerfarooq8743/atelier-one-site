import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brass" | "neutral" | "ok" | "warn" | "outline";

const tones: Record<Tone, string> = {
  brass: "bg-brass-soft text-brass-text border-brass/30",
  neutral: "bg-surface-3 text-fg-2 border-line",
  ok: "bg-ok/10 text-ok border-ok/25",
  warn: "bg-warn/10 text-warn border-warn/25",
  outline: "bg-transparent text-fg-2 border-line-strong",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
