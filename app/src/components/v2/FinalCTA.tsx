import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Check, ChevronRight, RotateCcw } from "lucide-react";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../ui/WhatsAppIcon";
import { getV2Chapter, v2ChapterNumber } from "./v2Chapters";
import { WHATSAPP_AFTER_REVIEW_LABEL, WHATSAPP_MESSAGE } from "./v2Actions";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

interface Preview {
  name: string;
  company: string;
  contact: string;
  billName?: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  contact?: string;
  bill?: string;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function validateForm(form: HTMLFormElement): FormErrors {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const contact = String(data.get("contact") ?? "").trim();
  const errors: FormErrors = {};

  if (!name) errors.name = "Enter your name.";
  if (!company) errors.company = "Enter your company or facility.";
  if (!contact || (!isEmail(contact) && !isPhone(contact))) errors.contact = "Use a valid email address or phone number.";
  return errors;
}

function getFileError(file: File | undefined): string | undefined {
  if (!file) return undefined;
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) return "Attach a PDF, JPG, or PNG bill.";
  if (file.size > MAX_FILE_BYTES) return "Keep the attachment under 5 MB.";
  return undefined;
}

export default function FinalCTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [preview, setPreview] = useState<Preview | null>(null);
  const [draft, setDraft] = useState<Preview | null>(null);

  const focusStatus = () => window.requestAnimationFrame(() => statusRef.current?.focus());

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const error = getFileError(event.target.files?.[0]);
    setErrors((current) => ({ ...current, bill: error }));
    if (error) focusStatus();
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof FormErrors;
    if (!errors[field]) return;

    const value = event.target.value.trim();
    const fieldError = field === "name"
      ? (value ? undefined : "Enter your name.")
      : field === "company"
        ? (value ? undefined : "Enter your company or facility.")
        : field === "contact"
          ? (value && (isEmail(value) || isPhone(value)) ? undefined : "Use a valid email address or phone number.")
          : undefined;

    setErrors((current) => {
      const next = { ...current };
      if (fieldError) next[field] = fieldError;
      else delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateForm(form);
    const billInput = form.elements.namedItem("bill");
    const billError = getFileError(billInput instanceof HTMLInputElement ? billInput.files?.[0] : undefined);
    const combinedErrors = { ...nextErrors, bill: billError };
    setErrors(combinedErrors);
    if (Object.keys(combinedErrors).some((key) => combinedErrors[key as keyof FormErrors])) {
      focusStatus();
      return;
    }

    const data = new FormData(form);
    const bill = data.get("bill");
    setPreview({
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      billName: bill instanceof File && bill.name ? bill.name : undefined,
    });
    setDraft(null);
    focusStatus();
  };

  const reset = () => {
    formRef.current?.reset();
    setErrors({});
    setDraft(null);
    setPreview(null);
  };

  const edit = () => {
    setDraft(preview);
    setPreview(null);
    window.requestAnimationFrame(() => formRef.current?.elements.namedItem("name") instanceof HTMLElement && (formRef.current?.elements.namedItem("name") as HTMLElement).focus());
  };

  return (
    <section id="v2-assessment" data-v2-chapter="assessment" data-story-chapter="assessment" className="v2-final-cta" aria-labelledby="v2-final-cta-title">
      <div className="v2-final-cta__inner">
        <div className="v2-final-cta__copy">
          <p className="v2-kicker"><span>{v2ChapterNumber("assessment")}</span> / {getV2Chapter("assessment").label}</p>
          <h2 id="v2-final-cta-title">Let the roof<br /><em>make its case.</em></h2>
          <p>A first pass reads best with roof area and access, a recent bill, operating hours, and any site constraints. This local-only preview keeps those inputs in the browser — nothing is uploaded, saved, or sent by this demo.</p>
        </div>

        <div className="v2-form-wrap">
          <div ref={statusRef} className="v2-form-status" tabIndex={-1} aria-live="polite">
            {Object.values(errors).find(Boolean) && <p className="v2-form-error">{Object.values(errors).find(Boolean)}</p>}
          </div>
          {!preview ? (
            <form ref={formRef} onSubmit={handleSubmit} className="v2-form" noValidate>
              <label htmlFor="v2-name"><span>Your name</span><input id="v2-name" required name="name" autoComplete="name" placeholder="Amina Rahman" defaultValue={draft?.name} onChange={handleFieldChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "v2-name-error" : undefined} />{errors.name && <span id="v2-name-error" className="v2-form-field-error">{errors.name}</span>}</label>
              <label htmlFor="v2-company"><span>Company / facility</span><input id="v2-company" required name="company" autoComplete="organization" placeholder="Your organisation" defaultValue={draft?.company} onChange={handleFieldChange} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "v2-company-error" : undefined} />{errors.company && <span id="v2-company-error" className="v2-form-field-error">{errors.company}</span>}</label>
              <label htmlFor="v2-contact"><span>WhatsApp or email</span><input id="v2-contact" required name="contact" inputMode="email" placeholder="name@company.com or +880..." defaultValue={draft?.contact} onChange={handleFieldChange} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "v2-contact-error" : undefined} />{errors.contact && <span id="v2-contact-error" className="v2-form-field-error">{errors.contact}</span>}</label>
              <label htmlFor="v2-bill"><span>Recent bill <small>(optional, local-only)</small></span><input id="v2-bill" name="bill" type="file" accept="application/pdf,image/jpeg,image/png" onChange={handleFileChange} aria-invalid={Boolean(errors.bill)} aria-describedby={errors.bill ? "v2-bill-error" : undefined} />{errors.bill && <span id="v2-bill-error" className="v2-form-field-error">{errors.bill}</span>}</label>
              <button type="submit" className="v2-button v2-button--dark">Preview demo details <ArrowRight width="16" height="16" /></button>
              <small>Demo only: no server upload, persistence, or request is created.</small>
            </form>
          ) : (
            <div className="v2-form-success" role="status">
              <span><Check width="18" height="18" /></span>
              <p>Demo only — nothing sent.</p>
              <small>Preview for {preview.name} · {preview.company}{preview.billName ? ` · ${preview.billName}` : ""}</small>
              <div className="v2-form-success__actions">
                <button type="button" onClick={edit}>Edit preview</button>
                <button type="button" onClick={reset}><RotateCcw width="14" height="14" /> Start over</button>
              </div>
              <a className="v2-whatsapp-link" href={getNetsoWhatsAppUrl(WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon width="17" height="17" /> {WHATSAPP_AFTER_REVIEW_LABEL} <ChevronRight width="15" height="15" />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="v2-final-cta__footer"><span>NETSO°ENERGY</span><span>Buildings become energy assets.</span></div>
    </section>
  );
}
