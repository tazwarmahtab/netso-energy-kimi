import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling, wired into the GSAP ticker so ScrollTrigger stays in
 * lockstep with the virtual scroll position.
 *
 * Deliberately opt-out on `prefers-reduced-motion`: smoothing is a comfort
 * feature, and users who ask for less motion should get native scrolling.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // Route in-page anchors (#economics, #proof …) through Lenis.
      anchors: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Web fonts change section heights; re-measure once they land.
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    // Lenis owns scrolling; native smooth-scroll would fight it.
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = previous;
      ScrollTrigger.refresh();
    };
  }, [enabled]);
}
