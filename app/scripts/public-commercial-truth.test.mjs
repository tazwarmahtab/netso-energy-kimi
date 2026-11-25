import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const glass = readFileSync(new URL("../src/pages/Glass.tsx", import.meta.url), "utf8");
const about = readFileSync(new URL("../src/pages/About.tsx", import.meta.url), "utf8");
const product = readFileSync(new URL("../src/pages/Product.tsx", import.meta.url), "utf8");
const homeSections = readFileSync(new URL("../src/components/glass/sections-b.tsx", import.meta.url), "utf8");
const homeHero = readFileSync(new URL("../src/components/glass/sections-a.tsx", import.meta.url), "utf8");

test("legacy /classic route redirects to the canonical current site instead of shipping old sales claims", () => {
  assert.match(app, /<Route path="\/classic" element=\{<Navigate to="\/" replace \/>\} \/>/);
  assert.doesNotMatch(app, /const Home = lazy\(/);
  assert.doesNotMatch(glass, /to="\/classic"/);
  assert.doesNotMatch(glass, /Classic view/);
});

test("About presents Chattogram-based, factory-owned CAPEX and conditional partner-funded OPEX", () => {
  const stale = [
    /Netso Energy · Dhaka/,
    /I founded Netso in Dhaka/,
    /We finance, build and operate/,
    /Netso removes both: we provide/,
    /the capital<\/strong>/,
    /IDCOL application/,
    /senior-debt facility is applied for/,
    /ring-fenced in a project vehicle/,
    /20-year agreements/,
    /20-year agreement/,
    /for two decades/,
    /term-wide discount/i,
    /quarterly I-REC/i,
    /hundreds of thousands of square metres/i,
    /Reference site/,
    /Build-own-operate rooftop solar/i,
    /৳0 upfront CAPEX/,
  ];
  for (const claim of stale) assert.doesNotMatch(about, claim, "Unverified About claim: " + String(claim));
  assert.match(about, /Chattogram/);
  assert.match(about, /factory (?:borrows and )?owns/i);
  assert.match(about, /partner-funded OPEX/i);
});

test("Product does not quote unverified technology, policy, finance, warranty or live-monitoring claims", () => {
  const stale = [
    /Zero-CAPEX construction/i,
    /Netso capitalises/i,
    /90% monthly credit/i,
    /90%/,
    /90% of net exported kWh/i,
    /Class 0\.2s/i,
    /Huawei SUN2000/i,
    /585 Wp\+/i,
    /260 km\/h/i,
    /30-year linear performance warranty/i,
    /AFCI arc-fault interruption inside 0\.5 seconds/i,
    /98\.8% European efficiency/i,
    /20-year O&M/i,
    /Netso carries performance and degradation risk/i,
    /Quarterly I-REC attribute certification/i,
    /I-REC tracking/,
    /Netso's operating system watches every string/i,
    /NEOS telemetry · node CGS-01/i,
    /Automated settlement · 24:00 UTC\+6/i,
    /Netso 20-year agreement/i,
    /Netso funds/i,
    /settlement reconciled by\s+NEOS/i,
    /fifteen minutes of plant data is enough/i,
    /SREDA NEM 2025 sync/i,
    /−30\.0%/,
  ];
  for (const claim of stale) assert.doesNotMatch(product, claim, "Unsupported Product claim: " + String(claim));
  assert.match(product, /factory borrows and owns/i);
  assert.match(product, /partner-funded OPEX/i);
  assert.match(product, /Concept UI/);
  assert.match(product, /No live data/);
});


test("canonical homepage does not imply delivered timelines, installed service capability, or certified finance/policy", () => {
  const stale = [
    /Week 1–2/,
    /Week 3–5/,
    /Week 6–12/,
    /Year 1–20/,
    /One accountable party from survey to/,
    /Class 0\.2s metering/,
    /SREDA NEM 2025 aligned/i,
    /Netso carries construction, performance and maintenance risk/i,
    /Performance risk with Netso/i,
    /Regional technicians, spares held in-country/i,
    /No penetration, no reliance on the waterproofing warranty/i,
    /EU CBAM/i,
    /Why industrial offtakers sign/i
  ];
  for(const claim of stale) assert.doesNotMatch(homeSections,claim,"Unsupported homepage claim: "+String(claim));
  assert.match(homeSections,/partner-funded OPEX/i);
  assert.match(homeSections,/factory-owned CAPEX/i);
});


test("homepage hero clearly separates ownership routes without implying a delivered regional footprint or live model", () => {
  assert.doesNotMatch(homeHero,/Chattogram · Gazipur · Narayanganj/i);
  assert.doesNotMatch(homeHero,/Client CAPEX/);
  assert.doesNotMatch(homeHero,/Reference model/);
  assert.match(homeHero,/factory owns CAPEX/i);
  assert.match(homeHero,/partner may own OPEX/i);
  assert.match(homeHero,/Illustrative only/i);
});
