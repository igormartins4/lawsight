// ============================================================
// Labora Data — Mock Data Platform
// Jurimetria Trabalhista Empresarial — Dados simulados para MVP
// ============================================================

// ── helpers internos ─────────────────────────────────────────

const rng = (seed) => ((seed * 9301 + 49297) % 233280) / 233280

function rand(min, max, seed = Date.now()) {
  return min + rng(seed + 1) * (max - min)
}

function pick(arr, seed) {
  return arr[Math.floor(rng(seed) * arr.length)]
}

// ── Dados de usuários simulados ──────────────────────────────

export const usuarios = [
  { id: 'u1', nome: 'Carlos Andrade', email: 'carlos@escritorio.adv.br', senha: '123456', escritorio: 'Andrade Advocacia Trabalhista', perfil: 'advogado' },
  { id: 'u2', nome: 'Marina Silva', email: 'marina@juridico.com.br', senha: '123456', escritorio: 'Indústrias Reunidas S.A.', perfil: 'gestor' },
  { id: 'u3', nome: 'Admin Labora', email: 'admin@laboradata.com.br', senha: 'admin', escritorio: 'Labora Data', perfil: 'administrador' },
]

// ── Temas e subtemas ─────────────────────────────────────────

export const TEMAS = [
  { id: 'horas-extras', nome: 'Horas Extras', subtemas: ['Horas Extras Diurnas', 'Sobreaviso', 'Intervalo Intrajornada', 'Banco de Horas'] },
  { id: 'vinculo-emprego', nome: 'Vínculo de Emprego', subtemas: ['Terceirização Ilícita', 'Pejotização', 'Cooperativa Fraudulenta', 'Estágio Irregular'] },
  { id: 'insalubridade', nome: 'Adicional de Insalubridade', subtemas: ['Agentes Químicos', 'Agentes Físicos (Ruído)', 'Agentes Biológicos', 'Grau Máximo'] },
  { id: 'periculosidade', nome: 'Adicional de Periculosidade', subtemas: ['Inflamáveis', 'Eletricidade', 'Explosivos', 'Radiação'] },
  { id: 'dano-moral', nome: 'Dano Moral Trabalhista', subtemas: ['Assédio Moral', 'Dano Moral por Doença', 'Assédio Sexual', 'Tratamento Degradante'] },
  { id: 'verbas-rescisorias', nome: 'Verbas Rescisórias', subtemas: ['FGTS', 'Multa Art. 477', 'Aviso Prévio', 'Multa Art. 467'] },
  { id: 'equiparacao-salarial', nome: 'Equiparação Salarial', subtemas: ['Identidade de Funções', 'Desvio de Função', 'Reenquadramento', 'Plano de Cargos'] },
  { id: 'grupo-economico', nome: 'Grupo Econômico', subtemas: ['Responsabilidade Solidária', 'Grupo por Coordenação', 'Sucessão Trabalhista', 'Consórcio'] },
]

export const OBJETIVOS_ANALISE = [
  'avaliar-acordo', 'avaliar-recurso', 'estimar-risco', 'fundamentar-defesa', 'analisar-chance-exito'
]

export const OBJETIVOS_LABELS = {
  'avaliar-acordo': 'Avaliar Acordo',
  'avaliar-recurso': 'Avaliar Recurso',
  'estimar-risco': 'Estimar Risco',
  'fundamentar-defesa': 'Fundamentar Defesa',
  'analisar-chance-exito': 'Analisar Chance de Êxito',
}

export const FASES_PROCESSUAIS = ['inicial', 'defesa', 'recurso', 'acordo', 'execucao']

export const FASES_LABELS = {
  inicial: 'Inicial', defesa: 'Defesa', recurso: 'Recurso', acordo: 'Acordo', execucao: 'Execução',
}

export const RESULTADOS_DECISAO = ['favoravel-empresa', 'favoravel-trabalhador', 'parcialmente-favoravel', 'inconclusiva']

