import { BadgeCheck, HandCoins, Link2, Lock, Plus, Search, Wallet } from "lucide-react";
import { employees, expenses } from "@/data/sample";
import { formatPKR } from "@/lib/utils";
import { Avatar, Btn, Card, Chip, Kv, PageHeader, StageChip, StatCard } from "./primitives";
import { ProductWindow } from "./ProductWindow";

export function EmployeeListPreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="employees" title="Employees" path="/employees" theme={theme} label="Employee list with job type, wage, loan balance and open work">
      <div className="mk-body">
        <PageHeader title="Employees" sub="8 active staff" actions={<Btn v="primary" Icon={Plus}>New employee</Btn>} />
        <div className="mk-g mk-g4">
          <StatCard label="Active staff" value="8" Icon={BadgeCheck} />
          <StatCard label="Monthly wages" prefix="PKR" value="196K" Icon={Wallet} tone="brass" />
          <StatCard label="Loans outstanding" prefix="PKR" value="20K" Icon={HandCoins} tone="warn" />
          <StatCard label="Open items" value="14" Icon={BadgeCheck} tone="info" />
        </div>
        <Card flush>
          <div className="mk-toolbar"><span className="mk-input mk-input--muted"><Search />Search employees…</span><span className="mk-filter on">All</span><span className="mk-filter">Tailor</span><span className="mk-filter mk-hide-sm">Cutter</span></div>
          <table className="mk-table">
            <thead><tr><th>Employee</th><th className="mk-hide-sm">Job type</th><th className="num mk-hide-sm">Monthly wage</th><th className="num">Loan balance</th><th className="num mk-hide-sm">Open items</th></tr></thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.name}>
                  <td><span className="mk-cell-user"><Avatar name={e.name} /><span><b>{e.name}</b><span className="mk-show-sm">{e.job}</span></span></span></td>
                  <td className="mk-hide-sm"><Chip plain>{e.job}</Chip></td>
                  <td className="num mk-hide-sm">{formatPKR(e.wage)}</td>
                  <td className="num">{e.loan ? <b className="mk-warn">{formatPKR(e.loan)}</b> : <span className="mk-muted">—</span>}</td>
                  <td className="num mk-hide-sm">{e.open}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </ProductWindow>
  );
}

export function EmployeeProfilePreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="employees" title="Employees" path="/employees/usman" theme={theme} label="Employee profile with assigned work, loans and wage ledger">
      <div className="mk-body">
        <PageHeader crumb={["Employees", "Usman"]} title="Usman" sub="Tailor · PKR 25,000 / month" actions={<><Btn Icon={HandCoins}>Give loan</Btn><Btn v="primary" Icon={Wallet}>Pay wage</Btn></>} />
        <div className="mk-g mk-g4">
          <StatCard label="Assigned items" value="14" Icon={BadgeCheck} />
          <StatCard label="Delivered" value="9" Icon={BadgeCheck} tone="ok" />
          <StatCard label="Loan owed" prefix="PKR" value="12,000" Icon={HandCoins} tone="warn" />
          <StatCard label="Wages paid (yr)" prefix="PKR" value="250K" Icon={Wallet} tone="brass" />
        </div>
        <div className="mk-tabs"><span className="on">Assigned work</span><span>Loans</span><span>Wages</span><span className="mk-hide-sm">Activity</span></div>
        <div className="mk-g mk-g-main">
          <Card title="Assigned work" meta="Order items and their stage" flush>
            <table className="mk-table">
              <thead><tr><th>Item</th><th className="mk-hide-sm">Invoice</th><th className="mk-hide-sm">Due</th><th>Stage</th></tr></thead>
              <tbody>
                <tr><td><b>Kurta Pajama — Egyptian Cotton</b><div className="mk-xs mk-muted">Ahmed Khan</div></td><td className="mk-hide-sm"><span className="mk-link">SI-0148</span></td><td className="mk-hide-sm">06 Nov</td><td><StageChip stage="ready" /></td></tr>
                <tr><td><b>Shalwar Kameez — Wash &amp; Wear</b><div className="mk-xs mk-muted">Hamza Iqbal</div></td><td className="mk-hide-sm"><span className="mk-link">SI-0146</span></td><td className="mk-hide-sm">05 Nov</td><td><StageChip stage="in_process" /></td></tr>
                <tr><td><b>Shalwar Kameez — Lawn</b><div className="mk-xs mk-muted">Zain Abbas</div></td><td className="mk-hide-sm"><span className="mk-link">SI-0140</span></td><td className="mk-hide-sm">30 Oct</td><td><StageChip stage="delivered" /></td></tr>
              </tbody>
            </table>
          </Card>
          <Card title="Loans">
            <Kv k="Loan · 05 Sep" v="PKR 20,000" />
            <Kv k="Repaid · 01 Oct" v="− PKR 4,000" />
            <Kv k="Repaid · 01 Nov" v="− PKR 4,000" />
            <Kv k="Still owed" v="PKR 12,000" grand bal />
            <div className="mk-hint" style={{ marginTop: "0.5em" }}>Repayments can&apos;t exceed what is owed.</div>
          </Card>
        </div>
      </div>
    </ProductWindow>
  );
}

