import {
  Sun,
  ShieldCheck,
  Clock,
  Award,
  Zap,
  Wrench,
  CheckCircle2,
  Building,
  ArrowRight,
} from "lucide-react";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "./ui/WhatsAppIcon";

interface RMGEdgeSectionProps {
  onOpenFeasibility?: () => void;
}

export function RMGEdgeSection({ onOpenFeasibility }: RMGEdgeSectionProps) {
  const edgePillars = [
    {
      icon: Sun,
      title: "Daytime Load Match (98%)",
      description:
        "Sewing lines operate 8:00 AM – 6:00 PM, aligning directly with peak solar irradiance. 98% of generation is consumed on-site behind the meter, completely eliminating expensive battery storage.",
    },
    {
      icon: ShieldCheck,
      title: "Non-Penetrative Standing Seam Clamps",
      description:
        "Engineered specifically for tin sheds. We use seam-gripping anodized aluminum clamps—zero drilling through purlins, zero structural puncture, and 100% monsoon leak immunity.",
    },
    {
      icon: Clock,
      title: "Zero Production Stoppage",
      description:
        "Mechanical installation runs during active factory shifts without floor interference. Inverter synchronization and busbar tie-ins occur exclusively during Friday scheduled shutoffs.",
    },
    {
      icon: Award,
      title: "EU CBAM & Buyer Code Ready",
      description:
        "Immediate scope-2 decarbonization evidence for H&M, Inditex, Marks & Spencer, and Target audits. Full compliance certification provided for Higg FEM and LEED verification.",
    },
    {
      icon: Zap,
      title: "SREDA NEM 2025 Bi-Directional Settlement",
      description:
        "Friday and holiday surplus power flows automatically into the national grid via bi-directional utility metering, earning 1:1 bill credits under the latest 2025 net metering policy.",
    },
    {
      icon: Wrench,
      title: "Dedicated Bangla O&M (4-Hour SLA)",
      description:
        "Stationed directly in Gazipur, Savar, and Narayanganj. Local Netso engineering teams conduct thermal drone sweeps, automated panel washing, and rapid response maintenance.",
    },
  ];

  return (
    <section className="relative w-full bg-[#050D0A] py-24 px-6 sm:px-10 border-t border-gold/15">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              04.2 GW Stranded Asset • Bangladesh RMG Belt
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Your rooftop is baking at 62°C. <br />
            <span className="text-gold italic font-serif">We turn that heat into rent.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-cream/70 leading-relaxed">
            Over 4,200 RMG factories in Gazipur, Ashulia, Savar, and Narayanganj burn diesel while their tin sheds radiate relentless heat into sewing lines, forcing HVAC systems to overwork. Under our Build-Own-Operate (BOO) model, Netso shades your roof, absorbs the solar radiation, and sells you power 30% below grid with zero capital expenditure.
          </p>
        </div>

        {/* 6 Technical Objection Killers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {edgePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-gold/[0.03]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 border border-gold/25 text-gold group-hover:bg-gold group-hover:text-forest transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] text-cream/30 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-cream group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-cream/65 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benchmark Case Study: Ananta Denim */}
        <div className="relative rounded-2xl border border-gold/30 bg-gradient-to-br from-black/80 via-[#08140F] to-black/90 p-8 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10">
            <Building className="h-48 w-48 text-gold" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Operational Benchmark • Ashulia Industrial Zone</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                Ananta Denim, Ashulia
              </h3>

              <p className="mt-2 text-sm text-cream/70 leading-relaxed font-sans max-w-xl">
                Elevated solar pergola structure engineered across a 22m purlin span. Fitted with perimeter edge fall-arrest lifelines and permanent inspection walkways. Factory passed international brand ESG audits on first inspection visit.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-cream/80">
                <span className="flex items-center gap-1.5 text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Real Generation vs. P50: 104%
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Zero Production Downtime
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                  <CheckCircle2 className="h-4 w-4" /> 100% Monsoon Leak-Free
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Box */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">
                  System Capacity
                </div>
                <div className="font-display text-2xl font-bold text-cream mt-1">
                  1.2 <span className="text-sm font-mono text-gold font-normal">MWp</span>
                </div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">14,000 sqft roof shed</div>
              </div>

              <div className="p-4 rounded-xl border border-gold/25 bg-gold/[0.05]">
                <div className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">
                  Annual P&L Savings
                </div>
                <div className="font-display text-2xl font-bold text-gold mt-1">
                  ৳3.4 <span className="text-sm font-mono text-gold font-normal">Million</span>
                </div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Direct tariff spread</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">
                  Structural Load
                </div>
                <div className="font-display text-2xl font-bold text-cream mt-1">
                  0 <span className="text-sm font-mono text-emerald-400 font-normal">kg net</span>
                </div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Weight compensated</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">
                  Contract Term
                </div>
                <div className="font-display text-2xl font-bold text-cream mt-1">
                  20 <span className="text-sm font-mono text-cream/70 font-normal">Years</span>
                </div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">BOO zero investment</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="font-mono text-xs text-cream/60">
              Ready to review your facility’s structural feasibility?
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getNetsoWhatsAppUrl(
                  "Hello Netso Engineering team, we have a standing-seam / corrugated tin roof in [Gazipur/Ashulia]. We want to verify your non-penetrative clamp mounting specs and zero-downtime installation protocol."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all hover:scale-[1.02] shadow-sm"
                title="Direct line to Netso Solar Structural Engineering Team"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span>Talk to Lead Engineer</span>
              </a>
              {onOpenFeasibility && (
                <button
                  type="button"
                  onClick={onOpenFeasibility}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] cursor-pointer shadow-md shadow-gold/20"
                >
                  <span>Request Facility Satellite Survey</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
