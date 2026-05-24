# Requirements: Labora Data

**Defined:** 2026-05-24
**Core Value:** Apoiar decisoes juridicas mais seguras com analise de dados de jurisprudencia trabalhista.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Identidade & UX

- [ ] **UX-01**: Interface e totalmente responsiva e utilizavel em mobile sem bugs
- [ ] **UX-02**: Interface em portugues brasileiro em todas as telas
- [ ] **UX-03**: Identidade visual com azul escuro, verde-petroleo e branco

### Landing Page

- [ ] **LAND-01**: Landing page exibe o nome Labora Data e a frase principal
- [ ] **LAND-02**: Landing page apresenta os tres pontos de proposta de valor
- [ ] **LAND-03**: Landing page possui CTAs para cadastrar caso, consultar jurisprudencias e ver analises

### Autenticacao

- [ ] **AUTH-01**: Usuario pode informar nome para login simples
- [ ] **AUTH-02**: Usuario pode informar e-mail para login simples
- [ ] **AUTH-03**: Usuario pode informar senha para login simples
- [ ] **AUTH-04**: Usuario pode informar nome do escritorio ou empresa
- [ ] **AUTH-05**: Usuario pode selecionar perfil (advogado, gestor juridico, administrador)

### Dashboard

- [ ] **DASH-01**: Dashboard mostra total de casos cadastrados
- [ ] **DASH-02**: Dashboard mostra total de jurisprudencias cadastradas
- [ ] **DASH-03**: Dashboard mostra casos com risco baixo
- [ ] **DASH-04**: Dashboard mostra casos com risco medio
- [ ] **DASH-05**: Dashboard mostra casos com risco alto
- [ ] **DASH-06**: Dashboard lista ultimas analises realizadas
- [ ] **DASH-07**: Tabela de casos exibe campos e botao "ver relatorio"

### Cadastro de Caso

- [ ] **CASE-01**: Usuario pode cadastrar caso com todos os campos especificados
- [ ] **CASE-02**: Cadastro inclui temas iniciais predefinidos
- [ ] **CASE-03**: Cadastro inclui objetivo da analise com opcoes definidas

### Cadastro de Jurisprudencias

- [ ] **JUR-01**: Usuario pode cadastrar decisao com todos os campos obrigatorios
- [ ] **JUR-02**: Usuario pode editar decisoes cadastradas
- [ ] **JUR-03**: Usuario pode excluir decisoes cadastradas
- [ ] **JUR-04**: Existe botao visual para importar CSV (simulacao)

### Consulta de Jurisprudencias

- [ ] **SEARCH-01**: Busca permite filtrar por tema e subtema
- [ ] **SEARCH-02**: Busca permite filtrar por tribunal, orgao julgador e magistrado
- [ ] **SEARCH-03**: Busca permite filtrar por periodo
- [ ] **SEARCH-04**: Busca permite filtrar por resultado e palavras-chave
- [ ] **SEARCH-05**: Resultados exibem campos e botao "ver detalhes"

### Motor de Analise Jurimetrica

- [ ] **ANAL-01**: Sistema busca decisoes similares priorizando tema/subtema, tribunal, orgao julgador, magistrado e palavras-chave
- [ ] **ANAL-02**: Sistema amplia a analise quando nao ha decisoes suficientes do mesmo magistrado
- [ ] **ANAL-03**: Analise quantitativa calcula todos os indicadores definidos
- [ ] **ANAL-04**: Regra de risco aplica logica diferente para empresa e trabalhador
- [ ] **ANAL-05**: Sistema gera secao de padrao decisorio do magistrado com minimo de 5 decisoes
- [ ] **ANAL-06**: Sistema exibe mensagem alternativa quando nao ha base suficiente do magistrado
- [ ] **ANAL-07**: Analise qualitativa usa templates por nivel de risco
- [ ] **ANAL-08**: Analise qualitativa inclui fatores que aumentam/reduzem risco e recomendacao estrategica
- [ ] **ANAL-09**: Analise expõe indicadores por tribunal, orgao julgador e magistrado quando houver dados

### Relatorio Jurimetrico

- [ ] **REP-01**: Relatorio por caso inclui dados do caso, indicadores, graficos, jurisprudencias relevantes e recomendacao
- [ ] **REP-02**: Relatorio possui botao para gerar PDF ou imprimir
- [ ] **REP-03**: Relatorio inclui aviso juridico padrao

### Dados Simulados

- [ ] **DATA-01**: Base inicial contem pelo menos 50 decisoes simuladas
- [ ] **DATA-02**: Existem magistrados com 5+ decisoes no mesmo tema para padrao decisorio

### Aviso Juridico

- [ ] **LEG-01**: Rodape exibe aviso juridico em todas as telas

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Plataforma

- **PLAT-01**: Autenticacao real com backend e gestao de sessoes
- **PLAT-02**: Persistencia em banco de dados
- **PLAT-03**: Integracoes com bases externas oficiais de jurisprudencia
- **PLAT-04**: Alertas automaticos de novas decisoes por tema

## Out of Scope

Explicitamente excluido para o MVP.

| Feature | Reason |
|---------|--------|
| Parecer juridico definitivo automatico | Vedado e fora do escopo do MVP |
| Predicao individualizada de juiz | Risco reputacional e base insuficiente |
| Integracao oficial no MVP | Alto custo e dependencia externa |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| UX-01 | Phase 1 | Pending |
| UX-02 | Phase 1 | Pending |
| UX-03 | Phase 1 | Pending |
| LAND-01 | Phase 1 | Pending |
| LAND-02 | Phase 1 | Pending |
| LAND-03 | Phase 1 | Pending |
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| AUTH-05 | Phase 1 | Pending |
| DASH-01 | Phase 7 | Pending |
| DASH-02 | Phase 7 | Pending |
| DASH-03 | Phase 7 | Pending |
| DASH-04 | Phase 7 | Pending |
| DASH-05 | Phase 7 | Pending |
| DASH-06 | Phase 7 | Pending |
| DASH-07 | Phase 7 | Pending |
| CASE-01 | Phase 2 | Pending |
| CASE-02 | Phase 2 | Pending |
| CASE-03 | Phase 2 | Pending |
| JUR-01 | Phase 3 | Pending |
| JUR-02 | Phase 3 | Pending |
| JUR-03 | Phase 3 | Pending |
| JUR-04 | Phase 3 | Pending |
| SEARCH-01 | Phase 4 | Pending |
| SEARCH-02 | Phase 4 | Pending |
| SEARCH-03 | Phase 4 | Pending |
| SEARCH-04 | Phase 4 | Pending |
| SEARCH-05 | Phase 4 | Pending |
| ANAL-01 | Phase 5 | Pending |
| ANAL-02 | Phase 5 | Pending |
| ANAL-03 | Phase 5 | Pending |
| ANAL-04 | Phase 5 | Pending |
| ANAL-05 | Phase 5 | Pending |
| ANAL-06 | Phase 5 | Pending |
| ANAL-07 | Phase 5 | Pending |
| ANAL-08 | Phase 5 | Pending |
| ANAL-09 | Phase 5 | Pending |
| REP-01 | Phase 6 | Pending |
| REP-02 | Phase 6 | Pending |
| REP-03 | Phase 6 | Pending |
| DATA-01 | Phase 3 | Pending |
| DATA-02 | Phase 3 | Pending |
| LEG-01 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

---
*Requirements defined: 2026-05-24*
*Last updated: 2026-05-24 after initial definition*
