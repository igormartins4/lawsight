import { temas, historico, kpis, formatCurrency, formatPercent, formatNumber } from '../data/mock.js'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProcedenceDonut from '../components/charts/ProcedenceDonut.jsx'
import TrendLineChart from '../components/charts/TrendLineChart.jsx'
import TopicsBarChart from '../components/charts/TopicsBarChart.jsx'

// Weighted average across all topics
const totalCasos = temas.reduce((s, t) => s + t.totalCasos, 0)
const avgProcedente   = temas.reduce((s, t) => s + t.procedente   * t.totalCasos, 0) / totalCasos
const avgParcial      = temas.reduce((s, t) => s + t.parcial      * t.totalCasos, 0) / totalCasos
const avgImprocedente = temas.reduce((s, t) => s + t.improcedente * t.totalCasos, 0) / totalCasos

export default function Dashboard() {
  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Dashboard</h1>
        <p className="text-silver-300 mt-1 text-sm">
          Visão geral do passivo trabalhista · Maio 2025
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Total de Processos"
          value={formatNumber(kpis.totalProcessos)}
          trend={kpis.variacaoProcessos}
          trendUnit="%"
          trendInverted={false}
        />
        <KpiCard
          label="Taxa de Procedência"
          value={formatPercent(kpis.taxaProcedenciaMedia)}
          trend={kpis.variacaoProcedencia}
          trendUnit="pp"
          trendInverted={true}
        />
        <KpiCard
          label="Valor Total em Risco"
          value={formatCurrency(kpis.valorTotalRisco)}
          trend={kpis.variacaoValor}
          trendUnit="%"
          trendInverted={true}
        />
        <KpiCard
          label="Temas Críticos"
          value={kpis.temasCriticos}
          trend={null}
        />
      </div>

      {/* Donut + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Verdict Ring */}
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">
            Anel de Veredictos
          </h2>
          <ProcedenceDonut
            procedente={avgProcedente}
            parcial={avgParcial}
            improcedente={avgImprocedente}
          />
          <div className="flex justify-around mt-5 pt-4 border-t border-navy-600">
            {[
              { label: 'Procedente',   value: avgProcedente,   color: 'text-red-400' },
              { label: 'Parcial',      value: avgParcial,      color: 'text-amber-400' },
              { label: 'Improcedente', value: avgImprocedente, color: 'text-green-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <p className="text-silver-400 text-xs mb-0.5">{label}</p>
                <p className={`font-mono text-sm font-semibold ${color}`}>
                  {value.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend line */}
        <div className="lg:col-span-3 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">
            Evolução dos Veredictos — 12 meses
          </h2>
          <TrendLineChart data={historico} />
        </div>
      </div>

      {/* Topics bar chart */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
        <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">
          Procedência por Tema
        </h2>
        <TopicsBarChart />
      </div>
    </div>
  )
}
