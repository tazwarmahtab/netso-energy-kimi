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
      title: "Daytime Load Matching",
      description:
        "Industrial operating hours can align well with daytime solar generation. Actual self-consumption and storage requirements are determined from interval load data.",
    },
    {
      icon: ShieldCheck,
      title: "Roof-Attachment Strategy",
      description:
        "For compatible standing-seam roofs, non-penetrative attachment can avoid roof-sheet punctures. Clamp selection and waterproofing are validated during structural and roof assessment.",
    },
    {
      icon: Clock,
      title: "Installation Around Operations",
      description:
        "Installation planning is coordinated with facility operations. Electrical tie-ins and shutdown windows are scheduled with the customer and relevant utility requirements.",
    },
    {
      icon: Award,
      title: "Emissions & Buyer Reporting",
      description:
        "Solar generation data can support emissions accounting and customer sustainability reporting. Any buyer-specific or regulatory compliance remains subject to the applicable reporting methodology.",
    },
    {
      icon: Zap,
      title: "Grid & Net-Metering Integration",
      description:
        "Where eligible, system design can incorporate SREDA net-metering and bidirectional settlement requirements. Export treatment is determined by the applicable policy and project configuration.",
    },
    {
      icon: Wrench,
      title: "Local O&M Capability",
      description:
        "Netso plans local field operations for inspection, preventive maintenance and fault response. Service levels are defined in the executed project agreement.",
    },
  ];

  return (
    <section className="relative w-full bg-forest-dark py-24 px-6 sm:px-10 border-t border-gold/15">
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

        {/* Illustrative deployment profile */}
        <div className="relative rounded-2xl border border-gold/25 bg-gradient-to-br from-black/80 via-[#08140F] to-black/90 p-8 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10">
            <Building className="h-48 w-48 text-gold" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Illustrative RMG Deployment Profile</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                Start with the roof, the load and the contract.
              </h3>

              <p className="mt-2 text-sm text-cream/70 leading-relaxed font-sans max-w-xl">
                The right system is not a fixed package. Netso sizes the asset against usable roof area, interval demand, electrical topology, structural capacity, tariff treatment and the customer's operating requirements.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-cream/80">
                <span className="flex items-center gap-1.5 text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Roof & structure
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Load profile
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Tariff & settlement
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">Capacity</div>
                <div className="font-display text-2xl font-bold text-cream mt-1">SITE <span className="text-sm font-mono text-gold font-normal">MODEL</span></div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">After engineering survey</div>
              </div>

              <div className="p-4 rounded-xl border border-gold/20 bg-gold/[0.04]">
                <div className="font-mono text-[10px] text-gold/70 uppercase tracking-widest">Economics</div>
                <div className="font-display text-2xl font-bold text-gold mt-1">PPA <span className="text-sm font-mono text-gold font-normal">MODEL</span></div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Site-specific commercial terms</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">Structure</div>
                <div className="font-display text-2xl font-bold text-cream mt-1">SITE <span className="text-sm font-mono text-emerald-400 font-normal">CHECK</span></div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Roof and wind assessment</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">Operations</div>
                <div className="font-display text-2xl font-bold text-cream mt-1">O&M <span className="text-sm font-mono text-cream/70 font-normal">PLAN</span></div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Defined in project documents</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="font-mono text-xs text-cream/60">
              Ready to review your facility's feasibility?
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getNetsoWhatsAppUrl(
                  "Hello Netso Engineering team, we want to assess our rooftop for a commercial solar PPA. Please advise the roof, load-profile, electrical and structural information required."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 transition-all hover:scale-[1.02] shadow-sm"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span>Talk to Engineering</span>
              </a>
              {onOpenFeasibility && (
                <button
                  type="button"
                  onClick={onOpenFeasibility}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] cursor-pointer shadow-md shadow-gold/20"
                >
                  <span>Request Facility Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
