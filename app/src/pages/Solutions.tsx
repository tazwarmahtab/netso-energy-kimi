import { Link } from "react-router";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageHero } from "../components/glass/shell";
import { useAssessModal } from "../hooks/useAssessModal";

type Route = "solutions" | "capex" | "opex" | "homes";
const options = [
  { path: "/capex", name: "Factory-owned · CAPEX", heading: "Own the asset.", copy: "Your factory arranges financing and owns the rooftop plant. Netso supports origination, feasibility, engineering coordination and agreed project services." },
  { path: "/opex", name: "Partner-funded · OPEX", heading: "Buy the power.", copy: "A financing partner owns the solar plant. Your facility purchases daytime solar electricity under a site-specific agreement, subject to feasibility and partner approval." },
  { path: "/homes", name: "Residential", heading: "Solar for your home.", copy: "Explore a purchased rooftop solar or canopy installation, subject to a site assessment and design." },
] as const;
const detail = {
  capex: { eyebrow: "Factory-owned solar", title: "Your roof. Your asset.", lead: "The factory borrows and owns the installation. Netso provides agreed development and delivery services within the project structure.", points: ["The factory is responsible for arranging its financing.", "Netso does not borrow for, guarantee or own the factory's CAPEX plant.", "Engineering, tender coordination and ongoing services are scoped for each project."] },
  opex: { eyebrow: "Partner-funded solar", title: "Power without plant ownership.", lead: "A third-party funding partner finances and owns the installation. The customer purchases daytime solar electricity under an executed site-specific power purchase agreement.", points: ["Project approval depends on the roof, daytime demand and financing partner.", "Tariff, term, escalation and buyout provisions are negotiated per site.", "Grid-connected daytime solar is not backup power during a grid outage."] },
  homes: { eyebrow: "Residential solar", title: "Designed for your home.", lead: "A purchased rooftop solar or canopy installation designed around your available space, electrical demand and structural conditions.", points: ["The assessment establishes site suitability and installation scope.", "Final design and commercial terms are provided after review.", "Backup capability, if required, needs separately designed equipment."] },
} as const;

export default function SolutionsPage({ route = "solutions" }: { route?: Route }) {
  const assess = useAssessModal();
  const current = route === "solutions" ? null : detail[route];
  return (
    <GlassShell {...assess}>
      <PageHero compact eyebrow={current?.eyebrow ?? "Find your route"} title={<>{current ? current.title : "One roof. Different ways to build."}</>} lede={<>{current?.lead ?? "Choose the structure that fits your roof, daytime demand and balance sheet. An assessment determines suitability."}</>} />
      <section className="g-wrap pb-24 md:pb-36">
        {current ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal><Panel className="p-7 md:p-10"><h2 className="g-display text-3xl">How it works</h2><ul className="mt-7 space-y-5 text-[15px] leading-relaxed text-[#fffaf0]">{current.points.map(point => <li key={point} className="border-b border-white/10 pb-4">{point}</li>)}</ul></Panel></Reveal>
            <Reveal delay={0.08}><Panel className="flex flex-col justify-between gap-8 p-7 md:p-10"><div><p className="g-label">Next step</p><h2 className="g-display mt-4 text-3xl">Start with the site.</h2><p className="mt-5 text-[15px] leading-relaxed text-[#fffaf0]">Contact Netso for a rooftop assessment. Detailed technical and financial requirements follow after initial contact.</p></div><div className="flex flex-wrap gap-3"><Link className="g-btn" to="/contact">Request assessment</Link><Link className="g-btn g-btn--ghost" to="/solutions">Compare routes</Link></div></Panel></Reveal>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">{options.map((option, index) => <Reveal key={option.path} delay={index * 0.08}><Panel className="flex h-full flex-col justify-between gap-9 p-7 md:p-9"><div><p className="g-label">{option.name}</p><h2 className="g-display mt-6 text-3xl">{option.heading}</h2><p className="mt-5 text-[15px] leading-relaxed text-[#fffaf0]">{option.copy}</p></div><Link className="g-btn" to={option.path}>Explore this route</Link></Panel></Reveal>)}</div>
        )}
      </section>
    </GlassShell>
  );
}
