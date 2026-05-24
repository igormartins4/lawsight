# External Integrations

**Analysis Date:** Sun May 24 2026

## APIs & External Services

**External APIs:**
- Not detected (no network client imports or API calls found in `src/**/*.{js,jsx,ts,tsx}`)

## Data Storage

**Databases:**
- Not detected (client-only app with mock data in `src/data/mock.js`)

**File Storage:**
- Local browser downloads only (text/JSON downloads via `src/utils/download.js` and `src/pages/Configuracoes.jsx`)

**Caching:**
- Browser localStorage for preferences and consent (`src/contexts/ThemeContext.jsx`, `src/contexts/FavoritesContext.jsx`, `src/contexts/LGPDContext.jsx`)

## Authentication & Identity

**Auth Provider:**
- Not detected (no auth flows or SDKs found in `src/**/*.{js,jsx,ts,tsx}`)

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Console logging not detected in app source

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (documented in `README.md`)

**CI Pipeline:**
- GitHub Actions (documented in `README.md`)

## Environment Configuration

**Required env vars:**
- Not detected (no `.env` files or env access in `src/**/*.{js,jsx,ts,tsx}`)

**Secrets location:**
- Not applicable (static client build, no secrets detected)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: Sun May 24 2026*
