import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Activity, TrendingUp, Sparkles, CheckCircle2, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface InstitutionalEconomicsProps {
  onOpenAssessment: () => void;
}

export default function InstitutionalEconomics({ onOpenAssessment }: InstitutionalEconomicsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillarsWrapRef = useRef<HTMLDivElement>(null);
  const dashboardWrapRef = useRef<HTMLDivElement>(null);
  const svgCorridorRef = useRef<SVGPolygonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !stickyStageRef.current) return;

    // Use gsap.matchMedia for desktop sticky scroll vs mobile natural flow
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) {
          // Instant display without animation for vestibular safety
          gsap.set([".econ-pillar", dashboardWrapRef.current], {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          });
          return;
        }

        if (isDesktop) {
          // -------------------------------------------------------------
          // DESKTOP: Sticky Scroll Stagger Timeline (gsap-core + ScrollTrigger)
          // -------------------------------------------------------------
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              pin: stickyStageRef.current,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.width = `${(self.progress * 100).toFixed(1)}%`;
                }
              },
            },
          });

          // Initial positions via gsap.set
          gsap.set(".econ-pillar", { yPercent: 40, autoAlpha: 0, scale: 0.95 });
          gsap.set(dashboardWrapRef.current, { yPercent: 35, autoAlpha: 0, scale: 0.96 });
          gsap.set(svgCorridorRef.current, { opacity: 0, scaleY: 0, transformOrigin: "50% 100%" });

          // 1. Stagger in the 3 Value Pillars (Progress 0.0 -> 0.35)
          tl.to(".econ-pillar", {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: {
              each: 0.12,
              ease: "power3.out",
            },
            duration: 0.35,
          }, 0);

          // 2. Pillars compress upwards into a sleek executive anchor row (Progress 0.35 -> 0.55)
          tl.to(pillarsWrapRef.current, {
            yPercent: -12,
            scale: 0.98,
            duration: 0.2,
            ease: "power2.inOut",
          }, 0.35);

          // 3. Command Dashboard (Floating Curve + Concrete Benchmark) Reveals (Progress 0.40 -> 0.75)
          tl.to(dashboardWrapRef.current, {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          }, 0.40);

          // 4. Draw & bloom the 30% floating spread corridor in the SVG chart
          tl.to(svgCorridorRef.current, {
            opacity: 1,
            scaleY: 1,
            duration: 0.25,
            ease: "power2.out",
          }, 0.50);

          // 5. Final hold & pulse focus on benchmark numbers (Progress 0.75 -> 1.0)
          tl.to(".benchmark-highlight", {
            color: "#C6A15B",
            duration: 0.2,
            ease: "power1.inOut",
          }, 0.75);

        } else {
          // -------------------------------------------------------------
          // MOBILE: Natural smooth scroll with viewport stagger triggers
          // -------------------------------------------------------------
          gsap.from(".econ-pillar", {
            scrollTrigger: {
              trigger: pillarsWrapRef.current,
              start: "top 80%",
            },
            y: 30,
            autoAlpha: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.from(dashboardWrapRef.current, {
            scrollTrigger: {
              trigger: dashboardWrapRef.current,
              start: "top 80%",
            },
            y: 35,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        }
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#06120D] text-cream lg:h-[220vh]"
      aria-label="Institutional economics and illustrative savings model"
    >
      {/* Sticky Stage Container */}
      <div
        ref={stickyStageRef}
        className="w-full min-h-screen py-16 lg:py-0 px-6 sm:px-10 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-gold/15"
      >
        {/* Ambient background lighting */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 h-[550px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />
          <div className="absolute bottom-10 right-10 h-[400px] w-[500px] rounded-full bg-emerald-500/[0.03] blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl w-full">
          {/* Section Header: Instant Clarity, Zero Effort */}
          <div ref={headerRef} className="max-w-3xl mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 mb-3.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                PPA-FIRST • ASSET-OWNED
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-cream leading-[1.08]">
              Turn rooftop space into lower-cost power. <br />
              <span className="text-gold italic font-serif">Without buying the solar asset.</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-sage/85 leading-relaxed font-sans max-w-2xl">
              We finance, build and operate rooftop solar. Customers can avoid upfront system investment by purchasing generated power under a long-term PPA, subject to financing, site feasibility and executed terms.
            </p>
          </div>

          {/* 3 Pillars of Zero-Effort Partnership (Staggered Entrance) */}
          <div ref={pillarsWrapRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 lg:mb-8">
            {/* Pillar 1 */}
            <motion.div
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="econ-pillar h-full rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-gold/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                    Zero Investment
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-cream">৳0 Customer CAPEX</h3>
                <p className="mt-1.5 text-xs text-sage/80 leading-relaxed font-sans">
                  Netso is designed around asset ownership and energy service. Financing structure, tenor and security package are established project by project.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-cream/50 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>Zero balance sheet encumbrance</span>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="econ-pillar h-full rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-gold/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Illustrative PPA scenario
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-cream">Below-grid target</h3>
                <p className="mt-1.5 text-xs text-sage/80 leading-relaxed font-sans">
                  Illustrative discount scenario. Final PPA pricing is set against site-specific load, tariff, generation, financing and contractual requirements.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-cream/50 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>Contract-defined economics</span>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="econ-pillar h-full rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-gold/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <Activity className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                    Turnkey Service
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-cream">We Operate Everything</h3>
                <p className="mt-1.5 text-xs text-sage/80 leading-relaxed font-sans">
                  Netso coordinates design, permitting, installation and operating services. Delivery schedules and maintenance commitments are defined in the project documents.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-cream/50 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>Zero factory maintenance effort</span>
              </div>
            </motion.div>
          </div>

          {/* Self-Explanatory Visual Command Dashboard: Chart + Concrete Benchmark */}
          <div ref={dashboardWrapRef} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: The Self-Explanatory Floating Hedge Curve */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/50 p-5 sm:p-6 backdrop-blur-2xl flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] text-cream/50 uppercase tracking-widest block">
                      Illustrative tariff scenario
                    </span>
                    <div className="text-xs sm:text-sm font-semibold text-cream">
                      How an indexed PPA can change energy-cost exposure
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2.5 rounded-full bg-white/40" />
                      <span className="text-cream/60">Utility Grid Bill (100%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2.5 rounded-full bg-gold" />
                      <span className="text-gold font-bold">Illustrative PPA</span>
                    </div>
                  </div>
                </div>

                {/* Graphic Representation */}
                <div className="relative mt-4 w-full aspect-[16/8] sm:aspect-[2/1] rounded-xl bg-[#030906] border border-white/5 p-3 overflow-hidden flex flex-col justify-between">
                  <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="stickySavingsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Guideline Grids */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="40"
                        y1={30 + i * 40}
                        x2="580"
                        y2={30 + i * 40}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Shaded 30% Savings Area */}
                    <polygon
                      ref={svgCorridorRef}
                      points="50,160 140,140 230,125 320,105 410,85 500,60 570,40 570,115 500,135 410,150 320,165 230,180 140,190 50,200"
                      fill="url(#stickySavingsFill)"
                    />

                    {/* Upper Utility Grid Curve */}
                    <polyline
                      fill="none"
                      stroke="#E8E4D9"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="50,160 140,140 230,125 320,105 410,85 500,60 570,40"
                    />

                    {/* Lower Netso Floating Discount Line */}
                    <polyline
                      fill="none"
                      stroke="#C6A15B"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="50,200 140,190 230,180 320,165 410,150 500,135 570,115"
                    />

                    {/* Endpoint Dots */}
                    <circle cx="570" cy="40" r="4.5" fill="#E8E4D9" />
                    <circle cx="570" cy="115" r="4.5" fill="#C6A15B" />

                    {/* Badges */}
                    <rect x="390" y="32" width="170" height="20" rx="4" fill="#141E1A" stroke="#E8E4D9" strokeWidth="0.75" />
                    <text x="475" y="46" fill="#E8E4D9" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Utility Grid: 100% Unhedged
                    </text>

                    <rect x="375" y="107" width="185" height="20" rx="4" fill="#141E1A" stroke="#C6A15B" strokeWidth="0.75" />
                    <text x="467" y="121" fill="#C6A15B" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      Illustrative: 30% Below Grid
                    </text>

                    {/* Central Spread Callout */}
                    <text x="270" y="145" fill="rgba(198,161,91,0.75)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em">
                      ILLUSTRATIVE ENERGY-COST SPREAD
                    </text>
                  </svg>

                  {/* Bottom Timeline Horizon */}
                  <div className="flex justify-between font-mono text-[9px] text-cream/40 pt-1.5 border-t border-white/5">
                    <span>Year 1</span>
                    <span>Year 5</span>
                    <span>Year 10</span>
                    <span>Year 15</span>
                    <span>Year 20</span>
                    <span>Year 25</span>
                  </div>
                </div>
              </div>

              {/* Bottom Insight Tag */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-cream/70 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                <span>When utility tariffs escalate:</span>
                <span className="text-gold font-bold">PPA economics remain contract-defined</span>
              </div>
            </div>

            {/* Right: The Concrete Benchmark (No Mental Calculation Needed) */}
            <motion.div
              whileHover={{ y: -2, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="lg:col-span-5 rounded-2xl border border-gold/30 bg-gradient-to-br from-[#091811] via-[#07140E] to-[#040C08] p-5 sm:p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-warm/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gold" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-warm/80">
                      Typical 20,000 sq ft Plant
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="h-3 w-3" />
                    <span>Illustrative</span>
                  </div>
                </div>

                {/* Concrete Numbers: What You Actually Get */}
                <div className="mt-4 space-y-2.5 font-mono text-[11px] sm:text-xs">
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2">
                    <span className="text-warm/60">Customer Upfront Cost:</span>
                    <span className="font-bold text-emerald-400">৳0.00 (Zero CAPEX)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2">
                    <span className="text-warm/60">Estimated Solar Capacity:</span>
                    <span className="font-bold text-warm">200 kWp (Bifacial)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2">
                    <span className="text-warm/60">Estimated Monthly Savings:</span>
                    <span className="benchmark-highlight font-bold text-emerald-400">৳4.6 Lakh / month</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-warm/5 pb-2">
                    <span className="text-warm/60">20-Year Retained Cash Flow:</span>
                    <span className="benchmark-highlight font-bold text-gold text-sm">৳13.2+ Crore</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-warm/60">Illustrative avoided emissions:</span>
                    <span className="font-bold text-warm">~168 Tonnes CO₂ / yr</span>
                  </div>
                </div>
              </div>

              {/* Direct 1-Click CTAs: Zero Friction */}
              <div className="mt-5 pt-4 border-t border-warm/10">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.02] shadow-xl shadow-gold/20 cursor-pointer mb-2.5"
                >
                  <span>Request 1-Page Rooftop Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono text-warm/50 px-1">
                  <span>Free shadow survey included</span>
                  <Link to="/calculator" className="text-gold font-semibold hover:underline inline-flex items-center gap-1">
                    <span>Custom Calculator</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky Scroll Progress Bar (Desktop only) */}
          <div className="hidden lg:flex items-center justify-between gap-4 font-mono text-[9px] text-cream/40 mt-6 pt-3 border-t border-white/5">
            <span>01 The 3 Zero-Effort Pillars</span>
            <div className="h-1 flex-1 max-w-sm rounded-full bg-white/10 overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-gold to-emerald-400 rounded-full transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>
            <span>02 Illustrative long-term cash flow</span>
          </div>
        </div>
      </div>
    </section>
  );
}
