import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { temas, tribunais, formatCurrency, formatPercent, getRiscoFromProcedencia, RISCO_COLORS, RISCO_LABELS } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'
import ProcedenceDonut from '../components/charts/ProcedenceDonut.jsx'
import TrendLineChart from '../components/charts/TrendLineChart.jsx'

export default function TemaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [aba, setAba] = useState('visao-geral')

  const tema = temas.find((t) => t.id === id)
  if (!tema) {
    return (
      <div className="p-8 text-center">
        <p className="text-silver-300 mb-4">Tema não encontrado.</p>
        <button onClick={() => navigate('/temas')} className="text-blue-400 hover:text-blue-300 text-sm">← Voltar para Análise por Tema</button>
      </div>
    )
  }

  const tabs = [
    { key: 'visao-geral', label: 'Visão Geral' },
    { key: 'tribunais', label: 'Por Tribunal' },
    { key: 'anos', label: 'Por Ano' },
    { key: 'subtemas', label: 'Subcategorias' },
  ]

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-silver-400 mb-6">
        <button onClick={() => navigate('/temas')} className="hover:text-silver-100 transition-colors">Análise por Tema</button>
        <span>/</span>
        <span className="text-silver-100">{tema.nome}</span>
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-silver-100">{tema.nome}</h1>
          <p className="text-silver-300 mt-1.5 text-sm max-w-2xl">{tema.descricao}</p>
        </div>
        <RiskBadge risco={tema.risco} size="md" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">Total de Processos</p>
          <p className="font-mono text-3xl font-bold text-silver-100">{tema.totalCasos}</p>
        </div>
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">Valor Médio de Condenação</p>
          <p className="font-mono text-3xl font-bold text-silver-100">{formatCurrency(tema.valorMedioCondena)}</p>
        </div>
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">Valor Total em Risco</p>
          <p className="font-mono text-3xl font-bold text-red-400">{formatCurrency(tema.valorTotalRisco)}</p>
        </div>
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">Tendência Mensal</p>
          <p className={`font-mono text-3xl font-bold ${tema.tendencia > 0 ? 'text-red-400' : tema.tendencia < 0 ? 'text-green-400' : 'text-silver-400'}`}>
            {tema.tendencia > 0 ? '+' : ''}{tema.tendencia.toFixed(1)}pp
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-navy-600">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setAba(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              aba === t.key
                ? 'text-silver-100 border-blue-500'
                : 'text-silver-400 border-transparent hover:text-silver-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ─────── Visão Geral ─────── */}
      {aba === 'visao-geral' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
            <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-600">
              <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Anel de Veredictos</h2>
              <ProcedenceDonut procedente={tema.procedente} parcial={tema.parcial} improcedente={tema.improcedente} />
              <div className="mt-5 pt-4 border-t border-navy-600">
                <RiskBar procedente={tema.procedente} parcial={tema.parcial} improcedente={tema.improcedente} height={10} showLabels={true} />
                <div className="flex justify-between mt-2.5 text-xs text-silver-400">
                  <span>Procedente</span>
                  <span>Parcial</span>
                  <span>Improcedente</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-navy-800 rounded-xl p-6 border border-navy-600">
              <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Evolução do Portfólio — 24 meses</h2>
              <TrendLineChart data={historico} />
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
            <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Resumo do Tema</h2>
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Procedente', value: formatPercent(tema.procedente), sub: 'do total de casos', color: 'text-red-400' },
                { label: 'Parcial', value: formatPercent(tema.parcial), sub: 'procedência parcial', color: 'text-amber-400' },
                { label: 'Improcedente', value: formatPercent(tema.improcedente), sub: 'casos favoráveis', color: 'text-green-400' },
                { label: 'Exposição Estimada', value: formatCurrency(tema.valorTotalRisco), sub: 'valor total em risco', color: 'text-silver-100' },
              ].map(({ label, value, sub, color }) => (
                <div key={label}>
                  <p className="text-silver-400 text-xs mb-1">{label}</p>
                  <p className={`font-mono text-xl font-bold ${color}`}>{value}</p>
                  <p className="text-silver-400 text-xs mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ─────── Por Tribunal ─────── */}
      {aba === 'tribunais' && (
        <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-600 bg-navy-900/50">
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-left">Tribunal</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Casos</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-center">Distribuição</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Procedência</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Risco</th>
                </tr>
              </thead>
              <tbody>
                {tema.porTribunal.sort((a, b) => b.procedencia - a.procedencia).map((pt) => {
                  const trt = tribunais.find((t) => t.id === pt.tribunalId)
                  const risco = getRiscoFromProcedencia(pt.procedencia)
                  return (
                    <tr key={pt.tribunalId} className="border-b border-navy-700/60 hover:bg-navy-700/35 transition-colors">
                      <td className="py-4 px-5">
                        <p className="font-medium text-silver-100 text-sm">{trt?.nome ?? pt.tribunalId}</p>
                        <p className="text-silver-400 text-xs">{trt?.regiao}</p>
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">{pt.casos}</td>
                      <td className="py-4 px-5">
                        <div className="h-2 bg-navy-900 rounded-full overflow-hidden max-w-[120px] mx-auto">
                          <div className="h-full rounded-full" style={{ width: `${(pt.casos / Math.max(...tema.porTribunal.map((x) => x.casos))) * 100}%`, backgroundColor: RISCO_COLORS[risco] }} />
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-red-400">{formatPercent(pt.procedencia)}</td>
                      <td className="py-4 px-5 text-right">
                        <RiskBadge risco={risco} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────── Por Ano ─────── */}
      {aba === 'anos' && (
        <div className="space-y-4">
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
            <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Comparativo Anual</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tema.porAno.map((ano) => (
                <div key={ano.ano} className="bg-navy-900/50 rounded-xl p-5 border border-navy-600">
                  <p className="text-silver-100 font-semibold text-lg mb-3">{ano.ano}</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Casos', value: ano.casos },
                      { label: 'Procedente', value: formatPercent(ano.procedente), color: 'text-red-400' },
                      { label: 'Parcial', value: formatPercent(ano.parcial), color: 'text-amber-400' },
                      { label: 'Improcedente', value: formatPercent(ano.improcedente), color: 'text-green-400' },
                      { label: 'Valor Médio', value: formatCurrency(ano.valorMedio) },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-silver-400">{label}</span>
                        <span className={`font-mono font-medium ${color ?? 'text-silver-100'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {/* Mini risk bar */}
                  <div className="mt-3 pt-3 border-t border-navy-600">
                    <RiskBar procedente={ano.procedente} parcial={ano.parcial} improcedente={ano.improcedente} height={6} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
            <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Evolução — 24 meses</h2>
            <TrendLineChart data={historico} />
          </div>
        </div>
      )}

      {/* ─────── Subcategorias ─────── */}
      {aba === 'subtemas' && (
        <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-600 bg-navy-900/50">
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-left">Subcategoria</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Casos</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">% do Tema</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-center">Distribuição</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Procedência</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Risco</th>
                </tr>
              </thead>
              <tbody>
                {tema.subtemas.sort((a, b) => b.casos - a.casos).map((sub) => {
                  const risco = getRiscoFromProcedencia(sub.procedente)
                  return (
                    <tr key={sub.nome} className="border-b border-navy-700/60 hover:bg-navy-700/35 transition-colors">
                      <td className="py-4 px-5 font-medium text-silver-100 text-sm">{sub.nome}</td>
                      <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">{sub.casos}</td>
                      <td className="py-4 px-5 text-right font-mono text-sm text-silver-400">{formatPercent((sub.casos / tema.totalCasos) * 100)}</td>
                      <td className="py-4 px-5">
                        <div className="h-2 bg-navy-900 rounded-full overflow-hidden max-w-[100px] mx-auto">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${(sub.casos / Math.max(...tema.subtemas.map((s) => s.casos))) * 100}%`, backgroundColor: RISCO_COLORS[risco] }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-red-400">{formatPercent(sub.procedente)}</td>
                      <td className="py-4 px-5 text-right"><RiskBadge risco={risco} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
