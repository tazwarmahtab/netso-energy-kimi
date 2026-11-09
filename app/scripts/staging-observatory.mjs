#!/usr/bin/env node
// Staging-only, read-only Netso route observatory. Node >=20. No credentials or form submissions.
const base = process.env.NETSO_STAGING_URL || 'https://netso-energy-kimi-preview.vercel.app';
const routes = ['/', '/solutions', '/capex', '/opex', '/homes', '/calculator', '/contact'];
const results = [];
for (const route of routes) {
  const started = Date.now();
  try {
    const url = new URL(route, base);
    if (url.protocol !== 'https:') throw Error('HTTPS required');
    const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Netso-Staging-Observatory/1.0' } });
    const body = await response.text();
    const pass = response.ok && /<html[\s>]/i.test(body) && /<title[\s>]/i.test(body) && !/<title>404/i.test(body);
    results.push({ route, status: response.status, durationMs: Date.now() - started, state: pass ? 'PASS' : 'FAIL', note: 'HTTP/HTML shell only; client-side rendering unverified' });
  } catch (error) {
    results.push({ route, durationMs: Date.now() - started, state: 'FAIL', error: String(error.message) });
  }
}
const report = { observedAt: new Date().toISOString(), base, scope: 'read-only HTTP shell smoke check', results, unverified: ['JS runtime', 'mobile', 'reduced motion', 'contact delivery', 'accessibility', 'preview alias SHA'] };
console.log(JSON.stringify(report, null, 2));
if (results.some(r => r.state !== 'PASS')) process.exitCode = 1;
