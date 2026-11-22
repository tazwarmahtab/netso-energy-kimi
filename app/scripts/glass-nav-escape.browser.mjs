import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE_URL = process.env.NETSO_STAGING_URL;
const CHROME = process.env.NETSO_BROWSER_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

test('mobile primary menu closes on Escape and restores trigger focus', {
  timeout: 45000,
  skip: BASE_URL && existsSync(CHROME) ? false : 'requires NETSO_STAGING_URL and installed Chrome',
}, async () => {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(new URL('/', BASE_URL).href, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.locator('main h1').first().waitFor({ state: 'visible', timeout: 12000 });
    await page.getByRole('button', { name: 'Open menu' }).click();
    const trigger = page.getByRole('button', { name: 'Close menu' });
    assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
    const mobileMenuLink = page.locator('header a').filter({ hasText: 'Solutions' }).last();
    await mobileMenuLink.focus();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Open menu' }).waitFor({ state: 'visible', timeout: 2000 });
    assert.equal(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');
    await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Open menu', null, { timeout: 2000 });
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Open menu');
  } finally {
    await browser.close();
  }
});
