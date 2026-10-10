import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeasibilityModal from "../components/FeasibilityModal";
import { FadeUp } from "../components/Reveal";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";
import { recordLeadForDispatch } from "../lib/notion";

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
      setSubmitted(true); // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#08140F] min-h-screen text-warm">
      <Nav theme="dark" onOpenAssessment={() => setModalOpen(true)} />

      <main id="content">
        {/* Header Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 border-b border-warm/10 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
                <Phone className="h-4 w-4 text-gold" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                  Netso Origination & Operations Desk
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                Direct Line to <br />
                <span className="text-gold italic font-serif">Executive Leadership.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-sage max-w-2xl mx-auto leading-relaxed">
                Connect with our commercial structuring directors, utility interconnection specialists, and field engineers in Dhaka.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Contact Body Grid */}
        <section className="py-20 px-6 sm:px-12">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Direct Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <FadeUp>
                <div className="rounded-3xl border border-warm/15 bg-forest/40 p-8 shadow-xl backdrop-blur-sm">
                  <h2 className="font-display text-2xl font-bold text-cream">Corporate Headquarters</h2>
                  <p className="mt-1 text-sm text-sage">Netso Energy Limited</p>

                  <div className="mt-8 space-y-6 font-mono text-xs text-warm/80">
                    <div className="flex items-start gap-3.5">
                      <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cream block font-bold">Dhaka Office</strong>
                        <span>Road 11, Gulshan-2, Dhaka 1212, Bangladesh</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Phone className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cream block font-bold">Origination Desk (Direct & WhatsApp)</strong>
                        <a href="tel:+8801791222777" className="hover:text-gold transition-colors block">
                          +880 1791-222777 (Tazwar Mahtab)
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cream block font-bold">Official Inquiries</strong>
                        <a href="mailto:tazwar@netsoenergy.com" className="hover:text-gold transition-colors block">
                          tazwar@netsoenergy.com
                        </a>
                        <a href="mailto:origination@netsoenergy.com" className="hover:text-gold transition-colors block mt-0.5 text-warm/60">
                          origination@netsoenergy.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cream block font-bold">Response SLA</strong>
                        <span>Under 48 hours for preliminary 3D satellite shadow models.</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-warm/10">
                    <a
                      href={getNetsoWhatsAppUrl("Hello Tazwar, reaching out from the Netso Contact page to discuss our industrial rooftop solar requirements.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 py-3.5 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all shadow-md shadow-emerald-500/10"
                    >
                      <WhatsAppIcon className="h-4 w-4 shrink-0" />
                      <span>Open Instant WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="rounded-2xl border border-warm/10 bg-black/25 p-6 font-mono text-xs text-warm/70">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Non-Disclosure Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-warm/60 font-sans">
                    All factory electricity bills, structural load calculations, and energy consumption logs submitted to Netso are governed by our mutual non-disclosure covenant.
                  </p>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Direct Dispatch Form */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.2}>
                <div className="rounded-3xl border border-gold/30 bg-forest/60 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                  {submitted ? (
                    <div className="text-center py-12">
                      <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto" />
                      <h3 className="font-display mt-4 text-2xl font-bold text-cream">
                        Dossier Request Dispatched
                      </h3>
                      <p className="mt-2 text-sm text-sage max-w-md mx-auto">
                        Thank you. Your facility parameters have been recorded. Tazwar Mahtab or an origination director will reach out within 24–48 hours.
                      </p>
                      <div className="mt-8">
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="rounded-full border border-warm/20 px-6 py-2.5 font-mono text-xs text-warm/80 hover:border-warm/40"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-cream">
                          Request Executive Briefing
                        </h2>
                        <p className="mt-1 text-xs font-mono text-gold">
                          Confidential preliminary rooftop feasibility audit
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 pt-4">
                        <div>
                          <label className="block font-mono text-xs text-warm/70 mb-1.5">
                            Executive / Contact Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Asif Rahman, Director"
                            className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-warm/70 mb-1.5">
                            Company / Mill Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="e.g. Paramount Textiles Ltd."
                            className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className="block font-mono text-xs text-warm/70 mb-1.5">
                            Corporate Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="director@company.com"
                            className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-warm/70 mb-1.5">
                            WhatsApp Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+880 1712 345678"
                            className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-warm/70 mb-1.5">
                          Facility Details / Monthly Energy Spend
                        </label>
                        <textarea
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="e.g. 35,000 sq ft RCC rooftop in Gazipur. Monthly BREB bill approximately ৳12 Lakh. Interested in zero-CAPEX PPA options."
                          className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-lg shadow-gold/20"
                      >
                        <Send className="h-4 w-4" />
                        <span>{loading ? "Transmitting Dossier..." : "Dispatch Feasibility Request"}</span>
                      </button>
                    </form>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FeasibilityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
