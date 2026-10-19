#!/usr/bin/env node
/**
 * Local companion for Vite: serves POST /api/leads using the same handler as Vercel.
 *   node scripts/lead-api-dev.mjs
 */
import http from "node:http";
import { pathToFileURL } from "node:url";
import path from "node:path";

const port = Number(process.env.LEAD_API_PORT || 3010);
const handlerUrl = pathToFileURL(path.resolve("api/leads.js")).href;
const { default: handler } = await import(handlerUrl);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  if (url.pathname !== "/api/leads" && url.pathname !== "/leads") {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  // Normalize path for the Vercel-style handler
  req.url = "/api/leads";
  await handler(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`[netso] lead API listening on http://127.0.0.1:${port}/api/leads`);
});
