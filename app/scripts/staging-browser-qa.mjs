#!/usr/bin/env node
// Independent, read-only browser QA. Install locally: npm install --no-save playwright
// Then: npx playwright install chromium && node scripts/staging-browser-qa.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('BLOCKED: Playwright is not installed. Run npm install --no-save playwright and npx playwright install chromium.'); process.exit(2); }
const base = process.env.NETSO_STAGING_URL || 'https://netso-energy-kimi-preview.vercel.app';
const routes = ['/', '/solutions', '/capex', '/opex', '/homes', '/calculator', '/contact'];
const widths = [360,390,768,1440];
const out = resolve(process.env.NETSO_QA_OUTPUT || 'verification-results/browser');
await mkdir(out, {recursive:true});
const results=[];
const browser = await chromium.launch({headless:true});
try {
 for (const reducedMotion of ['no-preference','reduce']) {
  for (const width of widths) {
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion});
   const page=await context.newPage();
   for(const route of routes) {
    const entry={route,width,reducedMotion};
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    try {
     const response=await page.goto(new URL(route,base).href,{waitUntil:'networkidle',timeout:30000});
     await page.waitForTimeout(400);
     entry.httpStatus=response?.status() ?? null;
     entry.heading=await page.locator('h1').first().textContent().catch(()=>null);
     entry.overflow=await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+2);
     entry.errors=errors;
     entry.state=response?.ok() && !entry.overflow && errors.length===0 && Boolean(entry.heading?.trim())?'PASS':'FAIL';
     if(entry.state==='FAIL') await page.screenshot({path:`${out}/failure-${reducedMotion}-${width}-${route.replaceAll('/','_')||'home'}.png`,fullPage:true});
    } catch(e){entry.state='FAIL';entry.error=String(e.message);}
    results.push(entry);
   }
   await context.close();
  }
 }
} finally {await browser.close();}
const report={observedAt:new Date().toISOString(),base,scope:'browser route/render/overflow/runtime smoke; no form submission',results,unverified:['contact delivery','exact deployment commit','visual design review','keyboard accessibility','animation timing']};
await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:results.filter(r=>r.state==='PASS').length,failed:results.filter(r=>r.state==='FAIL').length,report:`${out}/report.json`}));
if(results.some(r=>r.state!=='PASS'))process.exitCode=1;
