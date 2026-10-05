import { Link } from "react-router";
import { SunMark } from "./Wordmark";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "./ui/WhatsAppIcon";

const SITE = [
  { label: "Product", to: "/product" },
  { label: "Financial Calculator", to: "/calculator" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
  { label: "Brand Kit", to: "/brand" },
  { label: "Regulatory", to: "/licenses" },
];

const RESOURCES = [
  { label: "Insights", to: "/insights" },
  { label: "Careers", to: "/careers" },
  { label: "Contact & Desk", to: "/contact" },
  { label: "Terms of Service", to: "/legal/terms-of-service" },
  { label: "Privacy Policy", to: "/legal/privacy-policy" },
];

const SOCIAL = [
  { label: "X", href: "#", path: "M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L2.7 2h6.4l4.4 5.9L18.9 2zm-1.1 18h1.7L8.1 3.9H6.3L17.8 20z" },
  { label: "LinkedIn", href: "#", path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.4h4.6V24H.2V8.4zM8.2 8.4h4.4v2.1h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.6 3.1 5.6 7.1V24h-4.6v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24H8.2V8.4z" },
  { label: "Instagram", href: "#", path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8 0-3.2 0-3.6.1-4.8.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* Marquee */}
      <div className="border-b border-cream/10 py-8 md:py-12" aria-hidden="true">
        <div className="flex w-max animate-marquee-slow items-center gap-10 whitespace-nowrap pr-10">
          {Array.from({ length: 2 }).map((_, dup) =>
            Array.from({ length: 3 }).map((_, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-[9vw] leading-none text-cream/90 md:text-[6rem]">
                  The Sky Is Already Working
                </span>
                <SunMark className="h-[6vw] w-[6vw] md:h-16 md:w-16" />
              </span>
            ))
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_auto] md:px-10 md:py-20">
        <div>
          <div className="flex items-center text-cream">
            <span className="font-display text-2xl font-extrabold tracking-tight">
              NETSO<span className="text-gold">°</span>ENERGY
            </span>
          </div>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-cream/60">
            A new kind of energy company. Rooftop solar for Bangladeshi industry — financed, built, owned
            and operated by Netso. ৳0 upfront, a lower power bill every month.
          </p>
          <p className="eyebrow mt-8 text-gold">The sky is already working</p>
        </div>

        <nav aria-label="Site">
          <p className="eyebrow mb-5 text-cream/45">Site</p>
          <ul className="space-y-3">
            {SITE.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="link-underline text-[15px] font-medium text-cream/85">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Resources">
          <p className="eyebrow mb-5 text-cream/45">Resources</p>
          <ul className="space-y-3">
            {RESOURCES.map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link to={l.to} className="link-underline text-[15px] font-medium text-cream/85">
                    {l.label}
                  </Link>
                ) : (
                  <span className="cursor-pointer text-[15px] font-medium text-cream/85 link-underline">
                    {l.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-5 text-cream/45">Follow</p>
          <div className="flex gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-all duration-300 hover:border-orange hover:bg-orange hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-cream/40">
            <a href="mailto:tazwar@netsoenergy.com" className="link-underline">tazwar@netsoenergy.com</a>
            <br />
            Dhaka, Bangladesh
          </p>
          <a
            href={getNetsoWhatsAppUrl(
              "Hello Netso Energy, I would like to schedule a preliminary on-site rooftop audit for our industrial facility."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all hover:scale-[1.02]"
            title="Direct line to Netso Origination Desk on WhatsApp"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
            <span>+880 1791-222777</span>
          </a>
        </div>
      </div>

      {/* Monumental Ghost Watermark */}
      <div className="pointer-events-none relative w-full overflow-hidden select-none -mb-[3vw] pt-4">
        <div className="font-display font-bold text-[22vw] leading-none tracking-[-0.05em] text-cream/[0.03] text-center whitespace-nowrap">
          NETSO<span className="text-gold/[0.05]">°</span>
        </div>
      </div>

      <div
        className="border-t border-cream/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-[13px] text-cream/40 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Netso Energy Limited. All rights reserved.</span>
          <span className="font-mono text-xs tracking-widest text-gold/70 uppercase">NETSO° • DHAKA — GAZIPUR</span>
        </div>
      </div>
    </footer>
  );
}
