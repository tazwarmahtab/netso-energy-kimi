# NETSO°ENERGY

> **Your roof. Now an energy asset.**  
> Institutional C&I rooftop solar infrastructure for Bangladesh's industrial textile and manufacturing corridors.

[![Vite](https://img.shields.io/badge/Vite-7.3.6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![IDCOL Application](https://img.shields.io/badge/Financing-IDCOL_Application_Under_Appraisal-C6A15B)](https://idcol.org/)
[![SREDA NEM 2025](https://img.shields.io/badge/Compliance-SREDA_NEM_2025-08140F)](http://www.sreda.gov.bd/)

---

## 🏛️ Executive Summary & Ground Truth

Netso Energy finances, constructs, and operates utility-grade architectural solar pergolas for commercial and industrial facilities across Bangladesh under a **Build-Own-Operate (BOO / RESCO)** model.

- **Client CAPEX:** **৳0 Upfront** — 100% financed and insured by Netso Energy under a 20-year Build-Own-Operate (RESCO) agreement.
- **Commercial Structure:** A floating **discount to the applicable grid tariff** — modelled at a **30% basis** — set in the executed agreement. Savings scale with the client's own meter and the prevailing BERC schedule, so they are projected per facility, never promised as a fixed outcome.
- **The Beth Doctrine:** The discount floats with the BERC schedule rather than being fixed, so the modelled cost tracks the bill in either direction. The 30% figure (`Utility Bill × 0.70`) is a modelling basis, not a contractual floor.
- **Concessionary Capital:** IDCOL 80% senior-debt facility **applied for and under appraisal** (SREUP window; an indicative 5.0%–5.5% concessionary range is modelled, not a committed term).
- **Regulatory Framework:** SREDA Net Metering (NEM) Guidelines 2025 (90% monthly settlement credit, 10% DSM reserve) and BERC industrial tariff schedules.
- **RMG Operational Edge:** Non-penetrative standing-seam clamps (zero roof puncture), installation sequencing designed for zero factory downtime, modelled ~98% daytime load matching (site-dependent), and EU CBAM carbon-reporting readiness.

---

## ⚡ Architectural & Engineering Features

### 1. 240-Frame Cinematic Canvas Scroller
- Scrubbed 60fps canvas engine powered by **GSAP ScrollTrigger** transitioning from raw video sky into the structural solar pergola.
- Staggered typography entrance: *"your roof, / generating / revenue."* with zero descender clipping and fluid spring transitions.

### 2. Three.js WebGL 3D Architectural Pergola Digital Twin
- Interactive 360° orbital digital twin rendered in **Three.js**.
- High-tensile hot-dip galvanized steel sub-structure, bifacial dual-glass solar modules, and dynamic solar positioning.
- Interactive diurnal time-of-day slider that triggers under-canopy linear architectural LEDs at dusk and night.

### 3. Beth Doctrine 25-Year CFO Simulation Engine
- Interactive SVG modeling engine comparing utility power bills against Netso's floating 30% discount floor.
- Live scenario stress tests: Baseline Utility Index, Tariff Hike (+35%), Tariff Softening, highlighting cumulative 20-year corporate treasury savings with zero per-unit rate disclosure.

### 4. NEOS Utility SCADA Telemetry Terminal
- Operational telemetry interface demonstrating Class 0.2s bidirectional metering and I-REC carbon certification tracking. Displayed values (64.8 kW active, 81.4% PR) are illustrative samples, not plant data.

### 5. Safe WhatsApp-First Lead Dispatch
- Lead intake gateway (`app/src/lib/notion.ts`) records a local dispatch ledger and hands the prospect to the WhatsApp-first origination flow.
- No private CRM credential is bundled into the browser. A future CRM adapter must run server-side with runtime-only credentials.

### 6. 7-Touchpoint WhatsApp Commercial Funnel
- Minimalist, non-blocking WhatsApp acquisition architecture powered by official **Streamline multi-gradient SVGs** (`#1FAF38` → `#60D669`) with collision-free `useId()` gradients.
- Direct routing to Tazwar Mahtab's canonical executive origination desk (`+880 1791-222777`).
- Pre-populated executive payloads: dynamic CFO board forwarding memo, instant utility bill photo snapshot, and single-line diagram (SLD) engineering dispatch.

---

## 📂 Project Structure

```bash
netso-energy-kimi/
├── .agents/skills/          # Installed autonomous engineering skills
│   ├── autoplan/            # Auto-review pipeline (CEO, design, eng, DX)
│   ├── dev-orchestrator/    # Subagent swarm coordinator
│   ├── refero-design/       # World-class UI/UX design intelligence
│   ├── scroll-craft/        # Apple-grade canvas & scroll mechanics
│   └── skill-vetter/        # Security & permission vetting
├── app/
│   ├── public/
│   │   └── assets/frames/   # 240 master video frames (1280×720)
│   ├── src/
│   │   ├── components/
│   │   │   ├── CanvasHero.tsx              # GSAP 240-frame scrubbed hero
│   │   │   ├── CinematicIntro.tsx          # Monospace preloader elevator
│   │   │   ├── FeasibilityModal.tsx        # 3-step institutional qualification
│   │   │   ├── FloatingSimulationChart.tsx # 25-yr Beth Doctrine simulator
│   │   │   ├── FloatingWhatsApp.tsx        # Global floating speed dial
│   │   │   ├── MarqueeTicker.tsx           # Pure CSS industrial ticker
│   │   │   ├── Nav.tsx                     # Scroll-gated glass navigation
│   │   │   ├── RMGEdgeSection.tsx          # Textile objection-killer matrix
│   │   │   ├── SavingsCalculator.tsx       # CFO interactive tariff modeler
│   │   │   ├── SolarPergola3D.tsx          # Three.js WebGL digital twin
│   │   │   ├── Wordmark.tsx                # NETSO° thermodynamic lockup
│   │   │   └── ui/
│   │   │       ├── WhatsAppIcon.tsx        # Streamline multi-gradient SVG
│   │   │       └── liquid-metal-button.tsx # WebGL fragment shader button
│   │   ├── lib/
│   │   │   └── notion.ts                   # Safe local dispatch ledger
│   │   └── pages/
│   │       ├── Home.tsx                    # Flagship commercial landing
│   │       ├── Product.tsx                 # Pergola engineering & NEOS SCADA
│   │       ├── Partners.tsx                # Project finance & capital stack
│   │       ├── About.tsx                   # Institutional ethos & chronology
│   │       └── Brand.tsx                   # Design tokens & diurnal system
│   ├── tailwind.config.js                  # Netso Gold & Forest color tokens
│   └── vite.config.ts                      # Vite development configuration
├── ROADMAP.md                              # Complete 13-phase audit ledger
└── README.md                               # Platform documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: `npm` (v10+)

### Installation
```bash
# Clone the repository
git clone https://github.com/tazwarmahtab/netso-energy-kimi.git
cd netso-energy-kimi/app

# Install dependencies
npm install
```

### Environment Configuration
Copy the template if you need the documented environment shape. Do not place private CRM credentials in `VITE_*` variables; browser variables are public:
```bash
cp .env.example .env
```

The current browser build uses local dispatch persistence plus direct WhatsApp follow-up. If server-side CRM synchronization is added, keep the token in the server runtime environment and expose only a validated same-origin endpoint to the browser.

### Local Development
```bash
npm run dev
```
Preview the application at: `http://localhost:3001/`

### Production Build
```bash
npm run build
```
Typechecks and compiles the application to `app/dist/` with 0 TypeScript errors.

---

## 🎨 Design System & Color Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Netso Gold** | `#C6A15B` | Primary institutional accent, thermodynamic degree symbol `°`, and primary CTAs |
| **Deep Forest** | `#08140F` | Architectural dark surfaces, terminal background, high-contrast framing |
| **Forest Mid** | `#0E231B` | Secondary card fills, navigation glass backdrop |
| **Cream** | `#FFF7E9` | Light editorial backgrounds, warm daytime contrast |
| **Netso Yellow** | `#FCCC3C` | Heritage emblem mark highlight |
| **WhatsApp Emerald** | `#1FAF38` → `#60D669` | High-conversion commercial communication touchpoints |

---

## 🖥️ Routes

The site is a Vite SPA. **Every route now renders Glass v3** — the design system in
`app/src/styles/glass.css` — with one deliberate exception preserved as a fallback.

| Route | Renders |
|---|---|
| `/` | **Glass v3** homepage |
| `/glass` | Alias of `/` so older links keep working |
| `/classic` | The previous homepage, preserved verbatim |
| `/product` · `/calculator` · `/about` · `/partners` · `/contact` · `/support` | Glass v3 inner pages via `GlassShell` |
| `/insights` · `/careers` · `/brand` · `/licenses` · `/legal/privacy-policy` · `/legal/terms-of-service` | Glass v3 — ported in the documentation pass |
| `*` | Glass v3 404 with a route table |

The port order was deliberate: `/product`, `/calculator`, `/about`, `/contact` and `/partners` are the
conversion path, so they moved first; the reference and legal pages followed once the primitives
(`Panel`, `PageHero`, `PageSection`, `useAssessModal`) were settled and each new page needed less
bespoke code than the one before it.

The rationale, the section-by-section audit of the previous homepage, the reference research and the
decision ledger live in [`docs/GLASS-AUDIT.md`](docs/GLASS-AUDIT.md). Reverting the homepage is a
three-line change in `app/src/App.tsx`.

---

## 📜 Regulatory & Financial Disclaimers

1. **Tariff Floor & Floating Spreads:** All tariff projections reference canonical Bangladesh Energy Regulatory Commission (BERC) orders. Floating discounts are indexed to prevailing PDB industrial bulk rates.
2. **Concessionary Debt:** IDCOL senior-debt financing is **applied for and under appraisal**. Indicative facility terms (5.0%–5.5%) are subject to technical feasibility approval, a 1.25× DSCR covenant target, and SREDA NEM 2025 compliance. Nothing here constitutes a committed financing term.
3. **Commercial Illustrations:** Savings models, telemetry read-outs, and per-facility figures shown in this repository are illustrative unless explicitly attributed to an executed agreement. Final terms are set only in executed project documents.
4. **Intellectual Property:** Netso Energy Ltd. All rights reserved. Registered trademark and proprietary design patents pending for the Netso Architectural Solar Pergola.
