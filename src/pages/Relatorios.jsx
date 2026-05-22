import { useState } from 'react'
import { relatorios, TYPE_COLORS } from '../data/mock.js'

const CATEGORIAS = [
  { label: 'Todos', key: 'todos' },
  { label: 'Prontos', key: 'pronto' },
  { label: 'Processando', key: 'processando' },
  ...Object.entries(TYPE_COLORS).map(([tipo]) => ({ label: tipo, key: tipo })),
]

export default function Relatorios() {
  const [filtro, setFiltro] = useState('todos')

  const filtrados = relatorios.filter((r) => {
    if (filtro === 'todos') return true
    if (filtro === 'pronto' || filtro === 'processando') return r.status === filtro
    return r.tipo === filtro
  })

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Relatórios</h1>
        <p className="text-silver-300 mt-1 text-sm">{relatorios.length} relatórios · Gerenciais e analíticos</p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFiltro(cat.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filtro === cat.key
                ? 'bg-blue-600/30 text-blue-300 border border-blue-600/50'
                : 'bg-navy-800 text-silver-300 border border-navy-600 hover:border-navy-500'
            }`}
          >
            {cat.label}
            {cat.key !== 'todos' && (
              <span className="ml-1 text-silver-400">
                ({relatorios.filter((r) => cat.key === 'pronto' || cat.key === 'processando' ? r.status === cat.key : r.tipo === cat.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtrados.map((rel, i) => {
          const typeStyle = TYPE_COLORS[rel.tipo] ?? TYPE_COLORS['PDF']
          return (
            <div
              key={i}
              className="bg-navy-800 rounded-xl p-5 border border-navy-600 hover:border-navy-500 transition-all duration-150 flex flex-col gap-4 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-silver-100 text-sm leading-snug">{rel.titulo}</p>
                  <p className="text-silver-400 text-xs mt-1 leading-relaxed">{rel.descricao}</p>
                </div>
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border flex-shrink-0 ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>
                  {rel.tipo}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-navy-600">
                <div className="flex items-center gap-1.5">
                  {rel.status === 'pronto' ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-400">Pronto</span>
                      {rel.data && <span className="text-xs text-silver-400 ml-1">· {rel.data}</span>}
                      {rel.tamanho && <span className="text-xs text-silver-400">· {rel.tamanho}</span>}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs text-amber-400">Processando...</span>
                    </>
                  )}
                </div>
                {rel.status === 'pronto' && (
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium opacity-0 group-hover:opacity-100">
                    Download →
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filtrados.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-silver-400 text-sm">Nenhum relatório encontrado para este filtro.</p>
        </div>
      )}
    </div>
  )
}
