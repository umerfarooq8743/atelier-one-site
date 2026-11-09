import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Ban,
  Boxes,
  Building2,
  CheckCircle2,
  Database,
  FileCheck2,
  Fingerprint,
  Globe,
  History,
  KeyRound,
  Layers,
  PackageMinus,
  Receipt,
  Route,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* Premium engineering-diagram kit for the Technology page. Server components only. */

type Tone = "neutral" | "brass" | "ok" | "bad";

const toneNode: Record<Tone, string> = {
  neutral: "border-line-strong bg-surface",
  brass: "border-brass/45 bg-brass-soft",
  ok: "border-ok/35 bg-ok/[0.07]",
  bad: "border-bad/35 bg-bad/[0.07]",
};
const toneIcon: Record<Tone, string> = {
  neutral: "bg-surface-3 text-fg-2",
  brass: "bg-[linear-gradient(135deg,#e6c98a,#a8843f)] text-[#141414]",
  ok: "bg-ok/15 text-ok",
  bad: "bg-bad/15 text-bad",
};

export function DiagramCard({ index, title, tag, children, footer }: { index: string; title: string; tag: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <figure className="group relative flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/70 to-transparent" />
      <header className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-brass/40 bg-brass-soft font-display text-xs font-semibold text-brass-text">{index}</span>
        <h3 className="min-w-0 flex-1 font-display text-[1.0625rem] font-semibold leading-tight">{title}</h3>
        <span className="hidden shrink-0 rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-muted sm:inline">{tag}</span>
      </header>
      <div
        className="relative flex-1 px-4 py-6 sm:px-6"
        style={{ backgroundImage: "radial-gradient(var(--grid-line) 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}
      >
        {children}
      </div>
      {footer && <figcaption className="border-t border-line bg-surface-2/60 px-5 py-4 text-sm leading-relaxed text-muted sm:px-6">{footer}</figcaption>}
    </figure>
  );
}

export function DNode({ Icon, title, code, tone = "neutral", compact, className }: { Icon: LucideIcon; title: string; code?: string; tone?: Tone; compact?: boolean; className?: string }) {
  return (
    <div className={cn("relative z-10 flex min-w-0 items-center gap-3 rounded-xl border px-3 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]", toneNode[tone], compact && "flex-col gap-2 px-2 py-3 text-center", className)}>
      <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", toneIcon[tone])}><Icon aria-hidden className="size-4" /></span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight text-fg [overflow-wrap:anywhere]">{title}</span>
        {code && <span className="mt-0.5 block font-mono text-[0.6875rem] leading-tight text-muted [overflow-wrap:anywhere]">{code}</span>}
      </span>
    </div>
  );
}

/** Vertical connector with a travelling dash and an optional protocol label. */
export function Connector({ label }: { label?: string }) {
  return (
    <div aria-hidden className="relative flex h-11 items-center justify-center">
      <span className="flow-line absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
      {label && (
        <span className="relative z-10 max-w-[92%] truncate rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] text-fg-2 shadow-soft">{label}</span>
      )}
    </div>
  );
}

/** Horizontal, numbered middleware pipeline. Wraps to a 2×2 grid on narrow screens. */
export function Pipeline({ steps }: { steps: { Icon: LucideIcon; title: string; code: string }[] }) {
  return (
    <ol className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <span aria-hidden className="flow-line-h absolute left-[12%] right-[12%] top-1/2 hidden h-px sm:block lg:hidden xl:block" />
      {steps.map((s, i) => (
        <li key={s.code} className="relative">
          <span className="absolute -top-2 left-2 z-20 rounded-full bg-invert-bg px-1.5 font-display text-[0.625rem] font-semibold leading-4 text-invert-fg">{i + 1}</span>
          <DNode Icon={s.Icon} title={s.title} code={s.code} tone="brass" compact className="h-full justify-center" />
        </li>
      ))}
    </ol>
  );
}

function Outcome({ ok, code, text }: { ok: boolean; code: string; text: string }) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2.5 rounded-xl border px-3 py-2.5", ok ? toneNode.ok : toneNode.bad)}>
      {ok ? <CheckCircle2 aria-hidden className="size-4 shrink-0 text-ok" /> : <Ban aria-hidden className="size-4 shrink-0 text-bad" />}
      <span className="min-w-0 text-sm text-fg-2"><b className={cn("mr-1.5 font-mono font-semibold", ok ? "text-ok" : "text-bad")}>{code}</b>{text}</span>
    </div>
  );
}

