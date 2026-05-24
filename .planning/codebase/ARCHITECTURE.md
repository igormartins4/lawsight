<!-- refreshed: 2026-05-24 -->
# Architecture

**Analysis Date:** 2026-05-24

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                     React SPA (Vite)                        │
├──────────────────┬──────────────────┬───────────────────────┤
│   Pages/Routes   │   Layout & UI    │     Charts & Data     │
│  `src/pages/`    │ `src/components/`│   `src/data/mock.js`  │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │                  │                     │
         ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 Context Providers / State                   │
│                 `src/contexts/*.jsx`                        │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                Browser APIs (localStorage)                  │
│        `src/contexts/ThemeContext.jsx` etc.                 │
└─────────────────────────────────────────────────────────────┘
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

**Overall:** Client-only SPA with route-based pages and shared UI components

**Key Characteristics:**
- Hash-based routing (`HashRouter`) for static hosting (`src/App.jsx`).
- Context providers for global UI state (`src/contexts/*.jsx`).
- Data is in-memory mock data with computed helpers (`src/data/mock.js`).

## Layers

**Routing & Composition:**
- Purpose: Route definitions, provider wiring, layout.
- Location: `src/App.jsx`, `src/main.jsx`.
- Contains: React Router routes, providers.
- Depends on: Contexts, pages, layout.
- Used by: Browser entrypoint (`index.html`).

**Pages:**
- Purpose: Screen-level UI and data shaping.
- Location: `src/pages/`.
- Contains: Page components for dashboard, detail, lists.
- Depends on: `src/data/mock.js`, UI components, charts, utils.
- Used by: Routes in `src/App.jsx`.

**Components:**
- Purpose: Reusable layout, UI, and chart components.
- Location: `src/components/`.
- Contains: Layout (`layout/`), UI (`ui/`), charts (`charts/`).
- Depends on: Contexts, mock data, Recharts (charts).
- Used by: Pages and layout.

**State/Contexts:**
- Purpose: Global state and persistence for theme, favorites, LGPD.
- Location: `src/contexts/`.
- Contains: Context providers and hooks.
- Depends on: Browser APIs (`localStorage`, `document`).
- Used by: `src/App.jsx`, UI components.

**Utilities:**
- Purpose: Side effects like report downloads.
- Location: `src/utils/download.js`.
- Contains: DOM/Blob-based downloads.
- Used by: `src/pages/Relatorios.jsx`, `src/pages/Simulador.jsx`.

## Data Flow

### Primary Request Path

1. Browser loads `index.html` and mounts React (`src/main.jsx`).
2. App providers and router wrap the layout (`src/App.jsx`).
3. Route renders page which reads mock data and renders components (e.g. `src/pages/Dashboard.jsx`).

### Secondary Flow: LGPD Consent

1. LGPD provider initializes consent state from localStorage (`src/contexts/LGPDContext.jsx`).
2. Banner + modal reflect consent state (`src/components/ui/LGPDBanner.jsx`, `src/components/ui/PrivacyModal.jsx`).
3. Consent changes persist to localStorage (`src/contexts/LGPDContext.jsx`).

**State Management:**
- React Context with local state and `localStorage` persistence (`src/contexts/*.jsx`).

## Key Abstractions

**Context Providers:**
- Purpose: Global UI state for theme, favorites, and LGPD.
- Examples: `src/contexts/ThemeContext.jsx`, `src/contexts/FavoritesContext.jsx`, `src/contexts/LGPDContext.jsx`.
- Pattern: Context + custom hook (`useTheme`, `useFavorites`, `useLGPD`).

**Mock Data + Helpers:**
- Purpose: Demo datasets and formatting helpers used across pages.
- Examples: `src/data/mock.js`.
- Pattern: Module-level constants + derived data computed at import time.

## Entry Points

**Vite entry:**
- Location: `src/main.jsx`
- Triggers: Script tag in `index.html`
- Responsibilities: Render root React app.

**Route entry:**
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

**What happens:** CSS is injected directly into `document.head` at module load time.
**Why it's wrong:** Causes side effects on import and complicates SSR or testing.
**Do this instead:** Move styles to `src/index.css` or a component-scoped stylesheet. Reference: `src/components/layout/AppLayout.jsx`.

### Derived data mutating shared objects

**What happens:** `temas` array is mutated with derived fields at import time.
**Why it's wrong:** Creates hidden side effects and makes data flow harder to track.
**Do this instead:** Create derived objects in page-level selectors or pure helpers. Reference: `src/data/mock.js`.

## Error Handling

**Strategy:** Defensive checks + simple fallback UI.

**Patterns:**
- Guard missing route params / missing data (e.g., `TemaDetalhe` / `EscritorioDetalhe`).
- Try/catch around localStorage accesses in contexts.

## Cross-Cutting Concerns

**Logging:** Not detected (no logging framework).
**Validation:** Inline UI guards (e.g., required selections in `Simulador`).
**Authentication:** Not applicable (client-only demo).

---

*Architecture analysis: 2026-05-24*