export function WagePreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="employees" title="Employees" path="/employees/usman?tab=wages" theme={theme} label="Wage ledger where each payment links to an automatically created salary expense">
      <div className="mk-body">
        <PageHeader crumb={["Employees", "Usman", "Wages"]} title="Wage ledger" sub="Each payment creates a linked salary expense" actions={<Btn v="primary" Icon={Plus}>Pay wage</Btn>} />
        <Card flush>
          <table className="mk-table">
            <thead><tr><th>Date</th><th>Period</th><th className="num">Amount</th><th className="mk-hide-sm">Method</th><th>Salary expense</th></tr></thead>
            <tbody>
              {["November", "October", "September", "August"].map((m, i) => (
                <tr key={m} className={i === 0 ? "mk-row-hl" : undefined}>
                  <td className="muted">01 {["Nov", "Oct", "Sep", "Aug"][i]}</td>
                  <td><b>{m === "November" ? "October wage" : `${["", "September", "August", "July"][i]} wage`}</b></td>
                  <td className="num strong">{formatPKR(25_000)}</td>
                  <td className="muted mk-hide-sm">{i % 2 ? "Bank transfer" : "Cash"}</td>
                  <td><span className="mk-row" style={{ gap: "0.4em" }}><Link2 style={{ width: "1em", color: "var(--a-brass)" }} /><Chip tone="brass" plain>Created automatically</Chip></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="mk-note mk-note--brass"><Link2 />Deleting a wage payment also deletes its salary expense. The expense itself is locked in Expenses and links back here.</div>
      </div>
    </ProductWindow>
  );
}

export function ExpensePreview({ theme }: { theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="expenses" title="Expenses" path="/expenses" theme={theme} label="Expense list by category with locked salary expenses created from wages">
      <div className="mk-body">
        <PageHeader title="Expenses" sub="November · PKR 138,800" actions={<Btn v="primary" Icon={Plus}>New expense</Btn>} />
        <div className="mk-g mk-g4">
          <StatCard label="This month" prefix="PKR" value="138.8K" Icon={Wallet} tone="brass" />
          <StatCard label="Salaries" prefix="PKR" value="45K" Icon={BadgeCheck} foot="from wages" />
          <StatCard label="Rent" prefix="PKR" value="70K" Icon={Wallet} />
          <StatCard label="Other" prefix="PKR" value="23.8K" Icon={Wallet} />
        </div>
        <Card flush>
          <div className="mk-toolbar"><span className="mk-filter on">All</span><span className="mk-filter">Salary</span><span className="mk-filter">Rent</span><span className="mk-filter mk-hide-sm">Utilities</span><span className="mk-filter mk-hide-sm">Supplies</span></div>
          <table className="mk-table">
            <thead><tr><th>Date</th><th>Category</th><th className="mk-hide-sm">Description</th><th className="num">Amount</th><th className="mk-hide-sm" /></tr></thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i}>
                  <td className="muted">{e.date}</td>
                  <td><Chip tone={e.wage ? "brass" : "neutral"} plain>{e.cat}</Chip></td>
                  <td className="mk-hide-sm">{e.desc}</td>
                  <td className="num strong">{formatPKR(e.amount)}</td>
                  <td className="mk-hide-sm">{e.wage && <span className="mk-row mk-xs mk-muted" style={{ gap: "0.3em" }}><Lock style={{ width: "1.1em" }} />From wage</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </ProductWindow>
  );
}
