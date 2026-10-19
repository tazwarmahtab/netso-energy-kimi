import assert from "node:assert/strict";
import test from "node:test";
import {
  createLeadIntakeClient,
  isSafeLeadIntakeEndpoint,
  normalizeLeadPayload,
} from "./lead-intake.ts";

const feasibilityInput = {
  source: "feasibility",
  contactName: "  Asif   Rahman ",
  organization: " Paramount   Textiles Ltd. ",
  email: "DIRECTOR@COMPANY.COM ",
  phone: "+880   1712 345678",
  facilityType: "Factory",
  roofAreaSqFt: "35,000",
  monthlySpendBdt: "600000",
};

const contactInput = {
  source: "contact",
  contactName: "Asif Rahman",
  organization: "Paramount Textiles Ltd.",
  email: "director@company.com",
  phone: "+880 1712 345678",
};

function acceptedResponse(requestId = "lead-123") {
  return new Response(JSON.stringify({ status: "accepted", requestId }), {
    status: 202,
    headers: { "Content-Type": "application/json" },
  });
}

test("normalizes and validates a feasibility payload", () => {
  const result = normalizeLeadPayload(feasibilityInput);

  assert.deepEqual(result, {
    ok: true,
    payload: {
      source: "feasibility",
      contactName: "Asif Rahman",
      organization: "Paramount Textiles Ltd.",
      email: "director@company.com",
      phone: "+880 1712 345678",
      facilityType: "factory",
      roofAreaSqFt: 35000,
      monthlySpendBdt: 600000,
    },
  });
});

test("keeps normal positive partner and facility enums working", () => {
  const result = normalizeLeadPayload({
    source: "partner",
    contactName: " Arif  Rahman ",
    organization: " Crescent Infrastructure Ltd. ",
    email: "arif@firm.com.bd",
    phone: "+880 1711-000000",
    partnerType: "EPC",
    role: " Projects Director ",
    trackRecord: "2MWp to 10MWp C&I Experience",
    website: "https://firm.com.bd",
    officeAddress: "Plot 14, CEPZ, Chattogram",
    operationalDistricts: ["Chattogram", " Chattogram ", "Gazipur"],
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.deepEqual(result.payload.operationalDistricts, ["Chattogram", "Gazipur"]);
    assert.equal(result.payload.partnerType, "epc");
  }
});

test("rejects bounds and malformed optional values instead of truncating or coercing", () => {
  for (const input of [
    { ...contactInput, message: "x".repeat(4001) },
    { ...contactInput, role: "x".repeat(501) },
    { ...contactInput, operationalDistricts: "Dhaka" },
    { ...contactInput, operationalDistricts: ["Dhaka", 3] },
    { ...contactInput, roofAreaSqFt: "3,50" },
    { ...contactInput, monthlySpendBdt: "0x1000" },
    { ...contactInput, monthlySpendBdt: "1e3" },
  ]) {
    const result = normalizeLeadPayload(input);
    assert.equal(result.ok, false, JSON.stringify(input));
  }

  assert.equal(normalizeLeadPayload({ ...feasibilityInput, roofAreaSqFt: "2999" }).ok, false);
  assert.equal(normalizeLeadPayload({ ...feasibilityInput, monthlySpendBdt: "0" }).ok, false);
  assert.equal(normalizeLeadPayload({ ...contactInput, facilityType: "unknown" }).ok, false);
  assert.equal(normalizeLeadPayload({ ...contactInput, partnerType: "unknown" }).ok, false);
});

test("rejects missing or unsafe endpoints without calling fetch or browser storage", async () => {
  let fetchCalls = 0;
  let storageCalls = 0;
  globalThis.localStorage = {
    setItem() {
      storageCalls += 1;
    },
  };

  for (const endpoint of [undefined, "https://intake.example.test/leads?redirect=elsewhere"]) {
    const client = createLeadIntakeClient({
      endpoint,
      fetchImpl: async () => {
        fetchCalls += 1;
        return acceptedResponse();
      },
    });

    const result = await client.submit(contactInput);

    assert.equal(result.status, "unavailable");
    assert.match(result.message, /not submitted/);
  }

  assert.equal(fetchCalls, 0);
  assert.equal(storageCalls, 0);
});

test("allows a same-origin root-relative API path", async () => {
  let requestUrl;
  const client = createLeadIntakeClient({
    endpoint: "/api/leads",
    fetchImpl: async (input) => {
      requestUrl = input;
      return acceptedResponse();
    },
  });

  const result = await client.submit(contactInput);

  assert.equal(requestUrl, "/api/leads");
  assert.equal(result.status, "accepted");
});

test("validates endpoint restrictions", () => {
  assert.equal(isSafeLeadIntakeEndpoint("/api/leads"), true);
  assert.equal(isSafeLeadIntakeEndpoint("/api/leads?x=1"), false);
  assert.equal(isSafeLeadIntakeEndpoint("/api/leads#fragment"), false);
  assert.equal(isSafeLeadIntakeEndpoint("//other.example/leads"), false);
  assert.equal(isSafeLeadIntakeEndpoint("/\\/other.example/leads"), false);
  assert.equal(isSafeLeadIntakeEndpoint("http://intake.example.test/leads"), false);
  assert.equal(isSafeLeadIntakeEndpoint("https://user:pass@intake.example.test/leads"), false);
  assert.equal(isSafeLeadIntakeEndpoint("https://intake.example.test/leads?x=1"), false);
  assert.equal(isSafeLeadIntakeEndpoint("https://intake.example.test/leads#fragment"), false);
  assert.equal(isSafeLeadIntakeEndpoint("https://intake.example.test/leads"), true);
});

test("does not fetch invalid payloads", async () => {
  let fetchCalls = 0;
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    fetchImpl: async () => {
      fetchCalls += 1;
      return acceptedResponse();
    },
  });

  const result = await client.submit({ ...contactInput, email: "not-an-email" });

  assert.equal(result.status, "error");
  assert.equal(fetchCalls, 0);
});

