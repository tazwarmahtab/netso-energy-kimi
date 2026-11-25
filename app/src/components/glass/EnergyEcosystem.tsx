import InfiniteMarquee from "@/components/ui/infinite-marquee";

const PUBLIC_INSTITUTIONS = [
  "SREDA",
  "Power Division",
  "BERC",
  "BPDB",
  "BREB",
  "Power Grid Bangladesh",
  "IDCOL",
  "Bangladesh Bank",
];

const INDUSTRY_ORGANISATIONS = [
  "Scube Technologies",
  "Omera Renewable Energy",
  "Super Star Renewable Energy",
  "Rahimafrooz Renewable Energy",
  "Energypac",
  "SolarIC",
];

function Wordmark({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap text-[13px] font-semibold tracking-[0.015em] text-[rgba(255,250,240,0.74)] sm:text-[15px]">
      {children}
    </span>
  );
}

/**
 * Names are presented as ecosystem context only. This is not a customer,
 * partner, membership, certification, or endorsement strip.
 */
export function EnergyEcosystem() {
  return (
    <section
      aria-labelledby="energy-ecosystem-title"
      className="border-y border-[rgba(255,250,240,0.08)] bg-[#050f0b] py-12 md:py-16"
    >
      <div className="g-wrap">
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="g-label">Bangladesh energy ecosystem</p>
            <h2
              id="energy-ecosystem-title"
              className="mt-3 max-w-[24ch] text-[clamp(1.25rem,2.3vw,2rem)] font-medium leading-tight tracking-[-0.035em] text-[#fffaf0]"
            >
              The institutions and industry shaping the transition.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[11px] leading-relaxed text-[rgba(255,250,240,0.42)] md:text-right">
            Selected public bodies and market participants in Bangladesh’s energy
            ecosystem. Listed for context only — not as Netso customers, partners
            or endorsers.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(198,161,91,0.72)]">
              Public institutions &amp; finance
            </p>
            <InfiniteMarquee
              items={PUBLIC_INSTITUTIONS.map((name) => <Wordmark key={name}>{name}</Wordmark>)}
              speed={42}
              gap="gap-14"
              label="Public institutions and finance organisations"
              className="py-2"
            />
          </div>
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(198,161,91,0.72)]">
              Renewable energy &amp; industry
            </p>
            <InfiniteMarquee
              items={INDUSTRY_ORGANISATIONS.map((name) => <Wordmark key={name}>{name}</Wordmark>)}
              speed={36}
              direction="right"
              gap="gap-14"
              label="Renewable energy and industry companies"
              className="py-2"
            />
          </div>
        </div>

        <p className="mt-7 text-[10px] leading-relaxed text-[rgba(255,250,240,0.32)]">
          Names are illustrative ecosystem references. No affiliation, approval,
          project relationship or endorsement is implied.
        </p>
      </div>
    </section>
  );
}
