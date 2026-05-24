# Project Research Summary

**Project:** Labora Data
**Domain:** Plataforma web de jurimetria trabalhista empresarial (SPA com dados simulados)
**Researched:** 2026-05-24
**Confidence:** MEDIUM

## Executive Summary

Labora Data é uma plataforma web de jurimetria trabalhista empresarial focada em cadastro de casos, consulta de jurisprudência e geração de análises/relatórios para apoiar decisões jurídicas. A pesquisa converge para um MVP front-end (React + Vite + Tailwind) com dados simulados, priorizando fluxo de cadastro → análise → relatório e dashboards com KPIs, mantendo o sistema preparado para futura integração com APIs e autenticação. O foco é demonstrar valor com UI profissional, taxonomia consistente e motor de análise local.

A abordagem recomendada é estruturada por domínios (casos, decisões, análises, relatórios), com regras e métricas centralizadas em services e dados normalizados via adaptadores. Isso reduz acoplamento, permite reuso dos cálculos e prepara o caminho para escalabilidade. O roadmap deve seguir a ordem: modelos e taxonomia → cadastros e importação → motor de análise → relatórios → dashboards/UX refinada.

Os principais riscos são vieses de dados, interpretação determinística de probabilidades e questões LGPD. Eles exigem prevenção desde o início: cobertura mínima de dados, rotulagem de dados simulados, anonimização, logs/versões de regras e avisos claros sobre limitações e uso não vinculante.

## Key Findings

### Recommended Stack

O stack proposto é um SPA moderno para dados densos: React 19 + Vite 8 + Tailwind 4 + TypeScript 5. O ecossistema complementa com React Router, TanStack Query/Table, ECharts, React Hook Form e Zod, cobrindo roteamento, cache de dados, tabelas, gráficos e validação. Esse stack equilibra velocidade de implementação, qualidade de UI e preparação para dados grandes.

**Core technologies:**
- **React 19.2.6**: UI SPA — ecossistema maduro para dashboards e visualizações.
- **Vite 8.0.14**: build tool — HMR rápido e builds otimizados.
- **Tailwind CSS 4.3.0**: estilização — consistência visual em UI data-dense.
- **TypeScript 5.x**: tipagem — reduz bugs em regras e modelos jurimétricos.

### Expected Features

O MVP exige base sólida com cadastro de casos, consulta de jurisprudência, dashboards com KPIs, relatórios por caso e importação CSV (ainda que simulada). Alertas, auditoria e painéis customizáveis ficam para v1.x; simulações avançadas, benchmarking e explicabilidade profunda devem ser v2+.

**Must have (table stakes):**
- Cadastro de casos trabalhistas completo — base para análises e relatórios.
- Consulta de jurisprudência com filtros — núcleo da jurimetria.
- Dashboards com KPIs essenciais — visão executiva rápida.
- Relatório por caso com indicadores e recomendação — entregável principal.
- Importação CSV (simulada) — onboarding rápido.
- Aviso jurídico/disclaimer — conformidade básica.

**Should have (competitive):**
- Alertas de novas decisões — aumenta uso contínuo.
- Logs/auditoria básica — compliance e rastreio.
- Painéis customizáveis — adaptação por time/cliente.

**Defer (v2+):**
- Simulações avançadas de acordo — depende de base robusta.
- Benchmarking setorial — exige dados comparativos amplos.
- Explicabilidade profunda e políticas configuráveis — alta complexidade.

### Architecture Approach

A arquitetura recomendada é feature-sliced por domínio, com um motor de análise centralizado em services, dados normalizados via adaptadores e pipeline de relatórios (coleta → cálculo → formatação → renderização). Isso facilita testes, reuso e futura migração para backend.

**Major components:**
1. **Cadastro de casos** — CRUD, validação e normalização de dados.
2. **Base de decisões** — importação CSV e filtros de pesquisa.
3. **Motor de análise** — regras jurimétricas e KPIs.
4. **Relatórios** — montagem de indicadores e narrativas.
5. **Dashboard** — KPIs agregados e histórico recente.

### Critical Pitfalls

