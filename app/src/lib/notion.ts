/**
 * Netso Energy — safe lead dispatch ledger.
 *
 * This module intentionally contains no Notion credential and never calls the
 * Notion API from browser code. A future server-side adapter can consume the
 * returned lead through a protected endpoint or an approved CRM connector.
 */
export interface FeasibilityLead {
  facilityType: string;
  roofArea: string;
  monthlySpend: string;
  contactName: string;
  orgName: string;
  email: string;
  phone: string;
  notes?: string;
  estimatedTariff?: string;
  timestamp?: string;
}

export interface SyncResult {
  success: boolean;
  syncedToNotion: boolean;
  message: string;
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
 * Records a lead locally for the WhatsApp-first dispatch flow.
 * Any CRM synchronization must be implemented server-side; client bundles must
 * never contain private integration credentials or call a provider API directly.
 */
export async function recordLeadForDispatch(lead: FeasibilityLead): Promise<SyncResult> {
  const leadWithTime: FeasibilityLead = {
    ...lead,
    timestamp: lead.timestamp || new Date().toISOString(),
    estimatedTariff: lead.estimatedTariff || "Illustrative savings versus applicable grid costs",
  };
  recordLeadLocally(leadWithTime);
  return {
    success: true,
    syncedToNotion: false,
    message: "Lead recorded in the local dispatch ledger. Continue in WhatsApp to send it to Netso.",
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
