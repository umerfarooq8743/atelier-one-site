import { test } from "node:test";
import assert from "node:assert/strict";
import { buildInquiryMessage, buildWhatsAppUrl, normalizeWhatsAppNumber, sanitizeText } from "../src/lib/whatsapp.ts";

const fields = {
  name: "  Ahmed   Khan ",
  business: "Khan Tailors & Co.",
  phone: "+92 300-123 4567",
  email: "ahmed@example.com",
  businessType: "Tailoring Shops",
  module: "Measurements",
  message: "Hello!\r\n\r\n\r\n\r\nWe have 4 tailors.\u0000",
};

test("normalizes WhatsApp numbers to digits only", () => {
  assert.equal(normalizeWhatsAppNumber("+92 300-123 4567"), "923001234567");
  assert.equal(normalizeWhatsAppNumber("0092 (300) 1234567"), "923001234567");
  assert.equal(normalizeWhatsAppNumber(""), null);
  assert.equal(normalizeWhatsAppNumber(undefined), null);
  assert.equal(normalizeWhatsAppNumber("12345"), null);
  assert.equal(normalizeWhatsAppNumber("1".repeat(16)), null);
});

test("sanitizes control characters and whitespace", () => {
  assert.equal(sanitizeText("  a \t b\u0000c​ "), "a bc");
  assert.equal(sanitizeText("x".repeat(50), 10).length, 10);
  assert.equal(sanitizeText("a\n\n\n\nb", 100, true), "a\n\nb");
  assert.equal(sanitizeText("a\nb"), "a b");
});

test("builds the documented inquiry message", () => {
  const msg = buildInquiryMessage(fields);
  assert.match(msg, /^Hello Atelier One Team,/);
  assert.match(msg, /Name: Ahmed Khan\n/);
  assert.match(msg, /Business: Khan Tailors & Co\.\n/);
  assert.match(msg, /Interested In: Measurements\n/);
  assert.match(msg, /Message:\nHello!\n\nWe have 4 tailors\.\n/);
  assert.match(msg, /Please contact me with more information\.$/);
  assert.ok(!msg.includes("\u0000"));
});

test("optional fields fall back to clear text", () => {
  const msg = buildInquiryMessage({ ...fields, email: "", message: "   " });
  assert.match(msg, /Email: Not provided/);
  assert.match(msg, /No additional message\./);
});

test("builds a properly encoded wa.me URL", () => {
  const msg = buildInquiryMessage(fields);
  const url = buildWhatsAppUrl("923001234567", msg);
  assert.ok(url.startsWith("https://wa.me/923001234567?text="));
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get("text"), msg);
  assert.ok(!url.includes(" ") && !url.includes("\n") && !url.includes("&B"));
  assert.ok(url.includes("%26"), "ampersand is encoded");
});
