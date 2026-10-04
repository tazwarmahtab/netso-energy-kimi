import { motion } from "framer-motion";
import { Gauge, Sun, Zap } from "lucide-react";

const chips = [
  { icon: Sun, label: "Solar yield", value: "1,445 kWh/kWp/yr", pos: "left-[4%] top-[24%]", delay: 0.9, hide: "hidden md:flex" },
  { icon: Zap, label: "PPA rate", value: "৳10.00/kWh", pos: "right-[5%] top-[30%]", delay: 1.1, hide: "hidden md:flex" },
  { icon: Gauge, label: "Self-consumption", value: "78%", pos: "right-[10%] bottom-[24%]", delay: 1.3, hide: "hidden lg:flex" },
];

/** Floating live-stat chips layered over hero imagery. */
export default function StatChips() {
  return (
    <>
      {chips.map((c) => (
        <motion.div
          key={c.label}
          className={`glass-chip absolute z-20 ${c.pos} ${c.hide} items-center gap-3 rounded-2xl px-4 py-3 text-cream`}
          initial={{ opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: c.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <c.icon className="h-4 w-4 text-sun" strokeWidth={2.2} />
          <div>
            <p className="eyebrow !text-[10px] text-cream/60">{c.label}</p>
            <p className="font-mono text-[15px] font-bold tracking-tight">{c.value}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
}
