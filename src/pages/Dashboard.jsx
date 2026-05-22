import { temas, historico, novosCasos, escritorios, alertas, kpis, formatCurrency, formatPercent, formatNumber, RISCO_COLORS, RISCO_LABELS, RISCO_BG, RISCO_TEXT } from '../data/mock.js'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProcedenceDonut from '../components/charts/ProcedenceDonut.jsx'
import TrendLineChart from '../components/charts/TrendLineChart.jsx'
import TopicsBarChart from '../components/charts/TopicsBarChart.jsx'

const totalCasos = temas.reduce((s, t) => s + t.totalCasos, 0)
const avgProcedente   = temas.reduce((s, t) => s + t.procedente   * t.totalCasos, 0) / totalCasos
const avgParcial      = temas.reduce((s, t) => s + t.parcial      * t.totalCasos, 0) / totalCasos
const avgImprocedente = temas.reduce((s, t) => s + t.improcedente * t.totalCasos, 0) / totalCasos

export default function Dashboard() {
  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-silver-100">Dashboard</h1>
          <p className="text-silver-300 mt-1 text-sm">Visão geral do passivo trabalhista · Maio 2025</p>
        </div>

        {/* Alertas inline */}
        <div className="relative group">
          <button className="relative bg-navy-800 rounded-xl p-2.5 border border-navy-600 hover:border-navy-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-silver-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {alertas.filter((a) => !a.lido).length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {alertas.filter((a) => !a.lido).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards — 6 cards em grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Total de Processos" value={formatNumber(kpis.totalProcessos)} trend={kpis.variacaoProcessos} trendUnit="%" trendInverted={false} />
        <KpiCard label="Taxa de Procedência" value={formatPercent(kpis.taxaProcedenciaMedia)} trend={kpis.variacaoProcedencia} trendUnit="pp" trendInverted={true} />
        <KpiCard label="Valor Total em Risco" value={formatCurrency(kpis.valorTotalRisco)} trend={kpis.variacaoValor} trendUnit="%" trendInverted={true} />
        <KpiCard label="Temas Críticos" value={kpis.temasCriticos} trend={null} />
        <KpiCard label="Novos Casos (mês)" value={kpis.novosCasosMes} trend={kpis.variacaoNovosCasos} trendUnit="%" trendInverted={false} />
        <KpiCard label="Prazo Médio (dias)" value={kpis.prazoMedioJulgamento} trend={kpis.variacaoPrazo} trendUnit="d" trendInverted={false} />
      </div>

      {/* Donut + Trend + Novos Casos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Verdict Ring */}
        <div className="lg:col-span-3 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Anel de Veredictos</h2>
          <ProcedenceDonut procedente={avgProcedente} parcial={avgParcial} improcedente={avgImprocedente} />
          <div className="flex justify-around mt-5 pt-4 border-t border-navy-600">
            {[
              { label: 'Procedente',   value: avgProcedente,   color: 'text-red-400' },
              { label: 'Parcial',      value: avgParcial,      color: 'text-amber-400' },
              { label: 'Improcedente', value: avgImprocedente, color: 'text-green-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center">
                <p className="text-silver-400 text-[10px] mb-0.5">{label}</p>
                <p className={`font-mono text-sm font-semibold ${color}`}>{value.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trend line */}
        <div className="lg:col-span-6 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Evolução dos Veredictos — 24 meses</h2>
          <TrendLineChart data={historico} />
        </div>

        {/* Novos casos */}
        <div className="lg:col-span-3 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Novos Casos vs. Arquivados</h2>
          <div className="space-y-2">
            {novosCasos.slice(-6).reverse().map((m) => (
              <div key={m.mes} className="flex items-center gap-2">
                <span className="text-silver-400 text-[10px] w-14 flex-shrink-0">{m.mes}</span>
                <div className="flex-1 h-4 bg-navy-900 rounded-sm flex overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-l-sm transition-all"
                    style={{ width: `${(m.novos / (m.novos + m.arquivados)) * 100}%` }}
                    title={`${m.novos} novos`}
                  />
                  <div
                    className="h-full bg-green-600/70 rounded-r-sm transition-all"
                    style={{ width: `${(m.arquivados / (m.novos + m.arquivados)) * 100}%` }}
                    title={`${m.arquivados} arquivados`}
                  />
                </div>
                <span className="font-mono text-[10px] text-silver-400 w-8 text-right">{m.novos}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-navy-600 text-[10px]">
            <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-sm bg-red-500 inline-block" /> Novos</span>
            <span className="flex items-center gap-1 text-green-400"><span className="w-2 h-2 rounded-sm bg-green-600/70 inline-block" /> Arquivados</span>
          </div>
        </div>
      </div>

      {/* Topics bar chart + Top escritórios */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Procedência por Tema</h2>
          <TopicsBarChart />
        </div>

        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Escritórios — Maior Risco</h2>
          <div className="space-y-3">
            {escritorios.filter((e) => e.risco === 'critico' || e.risco === 'alto').slice(0, 5).map((esc) => (
              <div key={esc.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-silver-100 text-xs font-medium truncate">{esc.nome}</p>
                  <p className="text-silver-400 text-[10px]">{esc.casos} causas · {formatCurrency(esc.valorPerdido)} perdidos</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${RISCO_BG[esc.risco]} ${RISCO_TEXT[esc.risco]}`}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[esc.risco] }} />
                  {RISCO_LABELS[esc.risco]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas rodapé */}
      {alertas.filter((a) => !a.lido).length > 0 && (
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-3">Alertas Recentes</h2>
          <div className="space-y-2">
            {alertas.filter((a) => !a.lido).map((a, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${a.tipo === 'critico' ? 'bg-red-950/30 border border-red-900/40' : a.tipo === 'alerta' ? 'bg-amber-950/20 border border-amber-900/30' : ''}`}>
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.tipo === 'critico' ? 'bg-red-500' : a.tipo === 'alerta' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <div className="flex-1">
                  <p className="text-silver-100 text-sm">{a.mensagem}</p>
                  <p className="text-silver-400 text-xs mt-0.5">{a.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
