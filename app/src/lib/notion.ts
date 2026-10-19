/**
 * Netso Energy — lead dispatch bridge.
 *
 * Prefer the provider-neutral lead intake client when a safe backend endpoint
 * is configured (`VITE_LEAD_INTAKE_ENDPOINT`). Always keep a local ledger copy
 * for WhatsApp-first handoff. Never call Notion (or any CRM) with browser secrets.
 */
import { submitLead, type LeadIntakeResult } from "./lead-intake";

export interface FeasibilityLead {
  facilityType?: string;
  roofArea?: string;
  monthlySpend?: string;
  contactName: string;
  orgName: string;
  email: string;
  phone: string;
  notes?: string;
  estimatedTariff?: string;
  timestamp?: string;
  source?: "contact" | "feasibility" | "partner";
  partnerType?: string;
  role?: string;
  trackRecord?: string;
  website?: string;
  officeAddress?: string;
  operationalDistricts?: string[];
}

export interface SyncResult {
  success: boolean;
  syncedToNotion: boolean;
  status: LeadIntakeResult["status"] | "local";
  message: string;
  requestId?: string;
}

const LOCAL_STORAGE_KEY = "netso_feasibility_leads_ledger";

function recordLeadLocally(lead: FeasibilityLead): void {
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const leads: FeasibilityLead[] = existing ? JSON.parse(existing) : [];
    leads.unshift({ ...lead, timestamp: lead.timestamp || new Date().toISOString() });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.warn("[Netso / Dispatch] Local lead persistence skipped:", error);
  }
}

/**
 * Attempts durable intake when configured; always records locally for WhatsApp follow-up.
 */
export async function recordLeadForDispatch(lead: FeasibilityLead): Promise<SyncResult> {
  const leadWithTime: FeasibilityLead = {
    ...lead,
    timestamp: lead.timestamp || new Date().toISOString(),
    estimatedTariff: lead.estimatedTariff || "Illustrative savings versus applicable grid costs",
  };
  recordLeadLocally(leadWithTime);

  const result = await submitLead({
    source: lead.source ?? "feasibility",
    contactName: lead.contactName,
    organization: lead.orgName,
    email: lead.email,
    phone: lead.phone,
    message: lead.notes,
    facilityType: lead.facilityType,
    roofAreaSqFt: lead.roofArea,
    monthlySpendBdt: lead.monthlySpend,
    partnerType: lead.partnerType,
    role: lead.role,
    trackRecord: lead.trackRecord,
    website: lead.website,
    officeAddress: lead.officeAddress,
    operationalDistricts: lead.operationalDistricts,
  });

  if (result.status === "accepted") {
    return {
      success: true,
      syncedToNotion: false,
      status: result.status,
      message: result.message,
      requestId: result.requestId,
    };
  }

  if (result.status === "unavailable") {
    return {
      success: true,
      syncedToNotion: false,
      status: result.status,
      message:
        "Saved for WhatsApp dispatch. Durable CRM intake is not configured yet — continue in WhatsApp to reach Netso.",
    };
  }

  return {
    success: result.status === "error" ? false : true,
    syncedToNotion: false,
    status: result.status,
    message: `${result.message} You can still continue via WhatsApp.`,
  };
}

export function getLocalLeads(): FeasibilityLead[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
