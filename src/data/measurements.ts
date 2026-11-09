/**
 * Garment variants and fields exactly as defined in the product's
 * Customer model (backend/models/Customer.js). Values are sample inches.
 */

export type VariantId = "shalwarKameez" | "kurtaPajama" | "coat" | "waistcoat";

export const baseFields = [
  ["neck", "Neck"], ["shoulder", "Shoulder"], ["chest", "Chest"], ["lowerChest", "Lower chest"],
  ["waist", "Waist"], ["belly", "Belly"], ["hips", "Hips"], ["length", "Length"],
  ["sleeves", "Sleeves"], ["bottom", "Bottom"], ["collarSize", "Collar size"], ["armhole", "Armhole"], ["cuff", "Cuff"],
] as const;

export interface Variant {
  id: VariantId;
  label: string;
  extraFields: { key: string; label: string }[];
  styles: { label: string; value: string; options: string[] }[];
  values: Record<string, number>;
}

const commonStyles = (o: Partial<Record<string, string>> = {}) => [
  { label: "Collar", value: o.collar ?? "Rounded", options: ["Rounded", "Square", "No Collar"] },
  { label: "Daman", value: o.daman ?? "Rounded", options: ["Rounded", "Square"] },
  { label: "Sleeve", value: o.sleeve ?? "Full", options: ["Full", "Half", "Three-Quarter"] },
  { label: "Pocket", value: o.pocket ?? "Inside", options: ["Inside", "Outside", "None"] },
  { label: "Button", value: o.button ?? "Single Row", options: ["Single Row", "Double Row"] },
  { label: "Fit", value: o.fit ?? "Regular", options: ["Regular", "Slim", "Loose"] },
];

export const variants: Variant[] = [
  {
    id: "shalwarKameez",
    label: "Shalwar Kameez",
    extraFields: [{ key: "thigh", label: "Thigh" }, { key: "knee", label: "Knee" }],
    styles: commonStyles({ collar: "Square", daman: "Rounded" }),
    values: { neck: 15.5, shoulder: 18.25, chest: 42, lowerChest: 40.5, waist: 38, belly: 39, hips: 42.5, length: 42, sleeves: 24.75, bottom: 16, collarSize: 15.5, armhole: 19.5, cuff: 9.5, thigh: 26, knee: 18.5 },
  },
  {
    id: "kurtaPajama",
    label: "Kurta Pajama",
    extraFields: [{ key: "thigh", label: "Thigh" }, { key: "knee", label: "Knee" }],
    styles: commonStyles({ collar: "Rounded", pocket: "None", fit: "Slim" }),
    values: { neck: 15.5, shoulder: 18.25, chest: 41.5, lowerChest: 40, waist: 37.5, belly: 38.5, hips: 42, length: 40, sleeves: 24.5, bottom: 14.5, collarSize: 15.5, armhole: 19, cuff: 9.25, thigh: 25.5, knee: 18 },
  },
  {
    id: "coat",
    label: "Coat",
    extraFields: [],
    styles: [
      ...commonStyles({ button: "Single Row", pocket: "Outside", fit: "Slim" }),
      { label: "Lapel", value: "Notch", options: ["Notch", "Peak", "Shawl"] },
      { label: "Vent", value: "Double Vent", options: ["Single Vent", "Double Vent", "No Vent"] },
    ],
    values: { neck: 15.75, shoulder: 18.5, chest: 42.5, lowerChest: 41, waist: 38.5, belly: 39.5, hips: 43, length: 30.5, sleeves: 25, bottom: 21, collarSize: 15.75, armhole: 20, cuff: 11 },
  },
  {
    id: "waistcoat",
    label: "Waistcoat",
    extraFields: [],
    styles: [
      ...commonStyles({ collar: "No Collar", button: "Single Row", pocket: "Outside", fit: "Regular" }),
      { label: "Lapel", value: "Shawl", options: ["Notch", "Peak", "Shawl"] },
    ],
    values: { neck: 15.5, shoulder: 17.75, chest: 41.5, lowerChest: 40, waist: 37.5, belly: 38.5, hips: 42, length: 26.5, sleeves: 0, bottom: 20, collarSize: 15.5, armhole: 19, cuff: 0 },
  },
];

export function formatInches(v: number): string {
  if (!v) return "—";
  const whole = Math.floor(v);
  const frac = v - whole;
  const f = frac === 0.25 ? "¼" : frac === 0.5 ? "½" : frac === 0.75 ? "¾" : "";
  return `${whole}${f}`;
}
