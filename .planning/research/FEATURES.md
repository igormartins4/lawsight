# Feature Research

**Domain:** Jurimetria trabalhista empresarial (plataforma web)
**Researched:** 2026-05-24
**Confidence:** LOW (fontes oficiais/competitivas bloqueadas por timeout/403; requer validação com materiais públicos dos fornecedores)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Cadastro de casos com campos trabalhistas (empregado, empresa, pedidos, valores, fase) | Base para qualquer análise e gestão | MEDIUM | Estrutura padrão de dossiê e vinculação a partes/advogados |
| Consulta de jurisprudência com filtros (tribunal, tema, período, relator, resultado) | Coração da jurimetria: achar decisões relevantes | MEDIUM | Precisa taxonomia consistente e filtros rápidos |
| Dashboards com KPIs (taxa de êxito, valores médios, tempo médio, distribuição por tema) | Tomada de decisão executiva | MEDIUM | Métricas básicas são esperadas |
| Relatório por caso com indicadores e recomendação (resumo + gráficos) | Entregável direto para decisão de acordo/defesa | MEDIUM | Exportável em PDF é esperado |
| Importação de dados (CSV/planilha) | Onboarding rápido sem integração | MEDIUM | MVP pode ser simulado, mas fluxo deve existir |
| Alertas/atualizações de novas decisões (por tema/tribunal) | Expectativa de acompanhamento contínuo | MEDIUM | Pode iniciar com “newsletter”/notificação simples |
| Controle de usuários e perfis (admin, analista, viewer) | Ambiente corporativo exige segregação | MEDIUM | Mesmo com login simples, a expectativa existe |
| Auditoria básica e logs (quem gerou relatório, quando) | Uso corporativo e compliance | LOW | Pode ser simples, mas esperado |
| Aviso jurídico/disclaimer sobre caráter não vinculante | Padrão em jurimetria | LOW | Alinha com restrição legal e reduz risco |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Motor de recomendações configurável por políticas do escritório | Ajusta estratégia ao perfil de risco do cliente | HIGH | Regras de negócio versionadas + transparência |
| Explicabilidade das métricas (por que o indicador mudou) | Aumenta confiança e uso interno | HIGH | Necessita rastreabilidade de dados e filtros |
| Benchmarking setorial (empresa vs setor/porte) | Valor executivo e comercial | HIGH | Exige base comparativa ampla |
| Simulações de acordo (range de valores e probabilidade) | Acelera decisões de negociação | HIGH | Requer modelos estatísticos e histórico sólido |
| Insights por magistrado/vara com cautelas | Vantagem estratégica com responsabilidade | HIGH | Sensível juridicamente; exige governança |
| Detecção de outliers e inconsistências nos dados | Qualidade da análise | MEDIUM | Evita conclusões erradas |
| Painéis customizáveis por time/cliente | Adoção em ambientes grandes | MEDIUM | Permite visão por unidade/conta |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| “Parecer jurídico definitivo” automático | Desejo de decisão rápida | Risco legal/ético; não substitui advogado | Recomendação probabilística + disclaimer |
| Predição individualizada de decisão do juiz | Atrativo de “certeza” | Base fraca, risco reputacional | Indicadores agregados por tema/tribunal |
| Integração direta com sistemas oficiais no MVP | Automação completa | Alto custo/tempo e dependências | Importação CSV + APIs fase futura |
| Dashboard real-time para tudo | Sensação de modernidade | Custo alto sem valor proporcional | Atualização periódica programada |

## Feature Dependencies

```
Cadastro de casos
    └──requires──> Taxonomia de temas e pedidos
                       └──requires──> Base de jurisprudência estruturada

Relatório por caso
    └──requires──> Motor de análise jurimétrica
                       └──requires──> Indicadores e métricas básicas

Consulta de jurisprudência ──enhances──> Motor de análise

Alertas de novas decisões ──requires──> Indexação por tema/tribunal
```

### Dependency Notes

- **Cadastro de casos requires Taxonomia:** sem padronização não há agregação confiável.
- **Relatório por caso requires Motor de análise:** relatório depende de cálculo de indicadores.
- **Consulta de jurisprudência enhances Motor de análise:** enriquece contexto e qualidade dos insights.
- **Alertas require Indexação:** sem indexação, alertas viram ruído.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] Cadastro de casos trabalhistas completo — base para análises
- [ ] Consulta de jurisprudência com filtros — valida valor da jurimetria
- [ ] Dashboard com KPIs essenciais — visão executiva rápida
- [ ] Relatório jurimétrico por caso — principal entregável
- [ ] Importação CSV (simulada) + base inicial de decisões — demonstração
- [ ] Aviso jurídico/disclaimer — conformidade básica

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Alertas de novas decisões — quando houver uso contínuo
- [ ] Logs/auditoria básica — quando houver múltiplos usuários
- [ ] Painéis customizáveis — quando houver times/contas diferentes

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Simulações avançadas de acordo — depende de base robusta
- [ ] Benchmarking setorial — requer dados comparativos amplos
- [ ] Explicabilidade profunda — exige rastreabilidade completa
- [ ] Recomendação configurável por políticas — complexidade alta

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Cadastro de casos | HIGH | MEDIUM | P1 |
| Consulta com filtros | HIGH | MEDIUM | P1 |
| Dashboard KPIs | HIGH | MEDIUM | P1 |
| Relatório por caso | HIGH | MEDIUM | P1 |
| Importação CSV (simulada) | MEDIUM | MEDIUM | P1 |
| Alertas de novas decisões | MEDIUM | MEDIUM | P2 |
| Logs/auditoria básica | MEDIUM | LOW | P2 |
| Painéis customizáveis | MEDIUM | MEDIUM | P2 |
| Simulações de acordo | HIGH | HIGH | P3 |
| Benchmarking setorial | HIGH | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Competitor A | Competitor B | Our Approach |
|---------|--------------|--------------|--------------|
| Consulta com filtros | N/D (fontes bloqueadas) | N/D (fontes bloqueadas) | Implementar filtros essenciais por tema/tribunal |
| Dashboards KPIs | N/D | N/D | KPIs básicos com foco trabalhista |
| Relatórios por caso | N/D | N/D | Relatório resumido + gráficos |

## Sources

- https://www.jurimetria.com.br/ — **Acesso bloqueado (timeout)**
- https://www.jurimetria.com.br/solucoes — **Acesso bloqueado (timeout)**
- https://www.jusbrasil.com.br/ — **Acesso bloqueado (403)**

---
*Feature research for: jurimetria trabalhista empresarial*
*Researched: 2026-05-24*
