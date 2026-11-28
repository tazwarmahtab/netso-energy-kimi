import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const source = readFileSync(new URL("../src/pages/Partners.tsx", import.meta.url), "utf8");

test("partners page contains no speculative financing or delivery guarantees", () => {
  const prohibited = [
    /Netso originates and finances distributed rooftop assets/i,
    /Non-recourse SPVs/i,
    /1\.25× target/i,
    /bankruptcy-remote vehicle/i,
    /tri-partite escrow/i,
    /Netso originates, audits the structure, finances the vehicle/i,
    /Financed, permitted projects handed over/i,
    /Project vehicle funds construction/i,
    /Predictable cash flow, no sales drag/i,
    /Expect a reply within two\s+working days/i,
    /The desk has your details/i,
    /ledger copy is still queued for review/i,
    /Bankable structures for the people/i,
    /Why EPC teams build/i,
    /Underwrite the/i,
    /The assessment produces the geometry, yield and settlement basis/i
  ];
  for (const statement of prohibited) {
    assert.doesNotMatch(source, statement, "Unsupported claim: " + String(statement));
  }
  assert.match(source, /factory (?:borrows and )?owns/i);
  assert.match(source, /partner-funded/i);
});

test("partner submission prepares unsent review without storing personal information", () => {
  assert.doesNotMatch(source, /recordLeadForDispatch/);
  assert.doesNotMatch(source, /window\.open\s*\(/);
  assert.doesNotMatch(source, /localStorage\./);
  assert.match(source, /Netso has not received/i);
  assert.match(source, /not saved on this device/i);
  assert.match(source, /href=\{getNetsoWhatsAppUrl\(summary\)\}/);
  assert.match(source, /Continue in WhatsApp/i);
  assert.match(source, /Edit enquiry/i);
  assert.match(source, /Review partnership enquiry/i);
});
