import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Check, ChevronRight, RotateCcw } from "lucide-react";
import { WhatsAppIcon, getNetsoWhatsAppUrl } from "../ui/WhatsAppIcon";

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

  const focusStatus = () => window.requestAnimationFrame(() => statusRef.current?.focus());

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const error = getFileError(event.target.files?.[0]);
    setErrors((current) => ({ ...current, bill: error }));
    if (error) focusStatus();
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
    focusStatus();
  };

  const reset = () => {
    formRef.current?.reset();
    setErrors({});
    setPreview(null);
  };

  const edit = () => {
    setPreview(null);
    window.requestAnimationFrame(() => formRef.current?.elements.namedItem("name") instanceof HTMLElement && (formRef.current?.elements.namedItem("name") as HTMLElement).focus());
  };

  return (
    <section id="v2-assessment" data-v2-chapter="assessment" className="v2-final-cta" aria-labelledby="v2-final-cta-title">
      <div className="v2-final-cta__inner">
        <div className="v2-final-cta__copy">
          <p className="v2-kicker"><span>Next</span> / Feasibility</p>
          <h2 id="v2-final-cta-title">Let the roof<br /><em>make its case.</em></h2>
          <p>Use this local-only preview to collect the basics for a first-pass rooftop conversation. Nothing is uploaded or saved by this demo.</p>
          <a className="v2-whatsapp-link" href={getNetsoWhatsAppUrl("Hello Netso Energy team, I would like to discuss a rooftop solar feasibility assessment.")} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon width="17" height="17" /> WhatsApp the commercial desk <ChevronRight width="15" height="15" />
          </a>
        </div>

        <div className="v2-form-wrap">
          <div ref={statusRef} className="v2-form-status" tabIndex={-1} aria-live="polite">
            {Object.values(errors).find(Boolean) && <p className="v2-form-error">{Object.values(errors).find(Boolean)}</p>}
          </div>
          {!preview ? (
            <form ref={formRef} onSubmit={handleSubmit} className="v2-form" noValidate>
              <label htmlFor="v2-name"><span>Your name</span><input id="v2-name" required name="name" autoComplete="name" placeholder="Amina Rahman" aria-invalid={Boolean(errors.name)} /></label>
              <label htmlFor="v2-company"><span>Company / facility</span><input id="v2-company" required name="company" autoComplete="organization" placeholder="Your organisation" aria-invalid={Boolean(errors.company)} /></label>
              <label htmlFor="v2-contact"><span>WhatsApp or email</span><input id="v2-contact" required name="contact" inputMode="email" placeholder="name@company.com or +880..." aria-invalid={Boolean(errors.contact)} /></label>
              <label htmlFor="v2-bill"><span>Recent bill <small>(optional, local-only)</small></span><input id="v2-bill" name="bill" type="file" accept="application/pdf,image/jpeg,image/png" onChange={handleFileChange} aria-invalid={Boolean(errors.bill)} /></label>
              <button type="submit" className="v2-button v2-button--dark">Preview assessment request <ArrowRight width="16" height="16" /></button>
              <small>Illustrative demo only. No server upload, persistence, or request is created.</small>
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
              <a className="v2-whatsapp-link" href={getNetsoWhatsAppUrl(`Hello Netso Energy team, I would like to discuss a rooftop solar feasibility assessment. My name is ${preview.name} from ${preview.company}.`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon width="17" height="17" /> Choose WhatsApp after review <ChevronRight width="15" height="15" />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="v2-final-cta__footer"><span>NETSO°ENERGY</span><span>Buildings become energy assets.</span></div>
    </section>
  );
}
