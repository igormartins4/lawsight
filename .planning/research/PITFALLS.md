# Pitfalls Research

**Domain:** Jurimetria trabalhista empresarial (plataforma web)
**Researched:** 2026-05-24
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: Dados enviesados ou desbalanceados por tribunal/região/tempo

**What goes wrong:**
Os indicadores refletem apenas um recorte (ex.: TRT específico, período atípico, ou classe de processos) e geram conclusões erradas sobre probabilidade de êxito ou valores médios.

**Why it happens:**
Coleta parcial, ausência de amostragem estratificada e mistura de bases heterogêneas sem normalização.

**How to avoid:**
- Definir critérios mínimos de cobertura por tribunal, período e rito.
- Rotular cada decisão com metadados de origem (TRT, vara, ano, classe).
- Exibir alertas de cobertura insuficiente antes de gerar conclusões.

**Warning signs:**
- Métricas mudam drasticamente ao filtrar por um único TRT.
- Percentuais extremos em amostras pequenas.
- “Rankings” dominados por poucos magistrados ou períodos curtos.

**Phase to address:**
Phase 1 (Fundação de dados e taxonomia).

---

### Pitfall 2: Uso de dados pessoais/sensíveis sem base legal clara (LGPD)

**What goes wrong:**
Dados de partes (nome, CPF, saúde, filiação sindical) são tratados sem base legal explícita, sem minimização ou sem transparência adequada, gerando risco regulatório e reputacional.

**Why it happens:**
Assumir que dados públicos dispensam LGPD, ou que “uso para pesquisa” basta sem requisitos de anonimização.

**How to avoid:**
- Mapear finalidade e base legal para cada campo (LGPD arts. 7º e 11).
- Minimizar e anonimizar/pseudonimizar quando possível (LGPD art. 12).
- Documentar política de retenção e descarte.

**Warning signs:**
- Campos pessoais não essenciais aparecem em relatórios.
- Usuários conseguem reidentificar partes em dashboards.
- Ausência de registro claro de base legal por tipo de dado.

**Phase to address:**
Phase 1 (Compliance e governança de dados).

---

### Pitfall 3: Interpretação determinística de probabilidades

**What goes wrong:**
Usuários interpretam percentuais como “certeza jurídica”, usando o sistema para decisões automáticas sem revisão humana.

**Why it happens:**
Modelos e dashboards apresentam números sem contexto de incerteza, tamanho da amostra e variáveis de confusão.

**How to avoid:**
- Exibir intervalo de confiança, tamanho da amostra e limitações.
- Incluir avisos de uso (sem substituição de análise jurídica).
- Explicar critérios e variáveis consideradas.

**Warning signs:**
- Usuários tomam decisões sem abrir detalhes da amostra.
- Relatórios citados como “parecer” definitivo.
- Rejeição de casos “fora do padrão” sem análise.

**Phase to address:**
Phase 2 (Motor analítico) + Phase 3 (Relatórios e UX de interpretação).

---

### Pitfall 4: Viés algorítmico oculto em rankings de magistrados/tribunais

**What goes wrong:**
Rankings reforçam estereótipos ou induzem decisões discriminatórias (LGPD art. 6º, não discriminação), especialmente quando correlacionam variáveis sensíveis.

**Why it happens:**
Falta de auditoria de variáveis, correlação indevida e ausência de explicabilidade.

**How to avoid:**
- Remover ou agregar variáveis sensíveis.
- Revisão humana e testes de fairness por estratos.
- Explicações visíveis sobre “o que o ranking mede”.

**Warning signs:**
- Diferenças sistemáticas por região/vara sem justificativa legal.
- Rankings divergindo de análises qualitativas.
- Feedback de usuários sobre “tendenciosidade”.

**Phase to address:**
Phase 2 (Modelagem) e Phase 4 (Governança contínua).

---

### Pitfall 5: UX que incentiva leitura superficial

