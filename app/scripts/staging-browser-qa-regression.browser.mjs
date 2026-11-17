import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const RUNNER = resolve('scripts/staging-browser-qa.mjs');
const CHROME = process.env.NETSO_BROWSER_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browserAvailable = existsSync(CHROME) && existsSync(resolve('node_modules/playwright/package.json'));

test('browser smoke checks wait for a lazy route to render its H1', { timeout: 90000, skip: browserAvailable ? false : 'Playwright and local Chrome required' }, async t => {
  const server = createServer((_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<!DOCTYPE html><html lang="en"><head><title>Netso test</title></head><body><main><div role="status">Loading</div></main><script>setTimeout(() => { document.querySelector("main").innerHTML = "<h1>Contact</h1>"; }, 850)</script></body></html>');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const out = await mkdtemp(join(tmpdir(), 'netso-delayed-qa-'));
  t.after(() => rm(out, { recursive: true, force: true }));
  const url = `http://127.0.0.1:${server.address().port}`;
  const result = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [RUNNER], {
      cwd: process.cwd(),
      env: { ...process.env, NETSO_STAGING_URL: url, NETSO_QA_ROUTES: '/contact', NETSO_QA_WIDTHS: '390', NETSO_QA_OUTPUT: out, NETSO_BROWSER_EXECUTABLE: CHROME },
    });
    let stdout = '', stderr = '';
    child.stdout.on('data', s => { stdout += s; });
    child.stderr.on('data', s => { stderr += s; });
    child.on('error', reject);
    child.on('exit', code => resolve({ code, stdout, stderr }));
  });
  const report = JSON.parse(await readFile(join(out, 'report.json'), 'utf8'));
  assert.equal(result.code, 0, `runner failed: ${result.stdout} ${result.stderr}`);
  assert.equal(report.results.length, 2, 'one route across both reduced-motion settings');
  assert.ok(report.results.every(x => x.state === 'PASS' && x.heading?.includes('Contact')), JSON.stringify(report.results));
});
