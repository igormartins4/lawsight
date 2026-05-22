import { useNavigate } from 'react-router-dom'
import { temas, formatCurrency, formatPercent } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'

export default function Temas() {
  const navigate = useNavigate()
  const sorted = [...temas].sort((a, b) => b.procedente - a.procedente)

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Análise por Tema</h1>
        <p className="text-silver-300 mt-1 text-sm">
          {temas.length} temas monitorados · Clique em um tema para detalhe
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-4 text-xs text-silver-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm bg-red-500 inline-block" />
          Procedente (ruim)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm bg-amber-500 inline-block" />
          Parcial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm bg-green-500 inline-block" />
          Improcedente (bom)
        </span>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-600 bg-navy-900/50">
                {[
                  { label: 'Tema' },
                  { label: 'Risco' },
                  { label: 'Distribuição', className: 'w-44' },
                  { label: 'Processos', align: 'right' },
                  { label: 'Procedente', align: 'right' },
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
              {sorted.map((tema) => (
                <tr
                  key={tema.id}
                  onClick={() => navigate(`/temas/${tema.id}`)}
                  className="border-b border-navy-700/60 hover:bg-navy-700/35 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-5">
                    <p className="font-medium text-silver-100 text-sm">{tema.nome}</p>
                    <p className="text-silver-400 text-xs mt-0.5 max-w-xs truncate">{tema.descricao}</p>
                  </td>
                  <td className="py-4 px-5">
                    <RiskBadge risco={tema.risco} />
                  </td>
                  <td className="py-4 px-5 w-44">
                    <RiskBar
                      procedente={tema.procedente}
                      parcial={tema.parcial}
                      improcedente={tema.improcedente}
                      height={7}
                    />
                  </td>
                  <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">
                    {tema.totalCasos}
                  </td>
                  <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-red-400">
                    {formatPercent(tema.procedente)}
                  </td>
                  <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">
                    {formatCurrency(tema.valorMedioCondena)}
                  </td>
                  <td
                    className={`py-4 px-5 text-right font-mono text-sm font-semibold ${
                      tema.tendencia > 0
                        ? 'text-red-400'
                        : tema.tendencia < 0
                        ? 'text-green-400'
                        : 'text-silver-400'
                    }`}
                  >
                    {tema.tendencia > 0 ? '+' : ''}
                    {tema.tendencia.toFixed(1)}pp
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
