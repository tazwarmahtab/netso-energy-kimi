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
      title: "Daytime load alignment",
      description:
        "Many manufacturing loads run during daylight hours, which can improve on-site solar use. The actual match depends on your operating schedule, sanctioned load and final system design.",
    },
    {
      icon: ShieldCheck,
      title: "Roof-sensitive mounting",
      description:
        "Standing-seam roofs may support clamp-based mounting, while other roof types require a structural and waterproofing review. The approved method is confirmed for each facility.",
    },
    {
      icon: Clock,
      title: "Installation planned around production",
      description:
        "Netso works with the facility team to plan access, tie-ins and any required shutdowns. The installation method and outage plan are agreed before construction.",
    },
    {
      icon: Award,
      title: "Evidence for buyer reporting",
      description:
        "On-site generation data and environmental attributes can support customer reporting. Any buyer, I-REC, Higg or LEED requirements should be confirmed against the relevant programme and project documentation.",
    },
    {
      icon: Zap,
      title: "Utility export and settlement",
      description:
        "Where approved by the utility and applicable programme rules, surplus generation can flow through a bidirectional meter. Credit treatment and settlement depend on the connection, tariff and current rules.",
    },
    {
      icon: Wrench,
      title: "Local operations support",
      description:
        "Netso can coordinate local inspection, cleaning, monitoring and maintenance support. Response times and service coverage are set out in the project agreement.",
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
               Rooftop solar for Bangladesh's manufacturing belt
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
             Your roof already receives the sunlight. <br />
             <span className="text-gold italic font-serif">Use it to make the factory more resilient.</span>
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-cream/70 leading-relaxed">
             Manufacturing facilities often carry high daytime electricity demand and limited roof use. Netso assesses the roof, load profile and utility connection, then can structure, build and operate a solar project under a long-term power purchase agreement.
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
                 <span>Illustrative project profile • Ashulia industrial zone</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                Ananta Denim, Ashulia
              </h3>

              <p className="mt-2 text-sm text-cream/70 leading-relaxed font-sans max-w-xl">
                 A project profile can show how roof structure, safe access, maintenance routes and reporting requirements fit together. Site dimensions, performance and audit outcomes must be verified against the relevant project records.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-cream/80">
                <span className="flex items-center gap-1.5 text-gold">
                   <CheckCircle2 className="h-4 w-4" /> Generation: confirm after commissioning
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                   <CheckCircle2 className="h-4 w-4" /> Outage plan agreed with facility
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                   <CheckCircle2 className="h-4 w-4" /> Waterproofing reviewed by design
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
                   Illustrative annual saving
                </div>
                <div className="font-display text-2xl font-bold text-gold mt-1">
                   Site-specific <span className="text-sm font-mono text-gold font-normal">estimate</span>
                </div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Direct tariff spread</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">
                  Structural Load
                </div>
                <div className="font-display text-2xl font-bold text-cream mt-1">
                   Confirmed <span className="text-sm font-mono text-emerald-400 font-normal">by structural study</span>
                </div>
                <div className="text-[11px] font-sans text-cream/50 mt-0.5">Weight compensated</div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">
                  Contract Term
                </div>
                <div className="font-display text-2xl font-bold text-cream mt-1">
                   Long-term <span className="text-sm font-mono text-cream/70 font-normal">PPA</span>
                </div>
                   <div className="text-[11px] font-sans text-cream/50 mt-0.5">Subject to agreement</div>
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
                   <span>Request a preliminary site review</span>
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
