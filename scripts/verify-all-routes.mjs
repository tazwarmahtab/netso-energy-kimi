import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const OUT_DIR = "/Users/tazwarmahtab/.gemini/antigravity-ide/brain/9a51a7fb-c9eb-44fc-93f1-e8c7b1041367/route_audits";
fs.mkdirSync(OUT_DIR, { recursive: true });

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const routes = [
  { name: "home", url: "http://localhost:3001/?nointro=1" },
  { name: "product", url: "http://localhost:3001/product" },
  { name: "partners", url: "http://localhost:3001/partners" },
  { name: "about", url: "http://localhost:3001/about" },
  { name: "brand", url: "http://localhost:3001/brand" },
];

for (const r of routes) {
  const outFile = path.join(OUT_DIR, `${r.name}.png`);
  console.log(`Auditing ${r.name} at ${r.url} -> ${outFile}`);
  try {
    execSync(
      `"${CHROME}" --headless=new --window-size=1440,900 --virtual-time-budget=2500 --screenshot="${outFile}" "${r.url}"`,
      { stdio: "ignore" }
    );
    const stat = fs.statSync(outFile);
    console.log(`✓ ${r.name}: ${stat.size} bytes`);
  } catch (err) {
    console.error(`✗ Error on ${r.name}:`, err.message);
  }
}
console.log("All routes audited!");