export const RESULTADOS_LABELS = {
  'favoravel-empresa': 'Favorável à Empresa',
  'favoravel-trabalhador': 'Favorável ao Trabalhador',
  'parcialmente-favoravel': 'Parcialmente Favorável',
  'inconclusiva': 'Inconclusiva',
}

// ── Tribunais ────────────────────────────────────────────────

const TRIBUNAIS = [
  { id: 'trt1', nome: 'TRT 1ª Região', regiao: 'Rio de Janeiro' },
  { id: 'trt2', nome: 'TRT 2ª Região', regiao: 'São Paulo (Capital)' },
  { id: 'trt3', nome: 'TRT 3ª Região', regiao: 'Minas Gerais' },
  { id: 'trt4', nome: 'TRT 4ª Região', regiao: 'Rio Grande do Sul' },
  { id: 'trt5', nome: 'TRT 5ª Região', regiao: 'Bahia' },
  { id: 'trt9', nome: 'TRT 9ª Região', regiao: 'Paraná' },
  { id: 'trt10', nome: 'TRT 10ª Região', regiao: 'Distrito Federal e TO' },
  { id: 'trt15', nome: 'TRT 15ª Região', regiao: 'Campinas / Interior Paulista' },
]

const VARAS = {
  trt1: ['1ª Vara do Rio de Janeiro', '3ª Vara do Rio de Janeiro', '7ª Vara de Niterói', '2ª Vara de Duque de Caxias'],
  trt2: ['2ª Vara de São Paulo', '5ª Vara de São Paulo', '9ª Vara de São Paulo', '1ª Vara de Guarulhos', '4ª Vara de Santo André'],
  trt3: ['1ª Vara de Belo Horizonte', '3ª Vara de Contagem', '2ª Vara de Juiz de Fora'],
  trt4: ['1ª Vara de Porto Alegre', '4ª Vara de Caxias do Sul', '2ª Vara de Novo Hamburgo'],
  trt5: ['2ª Vara de Salvador', '5ª Vara de Salvador', '1ª Vara de Feira de Santana'],
  trt9: ['1ª Vara de Curitiba', '3ª Vara de Londrina', '2ª Vara de Maringá'],
  trt10: ['1ª Vara de Brasília', '3ª Vara de Brasília', '2ª Vara de Palmas'],
  trt15: ['1ª Vara de Campinas', '4ª Vara de São José dos Campos', '2ª Vara de Ribeirão Preto', '3ª Vara de Sorocaba'],
}

const MAGISTRADOS_NOMES = [
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
  { nome: 'Dr. Roberto Cavalcanti', tribunalId: 'trt1' },
  { nome: 'Dra. Luciana Mendes', tribunalId: 'trt3' },
]

const magistradosList = MAGISTRADOS_NOMES.map((m, i) => ({
  id: `mag${i + 1}`,
  nome: m.nome,
  tribunalId: m.tribunalId,
  tribunal: TRIBUNAIS.find(t => t.id === m.tribunalId)?.nome,
}))

// ── Gerar 60 decisões simuladas ──────────────────────────────

