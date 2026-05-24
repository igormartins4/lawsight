# Stack Research

**Domain:** plataforma web de jurimetria trabalhista (analise de decisoes + dashboards)
**Researched:** 2026-05-24
**Confidence:** MEDIUM

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.2.6 | UI SPA com componentes e hooks | Padrao de mercado para dashboards e apps data-driven; ecossistema maduro e compatibilidade com bibliotecas de graficos e tabelas. |
| Vite | 8.0.14 | Build tool e dev server | Padrao atual para SPAs React por HMR rapido e builds otimizados. |
| Tailwind CSS | 4.3.0 | Estilizacao utilitaria | Acelera UI data-dense com consistencia visual e baixa complexidade de CSS. |
| TypeScript | 5.x | Tipagem e confiabilidade | Reduz bugs em regras de analise e modelos de dados jurimetricos. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-router | 7.15.1 | Roteamento SPA | Necessario para multiplas telas (dashboard, casos, jurisprudencias). |
| @tanstack/react-query | 5.100.14 | Cache e sincronizacao de dados | Quando houver API/CSV import e consultas com filtros. |
| @tanstack/react-table | 8.21.3 | Tabelas com sorting/filtros/paginacao | Para listas grandes de decisoes e casos. |
| echarts | 6.1.0 | Graficos interativos | Para dashboards com indicadores, series temporais e distribuicoes. |
| react-hook-form | 7.76.1 | Formularios performaticos | Para cadastro de casos e jurisprudencias. |
| zod | 4.4.3 | Validacao de dados | Para validar inputs e schemas de importacao CSV. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Qualidade de codigo | Configurar com TypeScript e regras de React. |
| Prettier | Padrao de formatacao | Evita divergencias em time. |

## Installation

```bash
# Core
npm install react@19.2.6 react-dom@19.2.6
npm install -D vite@8.0.14 tailwindcss@4.3.0 @tailwindcss/postcss@4.3.0

# Supporting
npm install react-router@7.15.1 @tanstack/react-query@5.100.14 @tanstack/react-table@8.21.3
npm install echarts@6.1.0 react-hook-form@7.76.1 zod@4.4.3

# Dev dependencies
npm install -D eslint prettier
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React + Vite | Next.js | Se precisar SSR/SEO publico, autenticao real e backend integrado. |
| Tailwind CSS | MUI (Material UI) | Se o time preferir componentes prontos e padrao visual Material. |
| echarts | Recharts | Para graficos mais simples e total integracao com React. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| CRA (Create React App) | Tooling desatualizado e builds mais lentos | Vite. |
| Chart.js puro para dashboards complexos | Menos flexivel para interacao e customizacoes densas | ECharts. |
| Estilos CSS globais sem design system | Dificulta consistencia e responsividade | Tailwind com tokens/tema. |

## Stack Patterns by Variant

**If somente MVP sem backend:**
- Use React + Vite + Tailwind + dados simulados
- Porque reduz custo e acelera validacao de UI/fluxos

**If integrar backend depois:**
- Manter React + Vite e adicionar API + React Query
- Porque cache e refetch sao criticos para filtros e dashboards

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| React 19.2.6 | react-dom 19.2.6 | Versoes devem coincidir. |
| Tailwind 4.3.0 | @tailwindcss/postcss 4.3.0 | Plugin necessario para pipeline de CSS. |
| MUI (se usado) | React 17-19 | Requer react/react-dom instalados. |

## Sources

- /facebook/react — install info (Context7)
- /vitejs/vite — build/deploy docs (Context7)
- /tailwindlabs/tailwindcss.com — install guidance (Context7)
- /remix-run/react-router — install guidance (Context7)
- /tanstack/query — install guidance (Context7)
- /tanstack/table — install guidance (Context7)
- /apache/echarts-doc — install guidance (Context7)
- /colinhacks/zod — install guidance (Context7)
- /react-hook-form/react-hook-form — install guidance (Context7)

---
*Stack research for: jurimetria trabalhista empresarial*
*Researched: 2026-05-24*
