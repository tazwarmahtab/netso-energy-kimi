"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InfiniteMarqueeProps {
  /** Items rendered exactly twice for a seamless loop. */
  items: React.ReactNode[];
  /** Cycle duration in seconds (lower = faster). */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Tailwind gap class between items, e.g. "gap-10". */
  gap?: string;
  fade?: boolean;
  className?: string;
  /** Accessible name for this decorative motion region. */
  label?: string;
}

export function InfiniteMarquee({
  items,
  speed = 34,
  direction = "left",
  pauseOnHover = false,
  gap = "gap-16",
  fade = true,
  className,
  label = "Scrolling items",
}: InfiniteMarqueeProps) {
  const animationName =
    direction === "left" ? "wensity-marquee-x" : "wensity-marquee-x-reverse";

  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden",
        fade && [
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
          "[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        ],
        className,
      )}
      role="group"
      aria-label={label}
    >
      <div
        className={cn("wensity-marquee-track flex w-max items-center will-change-transform", gap)}
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          animationPlayState: "running",
        }}
        onMouseEnter={(event) => {
          if (pauseOnHover) event.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(event) => {
          if (pauseOnHover) event.currentTarget.style.animationPlayState = "running";
        }}
      >
        <div className={cn("flex shrink-0 items-center", gap)}>
          {items.map((node, index) => (
            <div key={`a-${index}`} className="shrink-0">
              {node}
            </div>
          ))}
        </div>
        <div className={cn("flex shrink-0 items-center", gap)} aria-hidden="true">
          {items.map((node, index) => (
            <div key={`b-${index}`} className="shrink-0">
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfiniteMarquee;