const Code = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[0.8125rem] text-fg-2">{children}</code>
);

export function TechDiagrams() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DiagramCard
        index="01"
        title="Frontend ↔ backend communication"
        tag="REST · JSON"
        footer={<>Errors return <Code>{"{ message }"}</Code> with meaningful statuses — <Code>400</Code> <Code>401</Code> <Code>403</Code> <Code>404</Code> <Code>409</Code> <Code>429</Code>.</>}
      >
        <DNode Icon={Globe} title="Browser · Angular SPA" code="Angular 18.2 · lazy routes · guards" />
        <Connector label="HTTPS · Authorization: Bearer <JWT>" />
        <Pipeline
          steps={[
            { Icon: Route, title: "Routes", code: "/api/*" },
            { Icon: Fingerprint, title: "Protect", code: "verify JWT" },
            { Icon: KeyRound, title: "Permission", code: "require​Permission" },
            { Icon: Layers, title: "Controllers", code: "business logic" },
          ]}
        />
        <Connector label="Mongoose models" />
        <DNode Icon={Database} title="MongoDB" code="Mongoose 8.5 · one database" />
      </DiagramCard>

      <DiagramCard
        index="02"
        title="Multi-tenant isolation"
        tag="companyId scope"
        footer={<>One database; every business document carries an immutable <Code>companyId</Code>. A query with no company context throws instead of leaking data.</>}
      >
        <div className="grid grid-cols-3 gap-2">
          {["A", "B", "C"].map((c) => <DNode key={c} Icon={UserRound} title={`Co. ${c}`} code="user" compact />)}
        </div>
        <Connector label="protect → AsyncLocalStorage" />
        <DNode Icon={ShieldCheck} title="tenantPlugin" code="+ companyId on find · update · delete · aggregate" tone="brass" />
        <Connector label="scoped queries" />
        <div className="grid grid-cols-3 gap-2">
          {["A", "B", "C"].map((c) => <DNode key={c} Icon={Building2} title={`${c}'s records`} code="isolated" tone="ok" compact />)}
        </div>
      </DiagramCard>

      <DiagramCard
        index="03"
        title="Permission enforcement"
        tag="module.action"
        footer={<>The interface mirrors the same checks with route guards and a <Code>*uiCan</Code> directive, refreshed from <Code>/api/auth/me</Code> on every app load.</>}
      >
        <DNode Icon={Receipt} title="Request" code="DELETE /api/expenses/:id" />
        <Connector label="protect" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Outcome ok={false} code="401" text="Invalid or stale token" />
          <Outcome ok code="OK" text="Active user, current tokenVersion" />
        </div>
        <Connector label="requirePermission('expenses.delete')" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Outcome ok={false} code="403" text="Role lacks the permission" />
          <Outcome ok code="OK" text="Allowed → controller" />
        </div>
      </DiagramCard>

      <DiagramCard
        index="04"
        title="Data workflow: saving a sale"
        tag="all-or-nothing"
        footer={<>If any product is short, the API answers <Code>409 OUT_OF_STOCK</Code> and nothing changes — no invoice, payment, balance or stock.</>}
      >
        <ol className="relative space-y-2.5">
          <span aria-hidden className="flow-line absolute bottom-5 left-[1.55rem] top-5 w-px" />
          {[
            { Icon: FileCheck2, t: "Server recomputes totals", c: "utils/money.js — browser totals ignored" },
            { Icon: PackageMinus, t: "Atomic stock deduction", c: "one conditional update per product" },
            { Icon: Boxes, t: "Invoice saved", c: "SI-0001 numbering per company" },
            { Icon: Wallet, t: "Balance & advance", c: "customer balance + linked receipt" },
            { Icon: History, t: "Activity logged", c: "user · role · time" },
          ].map((s, i) => (
            <li key={s.t} className="relative flex items-center gap-3">
              <DNode Icon={s.Icon} title={s.t} code={s.c} tone={i === 1 ? "brass" : "neutral"} className="flex-1" />
            </li>
          ))}
        </ol>
      </DiagramCard>
    </div>
  );
}

