import { useEffect, useRef, useState } from "react";
import { X, CheckCircle2, Building2, School, Hospital, Factory, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createLeadIdempotencyKey, submitLead, type LeadIntakeResult } from "../lib/lead-intake";
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
  const [submissionResult, setSubmissionResult] = useState<LeadIntakeResult | null>(null);
  const [metricError, setMetricError] = useState("");

  const submissionKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const submitInFlightRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestVersionRef = useRef(0);
  const mountedRef = useRef(true);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    } else {
      requestVersionRef.current += 1;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
      submitInFlightRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      requestVersionRef.current += 1;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, []);

  const closeModal = () => {
    requestVersionRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    submitInFlightRef.current = false;
    setIsSubmitting(false);
    onClose();
  };

  const startAnotherInquiry = () => {
    submissionKeyRef.current = null;
    setSubmissionResult(null);
    setMetricError("");
    setStep(1);
  };

  const advanceToContactDetails = () => {
    const roof = Number(roofArea.replace(/,/g, "").trim());
    const spend = Number(monthlySpend.replace(/,/g, "").trim());
    if (!Number.isFinite(roof) || roof < 3000 || roof > 10_000_000) {
      setMetricError("Enter a rooftop area between 3,000 and 10,000,000 sq ft.");
      return;
    }
    if (!Number.isFinite(spend) || spend <= 0 || spend > 1_000_000_000) {
      setMetricError("Enter a valid monthly electricity bill.");
      return;
    }
    setMetricError("");
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) {
      if (step === 2) advanceToContactDetails();
      return;
    }
    if (submitInFlightRef.current) return;

    const input = {
      source: "feasibility" as const,
      facilityType,
      roofAreaSqFt: roofArea,
      monthlySpendBdt: monthlySpend,
      contactName,
      organization: orgName,
      email,
      phone,
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
    setIsSubmitting(true);
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
        setIsSubmitting(false);
      }
    }
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby="feasibility-dialog-description"
          onCloseAutoFocus={(event) => {
            const target = previouslyFocusedRef.current;
            if (target?.isConnected) {
              event.preventDefault();
              target.focus();
            }
          }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-gold/30 bg-forest-dark p-6 text-warm shadow-2xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:p-8"
        >
            {/* Close Button */}
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="absolute top-5 right-5 rounded-full border border-warm/15 p-2 text-warm/60 transition-colors hover:border-warm/40 hover:text-warm"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>

            {submissionResult?.status !== "accepted" ? (
              <div>
                {/* Modal Header */}
                <div className="flex items-center gap-2 text-gold">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                   Preliminary roof assessment
                  </span>
                </div>
                <DialogPrimitive.Title id="feasibility-dialog-title" className="mt-2 font-display text-2xl font-bold text-warm md:text-3xl">
                  {step === 1 && "Select Facility Category"}
                  {step === 2 && "Rooftop & Power Usage"}
                  {step === 3 && "Where should we send the audit?"}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description id="feasibility-dialog-description" className="mt-1 text-xs text-sage">
                   Netso starts with a preliminary review of the roof, load profile and utility connection. Any feasibility view is subject to site verification.
                </DialogPrimitive.Description>

                {/* Step Indicator */}
                <div className="mt-5 flex items-center gap-2">
                  <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-gold" : "bg-warm/15"}`} />
                  <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-gold" : "bg-warm/15"}`} />
                  <div className={`h-1 flex-1 rounded-full ${step >= 3 ? "bg-gold" : "bg-warm/15"}`} />
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="mt-6">
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
                              aria-pressed={selected}
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
                        <label htmlFor="feasibility-roof-area" className="block font-mono text-xs uppercase text-warm/80">
                          Estimated Rooftop Area (Sq Ft)
                        </label>
                        <input
                          id="feasibility-roof-area"
                          name="roofAreaSqFt"
                          autoComplete="off"
                          type="number"
                          required
                          min={3000}
                          max={10000000}
                          value={roofArea}
                          aria-invalid={Boolean(metricError)}
                          aria-describedby="feasibility-roof-area-help feasibility-metric-error"
                          onChange={(e) => {
                            setRoofArea(e.target.value);
                            setMetricError("");
                          }}
                          placeholder="e.g. 10000"
                          className="mt-1.5 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-3 font-mono text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                        <span id="feasibility-roof-area-help" className="text-[11px] text-warm/50">Used for an initial screening estimate. Final sizing follows the site review.</span>
                      </div>

                      <div>
                        <label htmlFor="feasibility-monthly-spend" className="block font-mono text-xs uppercase text-warm/80">
                          Current Monthly Grid Electricity Bill (BDT)
                        </label>
                        <input
                          id="feasibility-monthly-spend"
                          name="monthlySpendBdt"
                          autoComplete="off"
                          type="number"
                          required
                          min={1}
                          max={1000000000}
                          value={monthlySpend}
                          aria-invalid={Boolean(metricError)}
                          aria-describedby="feasibility-monthly-spend-help feasibility-metric-error"
                          onChange={(e) => {
                            setMonthlySpend(e.target.value);
                            setMetricError("");
                          }}
                          placeholder="e.g. 600000"
                          className="mt-1.5 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-3 font-mono text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                        <span id="feasibility-monthly-spend-help" className="text-[11px] text-warm/50">Used to compare a preliminary rooftop power estimate with your current bill.</span>
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
                          onClick={advanceToContactDetails}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-bold text-forest hover:scale-[1.01]"
                        >
                          <span>Next: Contact Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      {metricError && (
                        <p id="feasibility-metric-error" role="alert" aria-live="polite" className="text-xs text-red-200">{metricError}</p>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-3.5">
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
                         <label htmlFor="feasibility-contact-name" className="block text-xs font-medium text-warm/80">Full Name</label>
                         <input
                           id="feasibility-contact-name"
                           name="contactName"
                           autoComplete="name"
                           type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Dr. K. Rahman"
                          className="mt-1 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-2.5 text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                         <label htmlFor="feasibility-organization" className="block text-xs font-medium text-warm/80">Institution / Company Name</label>
                         <input
                           id="feasibility-organization"
                           name="organization"
                           autoComplete="organization"
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
                           <label htmlFor="feasibility-email" className="block text-xs font-medium text-warm/80">Official Email</label>
                           <input
                             id="feasibility-email"
                             name="email"
                             autoComplete="email"
                             type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@institution.edu.bd"
                            className="mt-1 w-full rounded-xl border border-warm/20 bg-forest/80 px-4 py-2.5 text-sm text-warm placeholder-warm/30 focus:border-gold focus:outline-none"
                          />
                        </div>
                        <div>
                           <label htmlFor="feasibility-phone" className="block text-xs font-medium text-warm/80">Phone / WhatsApp</label>
                           <input
                             id="feasibility-phone"
                             name="phone"
                             autoComplete="tel"
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
                              <span>Submitting Lead Request...</span>
                            </>
                          ) : (
                            <>
                               <span>Request a preliminary site review</span>
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
              /* Accepted submission state */
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                 <DialogPrimitive.Title id="feasibility-dialog-title" className="mt-4 font-display text-2xl font-bold text-warm">
                   Feasibility Request Accepted
                 </DialogPrimitive.Title>
                 <DialogPrimitive.Description id="feasibility-dialog-description" className="sr-only">
                   Your feasibility request was accepted for follow-up by Netso.
                 </DialogPrimitive.Description>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                   <span>{submissionResult.message}</span>
                 </div>
                 {submissionResult.requestId && (
                   <p className="mt-3 font-mono text-xs text-gold">Request ID: {submissionResult.requestId}</p>
                 )}
                <p className="mt-3 text-sm text-sage">
                  Thank you, <strong className="text-warm">{contactName}</strong>. Your details for <strong className="text-warm">{orgName}</strong> were accepted for follow-up by Netso.
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
                     <span className="text-warm/60">Commercial price target:</span>
                           <span className="font-bold text-emerald-400">Illustrative below-grid target</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-warm/60">
                  Netso can use WhatsApp at <strong className="text-warm">{phone}</strong> for the next step in your feasibility review.
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
                    type="button"
                    onClick={startAnotherInquiry}
                    className="rounded-full border border-warm/20 px-6 py-3 text-xs font-semibold text-warm hover:border-warm/40"
                  >
                    Start another inquiry
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full bg-warm/10 px-6 py-3 text-xs font-semibold text-warm hover:bg-warm/20"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
