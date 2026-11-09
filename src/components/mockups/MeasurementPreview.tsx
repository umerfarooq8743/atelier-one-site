import { History, Info, Ruler, Save } from "lucide-react";
import { baseFields, formatInches, variants, type VariantId } from "@/data/measurements";
import { cn } from "@/lib/utils";
import { Btn, Card, PageHeader } from "./primitives";
import { ProductWindow } from "./ProductWindow";

/** Simple garment line drawing with the measured points highlighted. */
export function GarmentFigure({ variant }: { variant: VariantId }) {
  const isCoat = variant === "coat" || variant === "waistcoat";
  const sleeves = variant !== "waistcoat";
  return (
    <svg viewBox="0 0 200 240" style={{ width: "100%", height: "auto", maxHeight: "16em" }} aria-hidden>
      <g fill="none" stroke="var(--a-text-2)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* body */}
        <path d={isCoat ? "M70 30 L60 40 L58 150 L100 158 L142 150 L140 40 L130 30" : "M70 30 L60 40 L56 205 Q100 214 144 205 L140 40 L130 30"} />
        {/* collar */}
        <path d={variant === "waistcoat" ? "M70 30 L100 92 L130 30" : variant === "coat" ? "M70 30 L88 70 L100 110 L112 70 L130 30" : "M80 26 Q100 40 120 26 M86 30 L100 56 L114 30"} />
        {sleeves && <path d="M60 40 L34 58 L26 150 L42 152 L52 82 M140 40 L166 58 L174 150 L158 152 L148 82" />}
        {variant === "coat" && <path d="M100 110 L100 156 M82 132 h10 M108 132 h10" />}
        {!isCoat && <path d="M100 56 L100 110" strokeDasharray="2 5" />}
      </g>
      <g stroke="var(--a-brass)" strokeWidth="1.3" strokeDasharray="3 3">
        <path d="M58 64 H142" />
        <path d="M60 112 H140" />
        <path d="M150 36 V150" />
      </g>
      <g fill="var(--a-brass)">
        <circle cx="58" cy="64" r="2.6" /><circle cx="142" cy="64" r="2.6" />
        <circle cx="60" cy="112" r="2.6" /><circle cx="140" cy="112" r="2.6" />
      </g>
      <g fontSize="9" fill="var(--a-muted)" fontFamily="inherit">
        <text x="100" y="60" textAnchor="middle">Chest</text>
        <text x="100" y="108" textAnchor="middle">Waist</text>
        <text x="156" y="100">Length</text>
      </g>
    </svg>
  );
}

export function MeasurementBody({ variant = "shalwarKameez" }: { variant?: VariantId }) {
  const v = variants.find((x) => x.id === variant) ?? variants[0];
  const fields = [...baseFields.map(([key, label]) => ({ key, label })), ...v.extraFields];
  const highlight = new Set(["chest", "waist", "length"]);
  return (
    <div className="mk-body">
      <PageHeader crumb={["Customers", "Ahmed Khan", "Measurements"]} title="Measurements" sub="Values in inches, in quarter steps" actions={<><Btn Icon={History}>History</Btn><Btn v="primary" Icon={Save}>Save</Btn></>} />
      <div className="mk-seg" style={{ alignSelf: "flex-start", maxWidth: "100%", overflow: "hidden" }}>
        {variants.map((x) => <span key={x.id} className={x.id === v.id ? "on" : undefined}>{x.label}</span>)}
      </div>
      <div className="mk-g mk-g-form" style={{ gridTemplateColumns: "minmax(0,1fr) 15em" }}>
        <div className="mk-stack" style={{ gap: "1em" }}>
          <Card title="Body measurements" meta={`${fields.length} fields`}>
            <div className="mk-g mk-g4 mk-g2-keep" style={{ gap: "0.55em" }}>
              {fields.map((f) => (
                <div key={f.key} className={cn("mk-mfield", highlight.has(f.key) && "mk-mfield--hl")}>
                  <span>{f.label}</span>
                  <b>{formatInches(v.values[f.key] ?? 0)}{v.values[f.key] ? <small>in</small> : null}</b>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Style" meta={v.label}>
            <div className="mk-g mk-g4 mk-g2-keep" style={{ gap: "0.55em" }}>
              {v.styles.map((s) => (
                <div key={s.label} className="mk-mfield">
                  <span>{s.label}</span>
                  <b style={{ fontSize: "0.86em" }}>{s.value}</b>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="mk-stack mk-hide-sm" style={{ gap: "1em" }}>
          <Card title="Fit guide"><GarmentFigure variant={v.id} /></Card>
          <div className="mk-note mk-note--brass"><Info />Each invoice line saves a snapshot of these values, so later changes never alter past orders.</div>
          <Card title="History" meta={<Ruler style={{ width: "1em" }} />}>
            <div className="mk-li"><span className="mk-li-main"><b>21 Oct 2026</b><span>Chest 41½ → 42</span></span></div>
            <div className="mk-li"><span className="mk-li-main"><b>12 Mar 2026</b><span>First recorded</span></span></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function MeasurementPreview({ variant, theme }: { variant?: VariantId; theme?: "light" | "dark" }) {
  return (
    <ProductWindow nav="customers" title="Customers" path="/customers/ahmed-khan/measurements" theme={theme} label="Garment measurement form for Shalwar Kameez with body measurements and style options">
      <MeasurementBody variant={variant} />
    </ProductWindow>
  );
}
