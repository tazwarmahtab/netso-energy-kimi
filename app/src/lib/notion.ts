/**
 * Netso Energy — Institutional Notion Lead Synchronization Engine
 *
 * Dispatches verified feasibility requests directly to Tazwar Mahtab's Notion workspace
 * (Page ID: 3c80b349-1030-8197-b135-ecf6f359b1de - Top 20 RMG & Textile Offtaker Lead Database)
 * with graceful localStorage queuing and telemetry logging.
 */

export interface FeasibilityLead {
  facilityType: string;
  roofArea: string;
  monthlySpend: string;
  contactName: string;
  orgName: string;
  email: string;
  phone: string;
  estimatedTariff?: string;
  timestamp?: string;
}

export interface SyncResult {
  success: boolean;
  syncedToNotion: boolean;
  blockId?: string;
  message: string;
}

const LOCAL_STORAGE_KEY = "netso_feasibility_leads_ledger";

/**
 * Persists lead to local browser ledger to ensure 100% data retention
 */
function recordLeadLocally(lead: FeasibilityLead): void {
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const leads: FeasibilityLead[] = existing ? JSON.parse(existing) : [];
    leads.unshift({
      ...lead,
      timestamp: lead.timestamp || new Date().toISOString(),
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.warn("[Netso / Notion] Local lead persistence skipped:", err);
  }
}

/**
 * Dispatches a prospect feasibility lead to Notion
 */
export async function syncLeadToNotion(lead: FeasibilityLead): Promise<SyncResult> {
  const timestamp = new Date().toISOString();
  const leadWithTime: FeasibilityLead = {
    ...lead,
    timestamp,
    estimatedTariff: lead.estimatedTariff || "30% Guaranteed Savings vs Grid Peak",
  };

  // 1. Always record in client-side queue
  recordLeadLocally(leadWithTime);

  const apiKey = import.meta.env.VITE_NOTION_API_KEY;
  const pageId = import.meta.env.VITE_NOTION_PAGE_ID || "3c80b349-1030-8197-b135-ecf6f359b1de";

  if (!apiKey) {
    console.info(
      "[Netso / Notion] VITE_NOTION_API_KEY not configured. Lead recorded in local ledger only.",
      leadWithTime
    );
    return {
      success: true,
      syncedToNotion: false,
      message: "Lead recorded in Netso local queue.",
    };
  }

  // Determine API base (local dev server proxy or direct)
  const isDev = import.meta.env.DEV;
  const endpoint = isDev
    ? `/api/notion/v1/blocks/${pageId}/children`
    : `https://api.notion.com/v1/blocks/${pageId}/children`;

  const requestBody = {
    children: [
      {
        object: "block",
        type: "callout",
        callout: {
          icon: {
            type: "emoji",
            emoji: "⚡",
          },
          color: "yellow_background",
          rich_text: [
            {
              type: "text",
              text: {
                content: `WEB LEAD: ${lead.orgName} (${lead.contactName})`,
              },
              annotations: {
                bold: true,
              },
            },
            {
              type: "text",
              text: {
                content: `\n• Facility Type: ${lead.facilityType.toUpperCase()}\n• Roof Area: ${Number(lead.roofArea).toLocaleString()} sq ft\n• Current Monthly Grid Spend: ৳${Number(lead.monthlySpend).toLocaleString()}\n• PPA Savings Guarantee: 30% Guaranteed Discount vs BERC Peak Grid Tariff\n• Email: ${lead.email}\n• Phone / WhatsApp: ${lead.phone}\n• Dispatched At: ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })} BST`,
              },
            },
          ],
        },
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      const data = await res.json();
      const blockId = data?.results?.[0]?.id;
      console.info("[Netso / Notion] Lead synchronized successfully with Notion:", blockId);
      return {
        success: true,
        syncedToNotion: true,
        blockId,
        message: "Successfully synchronized with Notion Offtaker Database.",
      };
    } else {
      const errText = await res.text();
      console.warn("[Netso / Notion] Notion API dispatch responded with error:", res.status, errText);
      return {
        success: true,
        syncedToNotion: false,
        message: `Dispatched to local queue (Notion sync status: ${res.status}).`,
      };
    }
  } catch (err) {
    console.warn("[Netso / Notion] Network dispatch error (safely queued locally):", err);
    return {
      success: true,
      syncedToNotion: false,
      message: "Recorded to local offline queue.",
    };
  }
}

/**
 * Retrieves the local lead ledger
 */
export function getLocalLeads(): FeasibilityLead[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
