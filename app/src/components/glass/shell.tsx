import { useEffect, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import FeasibilityModal from "../FeasibilityModal";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { GhostLink, GoldLink, Panel, Reveal } from "./primitives";
import { GlassNav } from "./sections-a";
import { GlassFooter } from "./sections-b";
import "../../styles/glass.css";

/**
 * Inner-page shell.
 *
 * Every non-home route that has been ported to the v3 system renders through
 * this so the nav, footer, smooth scrolling, type scale and canvas are shared.
 * The homepage keeps its own composition because its rhythm is bespoke.
 */
export function GlassShell({
  children,
  onAssess,
  modalOpen,
  closeModal,
}: {
  children: ReactNode;
  onAssess: () => void;
  modalOpen?: boolean;
  closeModal?: () => void;
}) {
  useSmoothScroll();

  // Scroll to top on mount: react-router keeps the previous offset otherwise
  // when navigating from a scrolled homepage.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="g-root g-canvas g-grain overflow-x-clip">
      <GlassNav onAssess={onAssess} onHome={false} />
      <main id="content">{children}</main>
      <GlassFooter />
      {modalOpen !== undefined && closeModal ? (
        <FeasibilityModal isOpen={modalOpen} onClose={closeModal} />
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/*  Page hero                                                              */
/* ------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  lede,
  meta,
  image,
  imageAlt,
  actions,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  meta?: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: compact ? "clamp(420px, 58svh, 560px)" : "clamp(520px, 76svh, 720px)" }}
    >
      {image ? (
        <div className="absolute inset-0 -z-0">
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="h-full w-full object-cover object-center"
            style={{ filter: "saturate(0.82) contrast(1.06) brightness(0.6)" }}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,13,9,0.82),rgba(4,13,9,0.45)_42%,var(--g-void))]" />
        </div>
      ) : null}

      <div className="relative z-10 w-full pb-16 pt-40 md:pb-20 md:pt-44">
        <div className="g-wrap">
          <Reveal>
            <p className="g-label flex items-center gap-2.5">
              <span className="g-dot" aria-hidden="true" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="g-display mt-6 max-w-[19ch] text-[clamp(2.6rem,6.4vw,5rem)]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="g-body mt-6 max-w-[54ch]">{lede}</p>
          </Reveal>

          {actions ? (
            <Reveal delay={210}>
              <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>
            </Reveal>
          ) : null}

          {meta ? (
            <Reveal delay={280}>
              <div className="mt-10 flex flex-wrap gap-2.5">{meta}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
/*  Page section                                                           */
/* ------------------------------------------------------------------------- */

export function PageSection({
  id,
  eyebrow,
  title,
  lede,
  children,
  aside,
  tight = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`g-section ${tight ? "g-section--tight" : ""}`}>
      <div className="g-wrap">
        {eyebrow || title ? (
          <div className={aside ? "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end" : ""}>
            <div>
              {eyebrow ? (
                <Reveal>
                  <p className="g-label flex items-center gap-2.5">
                    <span className="g-dot" aria-hidden="true" />
                    {eyebrow}
                  </p>
                </Reveal>
              ) : null}
              {title ? (
                <Reveal delay={70}>
                  <h2 className="g-display g-display--lg mt-5 max-w-[24ch]">{title}</h2>
                </Reveal>
              ) : null}
            </div>
            {aside ? (
              <Reveal delay={140}>
                <div className="g-body max-w-[44ch] lg:ml-auto">{aside}</div>
              </Reveal>
            ) : null}
          </div>
        ) : null}

        {lede ? (
          <Reveal delay={120}>
            <p className="g-body mt-6 max-w-[46ch]">{lede}</p>
          </Reveal>
        ) : null}

        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
/*  Small building blocks used across the ported pages                     */
/* ------------------------------------------------------------------------- */

export function SpecList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[rgba(255,250,240,0.62)]">
          <span className="mt-[6px] h-1 w-1 flex-none rounded-full bg-[var(--g-gold)]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PageCTA({
  onAssess,
  title = (
    <>
      The sky is already <em>working.</em>
    </>
  ),
  copy = "Send twelve months of bills and a roof plan. We will tell you what the roof can carry, what it can generate, and what the structure would look like.",
}: {
  onAssess: () => void;
  title?: ReactNode;
  copy?: string;
}) {
  return (
    <section className="g-section">
      <div className="g-wrap">
        <Reveal>
          <Panel className="relative overflow-hidden px-6 py-14 text-center md:px-14 md:py-20" variant="gold">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(198,161,91,0.22),transparent_70%)]"
            />
            <p className="g-label relative justify-center">Rooftop assessment</p>
            <h2 className="g-display relative mx-auto mt-6 max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)]">
              {title}
            </h2>
            <p className="g-body relative mx-auto mt-5 max-w-[50ch]">{copy}</p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <GoldLink onClick={onAssess}>
                Request the assessment
                <ArrowUpRight className="h-4 w-4" />
              </GoldLink>
              <GhostLink href="/calculator">Open the calculator</GhostLink>
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
