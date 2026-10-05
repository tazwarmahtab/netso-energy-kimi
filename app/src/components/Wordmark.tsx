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

/**
 * Modernist Typographic Wordmark: NETSO°ENERGY
 * Directly matched to the Swiss/modernist design specification.
 */
export function Wordmark({
  className = "",
  dark = false,
  showMark = false,
}: {
  className?: string;
  dark?: boolean;
  showMark?: boolean;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 select-none tracking-tight ${className}`}>
      {showMark && (
        <SunMark variant={dark ? "ink" : "yellow"} className="h-4 w-4 shrink-0" />
      )}
      <span
        className={`font-display text-[15px] sm:text-[17px] font-extrabold uppercase tracking-tight transition-colors ${
          dark ? "text-ink" : "text-cream"
        }`}
      >
        NETSO<span className="text-gold mx-[0.5px]">°</span>ENERGY
      </span>
    </span>
  );
}