function gerarDecisoes() {
  const decisoes = []
  let idx = 0
  for (let i = 0; i < 60; i++) {
    const tema = TEMAS[i % TEMAS.length]
    const tribunal = TRIBUNAIS[i % TRIBUNAIS.length]
    const varas = VARAS[tribunal.id] || ['Vara do Trabalho']
    const magistrado = magistradosList[i % magistradosList.length]
    const resultado = RESULTADOS_DECISAO[i % 4]
    const valor = resultado === 'favoravel-empresa' ? rand(0, 15000, i) :
                  resultado === 'favoravel-trabalhador' ? rand(20000, 120000, i + 100) :
                  resultado === 'parcialmente-favoravel' ? rand(5000, 60000, i + 200) : 0
    decisoes.push({
      id: `dec-${++idx}`,
      tribunal: tribunal.nome,
      tribunalId: tribunal.id,
      vara: pick(varas, i + 3),
      magistrado: magistrado.nome,
      magistradoId: magistrado.id,
      processoNumero: `${String(10000 + idx).padStart(5, '0')}-${String(2020 + (i % 5)).padStart(2, '0')}.5.${String(tribunal.id.replace('trt', '')).padStart(2, '0')}.${String(5000 + idx).slice(0, 4)}`,
      dataDecisao: new Date(2023 + Math.floor(i / 20), (i * 3) % 12, (i * 7) % 28 + 1).toISOString().split('T')[0],
      temaId: tema.id,
      tema: tema.nome,
      subtema: pick(tema.subtemas, i + 5),
      ementa: `Ementa referente a ${tema.nome}. Decisão sobre pedido de ${pick(tema.subtemas, i + 7)}. ${resultado === 'favoravel-empresa' ? 'Improcedente o pedido formulado na inicial.' : resultado === 'favoravel-trabalhador' ? 'Procedente o pedido de indenização.' : resultado === 'parcialmente-favoravel' ? 'Parcialmente procedente o pedido.' : 'Decisão inconclusiva quanto ao mérito.'}`,
      resumo: `Decisão sobre ${tema.nome} julgada pelo ${tribunal.nome}. ${magistrado.nome} foi o relator. O resultado foi ${RESULTADOS_LABELS[resultado].toLowerCase()}.`,
      resultado,
      valorCondenacao: Math.round(valor),
      fundamentos: pick([
        ['Súmula 338 TST', 'Art. 818 CLT', 'Art. 373 CPC'],
        ['Art. 7º XIII CF', 'Súmula 291 TST', 'Art. 58 CLT'],
        ['Súmula 126 TST', 'Art. 818 CLT'],
        ['Art. 927 CC', 'Súmula 37 STJ'],
        ['Súmula 331 TST', 'Art. 9º CLT'],
      ], i * 3),
      palavrasChave: [tema.nome, pick(tema.subtemas, i + 9), tribunal.nome, magistrado.nome.split(' ').pop()],
    })
  }
  return decisoes
}

export const decisoes = gerarDecisoes()
export const tribunais = TRIBUNAIS
export const varasPorTribunal = VARAS
export const magistrados = magistradosList

// ── Casos simulados ──────────────────────────────────────────

function gerarCasos() {
  const casos = []
  for (let i = 0; i < 12; i++) {
    const tema = TEMAS[i % TEMAS.length]
    const tribunal = TRIBUNAIS[i % TRIBUNAIS.length]
    const obj = OBJETIVOS_ANALISE[i % OBJETIVOS_ANALISE.length]
    const risco = ['baixo', 'medio', 'alto'][i % 3]
    casos.push({
      id: `caso-${i + 1}`,
      userId: 'u1',
      nomeCaso: `Caso ${tema.nome.replace(/[^a-zA-Z0-9]/g, '')}-${String.fromCharCode(65 + i)}`,
      parteRepresentada: i % 2 === 0 ? 'empresa' : 'trabalhador',
      temaId: tema.id,
      tema: tema.nome,
      subtema: pick(tema.subtemas, i * 3),
      tribunal: tribunal.nome,
      tribunalId: tribunal.id,
      vara: pick(VARAS[tribunal.id] || ['Vara do Trabalho'], i * 7),
      magistrado: pick(magistradosList, i * 11).nome,
      faseProcessual: FASES_PROCESSUAIS[i % FASES_PROCESSUAIS.length],
      resumoFatos: `O ${i % 2 === 0 ? 'reclamante' : 'reclamado'} alega que houve violação dos direitos trabalhistas referentes a ${tema.nome}, especificamente sobre ${pick(tema.subtemas, i * 13)}.`,
      pedidos: [`Pagamento de ${pick(tema.subtemas, i * 17)}`, 'Honorários advocatícios', 'Justiça gratuita'],
      valorCausa: Math.round(rand(15000, 150000, i)),
      provas: pick([['Contrato de trabalho', 'Holerites'], ['CTPS', 'E-mail'], ['Testemunhas', 'Laudo pericial']], i * 19),
      teseJuridica: `Violação do art. ${7 + (i % 20)} da CLT combinado com a Súmula ${300 + (i % 100)} do TST.`,
      objetivoAnalise: obj,
      risco,
      dataCriacao: new Date(2025, i % 12, (i * 5) % 28 + 1).toISOString().split('T')[0],
    })
  }
  return casos
}

