# Netso Energy — Design, Craft & Context Roadmap

This document tracks all completed and pending audits, polishes, and canonical truths across Netso Energy web properties.

---

## 🏛️ Company Ground Truth & Context Binding

- **Canonical Brief:** Bound to `~/Brain/MASTER-CONTEXT.md` (Tazwar Mahtab / Netso Energy Ltd).
- **Core Business Model:** Distributed C&I rooftop solar, RESCO/BOO, **BDT 0 customer CAPEX**, 20-year PPAs.
- **Flagship Reference:** CGS 80kWp, 20-yr PPA @ **BDT 10.00/kWh** (Executed).
- **Financing:** IDCOL 80% senior debt, 5.5% (BG-50%) / 5.0% (BG-75%) [6% legacy ceiling]. CAPEX ceiling BDT 60,000/kWp.
- **Regulations:** SREDA NEM 2025 (90% monthly credit, 10% DSM); BERC Jun-2026 (LT-D1 edu BDT 9.05/kWh, 33kV bulk BDT 8.39/kWh).
- **🚫 KILLED NUMBERS (NEVER CITE):**
  - 12.50, 6.4523, 10.50, 7.00 tariffs
  - Government guarantee for private rooftop
  - 0.74× DSCR
  - 90,000/kWp default CAPEX

---

## 📋 Status Overview

### ✅ Completed
- [x] **Skill Suites Installed Globally (`~/.gemini/config/skills/`):**
  - `pbakaus/impeccable` (`impeccable`, `pbakaus-quieter`, `pbakaus-distill`, `pbakaus-critique`, `pbakaus-polish`)
  - `emilkowalski/skills` (`apple-design`, `review-animations`, `animation-vocabulary`, `emil-design-eng`, `prototype`)
  - `vercel-labs/agent-skills` (`web-design-guidelines`, `react-best-practices`, `composition-patterns`)
  - `jakubkrehel/skills` (`make-interfaces-feel-better`, `oklch-skill`)
  - `anthropics/skills` (`frontend-design`)
  - `shadcn-ui/ui` (`shadcn`)
- [x] **Dev Environment Setup:**
  - Extracted `OKComputer_Netso_Energy_—_The_Sky_Is_Already_Working.zip` into `app/`
  - Fixed internal Moonshot mirror registry issues in `package-lock.json`
  - Installed dependencies from official npm registry
  - Initialized Git version tracking with clean baseline commit
  - Started Vite development preview on `http://localhost:3001/`
- [x] **Context Discovery:**
  - Discovered local canonical vault in `~/Brain/MASTER-CONTEXT.md`
  - Identified Notion CLI config at `~/.config/notion/` and workspace ID `ec2703dc-2ab2-4080-b2b7-912be9184ec3`

---

### 🔄 In Progress / Current Pass (Home.tsx & index.css)
- [ ] **Phase 1: Institutional Tone & Commercial Truth**
  - [ ] Replace killed tariff `৳10.00–10.50/kWh` with canonical `৳10.00/kWh` (CGS benchmark).
  - [ ] Replace high-saturation safety neon orange with institutional solar amber/gold tone (`--primary`).
  - [ ] Anchor Netso's positioning: industrial textile and manufacturing rooftop utility, not consumer solar.
- [ ] **Phase 2: Eliminate AI Tells (`anthropics/frontend-design`)**
  - [ ] Remove single-word headline coloring (`"Re-wired."` orange highlight tell).
  - [ ] Restrain monospace uppercase eyebrow overuse (`Space Mono` tracked labels).
  - [ ] Remove visual clutter in hero (floating chips, pulsing dot).
- [ ] **Phase 3: Motion & Physics Polish (`emilkowalski/apple-design`)**
  - [ ] Remove infinite bouncing scroll arrow animation.
  - [ ] Smooth tab transitions: eliminate `scale: 1.06` zoom-in jumps in favor of fluid spring crossfades.
- [ ] **Phase 4: Accessibility & Engineering (`vercel-labs` & `make-interfaces-feel-better`)**
  - [ ] Add `tabular-nums` to financial metrics (BDT rates, percentages, years).
  - [ ] Implement WAI-ARIA arrow key navigation on `Benefits` tablist.
  - [ ] Fix text contrast for muted text tokens against cream background.

---

### 📅 Next Up (Subsequent Pages & Features)
- [ ] Audit and polish `src/pages/Product.tsx` (NEOS telemetry & metering accuracy).
- [ ] Audit and polish `src/pages/Partners.tsx` (IDCOL debt structuring & institutional lender positioning).
- [ ] Audit and polish `src/pages/Brand.tsx` & `src/pages/About.tsx`.
- [ ] Integrate live Notion synchronization (configure `NOTION_API_KEY`).
