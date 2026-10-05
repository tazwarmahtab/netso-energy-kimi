import netsoMark from "../assets/netso-mark.png";
import netsoMarkInk from "../assets/netso-mark-ink.png";
import netsoMarkCream from "../assets/netso-mark-cream.png";

export type MarkVariant = "yellow" | "ink" | "cream";

const SRC: Record<MarkVariant, string> = {
  yellow: netsoMark,
  ink: netsoMarkInk,
  cream: netsoMarkCream,
};

export function SunMark({
  className = "h-6 w-6",
  variant = "yellow",
}: {
  className?: string;
  variant?: MarkVariant;
}) {
  return (
    <img
      src={SRC[variant]}
      alt="Netso Energy mark"
      aria-hidden="true"
      className={className}
      style={{ width: "auto" }}
      draggable={false}
    />
  );
}

export function Wordmark({
  className = "",
  dark = false,
  showTagline = false,
}: {
  className?: string;
  dark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SunMark variant={dark ? "ink" : "yellow"} className="h-[1.15em] w-[1.15em] shrink-0" />
      <span className="inline-flex flex-col">
        <span
          className={`font-display leading-none tracking-[-0.02em] ${dark ? "text-ink" : "text-cream"}`}
          style={{ fontSize: "1.3em", fontWeight: 700 }}
        >
          NETSO<span className="text-gold font-bold ml-0.5">°</span>
          <span className={`text-[0.8em] font-normal tracking-[0.05em] ml-1.5 ${dark ? "text-ink/60" : "text-cream/60"}`}>
            ENERGY
          </span>
        </span>
        {showTagline && (
          <span className={`font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5 ${dark ? "text-ink/40" : "text-cream/40"}`}>
            Rooftop Utility
          </span>
        )}
      </span>
    </span>
  );
}
