// ============================================================
// Lawsight — Mock Data Platform
// Jurimetria Trabalhista — Dados simulados para MVP
// ============================================================

// ── helpers internos ─────────────────────────────────────────

function variar(base, minimo, maximo, seed) {
  const r = ((seed * 9301 + 49297) % 233280) / 233280
  const range = maximo - minimo
  return Math.round((base + (r * range - range / 2)) * 10) / 10
}

function gerarPorAno(baseAno, baseProc, baseParcial, baseImproc, baseValor) {
  const anos = [2023, 2024, 2025]
  const fatores = [0.85, 1.0, 1.05]
  return anos.map((ano, i) => {
    const f = fatores[i]
    const p = variar(baseProc * f, baseProc * f - 6, baseProc * f + 6, ano)
    const imp = variar(baseImproc * f, baseImproc * f - 5, baseImproc * f + 5, ano + 7)
    const par = Math.round((100 - p - imp) * 10) / 10
    return {
      ano,
      casos: Math.round(baseAno * f * (0.9 + Math.random() * 0.2)),
      procedente: Math.max(10, Math.min(85, p)),
      parcial: Math.max(5, Math.min(50, par)),
      improcedente: Math.max(5, Math.min(85, imp)),
      valorMedio: Math.round(baseValor * f),
    }
  })
}

function gerarPorTribunal(temaBaseProc, temaBaseParcial, temaBaseImproc, tribunalIds) {
  const bias = {
    trt1:  { b: +1.2 }, trt2:  { b: -2.0 }, trt3:  { b: +0.5 },
    trt4:  { b: -1.8 }, trt5:  { b: +4.0 }, trt9:  { b: -3.5 },
    trt10: { b: -5.0 }, trt15: { b: +2.5 },
  }
  const total = 1494
  const pesos = { trt1: 310, trt2: 440, trt3: 210, trt4: 155, trt5: 168, trt9: 96, trt10: 72, trt15: 153 }
  return tribunalIds.map((id) => {
    const b = (bias[id]?.b ?? 0)
    const p = Math.max(10, Math.min(85, temaBaseProc + b + (Math.random() - 0.5) * 3))
    const casos = Math.round((pesos[id] / total) * (temaBaseProc / 50) * 1200)
    return { tribunalId: id, casos: Math.max(5, casos), procedencia: Math.round(p * 10) / 10 }
  })
}

function gerarSubtemas(nome, baseProc, totalCasos) {
  const subs = {
    'horas-extras':      ['Horas Extras Diurnas', 'Sobreaviso', 'Intervalo Intrajornada', 'Banco de Horas'],
    'verbas-rescisórias': ['FGTS', 'Multa do Art. 477', 'Aviso Prévio', 'Multa do Art. 467'],
    'dano-moral':         ['Assédio Moral', 'Dano Moral por Doença', 'Assédio Sexual', 'Tratamento Degradante'],
    'vinculo-emprego':    ['Terceirização Ilícita', 'Pessoa Jurídica', 'Cooperativa Fraudulenta', 'Estágio Irregular'],
    'insalubridade':      ['Agentes Químicos', 'Agentes Físicos (Ruído)', 'Agentes Biológicos', 'Grau Máximo'],
    'periculosidade':     ['Inflamáveis', 'Eletricidade', 'Explosivos', 'Radiação'],
    'equiparacao-salarial': ['Identidade de Funções', 'Desvio de Função', 'Reenquadramento', 'Plano de Cargos'],
    'grupo-economico':    ['Responsabilidade Solidária', 'Grupo por Coordenação', 'Sucessão Trabalhista', 'Consórcio'],
  }
  const nomes = subs[nome] ?? ['Subcategoria A', 'Subcategoria B', 'Subcategoria C', 'Subcategoria D']
  let restante = totalCasos
  return nomes.map((n, i) => {
    const isLast = i === nomes.length - 1
    const casos = isLast ? restante : Math.round(totalCasos * (0.18 + Math.random() * 0.12))
    if (!isLast) restante -= casos
    const proc = variar(baseProc, baseProc - 8, baseProc + 8, i + 100)
    return { nome: n, casos, procedente: Math.max(10, Math.min(85, proc)) }
  })
}

