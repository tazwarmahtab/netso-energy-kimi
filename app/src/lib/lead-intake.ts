/**
 * Provider-neutral lead intake client.
 *
 * The browser can validate and send a lead to a configured backend endpoint,
 * but it must not pretend that browser storage is a durable delivery system.
 * A successful response is treated as an acknowledgement from the intake
 * service, not as independent proof that the service persisted the lead.
 */

export const LEAD_SOURCES = ["contact", "feasibility", "partner"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const FACILITY_TYPES = ["school", "commercial", "hospital", "factory"] as const;
export type FacilityType = (typeof FACILITY_TYPES)[number];

export const PARTNER_TYPES = ["lender", "epc", "origination"] as const;
export type PartnerType = (typeof PARTNER_TYPES)[number];

export interface LeadIntakeInput {
  source: LeadSource;
  contactName: string;
  organization: string;
  email: string;
  phone: string;
  message?: string;
  facilityType?: string;
  roofAreaSqFt?: string | number;
  monthlySpendBdt?: string | number;
  partnerType?: string;
  role?: string;
  trackRecord?: string;
  website?: string;
  officeAddress?: string;
  operationalDistricts?: string[];
  idempotencyKey?: string;
}

export interface NormalizedLeadPayload {
  source: LeadSource;
  contactName: string;
  organization: string;
  email: string;
  phone: string;
  message?: string;
  facilityType?: FacilityType;
  roofAreaSqFt?: number;
  monthlySpendBdt?: number;
  partnerType?: PartnerType;
  role?: string;
  trackRecord?: string;
  website?: string;
  officeAddress?: string;
  operationalDistricts?: string[];
}

export type LeadValidationResult =
  | { ok: true; payload: NormalizedLeadPayload }
  | { ok: false; message: string };

export type LeadIntakeResult =
  | { status: "accepted"; message: string; requestId: string }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string }
  | { status: "unknown"; message: string };

export interface LeadIntakeSubmitOptions {
  signal?: AbortSignal;
}

export interface LeadIntakeClient {
  submit(payload: LeadIntakeInput, options?: LeadIntakeSubmitOptions): Promise<LeadIntakeResult>;
}

export interface LeadIntakeClientOptions {
  endpoint?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export const MAX_TEXT_LENGTH = 500;
export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_REQUEST_ID_LENGTH = 200;
export const MAX_IDEMPOTENCY_KEY_LENGTH = 255;
export const DEFAULT_TIMEOUT_MS = 10_000;
export const MAX_TIMEOUT_MS = 30_000;
export const MAX_OPERATIONAL_DISTRICTS = 50;

// These are application input bounds, not a statement about a legal or
// regulatory qualification threshold.
export const MIN_ROOF_AREA_SQ_FT = 3000;
export const MAX_ROOF_AREA_SQ_FT = 10_000_000;
export const MAX_MONTHLY_SPEND_BDT = 1_000_000_000;
const MAX_ACKNOWLEDGEMENT_BODY_LENGTH = 16_384;
const MAX_SAFE_INPUT_NUMBER = Number.MAX_SAFE_INTEGER;

type UnknownRecord = Record<string, unknown>;
type ParseResult<T> = { ok: true; value: T } | { ok: false; message: string };

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function normalizeOptionalText(value: unknown): string | undefined {
  const normalized = normalizeText(value);
  return normalized || undefined;
}

function parseRequiredText(value: unknown, label: string, maxLength: number): ParseResult<string> {
  if (typeof value !== "string") {
    return { ok: false, message: `Please provide a valid ${label}.` };
  }

  const normalized = normalizeText(value);
  if (!normalized) {
    return { ok: false, message: `Please complete the required ${label}.` };
  }
  if (normalized.length > maxLength) {
    return { ok: false, message: `Please keep ${label} to ${maxLength} characters or fewer.` };
  }

  return { ok: true, value: normalized };
}

function parseOptionalText(value: unknown, label: string, maxLength: number): ParseResult<string | undefined> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }
  if (typeof value !== "string") {
    return { ok: false, message: `Please provide a valid ${label}.` };
  }

  const normalized = normalizeOptionalText(value);
  if (!normalized) {
    return { ok: true, value: undefined };
  }
  if (normalized.length > maxLength) {
    return { ok: false, message: `Please keep ${label} to ${maxLength} characters or fewer.` };
  }

  return { ok: true, value: normalized };
}

