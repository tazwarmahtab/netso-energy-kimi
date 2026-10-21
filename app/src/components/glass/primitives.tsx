import {
  useCallback,
  useRef,
  type CSSProperties,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useInView } from "../../hooks/useInView";

/* ------------------------------------------------------------------------- */
/*  Reveal                                                                 */
/* ------------------------------------------------------------------------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${stagger ? "g-stagger" : "g-reveal"} ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  Glass pane                                                             */
/* ------------------------------------------------------------------------- */

type PanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "quiet" | "deep" | "gold" | "light";
  sheen?: boolean;
  style?: CSSProperties;
};

export function Panel({
  children,
  className = "",
  variant = "default",
  sheen = true,
  style,
}: PanelProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!sheen) return;
      if (event.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    [sheen],
  );

  const variantClass =
    variant === "default" ? "" : `g-glass--${variant}`;

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      style={style}
      className={`g-glass ${sheen ? "g-glass--sheen" : ""} ${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  Section heading                                                        */
/* ------------------------------------------------------------------------- */

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  align?: "left" | "center";
  aside?: ReactNode;
};

export function SectionHead({
  eyebrow,
  title,
  lede,
  className = "",
  align = "left",
  aside,
}: SectionHeadProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : ""} ${className}`}
    >
      <Reveal>
        <p className={`g-label flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}>
          <span className="g-dot" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>

      <div
        className={
          aside
            ? "mt-6 grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            : ""
        }
      >
        <Reveal delay={70}>
          <h2 className={`g-display g-display--lg mt-5 ${centered ? "mx-auto" : ""}`}>
            {title}
          </h2>
        </Reveal>

        {aside ? <Reveal delay={140}>{aside}</Reveal> : null}
      </div>

      {lede ? (
        <Reveal delay={140}>
          <p
            className={`g-body mt-6 max-w-[46ch] ${centered ? "mx-auto" : ""}`}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  Marquee                                                                */
/* ------------------------------------------------------------------------- */

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="g-marquee" aria-label="Netso capabilities">
      <div className="g-marquee__track">
        {doubled.map((item, index) => (
          <span className="g-marquee__item" key={`${item}-${index}`} aria-hidden={index >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  Buttons                                                                */
/* ------------------------------------------------------------------------- */

export function GoldLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `g-btn ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function GhostLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `g-btn g-btn--ghost ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
