import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

/**
 * Route chunks are content-hashed, so a visitor who keeps an old index.html
 * open (or a tab from before a deploy) will ask for a chunk that no longer
 * exists and get a 404 — the dynamic import rejects and the route never
 * renders. Vite emits `vite:preloadError` for exactly this; a single reload
 * picks up the new asset manifest.
 *
 * Guarded so a genuinely broken deploy cannot put a tab into a reload loop:
 * only one attempt is honoured per session.
 */
window.addEventListener('vite:preloadError', () => {
  const KEY = 'netso:chunk-reload'
  if (sessionStorage.getItem(KEY)) return
  sessionStorage.setItem(KEY, '1')
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
