import { useState } from 'react'
import { tribunais, temas, formatCurrency, formatPercent, getRiscoFromProcedencia } from '../data/mock.js'
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

  // Ordenado por procedência para o gráfico
  const graficoDados = [...tribunais].sort((a, b) => a.procedencia - b.procedencia)

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Tribunais Regionais do Trabalho</h1>
        <p className="text-silver-300 mt-1 text-sm">{tribunais.length} tribunais monitorados · Ordenado por taxa de procedência</p>
      </div>

      <FilterBar onChange={setFiltros} />

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total de Processos', value: totalProcessos.toLocaleString('pt-BR') },
          { label: 'Maior Procedência', value: formatPercent(maiorProc), sub: maiorProcRegiao },
          { label: 'Maior Valor Médio', value: formatCurrency(maiorValor), sub: maiorValorRegiao },
          { label: 'Média de Procedência', value: formatPercent(tribunais.reduce((s, t) => s + t.procedencia, 0) / tribunais.length) },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-navy-800 rounded-xl p-5 border border-navy-600">
            <p className="text-silver-300 text-xs mb-2">{label}</p>
            <p className="font-mono text-xl font-bold text-silver-100">{value}</p>
            {sub && <p className="text-silver-400 text-xs mt-1">{sub}</p>}
          </div>
        ))}
      </div>

      {/* Bar chart comparison */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-600 mb-6">
        <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Comparativo de Procedência por Tribunal</h2>
        <div className="space-y-2.5">
          {graficoDados.map((trt) => {
            const risco = getRiscoFromProcedencia(trt.procedencia)
            return (
              <div key={trt.id} className="flex items-center gap-3">
                <span className="text-silver-300 text-xs w-28 flex-shrink-0 text-right">{trt.nome.replace('TRT ', '')}</span>
                <div className="flex-1 h-5 bg-navy-900 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${trt.procedencia}%`, backgroundColor: trt.procedencia > 65 ? '#ef4444' : trt.procedencia > 50 ? '#f59e0b' : trt.procedencia > 35 ? '#eab308' : '#22c55e' }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-white drop-shadow-md">
                    {formatPercent(trt.procedencia)}
                  </span>
                </div>
                <span className="text-silver-400 text-[10px] font-mono w-16 flex-shrink-0">{trt.processos} casos</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-600 bg-navy-900/50">
                {[
                  { label: 'Tribunal' },
                  { label: 'Região' },
                  { label: 'Risco' },
                  { label: 'Processos', align: 'right' },
                  { label: 'Procedência', className: 'w-52' },
                  { label: 'Valor Médio', align: 'right' },
                  { label: 'Tendência', align: 'right' },
                ].map(({ label, align, className }) => (
                  <th key={label} className={`py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider whitespace-nowrap ${align === 'right' ? 'text-right' : 'text-left'} ${className ?? ''}`}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((trt) => {
                const risco = getRiscoFromProcedencia(trt.procedencia)
                const parcial = 15
                const improcedente = Math.max(0, 100 - trt.procedencia - parcial)
                return (
                  <tr key={trt.id} className="border-b border-navy-700/60 hover:bg-navy-700/35 transition-colors">
                    <td className="py-4 px-5 font-medium text-silver-100 text-sm whitespace-nowrap">{trt.nome}</td>
                    <td className="py-4 px-5 text-silver-300 text-sm">{trt.regiao}</td>
                    <td className="py-4 px-5"><RiskBadge risco={risco} /></td>
                    <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">{trt.processos}</td>
                    <td className="py-4 px-5 w-52">
                      <div className="flex items-center gap-3">
                        <div className="flex-1"><RiskBar procedente={trt.procedencia} parcial={parcial} improcedente={improcedente} height={6} /></div>
                        <span className="font-mono text-sm font-semibold text-red-400 whitespace-nowrap w-12 text-right">{formatPercent(trt.procedencia)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">{formatCurrency(trt.valorMedio)}</td>
                    <td className={`py-4 px-5 text-right font-mono text-sm font-semibold ${trt.tendencia > 0 ? 'text-red-400' : trt.tendencia < 0 ? 'text-green-400' : 'text-silver-400'}`}>
                      {trt.tendencia > 0 ? '+' : ''}{trt.tendencia.toFixed(1)}pp
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