1. **Dados enviesados/desbalanceados** — exigir cobertura mínima por TRT/ano e alertas de amostra insuficiente.
2. **LGPD sem base legal clara** — mapear base legal por campo e minimizar/anonimizar dados.
3. **Interpretação determinística de probabilidades** — exibir amostra, incerteza e avisos de limitação.
4. **Falta de rastreabilidade** — versionar regras, logar filtros e origem dos dados.
5. **Mistura de desfechos (acordo vs mérito)** — classificar tipo de desfecho e permitir métricas separadas.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Fundação de dados e taxonomia
**Rationale:** dependências fundamentais do cadastro e das análises exigem modelos canônicos e adaptação de dados antes de UI avançada.
**Delivers:** taxonomia, adaptadores CSV, base simulada rotulada, validação e cadastro básico.
**Addresses:** cadastro de casos, importação CSV (simulada).
**Avoids:** dados enviesados, mistura de desfechos, dados simulados tratados como reais, falhas LGPD.

### Phase 2: Motor analítico e consulta
**Rationale:** análises e filtros dependem de dados normalizados e devem nascer antes de relatórios e dashboards finais.
**Delivers:** motor de análise, KPIs iniciais, consulta de jurisprudência com filtros, cache local.
**Uses:** React Query, Zod, services/analytics.
**Implements:** motor de análise + base de decisões.

### Phase 3: Relatórios e UX de interpretação
**Rationale:** relatório é entregável principal e exige pipeline de dados completo e linguagem/UX responsável.
**Delivers:** relatório por caso, avisos legais, rastreabilidade, exportação segura.
**Addresses:** relatório por caso, disclaimer, logs básicos iniciais.
**Avoids:** interpretação determinística, UX superficial, exportação sem salvaguardas.

### Phase 4: Dashboard executivo e refinamentos v1.x
**Rationale:** dashboards agregam valor após motor e relatórios estarem confiáveis.
**Delivers:** KPIs agregados, painéis customizáveis, alertas simples, auditoria leve.
**Addresses:** dashboards, alertas, painéis customizáveis.

### Phase Ordering Rationale

- Taxonomia e adaptadores são pré-requisito para análises confiáveis.
- Motor de análise precisa existir antes de relatórios e dashboards finais.
- Relatórios exigem rastreabilidade e contexto de amostra para evitar erros legais/interpretativos.
- Dashboards agregados só fazem sentido após regras e dados estarem estáveis.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** compliance LGPD e taxonomia mínima por tribunal/rito (risco regulatório).
- **Phase 2:** regras de cálculo e métricas jurimétricas (validação com especialistas).
- **Phase 3:** linguagem jurídica e UX de interpretação (evitar parecer definitivo).

Phases with standard patterns (skip research-phase):
- **Phase 4:** dashboards e alertas básicos com stack já definido.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Baseado em fontes Context7 e padrões consolidados de SPA. |
| Features | LOW | Fontes competitivas bloqueadas; validação necessária. |
| Architecture | LOW | Derivada de padrões internos e contexto do projeto. |
| Pitfalls | MEDIUM | Baseada em LGPD e riscos comuns em jurimetria. |

**Overall confidence:** MEDIUM-LOW

### Gaps to Address

- **Validação de features competitivas:** checar fontes públicas (jurimetria.com, Jusbrasil) e benchmarks de mercado.
- **Regras de cálculo jurimétrico:** validar métricas e taxonomia com especialistas jurídicos.
- **Políticas LGPD específicas:** mapear base legal e minimização por tipo de dado em conjunto com jurídico.

## Sources

### Primary (HIGH confidence)
- /facebook/react — instalação e versões
- /vitejs/vite — build tool e pipeline
- /tailwindlabs/tailwindcss.com — instalação e setup
- /remix-run/react-router — roteamento SPA
- /tanstack/query — cache e sincronização de dados
- /tanstack/table — tabelas com filtros/paginação
- /apache/echarts-doc — gráficos interativos
- /colinhacks/zod — validação e schemas
- /react-hook-form/react-hook-form — formulários performáticos

### Secondary (MEDIUM confidence)
- LGPD (Lei nº 13.709/2018) — base legal, dados sensíveis, não discriminação
- .planning/PROJECT.md — contexto e restrições do MVP

### Tertiary (LOW confidence)
- https://www.jurimetria.com.br/ — acesso bloqueado
- https://www.jusbrasil.com.br/ — acesso bloqueado

---
*Research completed: 2026-05-24*
*Ready for roadmap: yes*
