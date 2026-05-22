import { useState } from 'react'
import { tribunais, formatCurrency, formatPercent, getRiscoFromProcedencia, RISCO_LABELS, RISCO_COLORS } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'
import FilterBar from '../components/ui/FilterBar.jsx'

export default function Tribunais() {
  const [filtros, setFiltros] = useState({ busca: '' })

  const sorted = [...tribunais]
    .sort((a, b) => b.procedencia - a.procedencia)
    .filter((t) => !filtros.busca || t.nome.toLowerCase().includes(filtros.busca.toLowerCase()) || t.regiao.toLowerCase().includes(filtros.busca.toLowerCase()))

  const totalProcessos = tribunais.reduce((s, t) => s + t.processos, 0)
  const maiorProc = Math.max(...tribunais.map((t) => t.procedencia))
  const maiorProcRegiao = tribunais.find((t) => t.procedencia === maiorProc)?.regiao
  const maiorValor = Math.max(...tribunais.map((t) => t.valorMedio))
  const maiorValorRegiao = tribunais.find((t) => t.valorMedio === maiorValor)?.regiao

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Tribunais Regionais do Trabalho</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>{tribunais.length} tribunais monitorados · Ordenado por taxa de procedência</p>
      </div>

      <FilterBar onChange={setFiltros} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total de Processos', value: totalProcessos.toLocaleString('pt-BR') },
          { label: 'Maior Procedência', value: formatPercent(maiorProc), sub: maiorProcRegiao },
          { label: 'Maior Valor Médio', value: formatCurrency(maiorValor), sub: maiorValorRegiao },
          { label: 'Média de Procedência', value: formatPercent(tribunais.reduce((s, t) => s + t.procedencia, 0) / tribunais.length) },
        ].map(({ label, value, sub }) => (
          <div key={label} className="card p-5">
            <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
            <p className="font-mono text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
            {sub && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
          </div>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((trt) => {
          const risco = getRiscoFromProcedencia(trt.procedencia)
          const parcial = 15
          const improcedente = Math.max(0, 100 - trt.procedencia - parcial)
          return (
            <div key={trt.id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{trt.nome}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{trt.regiao}</p>
                </div>
                <RiskBadge risco={risco} />
              </div>

              <div className="mb-3">
                <RiskBar procedente={trt.procedencia} parcial={parcial} improcedente={improcedente} height={6} />
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span className="font-mono">{trt.processos} casos</span>
                <span className="font-mono">{formatCurrency(trt.valorMedio)}</span>
                <span className={`font-mono font-semibold ${
                  trt.tendencia > 0 ? 'text-red-400' : trt.tendencia < 0 ? 'text-green-400' : ''
                }`}>
                  {trt.tendencia > 0 ? '+' : ''}{trt.tendencia.toFixed(1)}pp
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
