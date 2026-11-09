import { CheckCircle2, Clock3, Download, FileText, PackageCheck, Info, Plus, Printer, Ruler, Save, Search, Trash2, UserRound, Wallet } from "lucide-react";
import { orderItems, payments } from "@/data/sample";
import { formatPKR } from "@/lib/utils";
import { Avatar, Btn, Card, Chip, Field, Kv, PageHeader, StageChip, stageChip, StatCard } from "./primitives";
import { ProductWindow } from "./ProductWindow";

type Line = { n: number; product: string; customer: string; variant?: string; staff?: string; qty: string; rate: number; disc: number; amount: number };

const lines: Line[] = [
  { n: 1, product: "Egyptian Cotton", customer: "Ahmed Khan", qty: "5 m", rate: 1200, disc: 0, amount: 6000 },
  { n: 2, product: "Stitching — Kurta Pajama", customer: "Ahmed Khan", variant: "Kurta Pajama · snapshot 21 Oct", staff: "Usman", qty: "1", rate: 4650, disc: 0, amount: 4650 },
  { n: 3, product: "Khaddar — Charcoal", customer: "Ahmed Khan", qty: "2.5 m", rate: 980, disc: 0, amount: 2450 },
  { n: 4, product: "Stitching — Waistcoat", customer: "Ahmed Khan", variant: "Waistcoat · snapshot 02 Sep", staff: "Rashid", qty: "1", rate: 4500, disc: 0, amount: 4500 },
  { n: 5, product: "Metal Buttons", customer: "Ahmed Khan", qty: "2", rate: 450, disc: 0, amount: 900 },
];
const subtotal = lines.reduce((s, l) => s + l.amount, 0); // 18,500

