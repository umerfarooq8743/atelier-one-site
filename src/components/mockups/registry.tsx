import type { ComponentType } from "react";
import type { ScreenId } from "@/data/types";
import { DashboardPreview } from "./DashboardPreview";
import { Customer360Preview, CustomerListPreview } from "./CustomerPreview";
import { MeasurementPreview } from "./MeasurementPreview";
import { InventoryPreview, ProductListPreview, StockMovementPreview, VendorPreview } from "./InventoryPreview";
import {
  InvoiceDetailPreview,
  OrderStatusPreview,
  PaymentsListPreview,
  PurchaseInvoicePreview,
  ReceivePaymentPreview,
  SaleInvoiceFormPreview,
} from "./InvoicePreview";
import { EmployeeListPreview, EmployeeProfilePreview, ExpensePreview, WagePreview } from "./EmployeePreview";
import { InventoryReportPreview, ProfitLossPreview, ReportsOverviewPreview, StaffWorkPreview } from "./ReportsPreview";
import { ActivityLogPreview, RolesPreview, SettingsPreview, UsersPreview } from "./PermissionsPreview";

type ScreenComponent = ComponentType<{ theme?: "light" | "dark" }>;

export const screens: Record<ScreenId, ScreenComponent> = {
  dashboard: DashboardPreview,
  "customers-list": CustomerListPreview,
  "customer-360": Customer360Preview,
  measurements: MeasurementPreview,
  "products-list": ProductListPreview,
  inventory: InventoryPreview,
  "stock-movements": StockMovementPreview,
  "sale-invoice-form": SaleInvoiceFormPreview,
  "invoice-detail": InvoiceDetailPreview,
  "order-tracking": OrderStatusPreview,
  "purchase-invoice": PurchaseInvoicePreview,
  "receive-payment": ReceivePaymentPreview,
  "payments-list": PaymentsListPreview,
  "employees-list": EmployeeListPreview,
  "employee-profile": EmployeeProfilePreview,
  wages: WagePreview,
  expenses: ExpensePreview,
  vendors: VendorPreview,
  "reports-overview": ReportsOverviewPreview,
  "profit-loss": ProfitLossPreview,
  "inventory-report": InventoryReportPreview,
  "staff-work": StaffWorkPreview,
  users: UsersPreview,
  roles: RolesPreview,
  "activity-log": ActivityLogPreview,
  settings: SettingsPreview,
};

export function Screen({ id, theme }: { id: ScreenId; theme?: "light" | "dark" }) {
  const C = screens[id];
  return <C theme={theme} />;
}
