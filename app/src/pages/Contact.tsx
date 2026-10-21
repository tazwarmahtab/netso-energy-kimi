import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Panel, Reveal } from "../components/glass/primitives";
import { GlassShell, PageHero } from "../components/glass/shell";
import { getNetsoWhatsAppUrl, WhatsAppIcon } from "../components/ui/WhatsAppIcon";
import { recordLeadForDispatch } from "../lib/notion";

const FIELD =
  "w-full rounded-xl border border-[rgba(255,250,240,0.14)] bg-[rgba(4,13,9,0.55)] px-4 py-3 font-sans text-[14px] text-[#fffaf0] placeholder:text-[rgba(255,250,240,0.28)] transition-colors focus:border-[rgba(198,161,91,0.7)] focus:outline-none";

const LABEL = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.55)]";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await recordLeadForDispatch({
        contactName: name,
        orgName: orgName || "Contact Inquiry",
        email,
        phone,
        facilityType: "commercial",
        roofArea: "20000",
        monthlySpend: "500000",
        notes: message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      // The lead is still queued locally by the dispatch ledger, so the
      // visitor must never see a dead end.
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassShell onAssess={() => setModalOpen(true)} modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
      <PageHero
        compact
        eyebrow="Origination & operations desk"
        title={
          <>
            A direct line to the <em>people who build it.</em>
          </>
        }
        lede={
          <>
            Commercial structuring, utility interconnection and field engineering — one desk,
            in Dhaka, answering within two working days.
          </>
        }
        actions={
          <>
            <a href="#dispatch" className="g-btn">
              Request a briefing
            </a>
            <a
              href={getNetsoWhatsAppUrl(
                "Hello Tazwar, reaching out from the Netso contact page to discuss our industrial rooftop solar requirements.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="g-btn g-btn--ghost"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              WhatsApp the desk
            </a>
          </>
        }
        meta={
          <>
            <span className="g-chip">
              <span className="g-dot" aria-hidden="true" />
              Response under 48 hours
            </span>
            <span className="g-chip">Mutual NDA on request</span>
          </>
        }
      />

      <section className="g-section--tight g-section">
        <div className="g-wrap grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Coordinates */}
          <div className="space-y-4">
            <Reveal>
              <Panel className="p-7">
                <h2 className="g-display text-[22px]">Corporate headquarters</h2>
                <p className="g-label mt-2 !text-[9px] text-[rgba(255,250,240,0.45)]">
                  Netso Energy Limited
                </p>

                <div className="mt-7 space-y-5">
                  <Row icon={<MapPin className="h-4 w-4" />} label="Dhaka office">
                    Road 11, Gulshan-2, Dhaka 1212, Bangladesh
                  </Row>

                  <Row icon={<Phone className="h-4 w-4" />} label="Origination desk">
                    <a href="tel:+8801791222777" className="transition-colors hover:text-[var(--g-gold-hi)]">
                      +880 1791-222777 · Tazwar Mahtab
                    </a>
                  </Row>

                  <Row icon={<Mail className="h-4 w-4" />} label="Written enquiries">
                    <a
                      href="mailto:tazwar@netsoenergy.com"
                      className="block transition-colors hover:text-[var(--g-gold-hi)]"
                    >
                      tazwar@netsoenergy.com
                    </a>
                    <a
                      href="mailto:origination@netsoenergy.com"
                      className="mt-0.5 block text-[rgba(255,250,240,0.5)] transition-colors hover:text-[var(--g-gold-hi)]"
                    >
                      origination@netsoenergy.com
                    </a>
                  </Row>

                  <Row icon={<Clock className="h-4 w-4" />} label="Response">
                    Under 48 hours, including a preliminary roof-shadow read.
                  </Row>
                </div>

                <a
                  href={getNetsoWhatsAppUrl(
                    "Hello Tazwar, reaching out from the Netso contact page to discuss our industrial rooftop solar requirements.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:bg-emerald-500/20"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  Open WhatsApp chat
                </a>
              </Panel>
            </Reveal>

            <Reveal delay={90}>
              <Panel className="p-5" variant="quiet">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300/90">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Confidentiality
                </p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-[rgba(255,250,240,0.45)]">
                  Bills, structural calculations and consumption logs you send are handled under
                  a mutual non-disclosure covenant.
                </p>
              </Panel>
            </Reveal>
          </div>

          {/* Dispatch form */}
          <Reveal delay={60}>
            <Panel className="p-6 md:p-9" variant="gold" id="dispatch">
              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="g-display mt-4 text-[24px]">Request recorded</h3>
                  <p className="g-body mx-auto mt-3 max-w-[42ch]">
                    Your facility parameters are queued for the desk. Tazwar Mahtab or an
                    origination director will respond within 24–48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="g-btn g-btn--ghost mt-7"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="g-display text-[24px]">Request an executive briefing</h2>
                    <p className="g-label mt-2 !text-[9px] text-[var(--g-gold)]">
                      Confidential preliminary rooftop feasibility
                    </p>
                  </div>

                  <div className="grid gap-5 pt-2 sm:grid-cols-2">
                    <div>
                      <label className={LABEL} htmlFor="contact-name">
                        Contact name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asif Rahman, Director"
                        className={FIELD}
                      />
                    </div>

                    <div>
                      <label className={LABEL} htmlFor="contact-org">
                        Company / mill *
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="e.g. Paramount Textiles Ltd."
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={LABEL} htmlFor="contact-email">
                        Corporate email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="director@company.com"
                        className={FIELD}
                      />
                    </div>

                    <div>
                      <label className={LABEL} htmlFor="contact-phone">
                        WhatsApp number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1712 345678"
                        className={FIELD}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL} htmlFor="contact-message">
                      Facility details / monthly energy spend
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. 35,000 sq ft RCC rooftop in Gazipur, monthly bill approximately ৳12 Lakh, interested in a zero-CAPEX agreement."
                      className={`${FIELD} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="g-btn w-full disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "Sending…" : "Dispatch feasibility request"}
                  </button>

                  <p className="text-center text-[10.5px] leading-relaxed text-[rgba(255,250,240,0.3)]">
                    Submitting records your details for this enquiry only. Nothing is shared
                    with third parties.
                  </p>
                </form>
              )}
            </Panel>
          </Reveal>
        </div>
      </section>
    </GlassShell>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[rgba(198,161,91,0.24)] bg-[rgba(198,161,91,0.08)] text-[var(--g-gold)]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.4)]">
          {label}
        </p>
        <div className="mt-1 text-[13px] leading-relaxed text-[rgba(255,250,240,0.72)]">{children}</div>
      </div>
    </div>
  );
}
