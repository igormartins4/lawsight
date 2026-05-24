# Codebase Concerns

**Analysis Date:** Sun May 24 2026

## Tech Debt

**Mock data as primary data source:**
- Issue: UI screens depend on in-memory mock datasets and derived data built at module load time, making real data integration and repeatability difficult.
- Files: `src/data/mock.js`, `src/pages/Dashboard.jsx`, `src/pages/Temas.jsx`, `src/pages/TemaDetalhe.jsx`, `src/pages/Escritorios.jsx`, `src/pages/EscritorioDetalhe.jsx`, `src/pages/Magistrados.jsx`, `src/pages/Tribunais.jsx`, `src/pages/Relatorios.jsx`, `src/pages/Simulador.jsx`
- Impact: Data cannot be refreshed from a backend; any new persistence or API layer requires touching many components at once.
- Fix approach: Introduce a data access layer (e.g., `src/services/` or `src/api/`) and replace direct imports of `mock.js` with fetch/adapter calls; keep mock data behind an adapter for development.

**Shared data mutation through in-place sorting:**
- Issue: Some screens sort shared arrays in-place, mutating exported mock data.
- Files: `src/pages/Dashboard.jsx` (uses `temas.sort(...)` twice), `src/pages/TemaDetalhe.jsx` (uses `tema.porTribunal.sort(...)`, `tema.subtemas.sort(...)`)
- Impact: Order of shared data changes globally, creating inconsistent UI ordering between screens and renders.
- Fix approach: Use non-mutating patterns (e.g., `[...array].sort(...)`) and avoid sorting shared data directly.

**LocalStorage persistence without schema/versioning:**
- Issue: Stored data shape is assumed and overwritten without versioning/migrations.
- Files: `src/contexts/FavoritesContext.jsx`, `src/contexts/LGPDContext.jsx`, `src/contexts/ThemeContext.jsx`, `src/pages/Configuracoes.jsx`
- Impact: Schema changes can break stored data or cause silent resets; no way to migrate or validate stored state.
- Fix approach: Add a versioned storage schema and migration utility, validate stored values before use, and consolidate storage keys.

## Known Bugs

**None detected.**

## Security Considerations

**Client-side data persistence only:**
- Risk: User preferences and favorites are stored in localStorage without encryption.
- Files: `src/contexts/LGPDContext.jsx`, `src/contexts/FavoritesContext.jsx`, `src/contexts/ThemeContext.jsx`
- Current mitigation: Try/catch guards on localStorage access.
- Recommendations: If data becomes sensitive, move persistence to a secure backend or encrypt at rest; consider a storage abstraction that can switch strategies.

## Performance Bottlenecks

**Module-load data generation and randomization:**
- Problem: Large mock datasets and derived structures are generated at module load using `Math.random()`.
- Files: `src/data/mock.js`
- Cause: Computation happens on import and uses randomness to build per-theme data and per-magistrate distributions.
- Improvement path: Precompute data or move generation into a build step; for runtime data, fetch from API or memoize with deterministic seeds.

## Fragile Areas

**LGPD flows coupled to banner/modals:**
- Files: `src/contexts/LGPDContext.jsx`, `src/components/ui/LGPDBanner.jsx`, `src/components/ui/PrivacyModal.jsx`, `src/pages/Configuracoes.jsx`
- Why fragile: Multiple UI components assume synchronous localStorage writes and directly manipulate LGPD UI state.
- Safe modification: Keep LGPD state changes centralized in `LGPDContext` and have UI components only call context actions.
- Test coverage: No automated tests cover LGPD flows.

## Scaling Limits

**UI-only data model:**
- Current capacity: All data is loaded into memory from a single module export.
- Limit: Cannot scale to real datasets without reworking every page that imports `mock.js`.
- Scaling path: Replace `mock.js` with a data access layer and pagination/virtualization for large lists.

## Dependencies at Risk

**Not detected.**

## Missing Critical Features

**Backend/data source integration:**
- Problem: There is no API or persistence layer; all data is simulated and embedded in the bundle.
- Blocks: Live analytics, data refresh, authentication, and multi-user usage.
- Files: `src/data/mock.js`, `src/pages/*.jsx`

## Test Coverage Gaps

**No automated tests or test runner configuration:**
- What's not tested: Components, contexts, and UI flows across all pages.
- Files: `package.json` (no test scripts), `src/pages/*.jsx`, `src/components/**/*.jsx`, `src/contexts/*.jsx`
- Risk: UI regressions and data-flow bugs are likely to ship unnoticed.
- Priority: High

---

*Concerns audit: Sun May 24 2026*
