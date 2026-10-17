import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";

const KEY = "netso-cookie-consent";

function canReadCookieConsent() {
  try {
    localStorage.getItem(KEY);
    return true;
  } catch {
    return false;
  }
}

export default function CookieBanner() {
  const [storageAvailable] = useState(canReadCookieConsent);
  const [visible, setVisible] = useState(() => !storageAvailable);
  const [customize, setCustomize] = useState(false);

  useEffect(() => {
    if (!storageAvailable) return;

    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      // The lazy initial state handles storage-unavailable browsers.
    }
  }, [storageAvailable]);

  const choose = (v: string) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* private mode */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative z-[60] w-full border-t border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur-sm md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <p className="max-w-3xl text-[12px] leading-relaxed text-ink/70 md:text-[13px]">
              We use cookies to run this site, understand how it is used, and improve your experience. Read our{" "}
              <Link to="/legal/privacy-policy" className="font-medium text-ink underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                onClick={() => choose("accepted")}
                className="h-10 rounded-full bg-ink px-5 text-[12px] font-semibold text-cream transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                Accept
              </button>
              <button
                onClick={() => choose("rejected")}
                className="h-10 rounded-full border border-ink/20 px-5 text-[12px] font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                Reject
              </button>
              <button
                onClick={() => (customize ? choose("custom") : setCustomize(true))}
                className="h-10 rounded-full px-4 text-[12px] font-medium text-ink/60 underline-offset-2 hover:underline"
              >
                {customize ? "Save choices" : "Customize"}
              </button>
            </div>
            {customize && (
              <div className="order-3 grid w-full grid-cols-2 gap-2 text-[12px] sm:grid-cols-4">
                {["Essential", "Analytics", "Preferences", "Marketing"].map((c, i) => (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink/10 px-3 py-2"
                  >
                    <input type="checkbox" defaultChecked={i === 0} disabled={i === 0} className="accent-orange" />
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
