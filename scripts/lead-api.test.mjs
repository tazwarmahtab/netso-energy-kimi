import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { pathToFileURL } from "node:url";
import path from "node:path";

test("lead API accepts a contact payload with acknowledgement", async () => {
  const { default: handler } = await import(pathToFileURL(path.resolve("api/leads.js")).href);
  const server = http.createServer((req, res) => handler(req, res));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": `test-${Date.now()}`,
    },
    body: JSON.stringify({
      source: "contact",
      contactName: "API Test",
      organization: "Netso",
      email: "api-test@netsoenergy.com",
      phone: "+8801700000001",
      message: "unit smoke",
    }),
  });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.status, "accepted");
  assert.ok(body.requestId);
  server.close();
});
