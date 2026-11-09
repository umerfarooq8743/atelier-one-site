import { Calendar, Download, Search, TrendingUp } from "lucide-react";
import type { ReportDef } from "@/data/types";
import { reportGroups, reports } from "@/data/reports";
import { products, staffLoad } from "@/data/sample";
import { formatPKR } from "@/lib/utils";
import { Bar, BarChart, Btn, Card, Chip, Donut, Kv, Legend, LineChart, PageHeader, SplitBar, StatCard } from "./primitives";
import { ProductWindow } from "./ProductWindow";

function DateRange() {
  return (
    <span className="mk-input" style={{ width: "auto" }}>
      <Calendar />
      01 Oct 2026 – 31 Oct 2026
    </span>
  );
}

export function ReportsOverviewPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="reports" title="Reports" path="/reports" theme={theme} label="Reports overview listing all 13 reports in four groups">
      <div className="mk-body">
        <PageHeader title="Reports" sub="13 reports · date ranges · CSV export" actions={<span className="mk-input mk-input--muted" style={{ width: "14em" }}><Search />Search reports…</span>} />
        {reportGroups.map((g) => (
          <div key={g} className="mk-stack" style={{ gap: "0.6em" }}>
            <div className="mk-xs mk-muted mk-strong" style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>{g}</div>
            <div className="mk-g mk-g4" style={{ gap: "0.7em" }}>
              {reports.filter((r) => r.group === g).map((r) => (
                <div key={r.id} className="mk-card" style={{ padding: "0.9em 1em" }}>
                  <div className="mk-between"><b className="mk-small mk-trunc">{r.title}</b><Chip tone="brass" plain>{r.tag}</Chip></div>
                  <div className="mk-xs mk-muted" style={{ marginTop: "0.4em", lineHeight: 1.45 }}>{r.purpose}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ProductWindow>
  );
}

export function ProfitLossPreview({ theme }: { theme?: "light" | "dark" }) {
  const pl = reports.find((r) => r.id === "profit-loss")!;
  return (
    <ProductWindow nav="reports" title="Reports" path="/reports/profit-loss" theme={theme} label="Profit and loss report with sales, purchases, expenses and net profit">
      <div className="mk-body">
        <PageHeader crumb={["Reports", "Profit & Loss"]} title="Profit & Loss" sub="Sales minus purchases and expenses" actions={<><DateRange /><Btn Icon={Download}>CSV</Btn></>} />
        <div className="mk-g mk-g4">
          <StatCard label="Sales" prefix="PKR" value="1.28M" Icon={TrendingUp} tone="ok" />
          <StatCard label="Purchases" prefix="PKR" value="486K" Icon={TrendingUp} tone="info" />
          <StatCard label="Expenses" prefix="PKR" value="318K" Icon={TrendingUp} tone="bad" />
          <StatCard label="Net profit" prefix="PKR" value="480K" Icon={TrendingUp} tone="brass" trend={{ dir: "up", text: "37%" }} foot="margin" />
        </div>
        <div className="mk-g mk-g-main">
          <Card title="Net profit trend" action={<span className="mk-legend"><span><i style={{ background: "#c99a48" }} />Sales (×10K)</span><span><i style={{ background: "var(--a-chart-2)" }} />Costs</span></span>}>
            {pl.preview.kind === "line" && <LineChart values={pl.preview.values} secondary={pl.preview.secondary} labels={pl.preview.labels} height={160} />}
          </Card>
          <Card title="Statement">
            <Kv k="Sales" v="1,284,500" />
            <Kv k="− Purchases" v="486,200" />
            <Kv k="Gross" v="798,300" grand />
            <Kv k="− Salaries" v="196,000" />
            <Kv k="− Rent" v="70,000" />
            <Kv k="− Other expenses" v="52,400" />
            <Kv k="Net profit" v="PKR 479,900" grand bal />
          </Card>
        </div>
      </div>
    </ProductWindow>
  );
}

export function InventoryReportPreview({ theme }: { theme?: "light" | "dark" }) {
  const stocked = products.filter((p) => p.stock !== null);
  return (
    <ProductWindow nav="reports" title="Reports" path="/reports/inventory" theme={theme} label="Inventory report with stock on hand, low-stock alerts and stock valuation">
      <div className="mk-body">
        <PageHeader crumb={["Reports", "Inventory"]} title="Inventory report" sub="Stock on hand and valuation" actions={<Btn Icon={Download}>CSV</Btn>} />
        <div className="mk-g mk-g3 mk-g2-keep">
          <StatCard label="Products" value="86" Icon={TrendingUp} />
          <StatCard label="Low stock" value="5" Icon={TrendingUp} tone="bad" />
          <StatCard label="Stock value" prefix="PKR" value="1.42M" Icon={TrendingUp} tone="brass" />
        </div>
        <Card flush>
          <table className="mk-table">
            <thead><tr><th>Product</th><th className="mk-hide-sm">Unit</th><th className="num">In stock</th><th className="mk-hide-sm">Level</th><th className="num mk-hide-sm">Value</th><th>Status</th></tr></thead>
            <tbody>
              {stocked.map((p) => {
                const low = p.stock! < p.min!;
                return (
                  <tr key={p.name}>
                    <td><b>{p.name}</b></td>
                    <td className="muted mk-hide-sm">{p.unit}</td>
                    <td className="num strong">{p.stock}</td>
                    <td className="mk-hide-sm" style={{ minWidth: "7em" }}><Bar pct={(p.stock! / (p.min! * 3)) * 100} tone={low ? "warn" : "ok"} /></td>
                    <td className="num mk-hide-sm">{formatPKR(p.stock! * p.price * 0.72, false)}</td>
                    <td>{low ? <Chip tone="bad">Low</Chip> : <Chip tone="ok">OK</Chip>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </ProductWindow>
  );
}

export function StaffWorkPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="reports" title="Reports" path="/reports/staff-work" theme={theme} label="Staff work report with items assigned per employee and delivery progress">
      <div className="mk-body">
        <PageHeader crumb={["Reports", "Staff Work"]} title="Staff work" sub="Items assigned and delivered per employee" actions={<><DateRange /><Btn Icon={Download}>CSV</Btn></>} />
        <div className="mk-g mk-g-main">
          <Card flush>
            <table className="mk-table">
              <thead><tr><th>Employee</th><th className="num">Assigned</th><th className="num mk-hide-sm">In process</th><th className="num">Delivered</th><th className="mk-hide-sm">Progress</th></tr></thead>
              <tbody>
                {staffLoad.map((s) => (
                  <tr key={s.name}>
                    <td><b>{s.name}</b><div className="mk-xs mk-muted">{s.role}</div></td>
                    <td className="num">{s.items}</td>
                    <td className="num mk-hide-sm">{s.items - s.delivered}</td>
                    <td className="num strong">{s.delivered}</td>
                    <td className="mk-hide-sm" style={{ minWidth: "8em" }}><Bar pct={(s.delivered / s.items) * 100} tone="brass" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title="Items by employee">
            <BarChart values={staffLoad.map((s) => s.items)} secondary={staffLoad.map((s) => s.delivered)} labels={staffLoad.map((s) => s.name)} height={170} />
          </Card>
        </div>
      </div>
    </ProductWindow>
  );
}

/** Compact visual for any report definition — used on the /reports page. */
export function ReportChart({ report }: { report: ReportDef }) {
  const p = report.preview;
  if (p.kind === "bars") return <BarChart values={p.values} labels={p.labels} height={150} unit={p.unit} />;
  if (p.kind === "line") return <LineChart values={p.values} labels={p.labels} secondary={p.secondary} height={150} />;
  if (p.kind === "split") {
    const total = p.items.reduce((s, x) => s + x.value, 0);
    return (
      <div className="mk-row" style={{ gap: "1.2em", alignItems: "center", padding: "0.4em 0" }}>
        <Donut items={p.items} size={8} center={<span className="mk-display" style={{ fontWeight: 600 }}>{total}{total === 100 ? "%" : ""}</span>} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Legend items={p.items.map((x) => ({ label: x.label, tone: x.tone, value: `${x.value}${total === 100 ? "%" : ""}` }))} />
          <div style={{ marginTop: "0.8em" }}><SplitBar items={p.items} /></div>
        </div>
      </div>
    );
  }
  return (
    <table className="mk-table" style={{ fontSize: "0.72em" }}>
      <thead><tr>{p.columns.map((c, i) => <th key={c} className={p.numeric?.includes(i) ? "num" : undefined}>{c}</th>)}</tr></thead>
      <tbody>
        {p.rows.map((r, ri) => (
          <tr key={ri}>{r.map((c, ci) => <td key={ci} className={p.numeric?.includes(ci) ? "num" : undefined}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export function ReportCardPreview({ report, theme }: { report: ReportDef; theme?: "light" | "dark" }) {
  return (
    <ProductWindow bare chrome={false} size="compact" theme={theme} label={`${report.title} sample preview`}>
      <div className="mk-body" style={{ gap: "0.9em" }}>
        <div className="mk-between" style={{ flexWrap: "wrap" }}>
          <DateRange />
          <Btn sm Icon={Download}>CSV</Btn>
        </div>
        <div className="mk-g mk-g3" style={{ gap: "0.6em" }}>
          {report.metrics.map((m) => (
            <div key={m.label} className="mk-stat" style={{ padding: "0.7em 0.8em" }}>
              <div className="mk-stat-l">{m.label}</div>
              <div className="mk-stat-v" style={{ fontSize: "1.05em" }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="mk-card" style={{ padding: report.preview.kind === "table" ? 0 : "0.8em 1em" }}>
          <ReportChart report={report} />
        </div>
      </div>
    </ProductWindow>
  );
}
