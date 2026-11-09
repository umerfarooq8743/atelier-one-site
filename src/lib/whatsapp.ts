/**
 * WhatsApp click-to-chat helpers. Pure functions with no dependencies so they
 * can be unit tested directly with `node --test`.
 */

export interface InquiryFields {
  name: string;
  business: string;
  phone: string;
  email: string;
  businessType: string;
  module: string;
  message: string;
}

/** Keep only digits; turns "+92 300-123 4567" into "923001234567". */
export function normalizeWhatsAppNumber(raw: string | undefined | null): string | null {
  if (!raw) return null;
  let digits = raw.replace(/\D+/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  // wa.me requires a full international number (country code + subscriber).
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

/**
 * Remove control characters, collapse runs of whitespace and trim. Line breaks
 * are kept only where `multiline` is true (the free-text message).
 */
export function sanitizeText(value: string, maxLength = 1000, multiline = false): string {
  let v = String(value ?? "");
  v = v.replace(new RegExp("[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029]", "g"), "");
  if (multiline) {
    v = v
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map((line) => line.replace(/[\t ]+/g, " ").trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  } else {
    v = v.replace(/\s+/g, " ");
  }
  return v.trim().slice(0, maxLength);
}

export function buildInquiryMessage(fields: InquiryFields): string {
  const f = {
    name: sanitizeText(fields.name, 80),
    business: sanitizeText(fields.business, 120),
    phone: sanitizeText(fields.phone, 30),
    email: sanitizeText(fields.email, 120),
    businessType: sanitizeText(fields.businessType, 60),
    module: sanitizeText(fields.module, 60),
    message: sanitizeText(fields.message, 1000, true),
  };

  const lines = [
    "Hello Atelier One Team,",
    "",
    "I am interested in learning more about Atelier One.",
    "",
    `Name: ${f.name}`,
    `Business: ${f.business}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email || "Not provided"}`,
    `Business Type: ${f.businessType}`,
    `Interested In: ${f.module}`,
    "",
    "Message:",
    f.message || "No additional message.",
    "",
    "Please contact me with more information.",
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
