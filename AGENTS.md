<!-- GSD:project-start source:PROJECT.md -->

## Project

**Labora Data**

Labora Data e uma plataforma web de jurimetria trabalhista empresarial para escritorios e departamentos juridicos. A plataforma permite cadastrar casos, consultar jurisprudencias, e gerar analises quantitativas e qualitativas para apoiar decisoes de acordo, defesa, recurso e risco processual.

**Core Value:** Apoiar decisoes juridicas mais seguras com analise de dados de jurisprudencia trabalhista.

### Constraints

- **Tech stack**: Manter React + Vite + Tailwind existentes — continuidade da base atual
- **Escopo MVP**: Funcionalidade demonstrativa com dados simulados — sem backend
- **Design**: Identidade visual azul escuro, verde-petroleo e branco — transmitir seguranca e analise de dados

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- JavaScript (ESM) - Frontend source in `src/**/*.jsx` and configs like `vite.config.js`
- CSS - Tailwind + custom styles in `src/index.css` (referenced by `src/main.jsx`)

## Runtime

- Browser (client-side React app) - Entry in `src/main.jsx`
- npm (lockfile v3) - `package-lock.json`
- Lockfile: present (`package-lock.json`)

## Frameworks

- React 18.3.1 - UI framework (`package.json`)
- React Router DOM 6.26.1 - Routing via `HashRouter` in `src/App.jsx`
- Not detected
- Vite 5.4.0 - Dev/build toolchain (`package.json`, `vite.config.js`)
- @vitejs/plugin-react 4.3.1 - React plugin for Vite (`package.json`)
- Tailwind CSS 3.4.10 - Utility-first styling (`package.json`, `tailwind.config.js`)
- PostCSS 8.4.41 + Autoprefixer 10.4.20 - CSS processing (`package.json`, `postcss.config.js`)

## Key Dependencies

- react 18.3.1 - Core UI library (`package.json`)
- react-dom 18.3.1 - React DOM renderer (`package.json`)
- react-router-dom 6.26.1 - SPA navigation (`src/App.jsx`)
- recharts 2.12.7 - Data visualization components (`package.json`, `src/components/charts/*`)
- Vite 5.4.0 - Build and dev server (`package.json`, `vite.config.js`)
- Tailwind CSS 3.4.10 - Styling system (`tailwind.config.js`)

## Configuration

- No `.env` files detected in repo root (none found via `.env*` glob)
- App configuration is code-based (e.g., `vite.config.js` uses `base: '/lawsight/'`)
- `vite.config.js` - Vite build setup (base path and sourcemaps)
- `tailwind.config.js` - Tailwind content scanning and theme tokens
- `postcss.config.js` - PostCSS plugins

## Platform Requirements

- Node.js (version not specified) + npm - implied by `package.json` scripts
- Browser for local dev preview (`npm run dev` → `vite`)
- Static asset hosting for Vite build output (`dist/`) - described in `README.md`

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- React components and pages use PascalCase filenames: `src/components/layout/AppLayout.jsx`, `src/components/ui/ThemeToggle.jsx`, `src/pages/Dashboard.jsx`
- Utility/data files use lowercase names: `src/utils/download.js`, `src/data/mock.js`
- React components are default-exported named functions: `export default function Dashboard()` in `src/pages/Dashboard.jsx`
- Helpers use lower camelCase: `formatCurrency`, `gerarMatrizRisco` in `src/data/mock.js`
- camelCase for locals and state: `const [filtros, setFiltros] = useState(...)` in `src/pages/Tribunais.jsx`
- UPPER_SNAKE_CASE for constants: `RISCO_COLORS` in `src/data/mock.js`, `CATEGORIAS` in `src/pages/Relatorios.jsx`
- Not detected (no TypeScript in `src/`)

## Code Style

- Not detected (no Prettier/Biome config files found)
- Style uses 2-space indentation in JSX/JS: `src/pages/Dashboard.jsx`, `src/components/ui/FilterBar.jsx`
- Not detected (no ESLint config files found)

## Import Organization

- Not detected (relative imports only, e.g., `../components/ui/FilterBar.jsx` in `src/pages/Temas.jsx`)

## Error Handling

- Guarded localStorage access with try/catch and fallback defaults: `src/contexts/FavoritesContext.jsx`, `src/contexts/ThemeContext.jsx`, `src/contexts/LGPDContext.jsx`
- Early returns for missing data: `if (!tema) return (...)` in `src/pages/TemaDetalhe.jsx`

## Logging

- No logging in app code (no `console.*` usage in `src/`)

## Comments