function isFacilityType(value: string): value is FacilityType {
  return (FACILITY_TYPES as readonly string[]).includes(value);
}

function isPartnerType(value: string): value is PartnerType {
  return (PARTNER_TYPES as readonly string[]).includes(value);
}

function parseSafeNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return Number.isFinite(value) && Math.abs(value) <= MAX_SAFE_INPUT_NUMBER ? value : undefined;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const candidate = value.trim();
  if (!candidate) {
    return undefined;
  }

  // Do not accept exponent, hexadecimal, or malformed comma-group syntax.
  if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(candidate)) {
    return undefined;
  }

  const parsed = Number(candidate.replace(/,/g, ""));
  return Number.isFinite(parsed) && Math.abs(parsed) <= MAX_SAFE_INPUT_NUMBER ? parsed : undefined;
}

function parseOptionalNumber(value: unknown, label: string): ParseResult<number | undefined> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }
  if (typeof value === "string" && !value.trim()) {
    return { ok: true, value: undefined };
  }

  const parsed = parseSafeNumber(value);
  return parsed === undefined
    ? { ok: false, message: `Please provide a valid ${label}.` }
    : { ok: true, value: parsed };
}

function parseOperationalDistricts(value: unknown): ParseResult<string[] | undefined> {
  if (value === undefined) {
    return { ok: true, value: undefined };
  }
  if (!Array.isArray(value)) {
    return { ok: false, message: "Please provide operational districts as a list." };
  }
  if (value.length > MAX_OPERATIONAL_DISTRICTS) {
    return { ok: false, message: `Please select no more than ${MAX_OPERATIONAL_DISTRICTS} operational districts.` };
  }

  const districts: string[] = [];
  for (const district of value) {
    if (typeof district !== "string") {
      return { ok: false, message: "Please provide operational districts as a list of names." };
    }

    const normalized = normalizeText(district);
    if (!normalized || normalized.length > MAX_TEXT_LENGTH) {
      return { ok: false, message: "Please provide valid operational district names." };
    }
    if (!districts.includes(normalized)) {
      districts.push(normalized);
    }
  }

  return { ok: true, value: districts };
}

function invalid(message: string): LeadValidationResult {
  return { ok: false, message };
}

/**
 * Trim and validate form values before they cross the provider boundary.
 * This function has no browser or network side effects and is safe to test
 * independently of the configured provider.
 */
