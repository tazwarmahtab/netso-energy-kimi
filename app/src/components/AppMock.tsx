import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BatteryFull, Factory, Sun, Zap } from "lucide-react";

/** Animated SVG energy curve — solar bell + usage line. */
function EnergyCurve() {
  const solar = "M0,86 C30,84 44,80 60,62 C78,42 92,20 120,14 C150,7 172,22 190,44 C206,63 216,78 240,84 C260,89 280,88 300,86";
  return (
    <svg viewBox="0 0 300 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCCC3C" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F66F00" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[20, 45, 70].map((y) => (
        <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,247,233,0.07)" strokeWidth="1" />
      ))}
      <motion.path
        d={`${solar} L300,100 L0,100 Z`}
        fill="url(#solarFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.6 }}
      />
      <motion.path
        d={solar}
        fill="none"
        stroke="#FCCC3C"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      <motion.circle
        cx="120"
        cy="14"
        r="4.5"
        fill="#FCCC3C"
        stroke="#111111"
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 14 }}
      />
    </svg>
  );
}

function useTicker(target: number, duration = 1600, decimals = 1) {
  const [v, setV] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return { text: v.toFixed(decimals), start: () => setStarted(true) };
}

/** NEOS — phone-framed live asset telemetry dashboard. */
export default function AppMock({ className = "" }: { className?: string }) {
  const kwh = useTicker(318.4, 1800, 1);
  const pct = useTicker(78, 1800, 0);

  return (
    <motion.div
      className={`relative mx-auto w-[300px] overflow-hidden rounded-[2.2rem] border border-cream/12 bg-coal text-cream shadow-2xl sm:w-[320px] ${className}`}
      initial={{ opacity: 0, y: 40, rotate: 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => {
        kwh.start();
        pct.start();
      }}
    >
      {/* status bar */}
      <div className="flex items-center justify-between px-6 pt-4">
        <span className="font-mono text-[12px] font-bold">NEOS v1</span>
        <div className="h-5 w-16 rounded-full bg-ink/80" />
        <BatteryFull className="h-4 w-4 text-cream/70" />
      </div>

      <div className="px-6 pb-7 pt-5">
        <p className="font-display text-[26px] leading-[0.95]">
          Your roof,
          <br />
          <span className="text-orange">live</span>
        </p>

        <div className="mt-5 flex rounded-full bg-ink/60 p-1">
          {["Energy", "Savings"].map((t, i) => (
            <span
              key={t}
              className={`flex-1 rounded-full py-1.5 text-center text-[12.5px] font-medium ${
                i === 0 ? "bg-cream text-ink" : "text-cream/50"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end gap-6">
          <div>
            <p className="font-mono text-[34px] font-bold leading-none tracking-tight">{kwh.text}</p>
            <p className="eyebrow mt-1.5 !text-[10px] text-cream/50">kWh today</p>
          </div>
          <div>
            <p className="font-mono text-[34px] font-bold leading-none tracking-tight text-sun">{pct.text}%</p>
            <p className="eyebrow mt-1.5 !text-[10px] text-cream/50">Self-use</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="eyebrow !text-[10px] mb-2 text-cream/50">Generation curve</p>
          <div className="h-24">
            <EnergyCurve />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
            <span
              key={d}
              className={`font-mono text-[10px] uppercase tracking-wider ${
                i === 3 ? "text-sun" : "text-cream/35"
              }`}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cream/10 pt-4">
          {[
            { icon: Sun, v: "254.1", l: "Solar" },
            { icon: Zap, v: "62.3", l: "Grid" },
            { icon: Factory, v: "৳3,180", l: "Saved" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-ink/50 px-2.5 py-2.5 text-center">
              <s.icon className="mx-auto h-3.5 w-3.5 text-orange" />
              <p className="mt-1 font-mono text-[13px] font-bold">{s.v}</p>
              <p className="eyebrow !text-[8.5px] text-cream/45">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
