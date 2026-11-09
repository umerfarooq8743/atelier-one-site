import { Filter, KeyRound, Mail, Plus, Save, Search, ShieldCheck } from "lucide-react";
import { activity, users } from "@/data/sample";
import { cn } from "@/lib/utils";
import { Avatar, Btn, Card, CheckBox, Chip, Field, PageHeader } from "./primitives";
import { ProductWindow } from "./ProductWindow";

/** Permission catalogue from backend/config/permissions.js. */
const ACTIONS = ["view", "create", "edit", "delete", "export"] as const;
const MATRIX: { module: string; allowed: string[]; on: string[]; extra?: string }[] = [
  { module: "Dashboard", allowed: ["view"], on: ["view"] },
  { module: "Customers", allowed: [...ACTIONS], on: ["view", "create", "edit"] },
  { module: "Products", allowed: [...ACTIONS], on: ["view"], extra: "stock_adjust" },
  { module: "Sales", allowed: [...ACTIONS], on: ["view", "edit"] },
  { module: "Purchases", allowed: [...ACTIONS], on: [] },
  { module: "Payments", allowed: ["view", "create", "delete", "export"], on: ["view"] },
  { module: "Employees", allowed: [...ACTIONS], on: ["view"], extra: "loans" },
  { module: "Reports", allowed: ["view", "export"], on: ["view"] },
  { module: "Settings", allowed: ["view", "edit"], on: [] },
  { module: "Users", allowed: ["view", "create", "edit"], on: [] },
  { module: "Activity", allowed: ["view"], on: [] },
];

export function PermissionMatrix({ compact = false }: { compact?: boolean }) {
  const rows = compact ? MATRIX.slice(0, 8) : MATRIX;
  return (
    <table className="mk-table mk-matrix">
      <thead><tr><th>Module</th>{ACTIONS.map((a) => <th key={a} className={a === "export" || a === "delete" ? "mk-hide-sm" : undefined}>{a}</th>)}<th className="mk-hide-sm">Special</th></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.module}>
            <td><b>{r.module}</b></td>
            {ACTIONS.map((a) => (
              <td key={a} className={a === "export" || a === "delete" ? "mk-hide-sm" : undefined}>
                <CheckBox na={!r.allowed.includes(a)} on={r.on.includes(a)} />
              </td>
            ))}
            <td className="mk-hide-sm">{r.extra ? <Chip tone={r.extra === "loans" ? "neutral" : "brass"} plain>{r.extra}</Chip> : <span className="mk-muted">—</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RolesPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="setup" title="Setup" path="/setup/roles/workshop" theme={theme} label="Role editor with a module by action permission matrix">
      <div className="mk-body">
        <PageHeader crumb={["Setup", "Roles & permissions", "Workshop"]} title="Workshop" sub="Custom role · 2 users" actions={<Btn v="primary" Icon={Save}>Save role</Btn>} />
        <div className="mk-g mk-g-aside">
          <Card title="Roles">
            {[["Admin", "Everything · locked", true], ["Manager", "Business modules", false], ["Staff", "Counter work", false], ["Workshop", "Custom", false]].map(([n, d, locked], i) => (
              <div key={String(n)} className="mk-li" style={i === 3 ? { background: "var(--a-brass-tint)", margin: "0 -0.6em", padding: "0.65em 0.6em", borderRadius: "0.6em" } : undefined}>
                <span className="mk-li-i"><KeyRound /></span>
                <span className="mk-li-main"><b>{n}</b><span>{d}</span></span>
                {locked ? <Chip plain>Locked</Chip> : null}
              </div>
            ))}
          </Card>
          <Card title="Permissions" meta="Module × action" flush>
            <PermissionMatrix />
          </Card>
        </div>
      </div>
    </ProductWindow>
  );
}

