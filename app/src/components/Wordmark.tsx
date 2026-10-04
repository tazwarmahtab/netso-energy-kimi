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

export function Wordmark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SunMark variant={dark ? "ink" : "yellow"} className="h-[1.15em] w-[1.15em] shrink-0" />
      <span
        className={`font-display leading-none ${dark ? "text-ink" : ""}`}
        style={{ fontSize: "1.35em", fontWeight: 620, letterSpacing: "-0.02em" }}
      >
        Netso<span className={dark ? "text-ink/45" : "opacity-45"}>&nbsp;Energy</span>
      </span>
    </span>
  );
}
