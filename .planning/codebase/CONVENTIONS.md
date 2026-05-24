# Coding Conventions

**Analysis Date:** Sun May 24 2026

## Naming Patterns

**Files:**
- React components and pages use PascalCase filenames: `src/components/layout/AppLayout.jsx`, `src/components/ui/ThemeToggle.jsx`, `src/pages/Dashboard.jsx`
- Utility/data files use lowercase names: `src/utils/download.js`, `src/data/mock.js`

**Functions:**
- React components are default-exported named functions: `export default function Dashboard()` in `src/pages/Dashboard.jsx`
- Helpers use lower camelCase: `formatCurrency`, `gerarMatrizRisco` in `src/data/mock.js`

**Variables:**
- camelCase for locals and state: `const [filtros, setFiltros] = useState(...)` in `src/pages/Tribunais.jsx`
- UPPER_SNAKE_CASE for constants: `RISCO_COLORS` in `src/data/mock.js`, `CATEGORIAS` in `src/pages/Relatorios.jsx`

**Types:**
- Not detected (no TypeScript in `src/`)

## Code Style

**Formatting:**
- Not detected (no Prettier/Biome config files found)
- Style uses 2-space indentation in JSX/JS: `src/pages/Dashboard.jsx`, `src/components/ui/FilterBar.jsx`

**Linting:**
- Not detected (no ESLint config files found)

## Import Organization

**Order:**
1. External libraries first (React hooks, router): `import { useState } from 'react'` in `src/pages/Relatorios.jsx`
2. Local app modules next: `import { relatorios } from '../data/mock.js'` in `src/pages/Relatorios.jsx`
3. Local UI/components last: `import FilterBar from '../components/ui/FilterBar.jsx'` in `src/pages/Tribunais.jsx`

**Path Aliases:**
- Not detected (relative imports only, e.g., `../components/ui/FilterBar.jsx` in `src/pages/Temas.jsx`)

## Error Handling

**Patterns:**
- Guarded localStorage access with try/catch and fallback defaults: `src/contexts/FavoritesContext.jsx`, `src/contexts/ThemeContext.jsx`, `src/contexts/LGPDContext.jsx`
- Early returns for missing data: `if (!tema) return (...)` in `src/pages/TemaDetalhe.jsx`

## Logging

**Framework:** None detected

**Patterns:**
- No logging in app code (no `console.*` usage in `src/`)

## Comments

**When to Comment:**
- Section headers and UI area markers: `// ── KPIs (dashboard)` in `src/data/mock.js`, `{/* Form */}` in `src/pages/Simulador.jsx`

**JSDoc/TSDoc:**
- Not detected

## Function Design

**Size:**
- Pages/components can be large with inline JSX and helper calculations at top of file: `src/pages/Dashboard.jsx`, `src/pages/TemaDetalhe.jsx`

**Parameters:**
- Component props are destructured in function signature: `function DataTable({ columns, data, onRowClick, emptyMessage = ... })` in `src/components/ui/DataTable.jsx`

**Return Values:**
- Components return JSX, often with early return for empty states: `src/components/ui/DataTable.jsx`, `src/components/ui/LGPDBanner.jsx`

## Module Design

**Exports:**
- Default export for components/pages: `export default function Simulador()` in `src/pages/Simulador.jsx`
- Named exports for helpers/constants: `export const RISCO_COLORS` in `src/data/mock.js`, `export function downloadReport` in `src/utils/download.js`

**Barrel Files:**
- Not detected

---

*Convention analysis: Sun May 24 2026*