**What goes wrong:**
Dashboards resumem demais e escondem metodologia; usuários não confiam ou interpretam mal.

**Why it happens:**
Foco excessivo em KPIs “bonitos” sem contexto de dados e sem drill-down.

**How to avoid:**
- “Explicar antes de concluir”: mostrar metodologia, filtros ativos, cobertura da amostra.
- Drill-down obrigatório antes de exportar relatório.
- Rótulos claros sobre “estimativa” vs “fato”.

**Warning signs:**
- Alto uso de exportação sem navegação pelos detalhes.
- Perguntas recorrentes sobre “de onde saiu esse número?”.

**Phase to address:**
Phase 3 (UX de análise e relatórios).

---

### Pitfall 6: Falta de rastreabilidade dos dados (linha do tempo e origem)

**What goes wrong:**
Não é possível explicar de onde um indicador veio, qual decisão foi usada, e quais filtros estavam ativos.

**Why it happens:**
Ausência de logs, metadados e versionamento da base.

**How to avoid:**
- Versionar bases e regras do motor analítico.
- Logs de filtros e parâmetros por relatório.
- “Fonte e data de extração” visível em cada relatório.

**Warning signs:**
- Relatórios distintos para o mesmo caso sem mudança aparente.
- Dificuldade em reproduzir resultados internamente.

**Phase to address:**
Phase 2 (Motor) e Phase 3 (Relatórios).

---

### Pitfall 7: Misturar decisões de mérito com acordos sem classificação

**What goes wrong:**
Cálculos de taxa de êxito ficam distorcidos quando acordos e decisões de mérito são agregados sem distinção.

**Why it happens:**
Taxonomia incompleta ou ausência de campo “tipo de desfecho”.

**How to avoid:**
- Classificar desfecho (acordo, procedência, improcedência, parcial).
- Permitir métricas separadas por tipo de desfecho.

**Warning signs:**
- Taxas de êxito incompatíveis com a experiência do usuário.
- Grandes variações ao incluir/excluir acordos.

**Phase to address:**
Phase 1 (Taxonomia de dados).

---

### Pitfall 8: Exportações/relatórios sem salvaguardas de privacidade

**What goes wrong:**
Relatórios exportados com dados identificáveis ou sensíveis circulam sem controle, gerando risco LGPD.

**Why it happens:**
Foco no relatório pronto e ausência de política de mascaramento ou watermark.

**How to avoid:**
- Exportação padrão com dados minimizados e anonimizados.
- Marca d’água com responsável e data.
- Aviso legal claro e confirmação explícita antes de exportar.

**Warning signs:**
- Exportação em massa sem filtros.
- Compartilhamento externo recorrente sem rastreio.

**Phase to address:**
Phase 3 (Relatórios) e Phase 4 (Governança).

---

### Pitfall 9: Confundir jurimetria com parecer jurídico definitivo

**What goes wrong:**
A plataforma é usada como substituto de avaliação jurídica, criando risco ético e de responsabilidade.

**Why it happens:**
Mensagens de produto e linguagem de relatório sugerem certeza ou recomendação “final”.

**How to avoid:**
- Linguagem de “apoio à decisão”, não “decisão”.
- Avisos legais em relatórios e rodapé (já requisito do projeto).
- Treinamento/guia de uso para usuários.

**Warning signs:**
- Feedback de clientes pedindo “parecer automático”.
- Solicitação de automação de decisão sem revisão humana.

**Phase to address:**
Phase 3 (UX/Copy) e Phase 4 (Políticas).

---

### Pitfall 10: Dados simulados tratados como evidência real

**What goes wrong:**
Em demos, usuários assumem que resultados refletem realidade. Isso gera confiança indevida e feedback errado.

**Why it happens:**
Dados simulados não são claramente rotulados e não existe “modo demo”.

**How to avoid:**
- Rotulagem explícita de “dados simulados” em todas as telas/relatórios.
- Perfil “demo” separado com mensagens de limitação.
- Evitar números com aparência de precisão real.

