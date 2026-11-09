import type { CSSProperties } from "react";
import { AlertTriangle, ArrowDownLeft, Clock3, Receipt, RefreshCw, Wallet } from "lucide-react";
import { compact, formatPKR } from "@/lib/utils";
import { dashboardByPeriod, lowStock, recentActivity, staffLoad, topProducts, type Period } from "@/data/sample";
import { Avatar, Bar, BarChart, Btn, Card, Chip, StatCard } from "./primitives";
import { ProductWindow } from "./ProductWindow";

const periodLabel: Record<Period, string> = { week: "Week", month: "Month", quarter: "Quarter", year: "Year" };

export function DashboardBody({ period = "month", animate = false }: { period?: Period; animate?: boolean }) {
  const d = dashboardByPeriod[period];
  const rise = animate;
  return (
    <div className="mk-body">
      <div className="mk-ph">
        <div>
          <div className="mk-ph-title">Good afternoon, Imtiaz</div>
          <div className="mk-ph-sub">Here&apos;s how the shop is doing today.</div>
        </div>
        <div className="mk-seg">
          {(Object.keys(periodLabel) as Period[]).map((p) => (
            <span key={p} className={p === period ? "on" : undefined}>{periodLabel[p]}</span>
          ))}
        </div>
      </div>

      <div className="mk-g mk-g4">
        <StatCard rise={rise} i={0} label="Sales Today" prefix="PKR" value={compact(d.salesToday)} tone="brass" Icon={Receipt} trend={{ dir: "up", text: "12%" }} foot="vs yesterday" />
        <StatCard rise={rise} i={1} label="Received Today" prefix="PKR" value={compact(d.receivedToday)} tone="ok" Icon={ArrowDownLeft} foot="9 receipts" />
        <StatCard rise={rise} i={2} label="Pending Invoices" value={String(d.pendingInvoices)} tone="warn" Icon={Clock3} foot="PKR 212K due" />
        <StatCard rise={rise} i={3} label={`${periodLabel[period]}ly Sales`} prefix="PKR" value={compact(d.periodSales)} tone="info" Icon={Wallet} trend={{ dir: "up", text: "8%" }} />
      </div>

      <div className="mk-g mk-g-main">
        <Card
          className={rise ? "mk-rise" : undefined}
          style={{ "--i": 4 } as CSSProperties}
          title="Sales & collections"
          action={
            <span className="mk-legend">
              <span><i style={{ background: "#c99a48" }} />Sales</span>
              <span><i style={{ background: "var(--a-chart-2)" }} />Collections</span>
            </span>
          }
        >
          <BarChart values={d.trend} secondary={d.collections} labels={d.trendLabels} height={168} animate={animate} />
          <div className="mk-g mk-g3 mk-hide-sm" style={{ marginTop: "0.8em", gap: "0.6em" }}>
            <div className="mk-small"><div className="mk-muted">Purchases</div><b className="mk-num">{formatPKR(d.periodPurchases)}</b></div>
            <div className="mk-small"><div className="mk-muted">Expenses</div><b className="mk-num">{formatPKR(d.periodExpenses)}</b></div>
            <div className="mk-small"><div className="mk-muted">Customers</div><b className="mk-num">{d.customers}</b></div>
          </div>
        </Card>

        <Card className={rise ? "mk-rise" : undefined} style={{ "--i": 5 } as CSSProperties} title="Low stock" meta={<Chip tone="bad">{lowStock.length} items</Chip>}>
          {lowStock.map((p) => (
            <div key={p.name} className="mk-li">
              <span className="mk-li-i" style={{ color: "var(--a-warn)", background: "var(--a-warn-tint)" }}><AlertTriangle /></span>
              <span className="mk-li-main">
                <b>{p.name}</b>
                <span>{p.stock} {p.unit} left · min {p.min}</span>
              </span>
              <Btn sm Icon={RefreshCw} className="mk-pulse">Reorder</Btn>
            </div>
          ))}
        </Card>
      </div>

      <div className="mk-g mk-g3">
        <Card className={rise ? "mk-rise" : undefined} style={{ "--i": 6 } as CSSProperties} title="Staff workload" meta="Assigned items">
          <div className="mk-stack" style={{ gap: "0.75em" }}>
            {staffLoad.map((s) => (
              <div key={s.name} className="mk-stack" style={{ gap: "0.35em" }}>
                <div className="mk-between mk-small">
                  <span><b>{s.name}</b> <span className="mk-muted">· {s.role}</span></span>
                  <span className="mk-muted mk-num">{s.delivered}/{s.items} delivered</span>
                </div>
                <Bar pct={(s.delivered / s.items) * 100} tone="brass" />
              </div>
            ))}
          </div>
        </Card>
        <Card className={rise ? "mk-rise" : undefined} style={{ "--i": 7 } as CSSProperties} title="Top products" meta={periodLabel[period]}>
          {topProducts.map((p, i) => (
            <div key={p.name} className="mk-li">
              <span className="mk-line-n">{i + 1}</span>
              <span className="mk-li-main"><b>{p.name}</b><span>{p.share}% of sales</span></span>
              <b className="mk-num mk-small">{compact(p.revenue)}</b>
            </div>
          ))}
        </Card>
        <Card className={rise ? "mk-rise mk-hide-sm" : "mk-hide-sm"} style={{ "--i": 8 } as CSSProperties} title="Recent activity" meta="Live">
          {recentActivity.map((a, i) => (
            <div key={i} className="mk-li" style={i === 1 ? { background: "var(--a-brass-tint)", margin: "0 -0.6em", padding: "0.65em 0.6em", borderRadius: "0.6em" } : undefined}>
              <Avatar name={a.who} g />
              <span className="mk-li-main"><b>{a.who} <span style={{ fontWeight: 400, display: "inline", color: "var(--a-text-2)" }}>{a.what}</span></b><span>{a.when}</span></span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

export function DashboardPreview({ period = "month", animate, theme, className }: { period?: Period; animate?: boolean; theme?: "light" | "dark"; className?: string }) {
  return (
    <ProductWindow nav="dashboard" title="Dashboard" path="/dashboard" animate={animate} theme={theme} className={className} label="Atelier One dashboard with today's sales, collections, pending invoices, low stock, staff workload and top products">
      <DashboardBody period={period} animate={animate} />
    </ProductWindow>
  );
}

