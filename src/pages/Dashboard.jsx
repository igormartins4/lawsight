import { useState } from 'react'
import { temas, historico, novosCasos, escritorios, alertas, kpis, formatCurrency, formatPercent, formatNumber, RISCO_COLORS, RISCO_LABELS } from '../data/mock.js'
import KpiCard from '../components/ui/KpiCard.jsx'
import ProcedenceDonut from '../components/charts/ProcedenceDonut.jsx'
import TrendLineChart from '../components/charts/TrendLineChart.jsx'
import TopicsBarChart from '../components/charts/TopicsBarChart.jsx'

const totalCasos = temas.reduce((s, t) => s + t.totalCasos, 0)
const avgProcedente   = temas.reduce((s, t) => s + t.procedente   * t.totalCasos, 0) / totalCasos
const avgParcial      = temas.reduce((s, t) => s + t.parcial      * t.totalCasos, 0) / totalCasos
const avgImprocedente = temas.reduce((s, t) => s + t.improcedente * t.totalCasos, 0) / totalCasos

export default function Dashboard() {
  const [alertsOpen, setAlertsOpen] = useState(false)

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>Visão geral do passivo trabalhista · Maio 2025</p>
        </div>

        <div className="relative">
          <button onClick={() => setAlertsOpen((o) => !o)} className="card p-2.5 cursor-pointer relative" style={{ borderColor: alertsOpen ? 'var(--accent)' : undefined }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: 'var(--text-tertiary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            {alertas.filter((a) => !a.lido).length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {alertas.filter((a) => !a.lido).length}
              </span>
            )}
          </button>

          {alertsOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setAlertsOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 z-20 rounded-xl p-4 shadow-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Alertas Recentes</p>
                <div className="space-y-2 max-h-64 overflow-auto">
                  {alertas.filter((a) => !a.lido).map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{
                      background: a.tipo === 'critico' ? 'rgba(239,68,68,0.1)' : a.tipo === 'alerta' ? 'rgba(245,158,11,0.1)' : 'transparent',
                      border: a.tipo === 'critico' ? '1px solid rgba(239,68,68,0.3)' : a.tipo === 'alerta' ? '1px solid rgba(245,158,11,0.2)' : 'none',
                    }}>
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.tipo === 'critico' ? 'bg-red-500' : a.tipo === 'alerta' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                      <div className="flex-1">
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{a.mensagem}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.data}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Executive Insight */}
      <div className="card p-5 mb-6" style={{ borderLeft: '4px solid var(--accent)' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-muted)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: 'var(--accent)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-tertiary)' }}>Insight Executivo</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              A taxa de procedência consolidada é de <strong style={{ color: 'var(--danger)' }}>{avgProcedente.toFixed(1)}%</strong>, com tendência de
              <strong style={{ color: kpis.variacaoProcedencia > 0 ? 'var(--danger)' : 'var(--success)' }}> {kpis.variacaoProcedencia > 0 ? '+' : ''}{kpis.variacaoProcedencia.toFixed(1)}pp</strong> nos últimos meses.
              O tema crítico é <strong>{temas.sort((a, b) => b.procedente - a.procedente)[0].nome}</strong> ({temas.sort((a, b) => b.procedente - a.procedente)[0].procedente.toFixed(0)}% de procedência).
              Exposição total estimada em <strong>{formatCurrency(kpis.valorTotalRisco)}</strong>.
              {' '}<span style={{ color: 'var(--accent)' }}>Recomenda-se revisão de contratos e acordos preventivos nos temas de maior risco.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Total de Processos" value={formatNumber(kpis.totalProcessos)} trend={kpis.variacaoProcessos} trendUnit="%" trendInverted={false} />
        <KpiCard label="Taxa de Procedência" value={formatPercent(kpis.taxaProcedenciaMedia)} trend={kpis.variacaoProcedencia} trendUnit="pp" trendInverted={true} />
        <KpiCard label="Valor Total em Risco" value={formatCurrency(kpis.valorTotalRisco)} trend={kpis.variacaoValor} trendUnit="%" trendInverted={true} />
        <KpiCard label="Temas Críticos" value={kpis.temasCriticos} trend={null} />
        <KpiCard label="Novos Casos (mês)" value={kpis.novosCasosMes} trend={kpis.variacaoNovosCasos} trendUnit="%" trendInverted={false} />
        <KpiCard label="Prazo Médio (dias)" value={kpis.prazoMedioJulgamento} trend={kpis.variacaoPrazo} trendUnit="d" trendInverted={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <div className="lg:col-span-3 card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Anel de Veredictos</h2>
          <ProcedenceDonut procedente={avgProcedente} parcial={avgParcial} improcedente={avgImprocedente} />
          <div className="flex justify-around mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { label: 'Procedente',   value: avgProcedente,   cls: 'text-red-400' },
              { label: 'Parcial',      value: avgParcial,      cls: 'text-amber-400' },
              { label: 'Improcedente', value: avgImprocedente, cls: 'text-green-400' },
            ].map(({ label, value, cls }) => (
              <div key={label} className="text-center">
                <p className="text-[10px] mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                <p className={`font-mono text-sm font-semibold ${cls}`}>{value.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Evolução dos Veredictos — 24 meses</h2>
          <TrendLineChart data={historico} />
        </div>

        <div className="lg:col-span-3 card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Novos Casos vs. Arquivados</h2>
          <div className="space-y-2">
            {novosCasos.slice(-6).reverse().map((m) => (
              <div key={m.mes} className="flex items-center gap-2">
                <span className="text-[10px] w-14 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{m.mes}</span>
                <div className="flex-1 h-4 rounded-sm flex overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="h-full bg-red-500 rounded-l-sm" style={{ width: `${(m.novos / (m.novos + m.arquivados)) * 100}%` }} />
                  <div className="h-full bg-green-600/70 rounded-r-sm" style={{ width: `${(m.arquivados / (m.novos + m.arquivados)) * 100}%` }} />
                </div>
                <span className="font-mono text-[10px] w-8 text-right" style={{ color: 'var(--text-muted)' }}>{m.novos}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 pt-3 text-[10px]" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 rounded-sm bg-red-500 inline-block" /> Novos</span>
            <span className="flex items-center gap-1 text-green-400"><span className="w-2 h-2 rounded-sm bg-green-600/70 inline-block" /> Arquivados</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Procedência por Tema</h2>
          <TopicsBarChart />
        </div>

        <div className="lg:col-span-2 card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Escritórios — Maior Risco</h2>
          <div className="space-y-3">
            {escritorios.filter((e) => e.risco === 'critico' || e.risco === 'alto').slice(0, 5).map((esc) => (
              <div key={esc.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{esc.nome}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{esc.casos} causas · {formatCurrency(esc.valorPerdido)} perdidos</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold" style={{ border: '1px solid', color: RISCO_COLORS[esc.risco], backgroundColor: `${RISCO_COLORS[esc.risco]}15` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[esc.risco] }} />
                  {RISCO_LABELS[esc.risco]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
