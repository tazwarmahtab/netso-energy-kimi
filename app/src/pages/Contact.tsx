import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeasibilityModal from "../components/FeasibilityModal";
import { FadeUp } from "../components/Reveal";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../components/ui/WhatsAppIcon";
import { createLeadIdempotencyKey, submitLead, type LeadIntakeResult } from "../lib/lead-intake";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submissionResult, setSubmissionResult] = useState<LeadIntakeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const submissionKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const submitInFlightRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestVersionRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      requestVersionRef.current += 1;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitInFlightRef.current) return;

    const input = {
      source: "contact" as const,
      contactName: name,
      organization: orgName,
      email,
      phone,
      message,
    };
    const signature = JSON.stringify(input);
    const keyState =
      submissionKeyRef.current?.signature === signature
        ? submissionKeyRef.current
        : { signature, key: createLeadIdempotencyKey() };
    submissionKeyRef.current = keyState;

    const requestVersion = ++requestVersionRef.current;
    const controller = new AbortController();
    submitInFlightRef.current = true;
    abortControllerRef.current = controller;
    setLoading(true);
    setSubmissionResult(null);

    try {
      const result = await submitLead({ ...input, idempotencyKey: keyState.key }, { signal: controller.signal });
      if (!mountedRef.current || controller.signal.aborted || requestVersion !== requestVersionRef.current) return;
      setSubmissionResult(result);
    } catch {
      if (!mountedRef.current || controller.signal.aborted || requestVersion !== requestVersionRef.current) return;
      setSubmissionResult({
        status: "error",
        message: "We could not confirm whether the request was received. Please try again or contact Netso directly.",
      });
    } finally {
      if (requestVersion === requestVersionRef.current) {
        submitInFlightRef.current = false;
        abortControllerRef.current = null;
        setLoading(false);
      }
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
                   Netso Energy contact
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
                 Talk to the Netso team. <br />
                 <span className="text-gold italic font-serif">Start with your facility.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base sm:text-lg text-sage max-w-2xl mx-auto leading-relaxed">
                 Tell us about your roof, electricity use and project goals. We will route your enquiry to the right commercial or engineering contact.
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
                         <strong className="text-cream block font-bold">Phone & WhatsApp</strong>
                        <a href="tel:+8801791222777" className="hover:text-gold transition-colors block">
                           +880 1791-222777
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                         <strong className="text-cream block font-bold">Email</strong>
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
                         <strong className="text-cream block font-bold">What happens next</strong>
                         <span>We review the information you share and follow up about the right assessment.</span>
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
                     <span>Information handling</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-warm/60 font-sans">
                     Please share only the information needed for an initial discussion. Any confidentiality obligations are agreed separately and set out in the relevant engagement documents.
                  </p>
                </div>
              </FadeUp>
            </div>

             {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.2}>
                <div className="rounded-3xl border border-gold/30 bg-forest/60 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                  {submissionResult?.status === "accepted" ? (
                      <div className="text-center py-12" role="status" aria-live="polite">
                      <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto" />
                      <h3 className="font-display mt-4 text-2xl font-bold text-cream">
                           Enquiry accepted
                      </h3>
                      <p className="mt-2 text-sm text-sage max-w-md mx-auto">
                        {submissionResult.message} We’ll use the contact details provided to follow up about your facility.
                      </p>
                      {submissionResult.requestId && (
                        <p className="mt-3 font-mono text-xs text-gold/80">Request ID: {submissionResult.requestId}</p>
                      )}
                      <div className="mt-8">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmissionResult(null);
                            submissionKeyRef.current = null;
                          }}
                          className="rounded-full border border-warm/20 px-6 py-2.5 font-mono text-xs text-warm/80 hover:border-warm/40"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} aria-busy={loading} className="space-y-5">
                      {submissionResult && (
                        <div
                          role="alert"
                          className={`rounded-2xl border p-4 text-sm ${
                            submissionResult.status === "unavailable"
                              ? "border-gold/30 bg-gold/10 text-gold"
                              : "border-red-300/30 bg-red-300/10 text-red-100"
                          }`}
                        >
                            <p className="font-semibold">
                              {submissionResult.status === "unavailable"
                                ? "Lead intake unavailable"
                                : "Submission status"}
                          </p>
                          <p className="mt-1 text-xs opacity-85">{submissionResult.message}</p>
                        </div>
                      )}
                      <div>
                        <h2 className="font-display text-2xl font-bold text-cream">
                           Tell us about your facility
                        </h2>
                        <p className="mt-1 text-xs font-mono text-gold">
                           Preliminary facility and rooftop review
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 pt-4">
                        <div>
                          <label htmlFor="contact-name" className="block font-mono text-xs text-warm/70 mb-1.5">
                            Executive / Contact Name *
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            autoComplete="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Asif Rahman, Director"
                            className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="contact-organization" className="block font-mono text-xs text-warm/70 mb-1.5">
                            Company / Mill Name *
                          </label>
                          <input
                            id="contact-organization"
                            name="organization"
                            autoComplete="organization"
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
                          <label htmlFor="contact-email" className="block font-mono text-xs text-warm/70 mb-1.5">
                            Corporate Email *
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="director@company.com"
                            className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="contact-phone" className="block font-mono text-xs text-warm/70 mb-1.5">
                            WhatsApp Phone *
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            autoComplete="tel"
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
                        <label htmlFor="contact-message" className="block font-mono text-xs text-warm/70 mb-1.5">
                          Facility Details / Monthly Energy Spend
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          autoComplete="off"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                           placeholder="e.g. 35,000 sq ft rooftop in Gazipur. Monthly electricity bill approximately ৳12 Lakh. Interested in a long-term rooftop solar agreement."
                          className="w-full rounded-xl border border-warm/15 bg-black/40 px-4 py-3 font-sans text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 font-mono text-xs font-bold text-forest transition-all hover:bg-gold/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-lg shadow-gold/20"
                      >
                        <Send className="h-4 w-4" />
                           <span>{loading ? "Sending enquiry..." : "Send enquiry"}</span>
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
