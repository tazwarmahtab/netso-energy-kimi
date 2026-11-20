import { lazy, Suspense, useEffect, useState } from "react";
import "./ChromeWorldBackdrop.css";

// Exactly one WebGL renderer covers the viewport, not the (very tall) document.
// It is visual background only; every button and link remains in the foreground.
const LiquidChrome = lazy(() => import("../ui/LiquidChrome"));

export function ChromeWorldBackdrop() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;

    const update = () => {
      if (!disposed) {
        setCanRender(
          Boolean(window.WebGL2RenderingContext) &&
          !motionQuery.matches &&
          document.visibilityState !== "hidden"
        );
      }
    };
    queueMicrotask(update);
    motionQuery.addEventListener?.("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      disposed = true;
      motionQuery.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="g-chrome-world__background" aria-hidden="true" data-testid="chrome-world-backdrop">
      <div className="g-chrome-world__fallback" />
      {canRender && (
        <Suspense fallback={null}>
          <LiquidChrome
            color="#f3efe6"
            speed={0.095}
            amplitude={0.23}
            frequencyX={2.6}
            frequencyY={2.8}
            detail={3}
            roughness={0.28}
            exposure={0.93}
            rippleStrength={0}
            interactive={false}
            intro={false}
            lightMode={false}
            maxFrameRate={24}
            maxDevicePixelRatio={1.0}
          />
        </Suspense>
      )}
      <div className="g-chrome-world__veil" />
    </div>
  );
}

/** A pause in the editorial pacing: intentionally no headline or card. */
export function ChromeWorldInterlude({ placement }: { placement: "opening" | "mid" | "closing" }) {
  return (
    <div
      aria-hidden="true"
      className={`g-chrome-world__interlude g-chrome-world__interlude--${placement}`}
      data-testid={`chrome-world-interlude-${placement}`}
    />
  );
}