export function normalizeLeadPayload(input: LeadIntakeInput): LeadValidationResult {
  if (!isRecord(input)) {
    return invalid("Please review the required lead details and try again.");
  }

  const source = input.source;
  if (typeof source !== "string" || !(LEAD_SOURCES as readonly string[]).includes(source)) {
    return invalid("This lead form is not configured correctly. Please try again.");
  }

  const contactName = parseRequiredText(input.contactName, "contact name", MAX_TEXT_LENGTH);
  const organization = parseRequiredText(input.organization, "organization", MAX_TEXT_LENGTH);
  const email = parseRequiredText(input.email, "work email", 320);
  const phone = parseRequiredText(input.phone, "phone number", MAX_TEXT_LENGTH);
  if (!contactName.ok || !organization.ok || !email.ok || !phone.ok) {
    const firstError = [contactName, organization, email, phone].find((result) => !result.ok);
    return invalid(firstError?.message ?? "Please complete the required contact details.");
  }

  const normalizedEmail = email.value.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return invalid("Please enter a valid work email address.");
  }

  const message = parseOptionalText(input.message, "your message", MAX_MESSAGE_LENGTH);
  const facilityType = parseOptionalText(input.facilityType, "facility category", MAX_TEXT_LENGTH);
  const roofAreaSqFt = parseOptionalNumber(input.roofAreaSqFt, "rooftop area");
  const monthlySpendBdt = parseOptionalNumber(input.monthlySpendBdt, "monthly electricity bill");
  const partnerType = parseOptionalText(input.partnerType, "partnership category", MAX_TEXT_LENGTH);
  const role = parseOptionalText(input.role, "role", MAX_TEXT_LENGTH);
  const trackRecord = parseOptionalText(input.trackRecord, "track record", MAX_TEXT_LENGTH);
  const website = parseOptionalText(input.website, "company website", MAX_TEXT_LENGTH);
  const officeAddress = parseOptionalText(input.officeAddress, "office address", MAX_TEXT_LENGTH);
  const operationalDistricts = parseOperationalDistricts(input.operationalDistricts);
  if (!message.ok) return invalid(message.message);
  if (!facilityType.ok) return invalid(facilityType.message);
  if (!roofAreaSqFt.ok) return invalid(roofAreaSqFt.message);
  if (!monthlySpendBdt.ok) return invalid(monthlySpendBdt.message);
  if (!partnerType.ok) return invalid(partnerType.message);
  if (!role.ok) return invalid(role.message);
  if (!trackRecord.ok) return invalid(trackRecord.message);
  if (!website.ok) return invalid(website.message);
  if (!officeAddress.ok) return invalid(officeAddress.message);
  if (!operationalDistricts.ok) return invalid(operationalDistricts.message);

  const facilityTypeCandidate = facilityType.value?.toLowerCase();
  const normalizedFacilityType: FacilityType | undefined =
    facilityTypeCandidate === undefined
      ? undefined
      : isFacilityType(facilityTypeCandidate)
        ? facilityTypeCandidate
        : undefined;
  if (facilityTypeCandidate && !normalizedFacilityType) {
    return invalid("Please select a supported facility category.");
  }

  const partnerTypeCandidate = partnerType.value?.toLowerCase();
  const normalizedPartnerType: PartnerType | undefined =
    partnerTypeCandidate === undefined
      ? undefined
      : isPartnerType(partnerTypeCandidate)
        ? partnerTypeCandidate
        : undefined;
  if (partnerTypeCandidate && !normalizedPartnerType) {
    return invalid("Please select a supported partnership category.");
  }

  if (source === "feasibility") {
    if (!normalizedFacilityType) {
      return invalid("Please select a facility category.");
    }
    if (
      roofAreaSqFt.value === undefined ||
      roofAreaSqFt.value < MIN_ROOF_AREA_SQ_FT ||
      roofAreaSqFt.value > MAX_ROOF_AREA_SQ_FT
    ) {
      return invalid(
        `Please enter a rooftop area between ${MIN_ROOF_AREA_SQ_FT.toLocaleString()} and ${MAX_ROOF_AREA_SQ_FT.toLocaleString()} sq ft.`,
      );
    }
    if (
      monthlySpendBdt.value === undefined ||
      monthlySpendBdt.value <= 0 ||
      monthlySpendBdt.value > MAX_MONTHLY_SPEND_BDT
    ) {
      return invalid("Please enter a valid monthly electricity bill.");
    }
  }

  if (source === "partner") {
    if (!normalizedPartnerType || !role.value || !trackRecord.value || !website.value || !officeAddress.value) {
      return invalid("Please complete the required partner credentials.");
    }

    try {
      const parsedWebsite = new URL(website.value);
      if (parsedWebsite.protocol !== "http:" && parsedWebsite.protocol !== "https:") {
        return invalid("Please enter a valid company website URL.");
      }
    } catch {
      return invalid("Please enter a valid company website URL.");
    }

    if (!operationalDistricts.value?.length) {
      return invalid("Please select at least one operational district.");
    }
  }

  return {
    ok: true,
    payload: {
      source,
      contactName: contactName.value,
      organization: organization.value,
      email: normalizedEmail,
      phone: phone.value,
      ...(message.value ? { message: message.value } : {}),
      ...(normalizedFacilityType ? { facilityType: normalizedFacilityType } : {}),
      ...(roofAreaSqFt.value !== undefined ? { roofAreaSqFt: roofAreaSqFt.value } : {}),
      ...(monthlySpendBdt.value !== undefined ? { monthlySpendBdt: monthlySpendBdt.value } : {}),
      ...(normalizedPartnerType ? { partnerType: normalizedPartnerType } : {}),
      ...(role.value ? { role: role.value } : {}),
      ...(trackRecord.value ? { trackRecord: trackRecord.value } : {}),
      ...(website.value ? { website: website.value } : {}),
      ...(officeAddress.value ? { officeAddress: officeAddress.value } : {}),
      ...(operationalDistricts.value?.length ? { operationalDistricts: operationalDistricts.value } : {}),
    },
  };
}

