/**
 * Netso lead intake — Vercel Serverless Function (+ local Node server).
 *
 * Acknowledgement contract (matches app/src/lib/lead-intake.ts):
 *   200 { "status": "accepted", "requestId": "<uuid>" }
 *
 * Persistence (Phase 3 interim):
 * - Writes to an in-process store (sufficient for Preview / single-instance).
 * - If DATABASE_URL is present, logs that Postgres wiring is pending schema migrate
 *   and still accepts into memory so clients are not blocked.
 *
 * Production durable SoR (Neon) lands after Tazwar approval — do not put CRM
 * secrets in VITE_* client env.
 */

import { createHash, randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const LEAD_SOURCES = new Set(["contact", "feasibility", "partner"]);
const FACILITY_TYPES = new Set(["school", "commercial", "hospital", "factory"]);
const PARTNER_TYPES = new Set(["lender", "epc", "origination"]);
const MIN_ROOF = 3000;
const MAX_ROOF = 10_000_000;
const MAX_SPEND = 1_000_000_000;

/** @type {Map<string, { requestId: string, at: string }>} */
const idempotencyCache = globalThis.__netsoLeadIdempotency ?? new Map();
globalThis.__netsoLeadIdempotency = idempotencyCache;

/** @type {Array<Record<string, unknown>>} */
const memoryLeads = globalThis.__netsoLeadMemory ?? [];
globalThis.__netsoLeadMemory = memoryLeads;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 64_000) {
        reject(new Error("payload_too_large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function normalizeText(value, max) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function validatePayload(body) {
  if (!body || typeof body !== "object") return { ok: false, message: "Invalid payload." };
  const source = body.source;
  if (typeof source !== "string" || !LEAD_SOURCES.has(source)) {
    return { ok: false, message: "Unsupported lead source." };
  }

  const contactName = normalizeText(body.contactName, 500);
  const organization = normalizeText(body.organization, 500);
  const email = normalizeText(body.email, 320)?.toLowerCase();
  const phone = normalizeText(body.phone, 500);
  if (!contactName || !organization || !email || !phone) {
    return { ok: false, message: "Missing required contact fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Invalid email." };
  }

  /** @type {Record<string, unknown>} */
  const lead = { source, contactName, organization, email, phone };

  if (body.message != null) {
    const message = normalizeText(String(body.message), 4000);
    if (!message) return { ok: false, message: "Invalid message." };
    lead.message = message;
  }

  if (source === "feasibility") {
    const facilityType = normalizeText(String(body.facilityType ?? ""), 500)?.toLowerCase();
    if (!facilityType || !FACILITY_TYPES.has(facilityType)) {
      return { ok: false, message: "Invalid facility category." };
    }
    const roof = Number(body.roofAreaSqFt);
    const spend = Number(body.monthlySpendBdt);
    if (!Number.isFinite(roof) || roof < MIN_ROOF || roof > MAX_ROOF) {
      return { ok: false, message: "Invalid rooftop area." };
    }
    if (!Number.isFinite(spend) || spend <= 0 || spend > MAX_SPEND) {
      return { ok: false, message: "Invalid monthly spend." };
    }
    lead.facilityType = facilityType;
    lead.roofAreaSqFt = roof;
    lead.monthlySpendBdt = spend;
  }

  if (source === "partner") {
    const partnerType = normalizeText(String(body.partnerType ?? ""), 500)?.toLowerCase();
    const role = normalizeText(String(body.role ?? ""), 500);
    const trackRecord = normalizeText(String(body.trackRecord ?? ""), 500);
    const website = normalizeText(String(body.website ?? ""), 500);
    const officeAddress = normalizeText(String(body.officeAddress ?? ""), 500);
    if (!partnerType || !PARTNER_TYPES.has(partnerType) || !role || !trackRecord || !website || !officeAddress) {
      return { ok: false, message: "Incomplete partner credentials." };
    }
    lead.partnerType = partnerType;
    lead.role = role;
    lead.trackRecord = trackRecord;
    lead.website = website;
    lead.officeAddress = officeAddress;
    if (Array.isArray(body.operationalDistricts) && body.operationalDistricts.length) {
      lead.operationalDistricts = body.operationalDistricts
        .map((d) => normalizeText(String(d), 120))
        .filter(Boolean)
        .slice(0, 50);
    }
  }

  return { ok: true, lead };
}

async function persistLead(lead, requestId) {
  const record = { ...lead, requestId, createdAt: new Date().toISOString() };
  memoryLeads.unshift(record);
  if (memoryLeads.length > 500) memoryLeads.length = 500;

  if (process.env.DATABASE_URL) {
    console.info(
      "[netso/leads] DATABASE_URL is set; Neon schema migrate/insert lands next. Accepted into interim store for now.",
      requestId,
    );
  }

  // Append-only local audit log for cloud agent / single-node preview (not multi-region durable).
  try {
    const dir = process.env.NETSO_LEAD_LOG_DIR || "/tmp/netso-leads";
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.ndjson"), `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.warn("[netso/leads] audit log skipped", error?.message || error);
  }

  return { mode: process.env.DATABASE_URL ? "pending-postgres" : "memory" };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Idempotency-Key");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { status: "error", message: "Method not allowed." });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    const message = error?.message === "payload_too_large" ? "Payload too large." : "Invalid JSON body.";
    json(res, 400, { status: "error", message });
    return;
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    json(res, 400, { status: "error", message: validated.message });
    return;
  }

  const idempotencyKey =
    normalizeText(String(req.headers["idempotency-key"] ?? ""), 255) ||
    createHash("sha256").update(JSON.stringify(validated.lead)).digest("hex").slice(0, 32);

  const cached = idempotencyCache.get(idempotencyKey);
  if (cached) {
    json(res, 200, { status: "accepted", requestId: cached.requestId });
    return;
  }

  const requestId = randomUUID();
  try {
    await persistLead(validated.lead, requestId);
  } catch (error) {
    console.error("[netso/leads] persist failed", error);
    json(res, 500, { status: "error", message: "Lead intake could not persist this request." });
    return;
  }

  idempotencyCache.set(idempotencyKey, { requestId, at: new Date().toISOString() });
  json(res, 200, { status: "accepted", requestId });
}