test("posts normalized payloads with an explicit idempotency key and strict acknowledgement", async () => {
  const requests = [];
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    fetchImpl: async (_input, init) => {
      requests.push({ body: JSON.parse(String(init?.body)), headers: init?.headers, signal: init?.signal });
      return acceptedResponse("lead-123");
    },
  });

  const result = await client.submit({ ...feasibilityInput, idempotencyKey: "same-key-123" });

  assert.deepEqual(requests[0].body, {
    source: "feasibility",
    contactName: "Asif Rahman",
    organization: "Paramount Textiles Ltd.",
    email: "director@company.com",
    phone: "+880 1712 345678",
    facilityType: "factory",
    roofAreaSqFt: 35000,
    monthlySpendBdt: 600000,
  });
  assert.equal(requests[0].headers["Idempotency-Key"], "same-key-123");
  assert.equal(requests[0].signal instanceof AbortSignal, true);
  assert.deepEqual(result, {
    status: "accepted",
    message: "Your request was acknowledged by the Netso lead intake service.",
    requestId: "lead-123",
  });
});

test("reuses the caller key and never auto-retries", async () => {
  let fetchCalls = 0;
  const keys = [];
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    fetchImpl: async (_input, init) => {
      fetchCalls += 1;
      keys.push(init?.headers["Idempotency-Key"]);
      return acceptedResponse(`lead-${fetchCalls}`);
    },
  });

  await client.submit({ ...contactInput, idempotencyKey: "retry-me" });
  await client.submit({ ...contactInput, idempotencyKey: "retry-me" });

  assert.equal(fetchCalls, 2);
  assert.deepEqual(keys, ["retry-me", "retry-me"]);
});

test("requires an exact accepted JSON acknowledgement for every 2xx response", async () => {
  for (const response of [
    new Response("<html>ok</html>", { status: 200 }),
    new Response(null, { status: 204 }),
    new Response("{not-json", { status: 200 }),
    new Response(JSON.stringify({ success: false }), { status: 200 }),
    new Response(JSON.stringify({ status: "accepted" }), { status: 200 }),
    new Response(JSON.stringify({ status: "accepted", requestId: "x".repeat(201) }), { status: 200 }),
  ]) {
    const client = createLeadIntakeClient({
      endpoint: "https://intake.example.test/leads",
      fetchImpl: async () => response,
    });

    const result = await client.submit(contactInput);
    assert.equal(result.status, "unknown");
    assert.doesNotMatch(result.message, /not accepted|not stored/i);
  }
});

test("returns an error for HTTP failures without treating them as unknown delivery", async () => {
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    fetchImpl: async () => new Response("invalid", { status: 400 }),
  });

  const result = await client.submit(contactInput);

  assert.equal(result.status, "error");
  assert.match(result.message, /could not accept/);
});

test("returns unknown on network failure without claiming the lead was not stored", async () => {
  let fetchCalls = 0;
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    fetchImpl: async () => {
      fetchCalls += 1;
      throw new Error("offline");
    },
  });

  const result = await client.submit(contactInput);

  assert.equal(fetchCalls, 1);
  assert.equal(result.status, "unknown");
  assert.doesNotMatch(result.message, /not accepted|not stored/i);
  assert.match(result.message, /confirm the outcome/);
});

test("aborts a hanging fetch at the bounded timeout and reports unknown outcome", async () => {
  let fetchSignal;
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    timeoutMs: 15,
    fetchImpl: async (_input, init) => {
      fetchSignal = init?.signal;
      return new Promise(() => {});
    },
  });

  const result = await client.submit(contactInput);

  assert.equal(result.status, "unknown");
  assert.equal(fetchSignal.aborted, true);
  assert.match(result.message, /timed out/);
  assert.doesNotMatch(result.message, /not accepted|not stored/i);
});

test("aborts fetch and returns a caller-cancellation error", async () => {
  const controller = new AbortController();
  let fetchSignal;
  const client = createLeadIntakeClient({
    endpoint: "https://intake.example.test/leads",
    timeoutMs: 500,
    fetchImpl: async (_input, init) => {
      fetchSignal = init?.signal;
      return new Promise(() => {});
    },
  });

  const pending = client.submit(contactInput, { signal: controller.signal });
  await new Promise((resolve) => setTimeout(resolve, 5));
  controller.abort();
  const result = await pending;

  assert.equal(result.status, "error");
  assert.equal(fetchSignal.aborted, true);
  assert.match(result.message, /cancelled/);
});
