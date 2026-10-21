import { useState } from "react";

/**
 * Modal wiring for a ported page that only needs the shell's assessment modal
 * — i.e. every glass page without its own inline form. Keeps the same
 * three-line useState dance out of each page body.
 */
export function useAssessModal() {
  const [open, setOpen] = useState(false);
  return {
    onAssess: () => setOpen(true),
    modalOpen: open,
    closeModal: () => setOpen(false),
  };
}
