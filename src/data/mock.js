// Mock data for Lawsight — Jurimetria Trabalhista MVP

export const kpis = {
  totalProcessos: 1394,
  taxaProcedenciaMedia: 51.4,
  valorTotalRisco: 47200000,
  temasCriticos: 1,
  variacaoProcessos: +3.2,
  variacaoProcedencia: +1.8,
  variacaoValor: +8.4,
}

export const temas = [
  {
    id: 'horas-extras',
    nome: 'Horas Extras',
    procedente: 58.2,
    parcial: 18.4,
    improcedente: 23.4,
    totalCasos: 342,
    valorMedioCondena: 48500,
    tendencia: +1.8,
    risco: 'alto',
    descricao: 'Pedidos de horas extras não remuneradas, sobreaviso e banco de horas irregular.',
  },
  {
    id: 'verbas-rescisórias',
    nome: 'Verbas Rescisórias',
    procedente: 61.4,
    parcial: 15.2,
    improcedente: 23.4,
    totalCasos: 287,
    valorMedioCondena: 52300,
    tendencia: +0.4,
    risco: 'alto',
    descricao: 'Disputas sobre pagamento de FGTS, multa rescisória, aviso prévio e demais verbas.',
  },
  {
    id: 'dano-moral',
    nome: 'Dano Moral',
    procedente: 42.1,
    parcial: 12.8,
    improcedente: 45.1,
    totalCasos: 198,
    valorMedioCondena: 35200,
    tendencia: -1.2,
    risco: 'medio',
    descricao: 'Indenização por dano moral trabalhista, assédio moral e tratamento humilhante.',
  },
  {
    id: 'vinculo-emprego',
    nome: 'Vínculo de Emprego',
    procedente: 38.7,
    parcial: 8.5,
    improcedente: 52.8,
    totalCasos: 156,
    valorMedioCondena: 67800,
    tendencia: -2.1,
    risco: 'medio',
    descricao: 'Reconhecimento de relação de emprego em contratações terceirizadas ou PJ.',
  },
  {
    id: 'insalubridade',
    nome: 'Adicional Insalubridade',
    procedente: 54.3,
    parcial: 16.1,
    improcedente: 29.6,
    totalCasos: 213,
    valorMedioCondena: 28400,
    tendencia: +2.7,
    risco: 'alto',
    descricao: 'Adicional de insalubridade por exposição a agentes nocivos à saúde e integridade física.',
  },
  {
    id: 'periculosidade',
    nome: 'Adicional Periculosidade',
    procedente: 47.8,
    parcial: 14.3,
    improcedente: 37.9,
    totalCasos: 89,
    valorMedioCondena: 31700,
    tendencia: -0.8,
    risco: 'medio',
    descricao: 'Adicional de periculosidade por atividades com risco acentuado à vida e à saúde.',
  },
  {
    id: 'equiparacao-salarial',
    nome: 'Equiparação Salarial',
    procedente: 33.2,
    parcial: 11.7,
    improcedente: 55.1,
    totalCasos: 67,
    valorMedioCondena: 44100,
    tendencia: +0.3,
    risco: 'baixo',
    descricao: 'Ações de equiparação salarial por identidade de funções com paradigma na empresa.',
  },
  {
    id: 'grupo-economico',
    nome: 'Grupo Econômico',
    procedente: 71.4,
    parcial: 16.8,
    improcedente: 11.8,
    totalCasos: 42,
    valorMedioCondena: 87400,
    tendencia: +3.2,
    risco: 'critico',
    descricao: 'Reconhecimento de grupo econômico para fins de responsabilidade solidária e subsidiária.',
  },
]

export const tribunais = [
  { id: 'trt1',  nome: 'TRT 1ª Região',  regiao: 'Rio de Janeiro', processos: 287, procedencia: 54.8, valorMedio: 51200, tendencia: +1.1 },
  { id: 'trt2',  nome: 'TRT 2ª Região',  regiao: 'São Paulo',       processos: 412, procedencia: 48.3, valorMedio: 58400, tendencia: -0.7 },
  { id: 'trt3',  nome: 'TRT 3ª Região',  regiao: 'Minas Gerais',    processos: 198, procedencia: 52.1, valorMedio: 44300, tendencia: +2.3 },
  { id: 'trt4',  nome: 'TRT 4ª Região',  regiao: 'Rio Grande do Sul',processos: 143, procedencia: 46.7, valorMedio: 49800, tendencia: +0.4 },
  { id: 'trt5',  nome: 'TRT 5ª Região',  regiao: 'Bahia',           processos: 156, procedencia: 61.2, valorMedio: 38900, tendencia: +3.5 },
  { id: 'trt9',  nome: 'TRT 9ª Região',  regiao: 'Paraná',          processos: 89,  procedencia: 43.5, valorMedio: 47200, tendencia: -1.4 },
  { id: 'trt10', nome: 'TRT 10ª Região', regiao: 'Distrito Federal', processos: 67,  procedencia: 38.9, valorMedio: 56700, tendencia: -0.8 },
  { id: 'trt15', nome: 'TRT 15ª Região', regiao: 'Campinas',        processos: 142, procedencia: 55.4, valorMedio: 52100, tendencia: +1.8 },
]

export const historico = [
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

// Risk helpers
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

export const RISCO_LABELS = {
  critico: 'Crítico',
  alto:    'Alto',
  medio:   'Médio',
  baixo:   'Baixo',
}

// Formatters
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value, decimals = 1) {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value)
}