export const casos = gerarCasos()

// ── Análises simuladas ───────────────────────────────────────

export function gerarAnalise(casoId) {
  const caso = casos.find(c => c.id === casoId)
  if (!caso) return null

  const decisoesTema = decisoes.filter(d => d.temaId === caso.temaId)
  const decisoesTribunal = decisoesTema.filter(d => d.tribunalId === caso.tribunalId)
  const decisoesVara = decisoesTribunal.filter(d => d.vara === caso.vara)
  const decisoesMagistrado = decisoesTribunal.filter(d => d.magistrado === caso.magistrado)
  const todasDecisoes = decisoesMagistrado.length >= 5 ? decisoesMagistrado : decisoesVara.length >= 3 ? decisoesVara : decisoesTribunal.length >= 3 ? decisoesTribunal : decisoesTema

  const total = todasDecisoes.length
  const favEmpresa = todasDecisoes.filter(d => d.resultado === 'favoravel-empresa').length
  const favTrab = todasDecisoes.filter(d => d.resultado === 'favoravel-trabalhador').length
  const parcial = todasDecisoes.filter(d => d.resultado === 'parcialmente-favoravel').length
  const inconclusivo = todasDecisoes.filter(d => d.resultado === 'inconclusiva').length

  const percFavEmpresa = total ? (favEmpresa / total) * 100 : 0
  const percFavTrab = total ? (favTrab / total) * 100 : 0
  const percParcial = total ? (parcial / total) * 100 : 0
  const percInconclusivo = total ? (inconclusivo / total) * 100 : 0

  const valoresCondenacao = todasDecisoes.filter(d => d.valorCondenacao > 0).map(d => d.valorCondenacao)
  const mediaCond = valoresCondenacao.length ? Math.round(valoresCondenacao.reduce((a, b) => a + b, 0) / valoresCondenacao.length) : 0

  const parteEmpresa = caso.parteRepresentada === 'empresa'
  const percFavoravel = parteEmpresa ? percFavEmpresa : percFavTrab

  let risco
  if (percFavoravel > 60) risco = 'baixo'
  else if (percFavoravel >= 40) risco = 'medio'
  else risco = 'alto'

  const temPadraoMagistrado = decisoesMagistrado.length >= 5

  return {
    casoId,
    totalDecisoes: total,
    decisoesMesmoTribunal: decisoesTribunal.length,
    decisoesMesmaVara: decisoesVara.length,
    decisoesMesmoMagistrado: decisoesMagistrado.length,
    percFavoravelEmpresa: Math.round(percFavEmpresa * 10) / 10,
    percFavoravelTrabalhador: Math.round(percFavTrab * 10) / 10,
    percParcial: Math.round(percParcial * 10) / 10,
    percInconclusivo: Math.round(percInconclusivo * 10) / 10,
    valorMedioCondenacao: mediaCond,
    menorValorCondenacao: valoresCondenacao.length ? Math.min(...valoresCondenacao) : 0,
    maiorValorCondenacao: valoresCondenacao.length ? Math.max(...valoresCondenacao) : 0,
    risco,
    temPadraoMagistrado,
    padraoMagistrado: temPadraoMagistrado ? {
      quantidade: decisoesMagistrado.length,
      percFavoravelEmpresa: Math.round((decisoesMagistrado.filter(d => d.resultado === 'favoravel-empresa').length / decisoesMagistrado.length) * 1000) / 10,
      percFavoravelTrabalhador: Math.round((decisoesMagistrado.filter(d => d.resultado === 'favoravel-trabalhador').length / decisoesMagistrado.length) * 1000) / 10,
      valorMedioCondenacao: Math.round(decisoesMagistrado.filter(d => d.valorCondenacao > 0).reduce((a, b) => a + b.valorCondenacao, 0) / Math.max(1, decisoesMagistrado.filter(d => d.valorCondenacao > 0).length)),
      fundamentosFrequentes: ['Súmula 338 TST', 'Art. 818 CLT'],
      tendencia: percFavEmpresa > 60 ? 'Favorável à Empresa' : percFavTrab > 60 ? 'Favorável ao Trabalhador' : percFavEmpresa > 35 && percFavTrab > 35 ? 'Equilibrada' : 'Inconclusiva',
    } : null,
    decisoesUtilizadas: todasDecisoes.slice(0, 10),
    qualitativa: {
      sinteseGeral: `Foram analisadas ${total} decisões sobre ${caso.tema}.`,
      sinteseTribunal: `No ${caso.tribunal}, foram identificadas ${decisoesTribunal.length} decisões.`,
      sinteseVara: decisoesVara.length >= 3 ? `Na ${caso.vara}, ${decisoesVara.length} decisões analisadas.` : 'Dados insuficientes por vara.',
      sinteseMagistrado: temPadraoMagistrado ? `${decisoesMagistrado.length} decisões do magistrado ${caso.magistrado} analisadas.` : null,
      fatoresAumentoRisco: percFavoravel < 50 ? ['Predominância de decisões desfavoráveis', 'Valores de condenação elevados'] : [],
      fatoresReducaoRisco: percFavoravel >= 50 ? ['Maioria de decisões favoráveis', 'Valores dentro da média'] : [],
      recomendacao: risco === 'alto'
        ? 'A amostra indica tendência desfavorável. Recomenda-se avaliar acordo, reforçar provas e revisar a tese jurídica.'
        : risco === 'medio'
        ? 'Cenário equilibrado. Recomenda-se aprofundar a análise das provas e considerar estratégia negocial.'
        : 'Tendência favorável. Recomenda-se verificar aderência dos fatos aos precedentes identificados.',
    },
    dataCriacao: new Date().toISOString(),
  }
}

