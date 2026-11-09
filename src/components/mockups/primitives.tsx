import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn, compact } from "@/lib/utils";

/* Building blocks shared by every illustrative screen. Server-safe (no hooks). */

export type Tone = "ok" | "warn" | "bad" | "info" | "brass" | "neutral";

export function Chip({ tone = "neutral", children, plain }: { tone?: Tone; children: ReactNode; plain?: boolean }) {
  return <span className={cn("mk-chip", tone !== "neutral" && `mk-chip--${tone}`, plain && "mk-chip--plain")}>{children}</span>;
}

export const stageChip = {
  in_process: { tone: "warn" as Tone, label: "In process" },
  ready: { tone: "info" as Tone, label: "Ready" },
  delivered: { tone: "ok" as Tone, label: "Delivered" },
};

export function StageChip({ stage }: { stage: keyof typeof stageChip }) {
  const s = stageChip[stage];
  return <Chip tone={s.tone}>{s.label}</Chip>;
}

export function StatCard({
  label, value, prefix, foot, trend, Icon, tone = "neutral", i = 0, rise,
}: {
  label: string; value: string; prefix?: string; foot?: string; trend?: { dir: "up" | "down"; text: string };
  Icon: LucideIcon; tone?: Tone; i?: number; rise?: boolean;
}) {
  return (
    <div className={cn("mk-stat", tone !== "neutral" && `mk-stat--${tone}`, rise && "mk-rise")} style={{ "--i": i } as CSSProperties}>
      <div className="mk-stat-l">{label}</div>
      <div className="mk-stat-v">{prefix && <small>{prefix}</small>}{value}</div>
      <div className="mk-stat-f">
        {trend && <span className={trend.dir === "up" ? "mk-trend-up" : "mk-trend-down"}>{trend.dir === "up" ? "▲" : "▼"} {trend.text}</span>}
        {foot && <span>{foot}</span>}
      </div>
      <span className="mk-stat-i"><Icon /></span>
      <span className="mk-stat-w"><Icon /></span>
    </div>
  );
}

export function Card({ title, meta, children, flush, className, style, action }: {
  title?: string; meta?: ReactNode; children: ReactNode; flush?: boolean; className?: string; style?: CSSProperties; action?: ReactNode;
}) {
  return (
    <div className={cn("mk-card", className)} style={style}>
      {(title || meta || action) && (
        <div className="mk-card-h">
          <span className="mk-card-t">{title}</span>
          {action ?? (meta && <span className="mk-card-m">{meta}</span>)}
        </div>
      )}
      <div className={flush ? "mk-card-b--flush" : "mk-card-b"}>{children}</div>
    </div>
  );
}

export function PageHeader({ title, sub, actions, crumb }: { title: string; sub?: string; actions?: ReactNode; crumb?: string[] }) {
  return (
    <div className="mk-ph">
      <div style={{ minWidth: 0 }}>
        {crumb && <div className="mk-crumb">{crumb.join("  ›  ")}</div>}
        <div className="mk-ph-title">{title}</div>
        {sub && <div className="mk-ph-sub">{sub}</div>}
      </div>
      {actions && <div className="mk-actions">{actions}</div>}
    </div>
  );
}

export function Btn({ children, v, Icon, sm, className }: { children?: ReactNode; v?: "primary" | "brass" | "ghost"; Icon?: LucideIcon; sm?: boolean; className?: string }) {
  return (
    <span className={cn("mk-btn", v && `mk-btn--${v}`, sm && "mk-btn--sm", className)}>
      {Icon && <Icon />}
      {children}
    </span>
  );
}

export function Field({ label, value, req, muted, focus, ro, sfx, Icon, hint, className }: {
  label: string; value: ReactNode; req?: boolean; muted?: boolean; focus?: boolean; ro?: boolean; sfx?: string; Icon?: LucideIcon; hint?: string; className?: string;
}) {
  return (
    <div className={cn("mk-field", className)}>
      <span className="mk-label">{label}{req && <span className="req">*</span>}</span>
      <span className={cn("mk-input", muted && "mk-input--muted", focus && "mk-input--focus", ro && "mk-input--ro")}>
        {Icon && <Icon />}
        <span className="mk-trunc">{value}</span>
        {sfx && <span className="sfx">{sfx}</span>}
      </span>
      {hint && <span className="mk-hint">{hint}</span>}
    </div>
  );
}