**Warning signs:**
- Usuários pedem decisões baseadas nos dashboards de demo.
- Comparações diretas com casos reais dos clientes.

**Phase to address:**
Phase 1 (Base simulada) e Phase 3 (Relatórios).

---

## Technical Debt Patterns

Shortcuts que parecem aceitáveis, mas criam dívida crítica.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Taxonomia rasa (poucos campos de decisão) | MVP rápido | Métricas imprecisas e retrabalho de base | Só para demo interna e curta |
| Não versionar regras do motor | Menos engenharia | Resultados irreprodutíveis | Nunca (mesmo no MVP) |
| Sem logs de filtros nos relatórios | Menos esforço | Impossível auditar conclusões | Apenas protótipo não compartilhado |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Importação CSV (jurisprudências) | Colunas livres sem validação | Schema rígido + validação + erros por linha |
| Fontes públicas (futuro) | Assumir uso livre por serem públicas | Avaliar base legal e condições de uso (LGPD) |
| Exportação para BI externo | Enviar dados identificáveis | Anonimização e política de uso |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Filtros client-side em bases grandes | UI trava ao filtrar | Pré-aggregations e paginação | ~5k-10k decisões no browser |
| Cálculos dinâmicos sem cache | KPIs demoram | Cache de métricas por filtro | Com uso simultâneo |
| Exportação síncrona no front | Download falha | Job assíncrono + aviso | Arquivos grandes |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Expor dados pessoais em relatórios | Vazamento / LGPD | Anonimizar + mascarar padrões |
| Falta de trilha de auditoria | Não rastrear acesso | Logs de acesso por relatório |
| Compartilhamento sem controle | Reutilização indevida | Marca d’água + registro de exportação |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| KPIs sem contexto | Decisões erradas | Metodologia + amostra + data |
| Filtros confusos por tribunal/vara | Erros de leitura | Hierarquia clara + presets |
| Linguagem de certeza | Risco jurídico | “Estimativa” e “indicador” |

## "Looks Done But Isn't" Checklist

- [ ] **Relatório jurimétrico:** falta amostra e período — verificar metadados e cobertura.
- [ ] **Dashboard:** faltam limitações — verificar avisos legais e contexto.
- [ ] **Importação CSV:** falta validação — verificar erros por linha.
- [ ] **Exportação:** falta anonimização — verificar campos pessoais/sensíveis.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Dados enviesados | HIGH | Reamostrar base, reprocessar métricas e comunicar limitação passada |
| Falha LGPD | HIGH | Suspender uso, eliminar dados, documentar base legal, notificar conforme necessário |
| Relatórios sem rastreio | MEDIUM | Implementar logs e reemitir com metadados |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Dados enviesados | Phase 1 | Cobertura mínima por TRT/ano em checklist |
| LGPD sem base legal | Phase 1 | Mapa de dados com base legal por campo |
| Interpretação determinística | Phase 2-3 | Relatórios mostram amostra e incerteza |
| Viés em rankings | Phase 2-4 | Auditoria de fairness e variáveis |
| UX superficial | Phase 3 | Drill-down obrigatório antes de exportar |
| Falta de rastreabilidade | Phase 2-3 | Relatório com fonte, filtros e versão |
| Mistura de desfechos | Phase 1 | Campo “tipo de desfecho” obrigatório |
| Exportação sem salvaguardas | Phase 3-4 | Mascaramento e marca d’água |
| Jurimetria ≠ parecer | Phase 3-4 | Aviso legal e linguagem revisada |
| Dados simulados tratados como reais | Phase 1-3 | Rotulagem “simulado” em todas as telas |

## Sources

- LGPD (Lei nº 13.709/2018) — princípios, bases legais, dados sensíveis, não discriminação e decisões automatizadas: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm

---
*Pitfalls research for: jurimetria trabalhista empresarial*
*Researched: 2026-05-24*