function getDefaultEndpoint(): string | undefined {
  const env = import.meta.env as ImportMetaEnv & { VITE_LEAD_INTAKE_ENDPOINT?: string };
  return normalizeOptionalText(env?.VITE_LEAD_INTAKE_ENDPOINT);
}

/**
 * Only same-origin root-relative paths and explicit HTTPS URLs are accepted.
 * Query strings, fragments, credentials, and backslash variants are rejected
 * so endpoint configuration cannot redirect lead data unexpectedly.
 */
export function isSafeLeadIntakeEndpoint(endpoint: unknown): endpoint is string {
  if (typeof endpoint !== "string") {
    return false;
  }

  const normalized = endpoint.trim();
  const hasUnsafeCharacters = Array.from(normalized).some((character) => {
    const code = character.charCodeAt(0);
    return character === "\\" || /\s/.test(character) || code <= 0x1f || code === 0x7f;
  });
  if (!normalized || hasUnsafeCharacters) {
    return false;
  }

  if (normalized.startsWith("/")) {
    return !normalized.startsWith("//") && !normalized.includes("?") && !normalized.includes("#");
  }

  if (!normalized.toLowerCase().startsWith("https://")) {
    return false;
  }

  try {
    const parsed = new URL(normalized);
    return parsed.protocol === "https:" && Boolean(parsed.hostname) && !parsed.username && !parsed.password && !parsed.search && !parsed.hash;
  } catch {
    return false;
  }
}

export function createLeadIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function parseIdempotencyKey(value: unknown): ParseResult<string> {
  if (value === undefined) {
    return { ok: true, value: createLeadIdempotencyKey() };
  }
  if (typeof value !== "string") {
    return { ok: false, message: "Please provide a valid submission key." };
  }

  const normalized = value.trim();
  if (!normalized) {
    return { ok: true, value: createLeadIdempotencyKey() };
  }
  if (normalized.length > MAX_IDEMPOTENCY_KEY_LENGTH || /[\r\n]/.test(normalized)) {
    return { ok: false, message: `Please keep the submission key to ${MAX_IDEMPOTENCY_KEY_LENGTH} characters or fewer.` };
  }

  return { ok: true, value: normalized };
}

function createAbortError(message: string): Error {
  const error = new Error(message);
  error.name = "AbortError";
  return error;
}

function awaitWithAbort<T>(operation: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) {
    return Promise.reject(signal.reason ?? createAbortError("The operation was aborted."));
  }

  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(signal.reason ?? createAbortError("The operation was aborted."));
    signal.addEventListener("abort", onAbort, { once: true });

    operation.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener("abort", onAbort);
        reject(error);
      },
    );
  });
}

interface RequestContext {
  signal: AbortSignal;
  timedOut: () => boolean;
  callerAborted: () => boolean;
  dispose: () => void;
}

function createRequestContext(timeoutMs: number, callerSignal?: AbortSignal): RequestContext {
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort(createAbortError("The lead intake request timed out."));
  }, timeoutMs);

  const onCallerAbort = () => controller.abort(callerSignal?.reason ?? createAbortError("The submission was cancelled."));
  if (callerSignal?.aborted) {
    onCallerAbort();
  } else {
    callerSignal?.addEventListener("abort", onCallerAbort, { once: true });
  }

  return {
    signal: controller.signal,
    timedOut: () => timedOut,
    callerAborted: () => Boolean(callerSignal?.aborted),
    dispose: () => {
      clearTimeout(timeout);
      callerSignal?.removeEventListener("abort", onCallerAbort);
    },
  };
}

function boundedTimeout(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_TIMEOUT_MS;
  }
  return Math.min(MAX_TIMEOUT_MS, Math.max(1, Math.floor(value)));
}