export function Avatar({ name, g, lg }: { name: string; g?: boolean; lg?: boolean }) {
  const initials = name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return <span className={cn("mk-avatar", g && "mk-avatar--g", lg && "mk-avatar--lg")}>{initials}</span>;
}

export function Bar({ pct, tone }: { pct: number; tone?: "brass" | "ok" | "warn" }) {
  return (
    <div className={cn("mk-bar", tone && `mk-bar--${tone}`)}>
      <i style={{ width: `${Math.max(2, Math.min(100, pct))}%` }} />
    </div>
  );
}

export function Kv({ k, v, grand, bal }: { k: string; v: ReactNode; grand?: boolean; bal?: boolean }) {
  return (
    <div className={cn("mk-kv", grand && "mk-kv--grand", bal && "mk-kv--bal")}>
      <span>{k}</span>
      <b>{v}</b>
    </div>
  );
}

export function CheckBox({ on = true, na }: { on?: boolean; na?: boolean }) {
  if (na) return <span className="mk-check mk-check--na">–</span>;
  return <span className={cn("mk-check", !on && "mk-check--off")}><Check strokeWidth={3} /></span>;
}

/* ─── Charts (inline SVG, theme-aware through CSS variables) ───────────── */

export function BarChart({ values, labels, secondary, height = 150, animate, unit = "" }: {
  values: number[]; labels: string[]; secondary?: number[]; height?: number; animate?: boolean; unit?: string;
}) {
  const w = 520;
  const pad = { l: 34, r: 8, t: 10, b: 22 };
  const max = Math.max(...values, ...(secondary ?? [])) * 1.12;
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const slot = iw / values.length;
  const bw = Math.min(26, slot * (secondary ? 0.32 : 0.5));
  const ticks = [0, 0.5, 1].map((t) => Math.round(max * t));
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" preserveAspectRatio="none" style={{ height: `${height / 16}em` }}>
      {ticks.map((t) => {
        const y = pad.t + ih - (t / max) * ih;
        return (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="var(--a-border)" strokeDasharray="3 4" />
            <text x={pad.l - 6} y={y + 3} textAnchor="end" className="mk-axis">{compact(t)}{t ? unit : ""}</text>
          </g>
        );
      })}
      {values.map((v, i) => {
        const x = pad.l + slot * i + slot / 2;
        const h = (v / max) * ih;
        const h2 = secondary ? (secondary[i] / max) * ih : 0;
        return (
          <g key={i}>
            <rect
              className={animate ? "mk-bar-grow" : undefined}
              style={{ "--i": i } as CSSProperties}
              x={secondary ? x - bw - 2 : x - bw / 2}
              y={pad.t + ih - h}
              width={bw}
              height={h}
              rx={4}
              fill="url(#mkBrass)"
            />
            {secondary && (
              <rect
                className={animate ? "mk-bar-grow" : undefined}
                style={{ "--i": i } as CSSProperties}
                x={x + 2}
                y={pad.t + ih - h2}
                width={bw}
                height={h2}
                rx={4}
                fill="var(--a-chart-2)"
                opacity={0.55}
              />
            )}
            <text x={x} y={height - 6} textAnchor="middle" className="mk-axis">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChart({ values, labels, secondary, height = 150, animate }: {
  values: number[]; labels: string[]; secondary?: number[]; height?: number; animate?: boolean;
}) {
  const w = 520;
  const pad = { l: 10, r: 10, t: 12, b: 22 };
  const max = Math.max(...values, ...(secondary ?? [])) * 1.15;
  const iw = w - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  const pt = (v: number, i: number, n: number) => [pad.l + (iw * i) / Math.max(1, n - 1), pad.t + ih - (v / max) * ih] as const;
  const path = (arr: number[]) =>
    arr.map((v, i) => {
      const [x, y] = pt(v, i, arr.length);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  const area = `${path(values)} L${pad.l + iw},${pad.t + ih} L${pad.l},${pad.t + ih} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" preserveAspectRatio="none" style={{ height: `${height / 16}em` }}>
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={pad.l} x2={w - pad.r} y1={pad.t + ih * t} y2={pad.t + ih * t} stroke="var(--a-border)" strokeDasharray="3 4" />
      ))}
      <path d={area} fill="url(#mkArea)" />
      {secondary && (
        <path d={path(secondary)} fill="none" stroke="var(--a-chart-2)" strokeWidth={2} strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
      )}
      <path
        d={path(values)}
        fill="none"
        stroke="var(--a-brass)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={animate ? "mk-line-draw" : undefined}
        style={{ "--len": 900 } as CSSProperties}
      />
      {labels.map((l, i) => {
        const [x] = pt(0, i, labels.length);
        return <text key={i} x={x} y={height - 6} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"} className="mk-axis">{l}</text>;
      })}
    </svg>
  );
}

const toneVar: Record<string, string> = {
  brass: "var(--a-brass)", ok: "var(--a-ok)", info: "var(--a-info)", warn: "var(--a-warn)", bad: "var(--a-bad)", muted: "var(--a-chart-2)",
};

export function Donut({ items, size = 9, center }: { items: { label: string; value: number; tone: string }[]; size?: number; center?: ReactNode }) {
  const total = items.reduce((s, x) => s + x.value, 0);
  const r = 15.9155; // circumference = 100
  const segments = items.map((it, i) => {
    const pct = (it.value / total) * 100;
    const before = items.slice(0, i).reduce((s, x) => s + (x.value / total) * 100, 0);
    return { it, pct, offset: 25 - before };
  });
  return (
    <div style={{ position: "relative", width: `${size}em`, height: `${size}em`, flexShrink: 0 }}>
      <svg viewBox="0 0 42 42" width="100%" height="100%">
        <circle cx="21" cy="21" r={r} fill="none" stroke="var(--a-subtle)" strokeWidth="6" />
        {segments.map(({ it, pct, offset }) => (
          <circle key={it.label} cx="21" cy="21" r={r} fill="none" stroke={toneVar[it.tone]} strokeWidth="6"
            strokeDasharray={`${Math.max(0, pct - 0.8)} ${100 - pct + 0.8}`} strokeDashoffset={offset} />
        ))}
      </svg>
      {center && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>{center}</div>}
    </div>
  );
}

export function Legend({ items }: { items: { label: string; tone: string; value?: string }[] }) {
  return (
    <div className="mk-stack" style={{ gap: "0.45em" }}>
      {items.map((it) => (
        <div key={it.label} className="mk-between mk-small">
          <span className="mk-row" style={{ gap: "0.5em" }}>
            <i style={{ width: "0.7em", height: "0.7em", borderRadius: "0.2em", background: toneVar[it.tone], display: "inline-block" }} />
            <span className="mk-muted">{it.label}</span>
          </span>
          {it.value && <b className="mk-num">{it.value}</b>}
        </div>
      ))}
    </div>
  );
}

export function SplitBar({ items }: { items: { label: string; value: number; tone: string }[] }) {
  const total = items.reduce((s, x) => s + x.value, 0);
  return (
    <div style={{ display: "flex", height: "0.7em", borderRadius: "999px", overflow: "hidden", gap: "0.15em" }}>
      {items.map((it) => (
        <span key={it.label} style={{ width: `${(it.value / total) * 100}%`, background: toneVar[it.tone] }} />
      ))}
    </div>
  );
}

/** Shared SVG gradients, rendered once in the root layout. */
export function MockupDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <linearGradient id="mkBrass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e1bf76" />
          <stop offset="1" stopColor="#b8893a" />
        </linearGradient>
        <linearGradient id="mkArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c99a48" stopOpacity="0.3" />
          <stop offset="1" stopColor="#c99a48" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
