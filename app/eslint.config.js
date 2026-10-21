import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // Vendored shadcn/ui primitives publish variants, hooks and components from
    // one module on purpose (public API). Kept to an explicit file list rather
    // than muting `src/components/ui/**`, so new primitives still get linted.
    files: [
      'src/components/ui/WhatsAppIcon.tsx',
      'src/components/ui/badge.tsx',
      'src/components/ui/button-group.tsx',
      'src/components/ui/button.tsx',
      'src/components/ui/form.tsx',
      'src/components/ui/navigation-menu.tsx',
      'src/components/ui/sidebar.tsx',
      'src/components/ui/toggle.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // Embla's documented integration subscribes in an effect and mirrors the
    // carousel API into React state; the synchronous first sync is intentional.
    files: ['src/components/ui/carousel.tsx'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
