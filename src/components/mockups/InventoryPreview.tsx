import { AlertTriangle, ArrowDownRight, ArrowUpRight, Boxes, Download, Pencil, Plus, Search, SlidersHorizontal, Truck } from "lucide-react";
import { movements, products, vendors } from "@/data/sample";
import { formatPKR } from "@/lib/utils";
import { Btn, Card, Chip, Field, Kv, PageHeader, StatCard } from "./primitives";
import { ProductWindow } from "./ProductWindow";

function stockChip(stock: number | null, min: number | null) {
  if (stock === null || min === null) return <Chip plain>Service</Chip>;
  if (stock < min) return <Chip tone="bad">Low · {stock}</Chip>;
  return <Chip tone="ok">{stock} in stock</Chip>;
}

function ProductTable({ lowOnly = false }: { lowOnly?: boolean }) {
  const rows = lowOnly ? products.filter((p) => p.stock !== null && p.min !== null && p.stock < p.min) : products;
  return (
    <table className="mk-table">
      <thead><tr><th>Product</th><th className="mk-hide-sm">Category</th><th className="mk-hide-sm">Unit</th><th className="num mk-hide-sm">Sale price</th><th>Stock</th><th className="mk-hide-sm" /></tr></thead>
      <tbody>
        {rows.map((p) => (
          <tr key={p.name} className={lowOnly && p.name === "Khaddar — Charcoal" ? "mk-row-hl" : undefined}>
            <td><b>{p.name}</b>{p.min !== null && <div className="mk-xs mk-muted">Min {p.min} {p.unit}</div>}</td>
            <td className="muted mk-hide-sm">{p.cat}</td>
            <td className="muted mk-hide-sm">{p.unit}</td>
            <td className="num mk-hide-sm">{formatPKR(p.price)}</td>
            <td>{stockChip(p.stock, p.min)}</td>
            <td className="mk-hide-sm"><span className="mk-row" style={{ gap: "0.35em", color: "var(--a-muted)" }}><SlidersHorizontal style={{ width: "1.1em" }} /><Pencil style={{ width: "1.1em" }} /></span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProductListPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="products" title="Products" path="/products" theme={theme} label="Product list of fabrics, stitching services and accessories with prices and stock status">
      <div className="mk-body">
        <PageHeader title="Products" sub="86 products · fabric, stitching services and accessories" actions={<><Btn Icon={Download}>Export</Btn><Btn v="primary" Icon={Plus}>New product</Btn></>} />
        <Card flush>
          <div className="mk-toolbar">
            <span className="mk-input mk-input--muted"><Search />Search products…</span>
            <span className="mk-filter on">All</span>
            <span className="mk-filter">Fabric</span>
            <span className="mk-filter mk-hide-sm">Stitching service</span>
            <span className="mk-filter mk-hide-sm">Accessory</span>
            <span className="mk-filter"><AlertTriangle />Low stock</span>
          </div>
          <ProductTable />
        </Card>
      </div>
    </ProductWindow>
  );
}

export function InventoryPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="products" title="Products" path="/products?lowStock=1" theme={theme} label="Inventory with low-stock filter and the adjust stock dialog">
      <div className="mk-body" style={{ position: "relative" }}>
        <PageHeader title="Inventory" sub="Stock is changed only by sales, purchases and logged adjustments" actions={<Btn v="primary" Icon={Plus}>New purchase</Btn>} />
        <div className="mk-g mk-g4">
          <StatCard label="Products" value="86" Icon={Boxes} />
          <StatCard label="Low stock" value="5" Icon={AlertTriangle} tone="bad" />
          <StatCard label="Fabric on hand" value="1,284" foot="meters" Icon={Boxes} tone="brass" />
          <StatCard label="Stock value" prefix="PKR" value="1.42M" Icon={ArrowUpRight} tone="ok" />
        </div>
        <Card flush>
          <div className="mk-toolbar">
            <span className="mk-input mk-input--muted"><Search />Search products…</span>
            <span className="mk-filter on"><AlertTriangle />Low stock</span>
          </div>
          <ProductTable lowOnly />
        </Card>
        <div className="mk-scrim" style={{ background: "rgba(10,10,12,.38)" }}>
          <div className="mk-dialog">
            <div className="mk-sec">
              <div className="mk-sec-t">Adjust stock</div>
              <div className="mk-sec-s" style={{ marginBottom: 0 }}>Khaddar — Charcoal · current 10.5 m</div>
            </div>
            <div className="mk-sec mk-stack">
              <div className="mk-seg" style={{ alignSelf: "flex-start" }}><span>+ Add</span><span className="on">− Deduct</span></div>
              <Field label="Quantity" value="1.5" sfx="m" focus req />
              <Field label="Reason" value="Cutting waste after count" />
              <Kv k="New stock" v="9 m" />
            </div>
            <div className="mk-sec mk-between"><span className="mk-xs mk-muted">Logged with before / after</span><span className="mk-actions"><Btn v="ghost" sm>Cancel</Btn><Btn v="primary" sm>Apply</Btn></span></div>
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

export function StockMovementPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="products" title="Products" path="/products/premium-wash-wear" theme={theme} label="Stock movement history for a fabric with sales, purchases and adjustments">
      <div className="mk-body">
        <PageHeader crumb={["Products", "Premium Wash & Wear"]} title="Premium Wash & Wear" sub="Fabric · meter · min 25 m" actions={<><Btn Icon={SlidersHorizontal}>Adjust stock</Btn><Btn v="primary" Icon={Pencil}>Edit</Btn></>} />
        <div className="mk-g mk-g4">
          <StatCard label="In stock" value="18 m" Icon={Boxes} tone="bad" foot="below minimum" />
          <StatCard label="Sale price" prefix="PKR" value="1,450" Icon={ArrowUpRight} />
          <StatCard label="Purchase price" prefix="PKR" value="1,050" Icon={ArrowDownRight} />
          <StatCard label="Margin" value="27.6%" Icon={ArrowUpRight} tone="ok" />
        </div>
        <Card title="Stock movements" meta="Sales, purchases and adjustments" flush>
          <table className="mk-table">
            <thead><tr><th>Date</th><th>Type</th><th className="mk-hide-sm">Reference</th><th className="num">Change</th><th className="num">Running stock</th></tr></thead>
            <tbody>
              {movements.map((m, i) => (
                <tr key={i}>
                  <td className="muted">{m.date}</td>
                  <td><Chip tone={m.type === "Sale" ? "warn" : m.type === "Purchase" ? "ok" : "info"}>{m.type}</Chip></td>
                  <td className="mk-hide-sm"><span className={m.ref.startsWith("S") || m.ref.startsWith("P") ? "mk-link" : "mk-muted"}>{m.ref}</span></td>
                  <td className={`num strong ${m.change > 0 ? "mk-ok" : "mk-bad"}`}>{m.change > 0 ? "+" : "−"}{Math.abs(m.change)} m</td>
                  <td className="num strong">{m.running} m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </ProductWindow>
  );
}

export function VendorPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="setup" title="Setup" path="/setup/vendors" theme={theme} label="Vendor list with contacts, purchase invoices, spend and status">
      <div className="mk-body">
        <PageHeader crumb={["Setup", "Vendors"]} title="Vendors" sub="Suppliers you buy fabric and accessories from" actions={<Btn v="primary" Icon={Plus}>New vendor</Btn>} />
        <Card flush>
          <div className="mk-toolbar"><span className="mk-input mk-input--muted"><Search />Search vendors…</span><span className="mk-filter on">Active</span><span className="mk-filter">Inactive</span></div>
          <table className="mk-table">
            <thead><tr><th>Vendor</th><th className="mk-hide-sm">Contact</th><th className="mk-hide-sm">Phone</th><th className="num mk-hide-sm">Invoices</th><th className="num">Spend</th><th>Status</th></tr></thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.name}>
                  <td><span className="mk-cell-user"><span className="mk-li-i"><Truck /></span><b>{v.name}</b></span></td>
                  <td className="muted mk-hide-sm">{v.contact}</td>
                  <td className="muted mk-hide-sm">{v.phone}</td>
                  <td className="num mk-hide-sm">{v.invoices}</td>
                  <td className="num strong">{formatPKR(v.spend)}</td>
                  <td>{v.active ? <Chip tone="ok">Active</Chip> : <Chip>Inactive</Chip>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </ProductWindow>
  );
}
