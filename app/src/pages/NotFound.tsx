import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell } from "../components/glass/shell";
import { useAssessModal } from "../hooks/useAssessModal";

const ROUTES = [
  { to: "/", label: "The rooftop, end to end", note: "Start at the asset" },
  { to: "/product", label: "Product & engineering", note: "What gets built" },
  { to: "/calculator", label: "Savings calculator", note: "Run your own numbers" },
  { to: "/partners", label: "Partners & capital", note: "EPC and co-investment" },
  { to: "/contact", label: "The desk", note: "Talk to a person" },
];

export default function NotFound() {
  const assess = useAssessModal();
  return (
    <GlassShell {...assess}>
      <section className="relative flex min-h-[76svh] flex-col justify-center overflow-hidden">
        <div className="g-wrap py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <p className="g-label">Error 404 · No asset at this address</p>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="g-display mt-6 text-[clamp(2.6rem,7vw,4.6rem)]">
                  This roof does not <em>exist.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[46ch] font-sans text-[15.5px] leading-[1.7] text-[rgba(255,250,240,0.58)]">
                  The address may be outdated, or the page may not be part of the current Netso
                  site. Return to the main story and start from the asset.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link to="/" className="g-btn">
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Return home
                  </Link>
                  <Link to="/contact" className="g-btn g-btn--ghost">
                    Talk to the desk
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Panel className="px-6 py-7 md:px-8 md:py-9">
                <div className="flex items-center gap-2.5">
                  <Compass aria-hidden="true" className="h-[15px] w-[15px] text-[rgba(198,161,91,0.9)]" />
                  <p className="g-label !text-[9.5px] !tracking-[0.17em] text-[rgba(255,250,240,0.5)]">
                    Where to go instead
                  </p>
                </div>

                <nav aria-label="Site routes" className="mt-6">
                  <ul>
                    {ROUTES.map((r) => (
                      <li key={r.to}>
                        <Link
                          to={r.to}
                          className="group flex items-center justify-between gap-4 border-b border-[rgba(255,250,240,0.08)] py-3.5 last:border-0"
                        >
                          <span>
                            <span className="block font-sans text-[14px] text-[rgba(255,250,240,0.86)] transition-colors group-hover:text-white">
                              {r.label}
                            </span>
                            <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.34)]">
                              {r.note}
                            </span>
                          </span>
                          <ArrowLeft
                            aria-hidden="true"
                            className="h-3.5 w-3.5 rotate-180 text-[rgba(255,250,240,0.3)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--g-gold-hi)]"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>
    </GlassShell>
  );
}
