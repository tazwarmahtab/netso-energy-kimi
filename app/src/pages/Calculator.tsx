import { Link } from "react-router";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageHero } from "../components/glass/shell";
import { useAssessModal } from "../hooks/useAssessModal";

export default function CalculatorPage() {
  const assess = useAssessModal();
  return (
    <GlassShell {...assess}>
      <PageHero
        compact
        eyebrow="Project assessment"
        title={<>Start with the <em>right assumptions.</em></>}
        lede="Plant size, self-consumption and project economics depend on roof geometry, daytime electricity demand and the selected commercial route. No generic tariff, savings percentage or payback estimate is offered."
      />
      <section id="calculator" className="g-wrap pb-24 md:pb-36">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Panel className="flex h-full flex-col justify-between gap-8 p-7 md:p-10">
              <div>
                <p className="g-label">Factory-owned · CAPEX</p>
                <h2 className="g-display mt-5 text-3xl">Own the plant.</h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#fffaf0]">The factory borrows and owns the installation. Plant capacity and self-consumption are established through site assessment. Financing and project costs require lender and EPC quotations.</p>
              </div>
              <Link to="/capex" className="g-btn">Explore CAPEX</Link>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Panel className="flex h-full flex-col justify-between gap-8 p-7 md:p-10">
              <div>
                <p className="g-label">Partner-funded · OPEX</p>
                <h2 className="g-display mt-5 text-3xl">Purchase daytime power.</h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#fffaf0]">A financing partner owns the plant. Pricing, term, escalation and buyout arrangements are negotiated after feasibility and partner review. Daytime grid-connected solar does not provide backup during an outage.</p>
              </div>
              <Link to="/opex" className="g-btn">Explore OPEX</Link>
            </Panel>
          </Reveal>
        </div>
        <p className="mt-8 max-w-[68ch] text-[13px] leading-relaxed text-[rgba(255,250,240,0.56)]">An interactive financial model will be offered only after its assumptions, input validation and calculations are independently verified. Request an assessment for project-specific figures.</p>
        <Link to="/contact" className="g-btn mt-7">Request an assessment</Link>
      </section>
    </GlassShell>
  );
}
