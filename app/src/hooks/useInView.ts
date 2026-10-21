import { useEffect, useRef, useState } from "react";

/**
 * Subscribe to an element's intersection once. Used by every reveal in the
 * glass system, so it lives in its own module: a file that exports both a hook
 * and components breaks React Fast Refresh.
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  // Resolve the no-IntersectionObserver fallback during the first render
  // rather than synchronously inside the effect.
  const supported =
    typeof IntersectionObserver !== "undefined";

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(!supported);

  useEffect(() => {
    if (!supported) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once !== false) observer.unobserve(entry.target);
          } else if (options?.once === false) {
            setInView(false);
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.18,
        rootMargin: options?.rootMargin ?? "0px 0px -8% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once, supported]);

  return { ref, inView };
}
