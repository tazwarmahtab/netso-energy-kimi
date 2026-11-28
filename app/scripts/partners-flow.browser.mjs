import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { test } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const port = Number(process.env.NETSO_BROWSER_PORT || "4179");
const origin = "http://127.0.0.1:" + port;
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
  cwd: process.cwd(),
  stdio: "ignore",
});

async function waitForServer() {
  for (let i = 0; i < 70; i++) {
    if (server.exitCode !== null) throw new Error("Vite preview quit before test: " + server.exitCode);
    try {
      if ((await fetch(origin)).ok) return;
    } catch { /* wait for startup */ }
    await sleep(150);
  }
  throw new Error("Vite preview did not start");
}

test("partner enquiry requires an explicit WhatsApp send across mobile portrait and landscape", async () => {
  let browser;
  try {
    await waitForServer();
    const launch = { headless: true };
    const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    const executable = process.env.NETSO_BROWSER_EXECUTABLE ||
      (process.platform === "darwin" && existsSync(macChrome) ? macChrome : undefined);
    if (executable) launch.executablePath = executable;
    browser = await chromium.launch(launch);
    for (const viewport of [{width:390,height:844}, {width:844,height:390}]) {
      const context = await browser.newContext({viewport, reducedMotion:"reduce"});
      const page = await context.newPage();
      const errors=[];
      let popups=0;
      page.on("pageerror", error => errors.push(error.message));
      page.on("popup", () => { popups++; });
      const response=await page.goto(origin+"/partners", {waitUntil:"domcontentloaded"});
      assert.equal(response.status(), 200);
      await page.locator("#partner-form form").waitFor({state:"visible",timeout:15000});
      assert.equal(await page.getByRole("textbox", {name:/First name/}).count(),1,"first-name input must have an accessible label");
      assert.equal(await page.getByRole("combobox", {name:/Track record/}).count(),1,"track-record select must have an accessible label");
      await page.locator("#partner-form input[placeholder='Arif']").fill("QA Alice");
      await page.locator("#partner-form input[placeholder='Rahman']").fill("Example");
      await page.locator("#partner-form input[type=email]").fill("qa@example.org");
      await page.locator("#partner-form input[type=tel]").fill("+8801712345678");
      await page.locator("#partner-form input[placeholder='Head of structured finance']").fill("QA tester");
      await page.locator("#partner-form input[placeholder='Crescent Infrastructure Ltd.']").fill("QA example only");
      const before=await page.evaluate(()=>JSON.stringify(localStorage));
      await page.getByRole("button",{name:"Review partnership enquiry"}).click();
      await page.getByRole("heading",{name:"Partnership enquiry ready to review"}).waitFor();
      assert.match(await page.locator("#partner-form").innerText(), /Netso has not received this enquiry/);
      assert.equal(popups,0,"form must not automatically open WhatsApp");
      assert.equal(await page.evaluate(()=>JSON.stringify(localStorage)),before,"form must not persist contact details without consent");
      const link=page.getByRole("link",{name:"Continue in WhatsApp"});
      const href=await link.getAttribute("href");
      assert.equal(new URL(href).hostname, "wa.me");
      assert.match(new URL(href).searchParams.get("text"), /QA Alice Example/);
      await page.getByRole("button",{name:"Edit enquiry"}).click();
      assert.equal(await page.locator("#partner-form input[placeholder='Arif']").inputValue(), "QA Alice");
      assert.deepEqual(errors,[],"no uncaught browser errors");
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > document.documentElement.clientWidth+2),false,"no horizontal page overflow");
      await context.close();
    }
  } finally {
    await browser?.close();
    server.kill("SIGTERM");
  }
});
