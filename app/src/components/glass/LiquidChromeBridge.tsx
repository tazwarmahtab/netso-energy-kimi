import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./LiquidChromeBridge.css";

// The shader is a separate asynchronous chunk and is never mounted on first paint.
const LiquidChrome = lazy(() => import("../ui/LiquidChrome"));

/**
 * A single interactive material transition, between the services and roof
 * architecture chapters. Entirely decorative: focus order remains unchanged.
 */
export default function LiquidChromeBridge() {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapability = () => {
      setCanRender(Boolean(window.WebGL2RenderingContext) && !motionQuery.matches);
    };
    updateCapability();
    motionQuery.addEventListener?.("change", updateCapability);

    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return () => motionQuery.removeEventListener?.("change", updateCapability);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener?.("change", updateCapability);
    };
  }, []);

  return (
    <section
      id="material-in-motion"
      ref={containerRef}
      className="netso-liquid-bridge"
      data-testid="liquid-chrome-bridge"
      aria-label="Interactive reflective material study"
    >
      <div className="netso-liquid-bridge__frame">
        <div className="netso-liquid-bridge__fallback" aria-hidden="true" />

        <div className="netso-liquid-bridge__render" aria-hidden="true">
          {canRender && inView && (
            <Suspense fallback={null}>
              <LiquidChrome
                color="#f2f0e8"
                speed={0.16}
                amplitude={0.32}
                frequencyX={3}
                frequencyY={3}
                detail={3}
                thickness={1}
                depth={1}
                roughness={0.18}
                exposure={1.15}
                interactive
                rippleStrength={0.6}
                rippleSize={1}
                tilt={0.65}
                intro={false}
                lightMode={false}
                maxDevicePixelRatio={1.25}
              />
            </Suspense>
          )}
        </div>

        <div className="netso-liquid-bridge__topline" aria-hidden="true">
          <span>NETSO / MATERIAL STUDY</span>
          <span className="netso-liquid-bridge__hint">MOVE TO INTERACT</span>
        </div>
        <div className="netso-liquid-bridge__baseline" aria-hidden="true">
          <span>LIGHT / MATERIAL / MOTION</span>
          <span>01 — 03</span>
        </div>
      </div>
    </section>
  );
}