export function UsersPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="setup" title="Setup" path="/users" theme={theme} label="User management with roles, status and invitation state">
      <div className="mk-body">
        <PageHeader crumb={["Setup", "Users"]} title="Users" sub="Everyone signs in with their own email" actions={<Btn v="primary" Icon={Plus}>Add user</Btn>} />
        <Card flush>
          <div className="mk-toolbar"><span className="mk-input mk-input--muted"><Search />Search users…</span><span className="mk-filter on">All</span><span className="mk-filter">Active</span><span className="mk-filter mk-hide-sm">Inactive</span></div>
          <table className="mk-table">
            <thead><tr><th>User</th><th>Role</th><th className="mk-hide-sm">Status</th><th className="mk-hide-sm" /></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} style={u.active ? undefined : { opacity: 0.6 }}>
                  <td><span className="mk-cell-user"><Avatar name={u.name} g={!u.owner} /><span><b>{u.name}{u.owner && <span className="mk-brass" style={{ display: "inline", marginLeft: "0.4em", fontSize: "0.85em" }}>Owner</span>}</b><span>{u.email}</span></span></span></td>
                  <td><Chip tone={u.role === "Admin" ? "brass" : "neutral"} plain>{u.role}</Chip></td>
                  <td className="mk-hide-sm"><Chip tone={u.state === "Active" ? "ok" : u.state === "Invited" ? "info" : "neutral"}>{u.state === "Invited" ? "Invitation sent" : u.state}</Chip></td>
                  <td className="mk-hide-sm"><span className="mk-row" style={{ gap: "0.5em", color: "var(--a-muted)" }}>{u.state === "Invited" && <Mail style={{ width: "1.1em" }} />}<KeyRound style={{ width: "1.1em" }} /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="mk-note"><ShieldCheck />Changing a role, deactivating a user or changing a password signs out their other sessions immediately.</div>
      </div>
    </ProductWindow>
  );
}

export function ActivityTimeline({ limit }: { limit?: number }) {
  const rows = limit ? activity.slice(0, limit) : activity;
  return (
    <div className="mk-tl">
      {rows.map((a, i) => (
        <div key={i} className={cn("mk-tl-i", a.tone === "ok" && "mk-tl-i--ok", a.tone === "bad" && "mk-tl-i--bad", a.tone === "g" && "mk-tl-i--g")}>
          <div className="mk-tl-h"><b>{a.user}</b><span>{a.role}</span><span>·</span><span style={{ color: "var(--a-text-2)" }}>{a.action}</span><b>{a.entity}</b></div>
          <div className="mk-xs mk-muted" style={{ marginTop: "0.15em" }}>{a.when}</div>
          {a.diff.length > 0 && (
            <div className="mk-diff">
              {a.diff.map((d) => <span key={d.f}>{d.f}: <s>{d.from}</s> → <ins>{d.to}</ins></span>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ActivityLogPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="setup" title="Setup" path="/activity-log" theme={theme} label="Activity log with user, role, action, record and field-level changes">
      <div className="mk-body">
        <PageHeader crumb={["Setup", "Activity log"]} title="Activity log" sub="Every create, update, delete and business action" actions={<Btn Icon={Filter}>Filters</Btn>} />
        <div className="mk-toolbar" style={{ padding: 0, border: 0 }}>
          <span className="mk-filter on">All actions</span><span className="mk-filter">Created</span><span className="mk-filter">Updated</span><span className="mk-filter">Deleted</span><span className="mk-filter mk-hide-sm">Payments</span><span className="mk-filter mk-hide-sm">Stock</span>
        </div>
        <Card><div style={{ paddingTop: "0.6em" }}><ActivityTimeline /></div></Card>
      </div>
    </ProductWindow>
  );
}

export function SettingsPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="setup" title="Setup" path="/setup/business" theme={theme} label="Business profile settings with name, contact, tax number, currency and invoice text">
      <div className="mk-body">
        <PageHeader crumb={["Setup", "Business profile"]} title="Business profile" sub="Appears on invoices and PDFs" actions={<Btn v="primary" Icon={Save}>Save</Btn>} />
        <Card flush>
          <div className="mk-sec">
            <div className="mk-sec-t">Business</div>
            <div className="mk-sec-s">Your shop&apos;s identity</div>
            <div className="mk-g mk-g2" style={{ gap: "0.8em" }}>
              <Field label="Business name" req value="Demo Tailors" />
              <Field label="Tagline" value="Tailoring & Fabric Shop" />
              <Field label="Phone" value="Your shop number" muted />
              <Field label="Email" value="shop@example.com" muted />
              <Field label="Tax number" value="NTN 0000000-0" muted />
              <Field label="Currency" value="PKR" />
            </div>
          </div>
          <div className="mk-sec">
            <div className="mk-sec-t">Invoice text</div>
            <div className="mk-sec-s">Printed at the bottom of every invoice</div>
            <div className="mk-g mk-g2" style={{ gap: "0.8em" }}>
              <Field label="Invoice footer" value="Thank you for your order." />
              <Field label="Terms" value="Orders not collected in 30 days…" />
            </div>
          </div>
        </Card>
      </div>
    </ProductWindow>
  );
}
