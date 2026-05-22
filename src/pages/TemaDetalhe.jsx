import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import { temas, tribunais, historico, formatCurrency, formatPercent, getRiscoFromProcedencia, RISCO_COLORS } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'
import ProcedenceDonut from '../components/charts/ProcedenceDonut.jsx'
import TrendLineChart from '../components/charts/TrendLineChart.jsx'
import { FavoriteButton } from '../components/ui/IconButton.jsx'

export default function TemaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorito } = useFavorites()
  const [aba, setAba] = useState('visao-geral')

  const tema = temas.find((t) => t.id === id)
  if (!tema) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Tema não encontrado.</p>
        <button onClick={() => navigate('/temas')} className="text-sm" style={{ color: 'var(--accent)' }}>← Voltar para Análise por Tema</button>
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
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
        <button onClick={() => navigate('/temas')} style={{ color: 'var(--text-tertiary)' }}>Análise por Tema</button>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{tema.nome}</span>
      </nav>

      <div className="flex items-start justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{tema.nome}</h1>
            <p className="mt-1.5 text-sm max-w-2xl" style={{ color: 'var(--text-tertiary)' }}>{tema.descricao}</p>
          </div>
          <FavoriteButton tipo="tema" id={tema.id} />
        </div>
        <RiskBadge risco={tema.risco} size="md" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total de Processos', value: tema.totalCasos, cls: '', sub: '' },
          { label: 'Valor Médio de Condenação', value: formatCurrency(tema.valorMedioCondena), cls: '', sub: '' },
          { label: 'Valor Total em Risco', value: formatCurrency(tema.valorTotalRisco), cls: 'text-red-400', sub: '' },
          { label: 'Tendência Mensal', value: `${tema.tendencia > 0 ? '+' : ''}${tema.tendencia.toFixed(1)}pp`, cls: tema.tendencia > 0 ? 'text-red-400' : tema.tendencia < 0 ? 'text-green-400' : '', sub: '' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card p-5 text-center">
            <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
            <p className={`font-mono text-2xl font-bold ${cls || ''}`} style={{ color: cls ? undefined : 'var(--text-primary)' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setAba(t.key)}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 500,
              borderBottom: '2px solid',
              marginBottom: '-1px',
              borderColor: aba === t.key ? 'var(--accent)' : 'transparent',
              color: aba === t.key ? 'var(--accent)' : 'var(--text-tertiary)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {aba === 'visao-geral' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
            <div className="lg:col-span-2 card p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Anel de Veredictos</h2>
              <ProcedenceDonut procedente={tema.procedente} parcial={tema.parcial} improcedente={tema.improcedente} />
              <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <RiskBar procedente={tema.procedente} parcial={tema.parcial} improcedente={tema.improcedente} height={10} showLabels={true} />
                <div className="flex justify-between mt-2.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>Procedente</span><span>Parcial</span><span>Improcedente</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 card p-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Evolução do Portfólio — 24 meses</h2>
              <TrendLineChart data={historico} />
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Resumo do Tema</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Procedente', value: formatPercent(tema.procedente), cls: 'text-red-400' },
                { label: 'Parcial', value: formatPercent(tema.parcial), cls: 'text-amber-400' },
                { label: 'Improcedente', value: formatPercent(tema.improcedente), cls: 'text-green-400' },
                { label: 'Exposição Estimada', value: formatCurrency(tema.valorTotalRisco), cls: '' },
              ].map(({ label, value, cls }) => (
                <div key={label}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                  <p className={`font-mono text-lg font-bold ${cls}`} style={{ color: cls ? undefined : 'var(--text-primary)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {aba === 'tribunais' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tema.porTribunal.sort((a, b) => b.procedencia - a.procedencia).map((pt) => {
            const trt = tribunais.find((t) => t.id === pt.tribunalId)
            const risco = getRiscoFromProcedencia(pt.procedencia)
            return (
              <div key={pt.tribunalId} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{trt?.nome ?? pt.tribunalId}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{trt?.regiao}</p>
                  </div>
                  <RiskBadge risco={risco} />
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{pt.casos} casos</span>
                  <span className="font-mono font-semibold text-red-400">{formatPercent(pt.procedencia)}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(pt.casos / Math.max(...tema.porTribunal.map((x) => x.casos))) * 100}%`, backgroundColor: RISCO_COLORS[risco] }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {aba === 'anos' && (
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Comparativo Anual</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tema.porAno.map((ano) => (
                <div key={ano.ano} className="p-5 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                  <p className="font-semibold text-base mb-3" style={{ color: 'var(--text-primary)' }}>{ano.ano}</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: 'Casos', value: ano.casos },
                      { label: 'Procedente', value: formatPercent(ano.procedente), cls: 'text-red-400' },
                      { label: 'Parcial', value: formatPercent(ano.parcial), cls: 'text-amber-400' },
                      { label: 'Improcedente', value: formatPercent(ano.improcedente), cls: 'text-green-400' },
                      { label: 'Valor Médio', value: formatCurrency(ano.valorMedio) },
                    ].map(({ label, value, cls }) => (
                      <div key={label} className="flex justify-between">
                        <span style={{ color: 'var(--text-tertiary)' }}>{label}</span>
                        <span className={`font-mono font-medium ${cls || ''}`} style={{ color: cls ? undefined : 'var(--text-primary)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <RiskBar procedente={ano.procedente} parcial={ano.parcial} improcedente={ano.improcedente} height={6} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Evolução — 24 meses</h2>
            <TrendLineChart data={historico} />
          </div>
        </div>
      )}

      {aba === 'subtemas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tema.subtemas.sort((a, b) => b.casos - a.casos).map((sub) => {
            const risco = getRiscoFromProcedencia(sub.procedente)
            return (
              <div key={sub.nome} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{sub.nome}</p>
                  <RiskBadge risco={risco} />
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{sub.casos} casos</span>
                  <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{formatPercent((sub.casos / tema.totalCasos) * 100)} do total</span>
                  <span className="font-mono font-semibold text-red-400">{formatPercent(sub.procedente)}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(sub.casos / Math.max(...tema.subtemas.map((s) => s.casos))) * 100}%`, backgroundColor: RISCO_COLORS[risco] }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
