import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";

const port = Number(process.env.NETSO_BROWSER_PORT || "4186");
const origin = "http://127.0.0.1:" + port;
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
  cwd: process.cwd(), stdio: "ignore",
});

async function waitUntilAvailable() {
  for (let i = 0; i < 90; i++) {
    if (server.exitCode !== null) throw Error("Local Vite preview quit before testing");
    try { if ((await fetch(origin)).ok) return; } catch { /* starting */ }
    await sleep(140);
  }
  throw Error("Local Vite preview did not become available");
}

test("classic bookmarks redirect; About and Product have evidence-safe claims across viewports", async () => {
  let browser;
  try {
    await waitUntilAvailable();
    const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    const execPath = process.env.NETSO_BROWSER_EXECUTABLE || (process.platform === "darwin" && existsSync(macChrome) ? macChrome : undefined);
    browser = await chromium.launch({ headless:true, ...(execPath ? {executablePath:execPath} : {}) });
    for (const viewport of [{width:360,height:800},{width:390,height:844},{width:768,height:1024},{width:844,height:390},{width:1440,height:900}]) {
      const context = await browser.newContext({viewport, reducedMotion:"reduce"});
      const page=await context.newPage();
      const errors=[];
      page.on("pageerror",err=>errors.push(err.message));

      const classic = await page.goto(origin + "/classic", { waitUntil:"domcontentloaded" });
      assert.equal(classic.status(),200);
      await page.waitForURL(origin+"/", {timeout:20000});
      await page.locator("h1").first().waitFor({state:"visible",timeout:15000});
      assert.equal(await page.getByRole("link",{name:/Classic view/}).count(),0);
      const canonicalBody=await page.locator("body").innerText();
      assert.doesNotMatch(canonicalBody,/SREDA NEM 2025 aligned|Week 1–2|Class 0\.2s metering|Performance risk with Netso/i);
      assert.doesNotMatch(canonicalBody,/Chattogram · Gazipur · Narayanganj|Client CAPEX|Reference model/i);
      assert.match(canonicalBody,/factory owns CAPEX/i);
      assert.match(canonicalBody,/partner may own OPEX/i);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+2),false);

      for (const route of ["/about","/product"]) {
        const response=await page.goto(origin+route,{waitUntil:"domcontentloaded"});
        assert.equal(response.status(),200);
        await page.locator("h1").first().waitFor({state:"visible",timeout:15000});
        const body=await page.locator("body").innerText();
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+2),false,route+" overflow at "+viewport.width);
        if(route==="/about") {
          assert.match(body,/Chattogram/);
          assert.match(body,/factory borrows and owns/i);
          assert.doesNotMatch(body,/We finance, build and operate/i);
          assert.doesNotMatch(body,/IDCOL application/i);
          assert.match(body,/BNBC 2020 structural loading/i);
          assert.match(body,/BERC tariff framework/i);
          assert.match(body,/do not imply approval or certification/i);
          assert.doesNotMatch(body,/Net-metering eligibility review settlement/i);
        } else {
          assert.match(body,/Concept UI/i);
          assert.match(body,/No live data/i);
          assert.doesNotMatch(body,/90% monthly kWh credit/i);
          assert.doesNotMatch(body,/Netso funds 100%/i);
          assert.match(body,/Illustrative system architecture/i);
          assert.match(body,/not a commissioned installation/i);
          assert.doesNotMatch(body,/feeds stage/i);
        }
      }
      assert.deepEqual(errors,[],"browser runtime errors at "+viewport.width);
      await context.close();
    }
  } finally {
    await browser?.close();
    server.kill("SIGTERM");
  }
});
