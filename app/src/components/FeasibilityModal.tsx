import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Building2, School, Hospital, Factory, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { syncLeadToNotion } from "../lib/notion";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "./ui/WhatsAppIcon";

interface FeasibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeasibilityModal({ isOpen, onClose }: FeasibilityModalProps) {
  const [step, setStep] = useState(1);
  const [facilityType, setFacilityType] = useState("school");
  const [roofArea, setRoofArea] = useState("10000");
  const [monthlySpend, setMonthlySpend] = useState("600000");
  const [contactName, setContactName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state on close
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        setSyncFeedback("");
        setStep(1);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await syncLeadToNotion({
        facilityType,
        roofArea,
        monthlySpend,
        contactName,
        orgName,
        email,
        phone,
      });
      setSyncFeedback(
        res.syncedToNotion
          ? "Synchronized with Netso Notion Offtaker CRM"
          : "Logged to Netso Dispatch Ledger"
      );
    } catch {
      setSyncFeedback("Logged to Netso Dispatch Ledger");
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-gold/30 bg-forest-dark p-6 text-warm shadow-2xl md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 rounded-full border border-warm/15 p-2 text-warm/60 transition-colors hover:border-warm/40 hover:text-warm"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Header */}
                <div className="flex items-center gap-2 text-gold">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    Institutional Feasibility Audit
                  </span>
                </div>
                <h2 id="modal-title" className="mt-2 font-display text-2xl font-bold text-warm md:text-3xl">
                  {step === 1 && "Select Facility Category"}
                  {step === 2 && "Rooftop & Power Usage"}
                  {step === 3 && "Where should we send the audit?"}
                </h2>
                <p className="mt-1 text-xs text-sage">
                  Netso engineering conducts instant satellite shadow profiling at zero cost.
                </p>

                {/* Step Indicator */}
                <div className="mt-5 flex items-center gap-2">
                  <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-gold" : "bg-warm/15"}`} />
                  <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-gold" : "bg-warm/15"}`} />
                  <div className={`h-1 flex-1 rounded-full ${step >= 3 ? "bg-gold" : "bg-warm/15"}`} />
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="mt-6">
                  {step === 1 && (
                    <div className="space-y-3">
                      <label className="text-xs text-warm/70">Select your institutional or commercial property type:</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "school", label: "School / Campus", icon: School, desc: "CGS 80kWp Model" },
                          { id: "commercial", label: "Corporate HQ", icon: Building2, desc: "Commercial Offices" },
                          { id: "hospital", label: "Hospital / Healthcare", icon: Hospital, desc: "24/7 Critical Load" },
                          { id: "factory", label: "Industrial Factory", icon: Factory, desc: "Heavy Power Spikes" },
                        ].map((t) => {
                          const Icon = t.icon;
                          const selected = facilityType === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setFacilityType(t.id)}
                              className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                                selected
                                  ? "border-gold bg-gold/15 text-warm shadow-lg shadow-gold/10"
                                  : "border-warm/10 bg-forest/60 text-warm/70 hover:border-warm/30 hover:bg-forest/80"
                              }`}
                            >
                              <Icon className={`h-6 w-6 ${selected ? "text-gold" : "text-warm/50"}`} />
                              <span className="mt-2 text-sm font-bold text-warm">{t.label}</span>
                              <span className="text-[11px] text-warm/50">{t.desc}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold text-forest transition-transform hover:scale-[1.01]"
                        >
                          <span>Continue to Facility Metrics</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-mono text-xs uppercase text-warm/80">
                          Estimated Rooftop Area (Sq Ft)
                        </label>
                        <input
                          type="number"
                          value={roofArea}
                          onChange={(e) => setRoofArea(e.target.value)}
                          placeholder="e.g. 10000"
                          className="mt-1.5 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-3 font-mono text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                        <span className="text-[11px] text-warm/50">Minimum 3,000 sq ft for Netso ৳0 CAPEX qualification</span>
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase text-warm/80">
                          Current Monthly Grid Electricity Bill (BDT)
                        </label>
                        <input
                          type="number"
                          value={monthlySpend}
                          onChange={(e) => setMonthlySpend(e.target.value)}
                          placeholder="e.g. 600000"
                          className="mt-1.5 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-3 font-mono text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                        <span className="text-[11px] text-warm/50">Used to model your 35% tariff cut against BERC peak rates</span>
                      </div>

                      <div className="flex gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="rounded-full border border-warm/20 px-5 py-3 text-xs font-semibold text-warm/70 hover:border-warm/40"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold text-forest hover:scale-[1.01]"
                        >
                          <span>Next: Contact Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-medium text-warm/80">Full Name</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Dr. K. Rahman"
                          className="mt-1 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-2.5 text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-warm/80">Institution / Company Name</label>
                        <input
                          type="text"
                          required
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="e.g. Chittagong Grammar School"
                          className="mt-1 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-2.5 text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-warm/80">Official Email</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@institution.edu.bd"
                            className="mt-1 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-2.5 text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-warm/80">Phone / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+880 17..."
                            className="mt-1 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-2.5 text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="rounded-full border border-warm/20 px-5 py-3 text-xs font-semibold text-warm/70 hover:border-warm/40"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold text-forest transition-transform hover:scale-[1.01] disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Dispatching to Notion Pipeline...</span>
                            </>
                          ) : (
                            <>
                              <span>Dispatch Satellite Feasibility Audit</span>
                              <CheckCircle2 className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Touchpoint 3: Instant Bill Snapshot via WhatsApp */}
                      <div className="mt-2 text-center">
                        <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-warm/10" />
                          <span className="flex-shrink mx-3 font-mono text-[10px] uppercase tracking-wider text-warm/40">
                            or instant bill snapshot
                          </span>
                          <div className="flex-grow border-t border-warm/10" />
                        </div>
                        <a
                          href={getNetsoWhatsAppUrl(
                            `Hi Tazwar, sending utility bill details for ${orgName || "our facility"} (approx ${roofArea || "10,000"} sq ft roof) for preliminary Netso solar feasibility.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all"
                        >
                          <WhatsAppIcon className="h-4 w-4 shrink-0" />
                          <span>WhatsApp Utility Bill Photo Directly</span>
                        </a>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* Submission Success State */
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-warm">
                  Feasibility Request Dispatched
                </h3>
                {syncFeedback && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span>{syncFeedback}</span>
                  </div>
                )}
                <p className="mt-3 text-sm text-sage">
                  Thank you, <strong className="text-warm">{contactName}</strong>. Netso’s engineering team has initiated satellite shadow and azimuth profiling for <strong className="text-warm">{orgName}</strong>.
                </p>

                <div className="mt-6 rounded-2xl border border-gold/30 bg-forest/80 p-4 text-left font-mono text-xs">
                  <div className="flex justify-between border-b border-warm/10 py-1.5">
                    <span className="text-warm/60">Property Type:</span>
                    <span className="font-bold text-gold uppercase">{facilityType}</span>
                  </div>
                  <div className="flex justify-between border-b border-warm/10 py-1.5">
                    <span className="text-warm/60">Estimated Roof Area:</span>
                    <span className="font-bold text-warm">{Number(roofArea).toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-warm/60">Target Netso PPA:</span>
                    <span className="font-bold text-emerald-400">৳10.00 / kWh (35% cut)</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-warm/60">
                  Our engineering team will contact you via WhatsApp at <strong className="text-warm">{phone}</strong> with your 3D solar model within 48 hours.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={getNetsoWhatsAppUrl(
                      `Hi Tazwar, I just dispatched the feasibility request for ${orgName || "our facility"} on the site. Sending our electricity bill photo here for priority review.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all shadow-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                    <span>WhatsApp Tazwar for Priority Review</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-warm/10 px-6 py-3 text-xs font-semibold text-warm hover:bg-warm/20"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
