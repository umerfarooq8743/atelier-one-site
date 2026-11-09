import { CreditCard, Download, Filter, Phone, Plus, Receipt, Ruler, Search, Users, Wallet } from "lucide-react";
import { customers } from "@/data/sample";
import { formatPKR } from "@/lib/utils";
import { Avatar, Btn, Card, Chip, Kv, PageHeader, StageChip, StatCard } from "./primitives";
import { ProductWindow } from "./ProductWindow";

export function CustomerListPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="customers" title="Customers" path="/customers" theme={theme} label="Customer list with search, phone numbers, order counts and balances">
      <div className="mk-body">
        <PageHeader title="Customers" sub="412 customers · PKR 212,300 receivable" actions={<><Btn Icon={Download}>Export</Btn><Btn v="primary" Icon={Plus}>New customer</Btn></>} />
        <div className="mk-g mk-g4">
          <StatCard label="Customers" value="412" Icon={Users} />
          <StatCard label="With balance" value="37" Icon={Wallet} tone="warn" />
          <StatCard label="Receivable" prefix="PKR" value="212K" Icon={CreditCard} tone="brass" />
          <StatCard label="New this month" value="18" Icon={Plus} tone="ok" />
        </div>
        <Card flush>
          <div className="mk-toolbar">
            <span className="mk-input mk-input--muted"><Search />Search name or phone…</span>
            <span className="mk-filter on">All</span>
            <span className="mk-filter">With balance</span>
            <span className="mk-filter mk-hide-sm"><Filter />Inactive</span>
          </div>
          <table className="mk-table">
            <thead><tr><th>Customer</th><th className="mk-hide-sm">Phone</th><th className="num mk-hide-sm">Orders</th><th className="mk-hide-sm">Last visit</th><th className="num">Balance</th></tr></thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.name}>
                  <td><span className="mk-cell-user"><Avatar name={c.name} /><span><b>{c.name}</b><span className="mk-show-sm">{c.phone}</span></span></span></td>
                  <td className="muted mk-hide-sm">{c.phone}</td>
                  <td className="num mk-hide-sm">{c.orders}</td>
                  <td className="muted mk-hide-sm">{c.last}</td>
                  <td className="num">{c.balance ? <b className="mk-brass">{formatPKR(c.balance)}</b> : <Chip tone="ok">Settled</Chip>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mk-pager"><span>Showing 1–7 of 412</span><span><i className="on">1</i><i>2</i><i>3</i><i>…</i></span></div>
        </Card>
      </div>
    </ProductWindow>
  );
}

export function Customer360Preview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="customers" title="Customers" path="/customers/ahmed-khan" theme={theme} label="Customer 360 profile showing balance, measurements, invoices, payments and activity">
      <div className="mk-body">
        <PageHeader
          crumb={["Customers", "Ahmed Khan"]}
          title="Ahmed Khan"
          sub="Customer since Mar 2025 · 12 orders"
          actions={<><Btn Icon={CreditCard}>Receive payment</Btn><Btn v="primary" Icon={Receipt}>New invoice</Btn></>}
        />
        <div className="mk-g mk-g-aside">
          <div className="mk-stack" style={{ gap: "1em" }}>
            <Card>
              <div className="mk-row" style={{ gap: "0.9em", paddingTop: "0.6em" }}>
                <Avatar name="Ahmed Khan" lg />
                <div className="mk-small">
                  <div className="mk-row" style={{ gap: "0.4em" }}><Phone style={{ width: "1em" }} />0300-1234567</div>
                  <div className="mk-muted">Model Town, Lahore</div>
                </div>
              </div>
              <div className="mk-divider" style={{ margin: "0.9em 0 0.4em" }} />
              <Kv k="Billed" v="PKR 48,000" />
              <Kv k="Collected" v="PKR 30,000" />
              <Kv k="Balance" v="PKR 18,000" grand bal />
            </Card>
            <Card title="Measurements" meta={<Chip tone="brass" plain>4 variants</Chip>}>
              {[["Shalwar Kameez", "Updated 21 Oct"], ["Kurta Pajama", "Updated 21 Oct"], ["Waistcoat", "Updated 02 Sep"], ["Coat", "Not recorded"]].map(([v, d]) => (
                <div key={v} className="mk-li">
                  <span className="mk-li-i"><Ruler /></span>
                  <span className="mk-li-main"><b>{v}</b><span>{d}</span></span>
                </div>
              ))}
            </Card>
          </div>
          <div className="mk-stack" style={{ gap: "1em" }}>
            <div className="mk-tabs"><span className="on">Statement</span><span>Invoices</span><span>Payments</span><span>Measurements</span><span className="mk-hide-sm">Activity</span></div>
            <Card title="Running-balance statement" action={<Btn sm Icon={Download}>CSV</Btn>} flush>
              <table className="mk-table">
                <thead><tr><th>Date</th><th>Entry</th><th className="num mk-hide-sm">Debit</th><th className="num mk-hide-sm">Credit</th><th className="num">Balance</th></tr></thead>
                <tbody>
                  <tr className="mk-row-hl"><td className="muted">03 Nov</td><td><span className="mk-link">PMT-0312</span> <span className="mk-muted">Advance · cash</span></td><td className="num mk-hide-sm muted">—</td><td className="num mk-hide-sm mk-ok">8,500</td><td className="num strong">18,000</td></tr>
                  <tr><td className="muted">03 Nov</td><td><span className="mk-link">SI-0148</span> <span className="mk-muted">Kurta + Waistcoat</span></td><td className="num mk-hide-sm">18,500</td><td className="num mk-hide-sm muted">—</td><td className="num strong">26,500</td></tr>
                  <tr><td className="muted">24 Oct</td><td><span className="mk-link">PMT-0301</span> <span className="mk-muted">Bank transfer</span></td><td className="num mk-hide-sm muted">—</td><td className="num mk-hide-sm mk-ok">1,500</td><td className="num strong">8,000</td></tr>
                  <tr><td className="muted">19 Oct</td><td><span className="mk-link">SI-0131</span> <span className="mk-muted">Shalwar Kameez</span></td><td className="num mk-hide-sm">9,500</td><td className="num mk-hide-sm muted">—</td><td className="num strong">9,500</td></tr>
                </tbody>
              </table>
            </Card>
            <Card title="Open order items" meta="SI-0148">
              <div className="mk-li"><span className="mk-li-main"><b>Kurta Pajama — Egyptian Cotton</b><span>Usman · due 06 Nov</span></span><StageChip stage="ready" /></div>
              <div className="mk-li"><span className="mk-li-main"><b>Waistcoat — Khaddar</b><span>Rashid · due 08 Nov</span></span><StageChip stage="in_process" /></div>
            </Card>
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}
