import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";

const KEY = "netso-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

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
          className="fixed inset-x-0 bottom-0 z-[60] px-4"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-chip-light mx-auto max-w-3xl rounded-2xl p-5 shadow-2xl md:p-6">
            <p className="text-[14px] leading-relaxed text-ink/80">
              We use cookies to run this site, understand how it is used, and improve your experience.
              Read our{" "}
              <Link to="/legal/privacy-policy" className="font-medium text-ink underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
            {customize && (
              <div className="mt-4 grid grid-cols-2 gap-2 text-[13px] sm:grid-cols-4">
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => choose("accepted")}
                className="h-11 rounded-full bg-ink px-6 text-[14px] font-semibold text-cream transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                Accept
              </button>
              <button
                onClick={() => choose("rejected")}
                className="h-11 rounded-full border border-ink/20 px-6 text-[14px] font-semibold text-ink transition-colors hover:bg-ink/5"
              >
                Reject
              </button>
              <button
                onClick={() => (customize ? choose("custom") : setCustomize(true))}
                className="h-11 rounded-full px-5 text-[14px] font-medium text-ink/60 underline-offset-2 hover:underline"
              >
                {customize ? "Save choices" : "Customize"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
