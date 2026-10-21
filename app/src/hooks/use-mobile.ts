import * as React from "react"

const MOBILE_BREAKPOINT = 768

function readIsMobile() {
  if (typeof window === "undefined") return false
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function useIsMobile() {
  // Read the viewport during the first render so the effect only subscribes.
  const [isMobile, setIsMobile] = React.useState<boolean>(readIsMobile)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(readIsMobile())
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
