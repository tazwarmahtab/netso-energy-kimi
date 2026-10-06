interface SectionBridgeProps {
  from: "dark" | "light";
  to: "dark" | "light";
  label?: string;
}

export function SectionBridge({ from, to, label }: SectionBridgeProps) {
  const classes = [
    "section-bridge",
    `section-bridge--${from}-to-${to}`,
  ].join(" ");

  return (
    <div className={classes} aria-hidden={label ? undefined : true}>
      {label ? (
        <div className="section-bridge__inner">
          <span className="section-bridge__line" />
          <span>{label}</span>
          <span className="section-bridge__line section-bridge__line--right" />
        </div>
      ) : null}
    </div>
  );
}
