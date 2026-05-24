# Labora Data

## What This Is

Labora Data e uma plataforma web de jurimetria trabalhista empresarial para escritorios e departamentos juridicos. A plataforma permite cadastrar casos, consultar jurisprudencias, e gerar analises quantitativas e qualitativas para apoiar decisoes de acordo, defesa, recurso e risco processual.

## Core Value

Apoiar decisoes juridicas mais seguras com analise de dados de jurisprudencia trabalhista.

## Requirements

### Validated

- ✓ Plataforma web de jurimetria com dados simulados e dashboards — existente
- ✓ Navegacao por temas, tribunais, magistrados e relatorios — existente

### Active

- [ ] Tornar a interface totalmente responsiva e adequada para uso mobile sem bugs
- [ ] Reposicionar a plataforma para a marca Labora Data com identidade visual (azul escuro, verde-petroleo e branco)
- [ ] Landing page com proposta e CTAs principais
- [ ] Login simples com campos basicos e perfil do usuario
- [ ] Dashboard com KPIs de casos e analises recentes
- [ ] Cadastro de caso trabalhista com campos completos
- [ ] Cadastro de jurisprudencias com CRUD e importacao CSV (simulacao)
- [ ] Consulta de jurisprudencias com filtros e resultados
- [ ] Motor de analise jurimetrica conforme regras definidas
- [ ] Relatorio jurimetrico por caso com indicadores e recomendacao
- [ ] Base inicial com pelo menos 50 decisoes simuladas
- [ ] Aviso juridico em rodape e relatorios

### Out of Scope

- Integracoes com bases externas oficiais — fora do MVP
- Autenticacao real com backend e controle de acesso — fora do MVP
- Persistencia em banco de dados — fora do MVP
- Calculo juridico vinculante ou parecer juridico definitivo — vedado

## Context

- Codigo existente: SPA React (Vite) com dados simulados em `src/data/mock.js`.
- Foco do MVP: demonstrar valor da jurimetria trabalhista empresarial com UI profissional e fluxos principais.
- Publico-alvo: escritorios de advocacia trabalhista empresarial e departamentos juridicos.
- Idioma: portugues brasileiro em toda a interface.

## Constraints

- **Tech stack**: Manter React + Vite + Tailwind existentes — continuidade da base atual
- **Escopo MVP**: Funcionalidade demonstrativa com dados simulados — sem backend
- **Design**: Identidade visual azul escuro, verde-petroleo e branco — transmitir seguranca e analise de dados

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Manter SPA front-end com dados simulados | Base existente acelera o MVP | — Pending |
| Focar em jurimetria trabalhista empresarial | Atende o publico-alvo e proposta do produto | — Pending |
| Priorizar responsividade mobile | Uso em campo e demonstracoes | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-24 after initialization*
