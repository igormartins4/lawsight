# Codebase Structure

**Analysis Date:** 2026-05-24

## Directory Layout

```
[project-root]/
├── src/                 # Application source
│   ├── components/      # Reusable UI/layout/charts
│   ├── contexts/        # Global state providers
│   ├── data/            # Mock data and formatters
│   ├── pages/           # Route-level pages
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Router + providers
│   ├── main.jsx         # App bootstrap
│   └── index.css        # Global styles and design tokens
├── index.html           # Vite HTML entry
├── vite.config.js       # Vite build config
├── tailwind.config.js   # Tailwind config
├── postcss.config.js    # PostCSS config
└── package.json         # Dependencies + scripts
```

## Directory Purposes

**src/components:**
- Purpose: Reusable UI, layout, charts.
- Contains: `layout/`, `ui/`, `charts/` subfolders.
- Key files: `src/components/layout/AppLayout.jsx`, `src/components/layout/Sidebar.jsx`.

**src/contexts:**
- Purpose: Global state management.
- Contains: Providers and hooks for theme, favorites, LGPD.
- Key files: `src/contexts/ThemeContext.jsx`, `src/contexts/FavoritesContext.jsx`, `src/contexts/LGPDContext.jsx`.

**src/data:**
- Purpose: Mock data and formatting helpers.
- Contains: Static datasets and derived data functions.
- Key files: `src/data/mock.js`.

**src/pages:**
- Purpose: Route-level screens.
- Contains: Dashboard and all route components.
- Key files: `src/pages/Dashboard.jsx`, `src/pages/Temas.jsx`, `src/pages/TemaDetalhe.jsx`.

**src/utils:**
- Purpose: Utility helpers for side effects.
- Contains: Download helpers.
- Key files: `src/utils/download.js`.

## Key File Locations

**Entry Points:**
- `index.html`: HTML root for Vite.
- `src/main.jsx`: React bootstrap.

**Configuration:**
- `vite.config.js`: Vite build setup.
- `tailwind.config.js`: Tailwind setup.
- `postcss.config.js`: PostCSS setup.

**Core Logic:**
- `src/App.jsx`: Router + providers.
- `src/data/mock.js`: Data + formatting helpers.

**Testing:**
- Not detected (no test files or config found).

## Naming Conventions

**Files:**
- React components use PascalCase and `.jsx` (e.g., `src/pages/Temas.jsx`, `src/components/ui/KpiCard.jsx`).

**Directories:**
- Feature grouping by function (`pages`, `components`, `contexts`, `data`, `utils`).

## Where to Add New Code

**New Feature:**
- Primary code: add a new page in `src/pages/` and route in `src/App.jsx`.
- Tests: Not applicable (no test harness).

**New Component/Module:**
- Implementation: `src/components/ui/` for reusable UI or `src/components/layout/` for layout.

**Utilities:**
- Shared helpers: `src/utils/`.

## Special Directories

**src/assets:**
- Purpose: Static assets (images, logos).
- Generated: No.
- Committed: Yes (`src/assets/lawsight-logo.jpeg`).

---

*Structure analysis: 2026-05-24*
