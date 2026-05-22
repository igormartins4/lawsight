import { tribunais, formatCurrency, formatPercent, getRiscoFromProcedencia } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'

export default function Tribunais() {
  const sorted = [...tribunais].sort((a, b) => b.procedencia - a.procedencia)

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Tribunais Regionais do Trabalho</h1>
        <p className="text-silver-300 mt-1 text-sm">
          {tribunais.length} tribunais monitorados · Ordenado por taxa de procedência
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: 'Total de Processos',
            value: tribunais.reduce((s, t) => s + t.processos, 0).toLocaleString('pt-BR'),
          },
          {
            label: 'Maior Procedência',
            value: `${Math.max(...tribunais.map((t) => t.procedencia)).toFixed(1)}%`,
            sub: sorted[0]?.regiao,
          },
          {
            label: 'Maior Valor Médio',
            value: formatCurrency(Math.max(...tribunais.map((t) => t.valorMedio))),
            sub: tribunais.find(
              (t) => t.valorMedio === Math.max(...tribunais.map((x) => x.valorMedio))
            )?.regiao,
          },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-navy-800 rounded-xl p-5 border border-navy-600">
            <p className="text-silver-300 text-sm mb-2">{label}</p>
            <p className="font-mono text-2xl font-bold text-silver-100">{value}</p>
            {sub && <p className="text-silver-400 text-xs mt-1">{sub}</p>}
          </div>
        ))}
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
                  <th
                    key={label}
                    className={`py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider whitespace-nowrap ${
                      align === 'right' ? 'text-right' : 'text-left'
                    } ${className ?? ''}`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((trt) => {
                const risco = getRiscoFromProcedencia(trt.procedencia)
                // Approximate split: procedente / ~15% parcial / rest improcedente
                const parcial = 15
                const improcedente = Math.max(0, 100 - trt.procedencia - parcial)

                return (
                  <tr
                    key={trt.id}
                    className="border-b border-navy-700/60 hover:bg-navy-700/35 transition-colors"
                  >
                    <td className="py-4 px-5 font-medium text-silver-100 text-sm whitespace-nowrap">
                      {trt.nome}
                    </td>
                    <td className="py-4 px-5 text-silver-300 text-sm">{trt.regiao}</td>
                    <td className="py-4 px-5">
                      <RiskBadge risco={risco} />
                    </td>
                    <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">
                      {trt.processos}
                    </td>
                    <td className="py-4 px-5 w-52">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <RiskBar
                            procedente={trt.procedencia}
                            parcial={parcial}
                            improcedente={improcedente}
                            height={6}
                          />
                        </div>
                        <span className="font-mono text-sm font-semibold text-red-400 whitespace-nowrap w-12 text-right">
                          {formatPercent(trt.procedencia)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">
                      {formatCurrency(trt.valorMedio)}
                    </td>
                    <td
                      className={`py-4 px-5 text-right font-mono text-sm font-semibold ${
                        trt.tendencia > 0
                          ? 'text-red-400'
                          : trt.tendencia < 0
                          ? 'text-green-400'
                          : 'text-silver-400'
                      }`}
                    >
                      {trt.tendencia > 0 ? '+' : ''}
                      {trt.tendencia.toFixed(1)}pp
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
