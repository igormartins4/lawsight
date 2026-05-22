import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { escritorios, temas, formatCurrency, formatPercent, getRiscoFromProcedencia, RISCO_LABELS, RISCO_COLORS } from '../data/mock.js'

export default function EscritorioDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [aba, setAba] = useState('visao-geral')
  const esc = escritorios.find((e) => e.id === id)

  if (!esc) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Escritório não encontrado.</p>
        <button onClick={() => navigate('/escritorios')} style={{ color: 'var(--accent)' }} className="text-sm">← Voltar para Escritórios</button>
      </div>
    )
  }

  const saldo = esc.valorRecuperado - esc.valorPerdido
  const tabs = [
    { key: 'visao-geral', label: 'Visão Geral' },
    { key: 'temas', label: 'Distribuição por Tema' },
    { key: 'tribunais', label: 'Atuação por Tribunal' },
  ]

  const trtNomes = { trt1: 'TRT 1 (RJ)', trt2: 'TRT 2 (SP)', trt3: 'TRT 3 (MG)', trt4: 'TRT 4 (RS)', trt5: 'TRT 5 (BA)', trt9: 'TRT 9 (PR)', trt10: 'TRT 10 (DF)', trt15: 'TRT 15 (Campinas)' }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
        <button onClick={() => navigate('/escritorios')} style={{ color: 'var(--text-tertiary)' }}>Escritórios</button>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{esc.nome}</span>
      </nav>

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{esc.nome}</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>{esc.especialidade}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-semibold" style={{ border: '1px solid', color: RISCO_COLORS[esc.risco], backgroundColor: `${RISCO_COLORS[esc.risco]}15` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[esc.risco] }} />
          {RISCO_LABELS[esc.risco]}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Causas Monitoradas', value: esc.casos, cls: '' },
          { label: 'Taxa de Sucesso', value: formatPercent(esc.taxaSucesso), cls: 'text-green-400' },
          { label: 'Valor Recuperado', value: formatCurrency(esc.valorRecuperado), cls: 'text-green-400' },
          { label: 'Valor Perdido', value: formatCurrency(esc.valorPerdido), cls: 'text-red-400' },
          { label: 'Saldo Líquido', value: `${saldo >= 0 ? '+' : '-'}${formatCurrency(Math.abs(saldo))}`, cls: saldo >= 0 ? 'text-green-400' : 'text-red-400' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="card p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
            <p className={`font-mono text-lg font-bold ${cls}`} style={{ color: cls ? undefined : 'var(--text-primary)' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setAba(t.key)}
            style={{
              padding: '10px 16px', fontSize: '14px', fontWeight: 500,
              borderBottom: '2px solid', marginBottom: '-1px',
              borderColor: aba === t.key ? 'var(--accent)' : 'transparent',
              color: aba === t.key ? 'var(--accent)' : 'var(--text-tertiary)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {aba === 'visao-geral' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Tendência de Risco</h2>
            <div className="flex items-end gap-4">
              <p className={`font-mono text-4xl font-bold ${esc.tendencia > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {esc.tendencia > 0 ? '+' : ''}{esc.tendencia.toFixed(1)}
              </p>
              <p className="text-sm mb-1.5" style={{ color: 'var(--text-tertiary)' }}>pp nos últimos 12 meses</p>
            </div>
            <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.abs(esc.tendencia) * 12)}%`, backgroundColor: esc.tendencia > 0 ? '#ef4444' : '#22c55e' }} />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Comparativo Valor Recuperado vs. Perdido</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-400">Recuperado</span>
                  <span className="font-mono text-green-400">{formatCurrency(esc.valorRecuperado)}</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(100, (esc.valorRecuperado / (esc.valorRecuperado + esc.valorPerdido)) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400">Perdido</span>
                  <span className="font-mono text-red-400">{formatCurrency(esc.valorPerdido)}</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(100, (esc.valorPerdido / (esc.valorRecuperado + esc.valorPerdido)) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Tribunais de Atuação</h2>
            <div className="flex flex-wrap gap-2">
              {esc.tribunais.map((tid) => (
                <span key={tid} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  {trtNomes[tid] ?? tid}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {aba === 'temas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {esc.temas.map((t) => {
            const tema = temas.find((tm) => tm.id === t.temaId)
            const risco = getRiscoFromProcedencia(100 - t.taxaSucesso)
            return (
              <div key={t.temaId} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <Link to={`/temas/${t.temaId}`} style={{ color: 'var(--accent)' }} className="text-sm font-medium">{tema?.nome ?? t.temaId}</Link>
                  <span className="text-xs font-mono font-semibold" style={{ color: RISCO_COLORS[risco] }}>{RISCO_LABELS[risco]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-tertiary)' }}>{t.casos} casos</span>
                  <span className="font-mono font-semibold text-green-400">{formatPercent(t.taxaSucesso)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {aba === 'tribunais' && (
        <div className="card p-6">
          <p className="text-sm text-center py-4" style={{ color: 'var(--text-tertiary)' }}>
            Este escritório atua em {esc.tribunais.length} tribunais.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {esc.tribunais.map((tid) => (
              <span key={tid} className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                {tid.toUpperCase().replace('TRT', 'TRT ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
