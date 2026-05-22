<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/igormartins4/lawsight/master/src/assets/lawsight-logo.jpeg">
  <img alt="Lawsight" src="https://raw.githubusercontent.com/igormartins4/lawsight/master/src/assets/lawsight-logo.jpeg" width="100%" style="max-width: 800px; border-radius: 12px;">
</picture>

<h1 align="center">Lawsight · Jurimetria Trabalhista</h1>

<p align="center">
  Plataforma de inteligência analítica para provisionamento de contingências trabalhistas.<br>
  Decisões baseadas em dados — não em achismo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-0b0f1a?style=flat&logo=react&logoColor=c49a3a" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.4-0b0f1a?style=flat&logo=vite&logoColor=c49a3a" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-3.4-0b0f1a?style=flat&logo=tailwindcss&logoColor=c49a3a" alt="Tailwind">
  <img src="https://img.shields.io/badge/GitHub_Pages-0b0f1a?style=flat&logo=githubpages&logoColor=c49a3a" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/license-MIT-0b0f1a?style=flat" alt="License">
</p>

---

## Sobre

**Lawsight** é uma plataforma de **jurimetria trabalhista** — análise estatística de decisões judiciais na Justiça do Trabalho. O objetivo é transformar dados públicos de tribunais em inteligência acionável para:

- **Departamentos jurídicos** — estimar provisões de contingência com base em cenários estatísticos
- **Escritórios de advocacia** — monitorar desempenho em causas, taxa de sucesso por tribunal e por magistrado
- **Gestores de risco** — identificar temas críticos, tendências de procedência e exposição financeira

> ⚠️ **MVP de validação** — todos os dados são simulados para fins de demonstração do conceito.

---

## Funcionalidades

### Dashboard
Visão executiva com indicadores-chave, anel de veredictos, evolução histórica (24 meses), comparação novos vs. arquivados, procedência por tema e escritórios de maior risco. Inclui **Insight Executivo** com recomendação estratégica gerada dos dados.

### Análise por Tema
Card grid com todos os temas monitorados, taxa de procedência, distribuição (procedente/parcial/improcedente), valor médio de condenação e tendência. Cada tema abre uma página de detalhes com visão geral, dados por tribunal, por ano e subcategorias — com gráficos interativos.

### Escritórios
Perfil de escritórios com causas monitoradas, valor recuperado vs. perdido, taxa de sucesso e saldo líquido. Página de detalhes com tendência de risco, comparativo financeiro e distribuição por tema.

### Magistrados
Análise de perfil decisório por magistrado: taxa de procedência, tendência, tema crítico e distribuição por tema. Dados cruciais para estratégia de distribuição de ações.

### Tribunais
Comparativo entre TRTs com taxa de procedência, valor médio e tendência. Cards com visualização rápida da distribuição de risco.

### Relatórios
Galeria de relatórios gerenciais e analíticos com filtro por tipo (PDF/Planilha/Dashboard). Download funcional gera arquivo `.txt` com dados reais.

### Simulador de Contingência
Calculadora de provisão trabalhista com três cenários:
- **Otimista** — com base na taxa de improcedência
- **Realista** — ponderação estatística entre procedente e parcial
- **Pessimista** — cenário de procedência total

Gera relatório de contingência exportável.

### Configurações
- Alternar entre tema **claro** e **escuro**
- Gerenciar **favoritos** (temas, tribunais, escritórios, relatórios)
- **Exportar dados** pessoais (LGPD Art. 9)
- **Excluir dados** armazenados
- Política de privacidade completa (LGPD)

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Estilização | Tailwind CSS 3 + CSS Custom Properties |
| Gráficos | Recharts 2 |
| Roteamento | React Router 6 (HashRouter) |
| Ícones | Heroicons (SVG inline) |
| Tipografia | Instrument Serif (títulos) + Inter (dados) |
| Deploy | GitHub Pages (via Actions) |

---

## Como Rodar

```bash
# Clone
git clone https://github.com/igormartins4/lawsight.git
cd lawsight

# Instale as dependências
npm install

# Inicie o dev server
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

O app estará disponível em `http://localhost:5173/lawsight/`.

---

## Deploy

O deploy no GitHub Pages é automático via GitHub Actions ao fazer push na branch `master`.

O workflow:
1. Faz checkout do repositório
2. Instala dependências com `npm ci`
3. Executa `npm run build`
4. Faz upload do diretório `dist/` como artifact
5. Deploy no GitHub Pages

> ⚙️ Configuração no repositório: **Settings > Pages > Source: GitHub Actions**

---

## Estrutura do Projeto

```
src/
├── assets/           # Imagens e recursos estáticos
├── components/
│   ├── charts/       # Gráficos Recharts (donut, linha, barra)
│   ├── layout/       # AppLayout, Sidebar
│   └── ui/           # Componentes reutilizáveis (cards, botões, badges)
├── contexts/         # ThemeContext, FavoritesContext, LGPDContext
├── data/             # Mock data (temas, tribunais, escritórios, etc.)
├── pages/            # Páginas da aplicação
├── utils/            # Utilitários (download de relatórios)
├── App.jsx           # Providers + Rotas
├── main.jsx          # Entry point
└── index.css         # Design tokens + classes utilitárias
```

---

## LGPD

O Lawsight está em conformidade com a **Lei Geral de Proteção de Dados (Lei 13.709/2018)**:

- **Consentimento** — banner de consentimento antes de qualquer armazenamento local
- **Finalidade** — dados armazenados apenas para preferências do usuário (tema, favoritos)
- **Transparência** — modal com política de privacidade completa
- **Direitos do titular** — exportação (Art. 9) e exclusão (Art. 18) diretamente nas configurações
- **Dados mínimos** — sem coleta de dados pessoais sensíveis

---

## Roadmap

- [ ] Integração com dados reais (API pública do TST)
- [ ] Comparador de temas lado a lado
- [ ] Exportação para PDF
- [ ] Relatório executivo customizável
- [ ] Notificações push
- [ ] Modo administrador com gestão de usuários

---

## Licença

MIT © 2025 [Igor Martins](https://github.com/igormartins4)

---

<p align="center">
  <sub>Feito com ☕ e dados · PUCTEC 2025</sub>
</p>