- Section headers and UI area markers: `// ── KPIs (dashboard)` in `src/data/mock.js`, `{/* Form */}` in `src/pages/Simulador.jsx`
- Not detected

## Function Design

- Pages/components can be large with inline JSX and helper calculations at top of file: `src/pages/Dashboard.jsx`, `src/pages/TemaDetalhe.jsx`
- Component props are destructured in function signature: `function DataTable({ columns, data, onRowClick, emptyMessage = ... })` in `src/components/ui/DataTable.jsx`
- Components return JSX, often with early return for empty states: `src/components/ui/DataTable.jsx`, `src/components/ui/LGPDBanner.jsx`

## Module Design

- Default export for components/pages: `export default function Simulador()` in `src/pages/Simulador.jsx`
- Named exports for helpers/constants: `export const RISCO_COLORS` in `src/data/mock.js`, `export function downloadReport` in `src/utils/download.js`
- Not detected

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App bootstrap | Mounts React app into DOM | `src/main.jsx` |
| App router | Defines providers and routes | `src/App.jsx` |
| Layout | Renders sidebar and route outlet | `src/components/layout/AppLayout.jsx` |
| Sidebar nav | Navigation + favorites count + theme toggle | `src/components/layout/Sidebar.jsx` |
| Theme state | Theme toggling + persistence | `src/contexts/ThemeContext.jsx` |
| Favorites state | Favorites store + persistence | `src/contexts/FavoritesContext.jsx` |
| LGPD consent | Consent banner + preferences + cleanup | `src/contexts/LGPDContext.jsx` |
| Mock data | Demo datasets + formatters + derived data | `src/data/mock.js` |

## Pattern Overview

- Hash-based routing (`HashRouter`) for static hosting (`src/App.jsx`).
- Context providers for global UI state (`src/contexts/*.jsx`).
- Data is in-memory mock data with computed helpers (`src/data/mock.js`).

## Layers

- Purpose: Route definitions, provider wiring, layout.
- Location: `src/App.jsx`, `src/main.jsx`.
- Contains: React Router routes, providers.
- Depends on: Contexts, pages, layout.
- Used by: Browser entrypoint (`index.html`).
- Purpose: Screen-level UI and data shaping.
- Location: `src/pages/`.
- Contains: Page components for dashboard, detail, lists.
- Depends on: `src/data/mock.js`, UI components, charts, utils.
- Used by: Routes in `src/App.jsx`.
- Purpose: Reusable layout, UI, and chart components.
- Location: `src/components/`.
- Contains: Layout (`layout/`), UI (`ui/`), charts (`charts/`).
- Depends on: Contexts, mock data, Recharts (charts).
- Used by: Pages and layout.
- Purpose: Global state and persistence for theme, favorites, LGPD.
- Location: `src/contexts/`.
- Contains: Context providers and hooks.
- Depends on: Browser APIs (`localStorage`, `document`).
- Used by: `src/App.jsx`, UI components.
- Purpose: Side effects like report downloads.
- Location: `src/utils/download.js`.
- Contains: DOM/Blob-based downloads.
- Used by: `src/pages/Relatorios.jsx`, `src/pages/Simulador.jsx`.

## Data Flow

### Primary Request Path

### Secondary Flow: LGPD Consent

- React Context with local state and `localStorage` persistence (`src/contexts/*.jsx`).

## Key Abstractions

- Purpose: Global UI state for theme, favorites, and LGPD.
- Examples: `src/contexts/ThemeContext.jsx`, `src/contexts/FavoritesContext.jsx`, `src/contexts/LGPDContext.jsx`.
- Pattern: Context + custom hook (`useTheme`, `useFavorites`, `useLGPD`).
- Purpose: Demo datasets and formatting helpers used across pages.
- Examples: `src/data/mock.js`.
- Pattern: Module-level constants + derived data computed at import time.

## Entry Points

- Location: `src/main.jsx`
- Triggers: Script tag in `index.html`
- Responsibilities: Render root React app.
- Location: `src/App.jsx`
- Triggers: Router navigation
- Responsibilities: Mount providers, route definitions.

## Architectural Constraints

- **Threading:** Single-threaded browser runtime.
- **Global state:** Context providers with local state and localStorage (`src/contexts/*.jsx`).
- **Routing:** Hash-based routing for static deployment (`src/App.jsx`).
- **Data source:** In-memory mock data only (`src/data/mock.js`).

## Anti-Patterns

### DOM manipulation in module scope

### Derived data mutating shared objects

## Error Handling

- Guard missing route params / missing data (e.g., `TemaDetalhe` / `EscritorioDetalhe`).
- Try/catch around localStorage accesses in contexts.

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
