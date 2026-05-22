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
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Relatórios</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>{relatorios.length} relatórios · Gerenciais e analíticos</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFiltro(cat.key)}
            style={{
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
              background: filtro === cat.key ? 'var(--accent-muted)' : 'var(--bg-card)',
              color: filtro === cat.key ? 'var(--accent)' : 'var(--text-secondary)',
              border: filtro === cat.key ? '1px solid var(--accent)' : '1px solid var(--border)',
            }}
          >
            {cat.label}
            {cat.key !== 'todos' && (
              <span className="ml-1" style={{ color: 'var(--text-muted)' }}>
                ({relatorios.filter((r) => cat.key === 'pronto' || cat.key === 'processando' ? r.status === cat.key : r.tipo === cat.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtrados.map((rel, i) => {
          const typeStyle = TYPE_COLORS[rel.tipo] ?? TYPE_COLORS['PDF']
          return (
            <div key={i} className="card p-5 flex flex-col gap-4 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{rel.titulo}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{rel.descricao}</p>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded border flex-shrink-0" style={{ background: typeStyle.bg, color: typeStyle.text, borderColor: typeStyle.borderColor ?? typeStyle.text }}>
                  {rel.tipo}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex items-center gap-1.5">
                  {rel.status === 'pronto' ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-xs text-green-400">Pronto</span>
                      {rel.data && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {rel.data}</span>}
                      {rel.tamanho && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {rel.tamanho}</span>}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs text-amber-400">Processando...</span>
                    </>
                  )}
                </div>
                {rel.status === 'pronto' && (
                  <button className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} onClick={() => alert(`Relatório "${rel.titulo}" baixado (simulado)`)}>
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
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Nenhum relatório encontrado para este filtro.</p>
        </div>
      )}
    </div>
  )
}
