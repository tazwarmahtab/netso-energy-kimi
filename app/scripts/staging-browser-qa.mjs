#!/usr/bin/env node
// Independent, read-only browser QA. Install locally: npm install --no-save playwright
// Then: npx playwright install chromium && node scripts/staging-browser-qa.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('BLOCKED: Playwright is not installed. Run npm install --no-save playwright and npx playwright install chromium.'); process.exit(2); }
const base = process.env.NETSO_STAGING_URL || 'https://netso-energy-kimi-preview.vercel.app';
const defaultRoutes = ['/', '/solutions', '/capex', '/opex', '/homes', '/calculator', '/contact'];
const routes = process.env.NETSO_QA_ROUTES
 ? process.env.NETSO_QA_ROUTES.split(',').map(route => route.trim())
 : defaultRoutes;
if (!routes.length || routes.some(route => !defaultRoutes.includes(route))) {
 console.error('Invalid NETSO_QA_ROUTES: use a comma-separated subset of the known route list.');
 process.exit(2);
}
const widths = process.env.NETSO_QA_WIDTHS ? process.env.NETSO_QA_WIDTHS.split(',').map(Number) : [360,390,768,1440];
const out = resolve(process.env.NETSO_QA_OUTPUT || 'verification-results/browser');
await mkdir(out, {recursive:true});
const results=[];
const browser = await chromium.launch({headless:true, ...(process.env.NETSO_BROWSER_EXECUTABLE ? {executablePath:process.env.NETSO_BROWSER_EXECUTABLE} : {})});
try {
 for (const reducedMotion of ['no-preference','reduce']) {
  for (const width of widths) {
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion});
   for(const route of routes) {
    // A fresh page scopes runtime errors and navigation state to this route.
    const page=await context.newPage();
    const entry={route,width,reducedMotion};
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const failureShot=`${out}/failure-${reducedMotion}-${width}-${route.replaceAll('/','_')||'home'}.png`;
    try {
     const response=await page.goto(new URL(route,base).href,{waitUntil:'domcontentloaded',timeout:12000});
     // Suspense can show a loading state before a lazy route's main content is ready.
     await page.locator('main h1').first().waitFor({state:'visible',timeout:10000});
     await page.waitForTimeout(400);
     entry.httpStatus=response?.status() ?? null;
     entry.heading=await page.locator('main h1').first().textContent().catch(()=>null);
     entry.overflow=await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+2);
     entry.errors=errors.slice();
     entry.state=response?.ok() && !entry.overflow && errors.length===0 && Boolean(entry.heading?.trim())?'PASS':'FAIL';
     if(entry.state==='FAIL') await page.screenshot({path:failureShot,fullPage:true});
    } catch(e){
     entry.state='FAIL';entry.error=String(e.message);
     try { await page.screenshot({path:failureShot,fullPage:true}); } catch { /* navigation failed */ }
    } finally {
     results.push(entry);
     await page.close();
    }
   }
   await context.close();
  }
 }
} finally {await browser.close();}
const report={observedAt:new Date().toISOString(),base,scope:'browser route/render/overflow/runtime smoke; no form submission',results,unverified:['contact delivery','exact deployment commit','visual design review','keyboard accessibility','animation timing']};
await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:results.filter(r=>r.state==='PASS').length,failed:results.filter(r=>r.state==='FAIL').length,report:`${out}/report.json`}));
if(results.some(r=>r.state!=='PASS'))process.exitCode=1;