// KPIs e dados existentes (adaptados) ─────────────────────────

export const kpis = {
  totalCasos: casos.length,
  totalJurisprudencias: decisoes.length,
  casosRiscoBaixo: casos.filter(c => c.risco === 'baixo').length,
  casosRiscoMedio: casos.filter(c => c.risco === 'medio').length,
  casosRiscoAlto: casos.filter(c => c.risco === 'alto').length,
  ultimasAnalises: [],
}

// ── Formatters ──────────────────────────────────────────────

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
    notation: 'compact', maximumFractionDigits: 1,
  }).format(value || 0)
}

export function formatCurrencyFull(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
  }).format(value || 0)
}

export function formatPercent(value, decimals = 1) {
  return `${(value || 0).toFixed(decimals)}%`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value || 0)
}

export const RISCO_COLORS = {
  alto: '#ef4444',
  medio: '#f59e0b',
  baixo: '#22c55e',
}

export const RISCO_BG = {
  alto: 'bg-red-500/10',
  medio: 'bg-amber-500/10',
  baixo: 'bg-green-500/10',
}

export const RISCO_TEXT = {
  alto: 'text-red-400',
  medio: 'text-amber-400',
  baixo: 'text-green-400',
}

export const RISCO_LABELS = {
  alto: 'Alto',
  medio: 'Médio',
  baixo: 'Baixo',
}
