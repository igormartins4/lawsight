# Technology Stack

**Analysis Date:** Sun May 24 2026

## Languages

**Primary:**
- JavaScript (ESM) - Frontend source in `src/**/*.jsx` and configs like `vite.config.js`

**Secondary:**
- CSS - Tailwind + custom styles in `src/index.css` (referenced by `src/main.jsx`)

## Runtime

**Environment:**
- Browser (client-side React app) - Entry in `src/main.jsx`

**Package Manager:**
- npm (lockfile v3) - `package-lock.json`
- Lockfile: present (`package-lock.json`)

## Frameworks

**Core:**
- React 18.3.1 - UI framework (`package.json`)
- React Router DOM 6.26.1 - Routing via `HashRouter` in `src/App.jsx`

**Testing:**
- Not detected

**Build/Dev:**
- Vite 5.4.0 - Dev/build toolchain (`package.json`, `vite.config.js`)
- @vitejs/plugin-react 4.3.1 - React plugin for Vite (`package.json`)
- Tailwind CSS 3.4.10 - Utility-first styling (`package.json`, `tailwind.config.js`)
- PostCSS 8.4.41 + Autoprefixer 10.4.20 - CSS processing (`package.json`, `postcss.config.js`)

## Key Dependencies

**Critical:**
- react 18.3.1 - Core UI library (`package.json`)
- react-dom 18.3.1 - React DOM renderer (`package.json`)
- react-router-dom 6.26.1 - SPA navigation (`src/App.jsx`)
- recharts 2.12.7 - Data visualization components (`package.json`, `src/components/charts/*`)

**Infrastructure:**
- Vite 5.4.0 - Build and dev server (`package.json`, `vite.config.js`)
- Tailwind CSS 3.4.10 - Styling system (`tailwind.config.js`)

## Configuration

**Environment:**
- No `.env` files detected in repo root (none found via `.env*` glob)
- App configuration is code-based (e.g., `vite.config.js` uses `base: '/lawsight/'`)

**Build:**
- `vite.config.js` - Vite build setup (base path and sourcemaps)
- `tailwind.config.js` - Tailwind content scanning and theme tokens
- `postcss.config.js` - PostCSS plugins

## Platform Requirements

**Development:**
- Node.js (version not specified) + npm - implied by `package.json` scripts
- Browser for local dev preview (`npm run dev` → `vite`)

**Production:**
- Static asset hosting for Vite build output (`dist/`) - described in `README.md`

---

*Stack analysis: Sun May 24 2026*
