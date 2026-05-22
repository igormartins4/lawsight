import { useState } from 'react'
import { magistrados, formatPercent, formatNumber, getRiscoFromProcedencia, RISCO_LABELS, RISCO_COLORS } from '../data/mock.js'
import FilterBar from '../components/ui/FilterBar.jsx'

export default function Magistrados() {
  const [filtros, setFiltros] = useState({ busca: '', tribunal: '' })
  const tribunaisOpts = [...new Set(magistrados.map((m) => ({ id: m.tribunal, nome: m.tribunal })))]

  const filtrados = magistrados.filter((m) => {
    if (filtros.busca && !m.nome.toLowerCase().includes(filtros.busca.toLowerCase())) return false
    if (filtros.tribunal && m.tribunal !== filtros.tribunal) return false
    return true
  }).sort((a, b) => b.taxaProcedencia - a.taxaProcedencia)

  const mediaProc = magistrados.reduce((s, m) => s + m.taxaProcedencia, 0) / magistrados.length

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Análise por Magistrado</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {magistrados.length} magistrados · Ordenado por taxa de procedência (maior risco)
        </p>
      </div>

      <FilterBar tribunais={tribunaisOpts} onChange={setFiltros} />

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total de Casos', value: formatNumber(magistrados.reduce((s, m) => s + m.casos, 0)) },
          { label: 'Procedência Média', value: formatPercent(mediaProc) },
          { label: 'Maior Procedência', value: formatPercent(Math.max(...magistrados.map((m) => m.taxaProcedencia))), sub: magistrados.find((m) => m.taxaProcedencia === Math.max(...magistrados.map((x) => x.taxaProcedencia)))?.nome },
        ].map(({ label, value, sub }) => (
          <div key={label} className="card p-5">
            <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
            <p className="font-mono text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
            {sub && <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {filtrados.map((mag) => {
          const risco = getRiscoFromProcedencia(mag.taxaProcedencia)
          const temaMaisAlto = [...mag.temas].sort((a, b) => b.procedencia - a.procedencia)[0]
          return (
            <div key={mag.id} className="card p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-medium text-base" style={{ color: 'var(--text-primary)' }}>{mag.nome}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{mag.tribunal} · {mag.varas.join(', ')}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold" style={{ border: '1px solid', color: RISCO_COLORS[risco], backgroundColor: `${RISCO_COLORS[risco]}15` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[risco] }} />
                  {RISCO_LABELS[risco]}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  { label: 'Casos Julgados', value: mag.casos, cls: '' },
                  { label: 'Procedência', value: formatPercent(mag.taxaProcedencia), cls: 'text-red-400' },
                  {
                    label: 'Tendência',
                    value: `${mag.tendencia > 0 ? '+' : ''}${mag.tendencia.toFixed(1)}pp`,
                    cls: mag.tendencia > 0 ? 'text-red-400' : mag.tendencia < 0 ? 'text-green-400' : '',
                  },
                  { label: 'Tema Crítico', value: temaMaisAlto ? `${temaMaisAlto.procedencia.toFixed(0)}%` : '-', cls: 'text-amber-400', sub: temaMaisAlto?.temaId },
                ].map(({ label, value, cls, sub }) => (
                  <div key={label}>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                    <p className={`font-mono text-sm font-semibold ${cls}`} style={{ color: cls ? undefined : 'var(--text-primary)' }}>{value}</p>
                    {sub && <p className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
                  </div>
                ))}
              </div>

              <div className="pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>Distribuição por Tema</p>
                <div className="flex flex-wrap gap-2">
                  {mag.temas.filter((t) => t.casos > 5).slice(0, 6).map((t) => {
                    const cellRisco = getRiscoFromProcedencia(t.procedencia)
                    return (
                      <span
                        key={t.temaId}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono"
                        style={{ border: '1px solid', color: RISCO_COLORS[cellRisco], backgroundColor: `${RISCO_COLORS[cellRisco]}15` }}
                        title={`${t.temaId}: ${formatPercent(t.procedencia)} de procedência`}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: RISCO_COLORS[cellRisco] }} />
                        {t.temaId.replace(/-/g, ' ')} · {t.casos} casos
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
