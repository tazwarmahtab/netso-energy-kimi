/**
 * One action map for /v2, so the journey-level ask cannot drift between the
 * header, the floating WhatsApp affordance, the assessment section and the
 * footer. Every surface that asks the visitor to act reads its label, target
 * and message from here.
 */

/** The one destination for the assessment ask on the whole page. */
export const ASSESSMENT_HREF = "#v2-assessment";

/**
 * The journey-level primary action. It appears once per surface: the header
 * pill, the mobile menu and nowhere else as a primary.
 */
export const PRIMARY_ACTION_LABEL = "Discuss rooftop feasibility";

/**
 * WhatsApp is the alternative channel, not a second primary. The same message
 * goes to the same number from every placement; one copy, four placements max
 * (fixed pill, mobile menu note, after-review step, footer contact line).
 */
export const WHATSAPP_MESSAGE =
  "Hello Netso Energy team, I would like to discuss a rooftop solar feasibility assessment.";

/** The fixed affordance that stays available on every scroll position. */
export const WHATSAPP_PILL_LABEL = "Chat on WhatsApp";

/** Shown only after the visitor has previewed the assessment details. */
export const WHATSAPP_AFTER_REVIEW_LABEL = "Open WhatsApp after review";
