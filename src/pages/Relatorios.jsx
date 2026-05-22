const reports = [
  {
    titulo: 'Relatório Executivo Mensal',
    descricao: 'Visão consolidada do passivo trabalhista · Maio 2025',
    tipo: 'PDF',
    status: 'pronto',
    data: '22 Mai 2025',
  },
  {
    titulo: 'Análise de Tendências por Tema',
    descricao: 'Evolução de 12 meses por tema e distribuição de veredictos',
    tipo: 'XLSX',
    status: 'pronto',
    data: '22 Mai 2025',
  },
  {
    titulo: 'Mapa de Riscos Trabalhistas',
    descricao: 'Classificação de temas por nível de exposição e tendência',
    tipo: 'PDF',
    status: 'pronto',
    data: '21 Mai 2025',
  },
  {
    titulo: 'Projeção de Contingências Q3/2025',
    descricao: 'Estimativa de provisões para o terceiro trimestre de 2025',
    tipo: 'XLSX',
    status: 'processando',
    data: null,
  },
  {
    titulo: 'Comparativo por Tribunal',
    descricao: 'Performance comparativa entre os 8 TRTs monitorados',
    tipo: 'PDF',
    status: 'pronto',
    data: '20 Mai 2025',
  },
  {
    titulo: 'Dashboard Executivo — Apresentação',
    descricao: 'Deck de slides para reunião de diretoria · Junho 2025',
    tipo: 'PPTX',
    status: 'processando',
    data: null,
  },
]

const TYPE_COLORS = {
  PDF:  { bg: 'bg-red-950/50',   text: 'text-red-400',   border: 'border-red-800/40' },
  XLSX: { bg: 'bg-green-950/50', text: 'text-green-400', border: 'border-green-800/40' },
  PPTX: { bg: 'bg-amber-950/50', text: 'text-amber-400', border: 'border-amber-800/40' },
}

export default function Relatorios() {
  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Relatórios</h1>
        <p className="text-silver-300 mt-1 text-sm">
          Relatórios gerados e disponíveis para download
        </p>
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reports.map((rel, i) => {
          const typeStyle = TYPE_COLORS[rel.tipo] ?? TYPE_COLORS['PDF']
          return (
            <div
              key={i}
              className="bg-navy-800 rounded-xl p-5 border border-navy-600 hover:border-navy-500 transition-colors flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-silver-100 text-sm leading-snug">{rel.titulo}</p>
                  <p className="text-silver-400 text-xs mt-1 leading-relaxed">{rel.descricao}</p>
                </div>
                <span
                  className={`text-xs font-mono font-semibold px-2 py-1 rounded border flex-shrink-0 ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}
                >
                  {rel.tipo}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-navy-600">
                <div className="flex items-center gap-1.5">
                  {rel.status === 'pronto' ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-400">Pronto</span>
                      {rel.data && (
                        <span className="text-xs text-silver-400 ml-1">· {rel.data}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs text-amber-400">Processando...</span>
                    </>
                  )}
                </div>
                {rel.status === 'pronto' && (
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    Download →
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
