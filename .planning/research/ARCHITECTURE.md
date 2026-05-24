# Architecture Research

**Domain:** Plataforma web de jurimetria trabalhista empresarial (SPA com dados simulados)
**Researched:** 2026-05-24
**Confidence:** LOW

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         UI Layer                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ Cadastros   │  │ Consultas   │  │ Relatórios  │           │
│  └─────┬───────┘  └─────┬───────┘  └─────┬───────┘           │
├────────┴────────────────┴────────────────┴─────────────────┤
│                      Domain/Services                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Motor de Análise Jurimétrica (regras + métricas)     │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                         Data Layer                            │
│  ┌──────────┐  ┌───────────┐  ┌───────────┐                  │
│  │ Casos    │  │ Decisões  │  │ Metadados │                  │
│  └──────────┘  └───────────┘  └───────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Cadastro de casos | CRUD de casos, validação de campos, normalização de dados | React forms + schema validation | 
| Base de decisões | Importação CSV (simulada), pesquisa e filtros | Data adapters + UI de busca | 
| Motor de análise | Aplicar regras jurimétricas e calcular KPIs | Funções puras + camada de serviços | 
| Relatórios | Montar indicadores, narrativas e recomendações | Template de relatório + renderização | 
| Dashboard | KPIs agregados e últimos casos analisados | UI de cards + agregações | 

## Recommended Project Structure

```
src/
├── features/                # Casos, decisões, análises e relatórios
│   ├── cases/                # Cadastro e listagem de casos
│   ├── decisions/            # Base de decisões e importação
│   ├── analytics/            # Motor de análise + KPIs
│   └── reports/              # Geração e visualização de relatórios
├── pages/                    # Rotas/páginas (dashboard, detalhes, login)
├── components/               # UI reutilizável
├── services/                 # Orquestração de regras e pipelines
├── data/                     # Dados simulados e adapters
├── hooks/                    # Hooks de acesso a dados/estado
├── utils/                    # Helpers e normalização
└── styles/                   # Tokens e temas (Tailwind config)
```

### Structure Rationale

- **features/**: limites por domínio evitam acoplamento entre cadastro, base e relatórios.
- **services/**: concentra regras jurimétricas e evita espalhar cálculos na UI.
- **data/**: mantém dados simulados e adapters isolados para futura troca por API.

## Architectural Patterns

### Pattern 1: Feature-sliced por domínio

**What:** organizar UI, lógica e dados por domínio (casos, decisões, análises, relatórios).
**When to use:** quando o produto possui módulos de negócio bem definidos.
**Trade-offs:** +clareza de limites; -duplicação de UI se não houver componentes compartilhados.

**Example:**
```typescript
// features/analytics/services/computeCaseKPIs.ts
export function computeCaseKPIs(caseData, decisions) {
  return {
    taxaCondenacao: /* regra */,
    valorMedio: /* regra */,
    risco: /* regra */,
  };
}
```

### Pattern 2: Pipeline de relatório

**What:** separar coleta → cálculo → formatação → renderização.
**When to use:** quando o relatório precisa ser reutilizado em tela e PDF.
**Trade-offs:** +reuso e testabilidade; -mais arquivos e camadas.

**Example:**
```typescript
// features/reports/services/buildReport.ts
export function buildReport(caseData, analytics) {
  return {
    resumo: `Risco ${analytics.risco}`,
    indicadores: analytics.indicadores,
  };
}
```

### Pattern 3: Adaptadores de dados

**What:** camada que transforma mocks/CSV em estrutura canônica.
**When to use:** sempre que houver importação ou origem de dados heterogênea.
**Trade-offs:** +evita dependência do formato bruto; -trabalho extra no início.

## Data Flow

### Request Flow

```
[Usuário cadastra caso]
    ↓
[Form UI] → [Validação] → [Service: normalizeCase] → [Data Store (mock)]
    ↓
[Case Detail] ← [Service: computeCaseKPIs] ← [Decisions Store]
```

### State Management

```
[Stores por domínio]
    ↓ (subscribe)
[Components] ←→ [Actions] → [Services] → [Stores]
```

### Key Data Flows

1. **Cadastro de caso → análise:** dados do formulário são normalizados e passam pelo motor de análise.
2. **Base de decisões → filtros → relatório:** filtros refinam a base e alimentam KPIs e narrativas.
3. **Dashboard:** agregações globais a partir de casos + análises recentes.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k usuários | SPA com mocks e serviços locais é suficiente |
| 1k-100k usuários | Introduzir API + cache + armazenamento persistente |
| 100k+ usuários | Separar serviços de análise e relatórios, processamentos assíncronos |

### Scaling Priorities

1. **First bottleneck:** motor de análise no cliente → mover para backend ou web worker.
2. **Second bottleneck:** volume de decisões → indexação e busca server-side.

## Anti-Patterns

### Anti-Pattern 1: Cálculos embutidos em componentes de UI

**What people do:** KPIs calculados diretamente no JSX.
**Why it's wrong:** difícil de testar e reutilizar, acoplamento alto.
**Do this instead:** mover para services/analytics com funções puras.

### Anti-Pattern 2: Misturar dados brutos e normalizados

**What people do:** usar estrutura do CSV diretamente na UI.
**Why it's wrong:** quebra rápida quando o formato muda.
**Do this instead:** criar adaptadores e tipos canônicos.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| (futuro) API de jurisprudência | REST/GraphQL | Fora do MVP; planejar adapters |
| (futuro) Autenticação | OAuth/SSO | Fora do MVP; manter interface preparada |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Cadastro ↔ Análise | Service calls | Compartilhar apenas o modelo normalizado |
| Decisões ↔ Relatórios | Service calls | Relatórios não devem acessar dados brutos |

## Ordem sugerida de construção

1. **Modelos canônicos + adaptadores** (cases/decisions) → base para todos os módulos.
2. **Cadastro de casos** (forms + validação) → gera dados reais para análise.
3. **Base de decisões + filtros** → insumo para KPIs.
4. **Motor de análise** → regras, métricas e risco.
5. **Relatórios por caso** → narrativa e recomendações.
6. **Dashboard** → KPIs agregados e histórico.

## Sources

- Contexto interno do projeto: `.planning/PROJECT.md` (2026-05-24)

---
*Architecture research for: jurimetria trabalhista empresarial*
*Researched: 2026-05-24*