function parseAcknowledgement(body: string): string | undefined {
  if (!body || body.length > MAX_ACKNOWLEDGEMENT_BODY_LENGTH) {
    return undefined;
  }

  try {
    const parsed: unknown = JSON.parse(body);
    if (!isRecord(parsed) || parsed.status !== "accepted" || typeof parsed.requestId !== "string") {
      return undefined;
    }

    const requestId = parsed.requestId.trim();
    if (!requestId || parsed.requestId.length > MAX_REQUEST_ID_LENGTH) {
      return undefined;
    }
    return requestId;
  } catch {
    return undefined;
  }
}

const UNKNOWN_NETWORK_MESSAGE =
  "We could not confirm the outcome of your request because the lead intake service could not be reached. Please contact Netso directly before submitting again. If you retry, reuse the same Idempotency-Key; the server must enforce idempotency.";
const UNKNOWN_TIMEOUT_MESSAGE =
  "We could not confirm the outcome of your request because the lead intake service timed out. Please contact Netso directly before submitting again. If you retry, reuse the same Idempotency-Key; the server must enforce idempotency.";
const UNKNOWN_ACKNOWLEDGEMENT_MESSAGE =
  "We could not confirm the outcome of your request because the lead intake service returned an invalid acknowledgement. Please contact Netso directly before submitting again. If you retry, reuse the same Idempotency-Key; the server must enforce idempotency.";

export function createLeadIntakeClient(options: LeadIntakeClientOptions = {}): LeadIntakeClient {
  const configuredEndpoint = options.endpoint === undefined ? getDefaultEndpoint() : options.endpoint;
  const endpoint = isSafeLeadIntakeEndpoint(configuredEndpoint) ? configuredEndpoint.trim() : undefined;
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = boundedTimeout(options.timeoutMs);

  return {
    async submit(input, submitOptions = {}) {
      const normalized = normalizeLeadPayload(input);
      if (!normalized.ok) {
        return { status: "error", message: normalized.message };
      }

      if (!endpoint) {
        return {
          status: "unavailable",
          message: "Lead intake is unavailable because no safe backend endpoint is configured. Your information was not submitted.",
        };
      }

      const idempotencyKey = parseIdempotencyKey(input.idempotencyKey);
      if (!idempotencyKey.ok) {
        return { status: "error", message: idempotencyKey.message };
      }

      const request = createRequestContext(timeoutMs, submitOptions.signal);
      try {
        if (request.callerAborted()) {
          return { status: "error", message: "Lead intake submission was cancelled before completion." };
        }

        // There are deliberately no automatic retries. The server must enforce
        // Idempotency-Key deduplication for callers that retry after uncertainty.
        const response = await awaitWithAbort(
          Promise.resolve(
            fetchImpl(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Idempotency-Key": idempotencyKey.value,
              },
              body: JSON.stringify(normalized.payload),
              signal: request.signal,
            }),
          ),
          request.signal,
        );

        if (response.status < 200 || response.status > 299) {
          return {
            status: "error",
            message: "The lead intake service could not accept this request. Please try again or contact Netso directly.",
          };
        }

        const body = await awaitWithAbort(Promise.resolve(response.text()), request.signal);
        const requestId = parseAcknowledgement(body);
        if (!requestId) {
          return { status: "unknown", message: UNKNOWN_ACKNOWLEDGEMENT_MESSAGE };
        }

        return {
          status: "accepted",
          message: "Your request was acknowledged by the Netso lead intake service.",
          requestId,
        };
      } catch {
        if (request.callerAborted()) {
          return { status: "error", message: "Lead intake submission was cancelled before completion." };
        }
        if (request.timedOut()) {
          return { status: "unknown", message: UNKNOWN_TIMEOUT_MESSAGE };
        }
        return { status: "unknown", message: UNKNOWN_NETWORK_MESSAGE };
      } finally {
        request.dispose();
      }
    },
  };
}

export const leadIntakeClient = createLeadIntakeClient();

export function submitLead(input: LeadIntakeInput, options?: LeadIntakeSubmitOptions): Promise<LeadIntakeResult> {
  return leadIntakeClient.submit(input, options);
}
