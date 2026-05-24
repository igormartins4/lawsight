# Roadmap: Labora Data

## Overview

O MVP evolui de uma experiência de entrada consistente (marca, idioma, responsividade, landing e login simples) para os fluxos centrais de casos e jurisprudências, seguida pelo motor de análise, relatório por caso e, por fim, um dashboard executivo com KPIs. Cada fase entrega um fluxo completo e verificável para o usuário final.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Marca & Entrada** - Identidade visual, idioma, responsividade, landing e login simples
- [ ] **Phase 2: Cadastro de Caso** - Fluxo completo de cadastro de casos trabalhistas
- [ ] **Phase 3: Base de Jurisprudências** - CRUD de decisões, importação simulada e dados iniciais
- [ ] **Phase 4: Consulta de Jurisprudências** - Busca com filtros e resultados detalhados
- [ ] **Phase 5: Motor de Análise Jurimétrica** - Regras e indicadores jurimétricos aplicados aos dados
- [ ] **Phase 6: Relatório por Caso** - Relatório completo com exportação e aviso jurídico
- [ ] **Phase 7: Dashboard Executivo** - KPIs agregados e visão recente das análises

## Phase Details

### Phase 1: Marca & Entrada
**Goal**: Usuários acessam uma experiência inicial consistente com identidade, idioma e responsividade, incluindo landing e login simples
**Depends on**: Nothing (first phase)
**Requirements**: UX-01, UX-02, UX-03, LAND-01, LAND-02, LAND-03, AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, LEG-01
**Success Criteria** (what must be TRUE):
  1. Usuário visualiza a landing page em português com nome Labora Data, frase principal, três pontos de valor e CTAs principais.
  2. Usuário consegue informar nome, e-mail, senha, escritório/empresa e perfil em um login simples e prosseguir na aplicação.
  3. A interface aplica a identidade visual (azul escuro, verde-petróleo e branco) e funciona em mobile sem quebras visíveis.
  4. Todas as telas disponíveis exibem aviso jurídico no rodapé.
**Plans**: TBD
**UI hint**: yes

### Phase 2: Cadastro de Caso
**Goal**: Usuários conseguem cadastrar casos trabalhistas completos para alimentar análises futuras
**Depends on**: Phase 1
**Requirements**: CASE-01, CASE-02, CASE-03
**Success Criteria** (what must be TRUE):
  1. Usuário consegue preencher e salvar um caso com todos os campos exigidos.
  2. O cadastro oferece temas iniciais predefinidos e opções de objetivo da análise.
  3. Após salvar, o caso fica visível no contexto da sessão atual (ex.: confirmação ou lista).
**Plans**: TBD
**UI hint**: yes

### Phase 3: Base de Jurisprudências
**Goal**: Usuários gerenciam decisões e contam com base simulada suficiente para análises
**Depends on**: Phase 2
**Requirements**: JUR-01, JUR-02, JUR-03, JUR-04, DATA-01, DATA-02
**Success Criteria** (what must be TRUE):
  1. Usuário pode cadastrar, editar e excluir decisões, vendo-as na lista de jurisprudências.
  2. Existe um botão visível para importação CSV e o usuário recebe confirmação simulada ao acioná-lo.
  3. A base inicial possui pelo menos 50 decisões simuladas, incluindo magistrados com 5+ decisões no mesmo tema.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Consulta de Jurisprudências
**Goal**: Usuários conseguem localizar decisões relevantes com filtros completos
**Depends on**: Phase 3
**Requirements**: SEARCH-01, SEARCH-02, SEARCH-03, SEARCH-04, SEARCH-05
**Success Criteria** (what must be TRUE):
  1. Usuário consegue filtrar por tema/subtema, tribunal/órgão/magistrado, período e resultado/palavras-chave.
  2. Resultados exibem os campos exigidos e oferecem o botão "ver detalhes".
**Plans**: TBD
**UI hint**: yes

### Phase 5: Motor de Análise Jurimétrica
**Goal**: O sistema produz análises jurimétricas confiáveis a partir das decisões simuladas
**Depends on**: Phase 4
**Requirements**: ANAL-01, ANAL-02, ANAL-03, ANAL-04, ANAL-05, ANAL-06, ANAL-07, ANAL-08, ANAL-09
**Success Criteria** (what must be TRUE):
  1. A análise prioriza decisões similares por tema/subtema, tribunal, órgão julgador, magistrado e palavras-chave, ampliando o escopo quando necessário.
  2. Indicadores quantitativos são calculados e o risco é aplicado com lógica distinta para empresa e trabalhador.
  3. A análise qualitativa usa templates por nível de risco e inclui fatores de aumento/redução de risco e recomendação estratégica.
  4. O sistema mostra padrão decisório do magistrado quando há 5+ decisões ou exibe mensagem alternativa, além de indicadores por tribunal/órgão/magistrado quando houver dados.
**Plans**: TBD
**UI hint**: yes

### Phase 6: Relatório por Caso
**Goal**: Usuários acessam um relatório completo por caso com exportação segura e aviso jurídico
**Depends on**: Phase 5
**Requirements**: REP-01, REP-02, REP-03
**Success Criteria** (what must be TRUE):
  1. Usuário visualiza relatório por caso com dados do caso, indicadores, gráficos, jurisprudências relevantes e recomendação.
  2. Usuário consegue gerar PDF ou imprimir o relatório.
  3. O relatório exibe aviso jurídico padrão.
**Plans**: TBD
**UI hint**: yes

### Phase 7: Dashboard Executivo
**Goal**: Usuários têm visão executiva com KPIs e histórico recente de análises
**Depends on**: Phase 6
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, DASH-07
**Success Criteria** (what must be TRUE):
  1. O dashboard exibe totais de casos e de jurisprudências cadastradas.
  2. O dashboard mostra a distribuição de risco (baixo, médio, alto) dos casos.
  3. O dashboard lista análises recentes e apresenta tabela de casos com botão "ver relatório".
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Marca & Entrada | 0/TBD | Not started | - |
| 2. Cadastro de Caso | 0/TBD | Not started | - |
| 3. Base de Jurisprudências | 0/TBD | Not started | - |
| 4. Consulta de Jurisprudências | 0/TBD | Not started | - |
| 5. Motor de Análise Jurimétrica | 0/TBD | Not started | - |
| 6. Relatório por Caso | 0/TBD | Not started | - |
| 7. Dashboard Executivo | 0/TBD | Not started | - |