export function SaleInvoiceFormBody() {
  return (
    <div className="mk-body">
      <PageHeader crumb={["Sale invoices", "New"]} title="New sale invoice" sub="SI-0148 · 03 Nov 2026" actions={<><Btn v="ghost">Cancel</Btn><Btn v="primary" Icon={Save}>Save invoice</Btn></>} />
      <div className="mk-g mk-g-form">
        <div className="mk-stack" style={{ gap: "1em" }}>
          <Card flush>
            <div className="mk-sec">
              <div className="mk-sec-t">Bill to</div>
              <div className="mk-sec-s">Customer and dates</div>
              <div className="mk-g mk-g3" style={{ gap: "0.8em" }}>
                <Field label="Customer" req value="Ahmed Khan · 0300-1234567" Icon={UserRound} focus />
                <Field label="Invoice date" value="03 Nov 2026" />
                <Field label="Due date" value="08 Nov 2026" />
              </div>
            </div>
          </Card>
          <Card title="Items" action={<Btn sm Icon={Plus}>Add line</Btn>}>
            <div className="mk-stack" style={{ gap: "0.7em" }}>
              {lines.slice(1, 4).map((l) => (
                <div key={l.n} className="mk-line">
                  <div className="mk-line-h">
                    <span className="mk-line-n">{l.n}</span>
                    <b className="mk-small mk-trunc" style={{ flex: 1 }}>{l.product}</b>
                    {l.staff && <Chip tone="brass" plain>{l.staff}</Chip>}
                    <Trash2 style={{ width: "1em", color: "var(--a-muted)" }} />
                  </div>
                  <div className="mk-g mk-g4" style={{ gap: "0.6em" }}>
                    <Field label="Qty" value={l.qty} />
                    <Field label="Rate" value={formatPKR(l.rate, false)} sfx="PKR" />
                    <Field label="Discount" value={String(l.disc)} sfx="%" className="mk-hide-sm" />
                    <Field label="Amount" value={formatPKR(l.amount, false)} ro />
                  </div>
                  {l.variant ? (
                    <div className="mk-note mk-note--brass" style={{ padding: "0.5em 0.7em" }}><Ruler />Measurement snapshot: {l.variant}. Later changes won&apos;t alter this order.</div>
                  ) : (
                    <div className="mk-xs mk-muted">Fabric · deducts {l.qty} from stock when saved</div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card title="Summary" className="mk-hide-sm">
          <Kv k="Items" v="5 lines" />
          <Kv k="Subtotal" v={formatPKR(subtotal)} />
          <Kv k="Discount" v="PKR 0" />
          <Kv k="Total" v={formatPKR(subtotal)} grand />
          <div className="mk-divider" style={{ margin: "0.6em 0" }} />
          <Field label="Advance received" value="8,500" sfx="PKR" />
          <div className="mk-seg" style={{ marginTop: "0.6em" }}><span className="on">Cash</span><span>Bank</span><span>Cheque</span></div>
          <Kv k="Remaining balance" v={formatPKR(10_000)} grand bal />
          <div className="mk-note" style={{ marginTop: "0.6em" }}><Info />Totals are recalculated by the server on save.</div>
        </Card>
      </div>
    </div>
  );
}

export function SaleInvoiceFormPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="sales" title="Sale Invoices" path="/invoices/sale/new" theme={theme} label="Sale invoice form with line cards, measurement snapshots, assigned employees, advance and summary">
      <SaleInvoiceFormBody />
    </ProductWindow>
  );
}

export function InvoiceDetailPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="sales" title="Sale Invoices" path="/invoices/sale/SI-0148" theme={theme} label="Sale invoice detail with items, stages, linked payments and PDF download">
      <div className="mk-body">
        <PageHeader crumb={["Sale invoices", "SI-0148"]} title="SI-0148" sub="Ahmed Khan · 03 Nov 2026 · due 08 Nov" actions={<><Btn Icon={Printer} className="mk-hide-sm">Print</Btn><Btn Icon={Download}>PDF</Btn><Btn v="primary" Icon={Wallet}>Receive payment</Btn></>} />
        <div className="mk-g mk-g-form">
          <Card title="Items" meta="5 lines" flush>
            <table className="mk-table">
              <thead><tr><th>Item</th><th className="mk-hide-sm">Assigned</th><th className="num mk-hide-sm">Qty</th><th className="num">Amount</th><th>Stage</th></tr></thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.n}>
                    <td><b>{l.product}</b>{l.variant && <div className="mk-xs mk-muted">{l.variant}</div>}</td>
                    <td className="muted mk-hide-sm">{l.staff ?? "—"}</td>
                    <td className="num mk-hide-sm">{l.qty}</td>
                    <td className="num">{formatPKR(l.amount, false)}</td>
                    <td>{l.staff ? <StageChip stage={l.n === 2 ? "ready" : "in_process"} /> : <Chip plain>Fabric</Chip>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="mk-stack" style={{ gap: "1em" }}>
            <Card title="Totals">
              <Kv k="Subtotal" v={formatPKR(subtotal)} />
              <Kv k="Total" v={formatPKR(subtotal)} grand />
              <Kv k="Paid" v={formatPKR(8_500)} />
              <Kv k="Balance" v={formatPKR(10_000)} grand bal />
            </Card>
            <Card title="Payments">
              <div className="mk-li"><span className="mk-li-i"><Wallet /></span><span className="mk-li-main"><b>PMT-0312 · Advance</b><span>Cash · 03 Nov</span></span><b className="mk-small mk-ok">8,500</b></div>
            </Card>
            <Card title="Invoice PDF">
              <div className="mk-row mk-small"><FileText style={{ width: "1.4em", color: "var(--a-brass)" }} /><span>Uses your business profile, footer and terms</span></div>
            </Card>
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function OrderTrackingBody({ stages }: { stages?: (keyof typeof stageChip)[] }) {
  const items = orderItems.map((o, i) => ({ ...o, stage: stages?.[i] ?? o.stage }));
  const count = (s: keyof typeof stageChip) => items.filter((x) => x.stage === s).length;
  return (
    <div className="mk-body">
      <PageHeader title="Order status" sub="Every tailoring item by stage" actions={<Btn Icon={Download}>CSV</Btn>} />
      <div className="mk-g mk-g3 mk-g2-keep">
        <StatCard label="In process" value={String(count("in_process"))} Icon={Clock3} tone="warn" />
        <StatCard label="Ready" value={String(count("ready"))} Icon={PackageCheck} tone="info" />
        <StatCard label="Delivered" value={String(count("delivered"))} Icon={CheckCircle2} tone="ok" />
      </div>
      <Card flush>
        <table className="mk-table">
          <thead><tr><th>Item</th><th className="mk-hide-sm">Invoice</th><th className="mk-hide-sm">Tailor</th><th className="mk-hide-sm">Due</th><th>Progress</th><th>Stage</th></tr></thead>
          <tbody>
            {items.map((o, i) => {
              const step = o.stage === "in_process" ? 1 : o.stage === "ready" ? 2 : 3;
              const overdue = o.stage === "in_process" && o.due === "02 Nov";
              return (
                <tr key={i}>
                  <td><b>{o.item}</b><div className="mk-xs mk-muted">{o.customer}</div></td>
                  <td className="mk-hide-sm"><span className="mk-link">{o.inv}</span></td>
                  <td className="mk-hide-sm"><span className="mk-cell-user"><Avatar name={o.staff} g />{o.staff}</span></td>
                  <td className="mk-hide-sm">{o.due}{overdue && <> <Chip tone="bad">Overdue</Chip></>}</td>
                  <td style={{ minWidth: "6em" }}>
                    <div className="mk-stages">
                      {[1, 2, 3].map((s) => <span key={s} className={`mk-stage ${s <= step ? (step === 3 ? "done" : "on") : ""}`} />)}
                    </div>
                  </td>
                  <td><StageChip stage={o.stage} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function OrderStatusPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="reports" title="Reports" path="/reports/order-status" theme={theme} label="Order tracking with items in process, ready and delivered">
      <OrderTrackingBody />
    </ProductWindow>
  );
}

export function PurchaseInvoicePreview({ theme }: { theme?: "light" | "dark" }) {
  const rows = [
    ["Premium Wash & Wear", "40 m", "1,050", "42,000"],
    ["Khaddar — Charcoal", "30 m", "720", "21,600"],
    ["Metal Buttons", "20 set", "300", "6,000"],
  ];
  return (
    <ProductWindow nav="purchases" title="Purchase Invoices" path="/invoices/purchase/new" theme={theme} label="Purchase invoice from a vendor with catalogue lines that add to stock">
      <div className="mk-body">
        <PageHeader crumb={["Purchase invoices", "New"]} title="New purchase invoice" sub="PI-0023 · reorder from low stock" actions={<><Btn v="ghost">Cancel</Btn><Btn v="primary" Icon={Save}>Save purchase</Btn></>} />
        <Card flush>
          <div className="mk-sec">
            <div className="mk-g mk-g3" style={{ gap: "0.8em" }}>
              <Field label="Vendor" req value="Al-Noor Fabrics" focus />
              <Field label="Date" value="03 Nov 2026" />
              <Field label="Reference" value="Bill #A-2291" muted />
            </div>
          </div>
          <table className="mk-table">
            <thead><tr><th>Product</th><th className="num">Qty</th><th className="num mk-hide-sm">Price</th><th className="num">Amount</th><th className="mk-hide-sm">Stock</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}><td><b>{r[0]}</b></td><td className="num">{r[1]}</td><td className="num mk-hide-sm">{r[2]}</td><td className="num strong">{r[3]}</td><td className="mk-hide-sm"><Chip tone="ok">+{r[1]}</Chip></td></tr>
              ))}
            </tbody>
            <tfoot><tr><td>Total</td><td /><td className="mk-hide-sm" /><td className="num">PKR 69,600</td><td className="mk-hide-sm" /></tr></tfoot>
          </table>
          <div className="mk-sec"><div className="mk-note mk-note--brass"><Info />Lines linked to catalogue products add their quantity to stock. Free-text lines don&apos;t touch stock.</div></div>
        </Card>
      </div>
    </ProductWindow>
  );
}

export function ReceivePaymentPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="payments" title="Payments" path="/payments/receive?customer=ahmed-khan" theme={theme} label="Receive payment screen with open invoices for the customer and payment methods">
      <div className="mk-body">
        <PageHeader crumb={["Payments", "Receive"]} title="Receive payment" sub="PMT-0313" actions={<Btn v="primary" Icon={Save}>Record payment</Btn>} />
        <div className="mk-g mk-g-form">
          <Card flush>
            <div className="mk-sec">
              <div className="mk-sec-t">Customer</div>
              <div className="mk-sec-s">Their open invoices appear below</div>
              <Field label="Customer" req value="Ahmed Khan · balance PKR 18,000" Icon={UserRound} />
            </div>
            <div className="mk-sec">
              <div className="mk-sec-t">Apply to</div>
              <div className="mk-sec-s">Pick an invoice — the amount pre-fills with its balance</div>
              <div className="mk-stack" style={{ gap: "0.5em" }}>
                {[["SI-0148", "03 Nov · total 18,500", "10,000", true], ["SI-0131", "19 Oct · total 9,500", "8,000", false], ["On account", "Not linked to an invoice", "—", false]].map(([a, b, c, on]) => (
                  <div key={String(a)} className="mk-line" style={{ flexDirection: "row", alignItems: "center", padding: "0.7em 0.9em", borderColor: on ? "var(--a-brass)" : undefined, background: on ? "var(--a-brass-tint)" : undefined }}>
                    <span className="mk-check" style={on ? undefined : { background: "transparent", border: "1px solid var(--a-border-strong)", color: "transparent" }}>✓</span>
                    <span className="mk-li-main mk-small"><b>{a}</b><span>{b}</span></span>
                    <b className="mk-small mk-num">{c}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="mk-sec">
              <div className="mk-g mk-g3" style={{ gap: "0.8em" }}>
                <Field label="Amount" req value="10,000" sfx="PKR" focus hint="Can't exceed the invoice balance" />
                <Field label="Method" value="Bank transfer" />
                <Field label="Reference" value="IBFT 448120" muted />
              </div>
            </div>
          </Card>
          <Card title="After this payment" className="mk-hide-sm">
            <Kv k="SI-0148 balance" v="PKR 0" />
            <Kv k="Customer balance" v="PKR 8,000" grand bal />
            <div className="mk-note" style={{ marginTop: "0.7em" }}><Info />Invoice paid always equals the sum of its linked payments.</div>
          </Card>
        </div>
      </div>
    </ProductWindow>
  );
}

export function PaymentsListPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="payments" title="Payments" path="/payments" theme={theme} label="Payments list with receipt numbers, linked invoices, methods and amounts">
      <div className="mk-body">
        <PageHeader title="Payments" sub="Receipts and payments" actions={<><Btn Icon={Download}>Export</Btn><Btn v="primary" Icon={Plus}>Receive payment</Btn></>} />
        <Card flush>
          <div className="mk-toolbar"><span className="mk-input mk-input--muted"><Search />Search payments…</span><span className="mk-filter on">All methods</span><span className="mk-filter">Cash</span><span className="mk-filter mk-hide-sm">Bank transfer</span><span className="mk-filter mk-hide-sm">Cheque</span></div>
          <table className="mk-table">
            <thead><tr><th>Receipt</th><th>Customer</th><th className="mk-hide-sm">Invoice</th><th className="mk-hide-sm">Method</th><th className="mk-hide-sm">Date</th><th className="num">Amount</th></tr></thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.no}>
                  <td><span className="mk-link">{p.no}</span></td>
                  <td>{p.customer}</td>
                  <td className="mk-hide-sm">{p.inv === "On account" ? <Chip plain>On account</Chip> : <span className="mk-link">{p.inv}</span>}</td>
                  <td className="mk-hide-sm"><Chip tone={p.method === "Cash" ? "brass" : p.method === "Cheque" ? "ok" : "info"} plain>{p.method}</Chip></td>
                  <td className="muted mk-hide-sm">{p.date}</td>
                  <td className="num strong">{formatPKR(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </ProductWindow>
  );
}