// ── KPIs (dashboard) ────────────────────────────────────────

export const kpis = {
  totalProcessos: 1394,
  taxaProcedenciaMedia: 51.4,
  valorTotalRisco: 47200000,
  temasCriticos: 1,
  variacaoProcessos: +3.2,
  variacaoProcedencia: +1.8,
  variacaoValor: +8.4,
  novosCasosMes: 42,
  variacaoNovosCasos: -5.3,
  indiceRecorrencia: 23.7,
  variacaoRecorrencia: +0.9,
  prazoMedioJulgamento: 48,
  variacaoPrazo: -3.2,
}

// ── 8 temas trabalhistas ────────────────────────────────────

const TRIBUNAIS_IDS = ['trt1','trt2','trt3','trt4','trt5','trt9','trt10','trt15']

export const temas = [
  {
    id: 'horas-extras',
    nome: 'Horas Extras',
    descricao: 'Pedidos de horas extras não remuneradas, sobreaviso e banco de horas irregular. Principal causa trabalhista no país.',
    procedente: 58.2, parcial: 18.4, improcedente: 23.4,
    totalCasos: 342, valorMedioCondena: 48500, tendencia: +1.8, risco: 'alto',
    valorTotalRisco: 9650000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'verbas-rescisórias',
    nome: 'Verbas Rescisórias',
    descricao: 'Disputas sobre pagamento de FGTS, multa rescisória, aviso prévio, guias do seguro-desemprego e demais verbas da rescisão contratual.',
    procedente: 61.4, parcial: 15.2, improcedente: 23.4,
    totalCasos: 287, valorMedioCondena: 52300, tendencia: +0.4, risco: 'alto',
    valorTotalRisco: 9240000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'dano-moral',
    nome: 'Dano Moral',
    descricao: 'Indenização por dano moral trabalhista envolvendo assédio moral, tratamento humilhante, discriminação e dano existencial.',
    procedente: 42.1, parcial: 12.8, improcedente: 45.1,
    totalCasos: 198, valorMedioCondena: 35200, tendencia: -1.2, risco: 'medio',
    valorTotalRisco: 2960000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'vinculo-emprego',
    nome: 'Vínculo de Emprego',
    descricao: 'Reconhecimento de relação de emprego em contratações terceirizadas, pejotização, cooperativas fraudulentas e estágios irregulares.',
    procedente: 38.7, parcial: 8.5, improcedente: 52.8,
    totalCasos: 156, valorMedioCondena: 67800, tendencia: -2.1, risco: 'medio',
    valorTotalRisco: 4100000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'insalubridade',
    nome: 'Adicional de Insalubridade',
    descricao: 'Adicional por exposição a agentes nocivos à saúde — químicos, físicos (ruído, calor) e biológicos — em grau mínimo, médio ou máximo.',
    procedente: 54.3, parcial: 16.1, improcedente: 29.6,
    totalCasos: 213, valorMedioCondena: 28400, tendencia: +2.7, risco: 'alto',
    valorTotalRisco: 3280000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'periculosidade',
    nome: 'Adicional de Periculosidade',
    descricao: 'Adicional por atividades com risco acentuado — inflamáveis, eletricidade, explosivos, radiação ionizante e vigilância armada.',
    procedente: 47.8, parcial: 14.3, improcedente: 37.9,
    totalCasos: 89, valorMedioCondena: 31700, tendencia: -0.8, risco: 'medio',
    valorTotalRisco: 1350000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'equiparacao-salarial',
    nome: 'Equiparação Salarial',
    descricao: 'Ações de equiparação/reenquadramento salarial por identidade de funções, desvio de função e planos de cargos e salários não cumpridos.',
    procedente: 33.2, parcial: 11.7, improcedente: 55.1,
    totalCasos: 67, valorMedioCondena: 44100, tendencia: +0.3, risco: 'baixo',
    valorTotalRisco: 980000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
  {
    id: 'grupo-economico',
    nome: 'Grupo Econômico',
    descricao: 'Reconhecimento de grupo econômico para responsabilidade solidária e subsidiária das empresas do grupo por débitos trabalhistas.',
    procedente: 71.4, parcial: 16.8, improcedente: 11.8,
    totalCasos: 42, valorMedioCondena: 87400, tendencia: +3.2, risco: 'critico',
    valorTotalRisco: 2630000,
    subtemas: [],
    porAno: [],
    porTribunal: [],
  },
]

// Preenche dados derivados de cada tema
temas.forEach((t) => {
  t.subtemas = gerarSubtemas(t.id, t.procedente, t.totalCasos)
  t.porAno = gerarPorAno(t.totalCasos, t.procedente, t.parcial, t.improcedente, t.valorMedioCondena)
  t.porTribunal = gerarPorTribunal(t.procedente, t.parcial, t.improcedente, TRIBUNAIS_IDS)
})

// ── 8 Tribunais Regionais do Trabalho ───────────────────────

export const tribunais = [
  { id: 'trt1',  nome: 'TRT 1ª Região',  regiao: 'Rio de Janeiro',          processos: 287, procedencia: 54.8, valorMedio: 51200, tendencia: +1.1 },
  { id: 'trt2',  nome: 'TRT 2ª Região',  regiao: 'São Paulo (Capital)',      processos: 412, procedencia: 48.3, valorMedio: 58400, tendencia: -0.7 },
  { id: 'trt3',  nome: 'TRT 3ª Região',  regiao: 'Minas Gerais',             processos: 198, procedencia: 52.1, valorMedio: 44300, tendencia: +2.3 },
  { id: 'trt4',  nome: 'TRT 4ª Região',  regiao: 'Rio Grande do Sul',        processos: 143, procedencia: 46.7, valorMedio: 49800, tendencia: +0.4 },
  { id: 'trt5',  nome: 'TRT 5ª Região',  regiao: 'Bahia',                    processos: 156, procedencia: 61.2, valorMedio: 38900, tendencia: +3.5 },
  { id: 'trt9',  nome: 'TRT 9ª Região',  regiao: 'Paraná',                   processos: 89,  procedencia: 43.5, valorMedio: 47200, tendencia: -1.4 },
  { id: 'trt10', nome: 'TRT 10ª Região', regiao: 'Distrito Federal e TO',    processos: 67,  procedencia: 38.9, valorMedio: 56700, tendencia: -0.8 },
  { id: 'trt15', nome: 'TRT 15ª Região', regiao: 'Campinas / Interior Paulista', processos: 142, procedencia: 55.4, valorMedio: 52100, tendencia: +1.8 },
]

// ── 24 meses de histórico ───────────────────────────────────

export const historico = [
  { mes: 'Jun/23', procedente: 44.8, parcial: 14.5, improcedente: 40.7, processos: 1052 },
  { mes: 'Jul/23', procedente: 45.2, parcial: 14.9, improcedente: 39.9, processos: 1078 },
  { mes: 'Ago/23', procedente: 44.6, parcial: 15.3, improcedente: 40.1, processos: 1095 },
  { mes: 'Set/23', procedente: 46.1, parcial: 14.8, improcedente: 39.1, processos: 1112 },
  { mes: 'Out/23', procedente: 45.9, parcial: 15.2, improcedente: 38.9, processos: 1134 },
  { mes: 'Nov/23', procedente: 46.7, parcial: 14.7, improcedente: 38.6, processos: 1148 },
  { mes: 'Dez/23', procedente: 47.3, parcial: 15.5, improcedente: 37.2, processos: 1157 },
  { mes: 'Jan/24', procedente: 47.8, parcial: 15.1, improcedente: 37.1, processos: 1163 },
  { mes: 'Fev/24', procedente: 47.2, parcial: 15.8, improcedente: 37.0, processos: 1175 },
  { mes: 'Mar/24', procedente: 48.4, parcial: 15.3, improcedente: 36.3, processos: 1182 },
  { mes: 'Abr/24', procedente: 48.1, parcial: 14.9, improcedente: 37.0, processos: 1179 },
  { mes: 'Mai/24', procedente: 47.9, parcial: 15.5, improcedente: 36.6, processos: 1180 },
  { mes: 'Jun/24', procedente: 47.2, parcial: 15.1, improcedente: 37.7, processos: 1180 },
  { mes: 'Jul/24', procedente: 48.5, parcial: 15.8, improcedente: 35.7, processos: 1201 },
  { mes: 'Ago/24', procedente: 49.1, parcial: 16.2, improcedente: 34.7, processos: 1230 },
  { mes: 'Set/24', procedente: 48.8, parcial: 15.5, improcedente: 35.7, processos: 1248 },
  { mes: 'Out/24', procedente: 50.2, parcial: 16.8, improcedente: 33.0, processos: 1272 },
  { mes: 'Nov/24', procedente: 49.7, parcial: 15.9, improcedente: 34.4, processos: 1289 },
  { mes: 'Dez/24', procedente: 50.8, parcial: 16.1, improcedente: 33.1, processos: 1301 },
  { mes: 'Jan/25', procedente: 51.0, parcial: 16.4, improcedente: 32.6, processos: 1318 },
  { mes: 'Fev/25', procedente: 50.5, parcial: 15.8, improcedente: 33.7, processos: 1337 },
  { mes: 'Mar/25', procedente: 51.8, parcial: 16.7, improcedente: 31.5, processos: 1358 },
  { mes: 'Abr/25', procedente: 51.4, parcial: 16.2, improcedente: 32.4, processos: 1378 },
  { mes: 'Mai/25', procedente: 51.4, parcial: 16.3, improcedente: 32.3, processos: 1394 },
]

// ── Novos casos por mês (para gráfico de barras) ────────────

export const novosCasos = [
  { mes: 'Jun/24', novos: 38, arquivados: 22 },
  { mes: 'Jul/24', novos: 42, arquivados: 19 },
  { mes: 'Ago/24', novos: 51, arquivados: 24 },
  { mes: 'Set/24', novos: 39, arquivados: 21 },
  { mes: 'Out/24', novos: 47, arquivados: 26 },
  { mes: 'Nov/24', novos: 44, arquivados: 23 },
  { mes: 'Dez/24', novos: 31, arquivados: 19 },
  { mes: 'Jan/25', novos: 48, arquivados: 18 },
  { mes: 'Fev/25', novos: 52, arquivados: 28 },
  { mes: 'Mar/25', novos: 46, arquivados: 22 },
  { mes: 'Abr/25', novos: 40, arquivados: 25 },
  { mes: 'Mai/25', novos: 42, arquivados: 21 },
]

// ── 10 escritórios de advocacia ─────────────────────────────

export const escritorios = [
  {
    id: 'esc1', nome: 'Silva & Associados Advogados',
    especialidade: 'Trabalhista Empresarial',
    casos: 287, taxaSucesso: 48.3,
    valorRecuperado: 12800000, valorPerdido: 21500000,
    tendencia: +3.2, risco: 'alto',
    tribunais: ['trt1','trt2','trt3'],
    ultimaAtualizacao: '20 Mai 2025',
  },
  {
    id: 'esc2', nome: 'Mendes, Oliveira & Costa Sociedade de Advogados',
    especialidade: 'Trabalhista e Previdenciário',
    casos: 234, taxaSucesso: 52.8,
    valorRecuperado: 14200000, valorPerdido: 18600000,
    tendencia: +0.8, risco: 'medio',
    tribunais: ['trt1','trt4','trt9'],
    ultimaAtualizacao: '19 Mai 2025',
  },
  {
    id: 'esc3', nome: 'Ribeiro Advogados Associados',
    especialidade: 'Direito do Trabalho',
    casos: 198, taxaSucesso: 38.4,
    valorRecuperado: 8900000, valorPerdido: 24100000,
    tendencia: +5.1, risco: 'critico',
    tribunais: ['trt2','trt5','trt15'],
    ultimaAtualizacao: '18 Mai 2025',
  },
  {
    id: 'esc4', nome: 'Carvalho & Martins Advocacia Trabalhista',
    especialidade: 'Trabalhista Sindical',
    casos: 176, taxaSucesso: 56.2,
    valorRecuperado: 15600000, valorPerdido: 12700000,
    tendencia: -1.5, risco: 'baixo',
    tribunais: ['trt3','trt9','trt10'],
    ultimaAtualizacao: '22 Mai 2025',
  },
  {
    id: 'esc5', nome: 'Gomes Pereira Sociedade de Advogados',
    especialidade: 'Direito Corporativo Trabalhista',
    casos: 152, taxaSucesso: 44.7,
    valorRecuperado: 9800000, valorPerdido: 17400000,
    tendencia: +2.3, risco: 'alto',
    tribunais: ['trt2','trt4','trt15'],
    ultimaAtualizacao: '21 Mai 2025',
  },
  {
    id: 'esc6', nome: 'Nascimento & Filhos Advogados',
    especialidade: 'Trabalhista e Sindical',
    casos: 134, taxaSucesso: 41.2,
    valorRecuperado: 7600000, valorPerdido: 15900000,
    tendencia: +3.8, risco: 'alto',
    tribunais: ['trt1','trt5','trt10'],
    ultimaAtualizacao: '17 Mai 2025',
  },
  {
    id: 'esc7', nome: 'Almeida, Santos & Dias Advocacia',
    especialidade: 'Contencioso Trabalhista Estratégico',
    casos: 118, taxaSucesso: 59.6,
    valorRecuperado: 18200000, valorPerdido: 9800000,
    tendencia: -0.6, risco: 'baixo',
    tribunais: ['trt2','trt9','trt15'],
    ultimaAtualizacao: '20 Mai 2025',
  },
  {
    id: 'esc8', nome: 'Barbosa & Cordeiro Advogados',
    especialidade: 'Trabalhista Empresarial e Compliance',
    casos: 97, taxaSucesso: 51.3,
    valorRecuperado: 10500000, valorPerdido: 13200000,
    tendencia: +1.1, risco: 'medio',
    tribunais: ['trt3','trt4','trt5'],
    ultimaAtualizacao: '19 Mai 2025',
  },
  {
    id: 'esc9', nome: 'Teixeira Lima Sociedade de Advogados',
    especialidade: 'Direito do Trabalho e Sindical',
    casos: 78, taxaSucesso: 35.8,
    valorRecuperado: 4800000, valorPerdido: 18700000,
    tendencia: +6.4, risco: 'critico',
    tribunais: ['trt1','trt2','trt4'],
    ultimaAtualizacao: '18 Mai 2025',
  },
  {
    id: 'esc10', nome: 'Ferreira & Albuquerque Advocacia Trabalhista',
    especialidade: 'Contencioso Estratégico e Contratos',
    casos: 63, taxaSucesso: 54.9,
    valorRecuperado: 11300000, valorPerdido: 8600000,
    tendencia: -2.2, risco: 'baixo',
    tribunais: ['trt3','trt5','trt9'],
    ultimaAtualizacao: '22 Mai 2025',
  },
]

// Preenche temas por escritório
function gerarTemasPorEscritorio(totalCasos) {
  return temas.map((t) => ({
    temaId: t.id,
    casos: Math.max(2, Math.round(totalCasos * (t.totalCasos / 1394) * (0.7 + Math.random() * 0.6))),
    taxaSucesso: Math.round((t.improcedente + t.parcial * 0.5) * (0.8 + Math.random() * 0.4) * 10) / 10,
  }))
}
escritorios.forEach((esc) => { esc.temas = gerarTemasPorEscritorio(esc.casos) })

// ── 10 magistrados ──────────────────────────────────────────

const varasPorTribunal = {
  trt1:  ['1ª Vara do Rio de Janeiro','3ª Vara do Rio de Janeiro','7ª Vara de Niterói','2ª Vara de Duque de Caxias'],
  trt2:  ['2ª Vara de São Paulo','5ª Vara de São Paulo','9ª Vara de São Paulo','1ª Vara de Guarulhos','4ª Vara de Santo André'],
  trt3:  ['1ª Vara de Belo Horizonte','3ª Vara de Contagem','2ª Vara de Juiz de Fora'],
  trt4:  ['1ª Vara de Porto Alegre','4ª Vara de Caxias do Sul','2ª Vara de Novo Hamburgo'],
  trt5:  ['2ª Vara de Salvador','5ª Vara de Salvador','1ª Vara de Feira de Santana'],
  trt9:  ['1ª Vara de Curitiba','3ª Vara de Londrina','2ª Vara de Maringá'],
  trt10: ['1ª Vara de Brasília','3ª Vara de Brasília','2ª Vara de Palmas'],
  trt15: ['1ª Vara de Campinas','4ª Vara de São José dos Campos','2ª Vara de Ribeirão Preto','3ª Vara de Sorocaba'],
}

const nomesMagistrados = [
  { nome: 'Dra. Ana Beatriz Costa', tribunalId: 'trt1' },
  { nome: 'Dr. Carlos Eduardo Moreira', tribunalId: 'trt2' },
  { nome: 'Dra. Fernanda Vasconcelos', tribunalId: 'trt3' },
  { nome: 'Dr. Ricardo Almeida Neto', tribunalId: 'trt4' },
  { nome: 'Dra. Juliana Santiago', tribunalId: 'trt5' },
  { nome: 'Dr. Marcelo Duarte Lima', tribunalId: 'trt9' },
  { nome: 'Dra. Patrícia Rocha', tribunalId: 'trt10' },
  { nome: 'Dr. André Luiz Barbosa', tribunalId: 'trt15' },
  { nome: 'Dra. Renata Oliveira Campos', tribunalId: 'trt2' },
  { nome: 'Dr. Gustavo Henrique Dias', tribunalId: 'trt5' },
]

export const magistrados = nomesMagistrados.map((m, idx) => {
  const tribunal = tribunais.find((t) => t.id === m.tribunalId)
  const varas = varasPorTribunal[m.tribunalId] ?? ['Vara do Trabalho']
  const casos = Math.round(80 + Math.random() * 180)
  const baseProc = 35 + Math.random() * 40
  const tendencia = (Math.random() - 0.4) * 6
  return {
    id: `mag${idx + 1}`,
    nome: m.nome,
    tribunal: tribunal?.nome ?? m.tribunalId,
    varas: idx === 0 ? varas : [varas[0], varas[varas.length > 1 ? 1 : 0]],
    casos,
    taxaProcedencia: Math.round(baseProc * 10) / 10,
    tendencia: Math.round(tendencia * 10) / 10,
    temas: temas.map((t) => ({
      temaId: t.id,
      casos: Math.max(1, Math.round(casos * (t.totalCasos / 1394) * (0.4 + Math.random() * 1.2))),
      procedencia: Math.round((t.procedente + (Math.random() - 0.5) * 20) * 10) / 10,
    })),
  }
})

// ── Alertas e notificações ──────────────────────────────────

export const alertas = [
  {
    tipo: 'critico', mensagem: 'Grupo Econômico atingiu 71,4% de procedência — maior nível histórico',
    data: '22 Mai 2025', lido: false,
  },
  {
    tipo: 'alerta', mensagem: 'Teixeira Lima (escritório) com aumento de 6,4pp na taxa de procedência no trimestre',
    data: '22 Mai 2025', lido: false,
  },
  {
    tipo: 'alerta', mensagem: 'TRT da Bahia (5ª Região) apresenta crescimento de 3,5pp na procedência',
    data: '21 Mai 2025', lido: false,
  },
  {
    tipo: 'info', mensagem: 'Novo relatório executivo mensal disponível para download',
    data: '22 Mai 2025', lido: true,
  },
  {
    tipo: 'info', mensagem: 'Atualização da base de jurisprudência — 147 novos acórdãos incorporados',
    data: '20 Mai 2025', lido: true,
  },
]

// ── Relatórios ──────────────────────────────────────────────

export const relatorios = [
  { titulo: 'Relatório Executivo Mensal', descricao: 'Visão consolidada do passivo trabalhista · Maio 2025', tipo: 'PDF', status: 'pronto', data: '22 Mai 2025', tamanho: '4.2 MB' },
  { titulo: 'Análise de Tendências por Tema', descricao: 'Evolução de 24 meses por tema — distribuição de veredictos e séries históricas', tipo: 'XLSX', status: 'pronto', data: '22 Mai 2025', tamanho: '1.8 MB' },
  { titulo: 'Mapa de Riscos Trabalhistas', descricao: 'Classificação de temas por nível de exposição com matriz de tendências por tribunal', tipo: 'PDF', status: 'pronto', data: '21 Mai 2025', tamanho: '3.5 MB' },
  { titulo: 'Projeção de Contingências Q3/2025', descricao: 'Estimativa de provisões com cenários pessimista, realista e otimista', tipo: 'XLSX', status: 'pronto', data: '21 Mai 2025', tamanho: '2.1 MB' },
  { titulo: 'Comparativo por Tribunal', descricao: 'Performance comparativa entre os 8 TRTs monitorados — ranking e evolução', tipo: 'PDF', status: 'pronto', data: '20 Mai 2025', tamanho: '5.7 MB' },
  { titulo: 'Análise por Escritório', descricao: 'Desempenho dos 10 maiores escritórios — taxas de sucesso e valores recuperados', tipo: 'XLSX', status: 'pronto', data: '19 Mai 2025', tamanho: '1.2 MB' },
  { titulo: 'Dashboard Executivo — Apresentação', descricao: 'Deck de slides para reunião de diretoria · Junho 2025', tipo: 'PPTX', status: 'processando', data: null, tamanho: null },
  { titulo: 'Análise por Magistrado', descricao: 'Perfil decisório dos principais magistrados da amostra', tipo: 'PDF', status: 'processando', data: null, tamanho: null },
]

export const TYPE_COLORS = {
  PDF:  { bg: 'bg-red-950/50',   text: 'text-red-400',   border: 'border-red-800/40' },
  XLSX: { bg: 'bg-green-950/50', text: 'text-green-400', border: 'border-green-800/40' },
  PPTX: { bg: 'bg-amber-950/50', text: 'text-amber-400', border: 'border-amber-800/40' },
}

// ── Helpers de risco ────────────────────────────────────────

export function getRiscoFromProcedencia(p) {
  if (p > 65) return 'critico'
  if (p > 50) return 'alto'
  if (p > 35) return 'medio'
  return 'baixo'
}

export const RISCO_COLORS = {
  critico: '#ef4444',
  alto:    '#f59e0b',
  medio:   '#eab308',
  baixo:   '#22c55e',
}

export const RISCO_BG = {
  critico: 'bg-red-500/10',
  alto:    'bg-amber-500/10',
  medio:   'bg-yellow-500/10',
  baixo:   'bg-green-500/10',
}

export const RISCO_TEXT = {
  critico: 'text-red-400',
  alto:    'text-amber-400',
  medio:   'text-yellow-400',
  baixo:   'text-green-400',
}

export const RISCO_LABELS = {
  critico: 'Crítico',
  alto:    'Alto',
  medio:   'Médio',
  baixo:   'Baixo',
}

// ── Formatters ──────────────────────────────────────────────

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
    notation: 'compact', maximumFractionDigits: 1,
  }).format(value)
}

export function formatCurrencyFull(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
  }).format(value)
}

export function formatPercent(value, decimals = 1) {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value)
}

// ── Matriz de risco Tribunal × Tema (para heatmap) ─────────

export function gerarMatrizRisco(temaSelecionado = null) {
  const temasFonte = temaSelecionado ? temas.filter((t) => t.id === temaSelecionado) : temas
  return tribunais.map((trt) => ({
    tribunalId: trt.id,
    tribunalNome: trt.nome,
    regiao: trt.regiao,
    temas: temasFonte.map((tema) => {
      const cell = tema.porTribunal.find((pt) => pt.tribunalId === trt.id)
      return {
        temaId: tema.id,
        temaNome: tema.nome,
        procedencia: cell?.procedencia ?? 50,
        casos: cell?.casos ?? 0,
      }
    }),
  }))
}

// ── Temas em destaque (para cards do dashboard) ─────────────

export const temasEmDestaque = temas
  .filter((t) => t.risco === 'critico' || t.risco === 'alto')
  .sort((a, b) => b.tendencia - a.tendencia)
