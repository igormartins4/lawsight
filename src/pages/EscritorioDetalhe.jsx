import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { escritorios, temas, formatCurrency, formatPercent, getRiscoFromProcedencia, RISCO_LABELS, RISCO_BG, RISCO_TEXT, RISCO_COLORS } from '../data/mock.js'

export default function EscritorioDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [aba, setAba] = useState('visao-geral')
  const esc = escritorios.find((e) => e.id === id)

  if (!esc) {
    return (
      <div className="p-8 text-center">
        <p className="text-silver-300 mb-4">Escritório não encontrado.</p>
        <button onClick={() => navigate('/escritorios')} className="text-blue-400 hover:text-blue-300 text-sm">← Voltar para Escritórios</button>
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
      <nav className="flex items-center gap-2 text-sm text-silver-400 mb-6">
        <button onClick={() => navigate('/escritorios')} className="hover:text-silver-100 transition-colors">Escritórios</button>
        <span>/</span>
        <span className="text-silver-100">{esc.nome}</span>
      </nav>

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-silver-100">{esc.nome}</h1>
          <p className="text-silver-300 mt-1 text-sm">{esc.especialidade}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-semibold border ${RISCO_BG[esc.risco]} ${RISCO_TEXT[esc.risco]} border-current`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[esc.risco] }} />
          {RISCO_LABELS[esc.risco]}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Causas Monitoradas', value: esc.casos, cls: 'text-silver-100' },
          { label: 'Taxa de Sucesso', value: formatPercent(esc.taxaSucesso), cls: 'text-green-400' },
          { label: 'Valor Recuperado', value: formatCurrency(esc.valorRecuperado), cls: 'text-green-400' },
          { label: 'Valor Perdido', value: formatCurrency(esc.valorPerdido), cls: 'text-red-400' },
          { label: 'Saldo Líquido', value: `${saldo >= 0 ? '+' : '-'}${formatCurrency(Math.abs(saldo))}`, cls: saldo >= 0 ? 'text-green-400' : 'text-red-400' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="bg-navy-800 rounded-xl p-4 border border-navy-600 text-center">
            <p className="text-silver-400 text-[10px] font-semibold uppercase tracking-wider mb-1.5">{label}</p>
            <p className={`font-mono text-lg font-bold ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6 border-b border-navy-600">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setAba(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${aba === t.key ? 'text-silver-100 border-blue-500' : 'text-silver-400 border-transparent hover:text-silver-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {aba === 'visao-geral' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
            <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Tendência de Risco</h2>
            <div className="flex items-end gap-4">
              <p className={`font-mono text-4xl font-bold ${esc.tendencia > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {esc.tendencia > 0 ? '+' : ''}{esc.tendencia.toFixed(1)}
              </p>
              <p className="text-silver-400 text-sm mb-1.5">pp nos últimos 12 meses</p>
            </div>
            <div className="mt-4 h-2 bg-navy-900 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${esc.tendencia > 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, Math.abs(esc.tendencia) * 12)}%` }} />
            </div>
          </div>

          <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
            <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Comparativo Valor Recuperado vs. Perdido</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-400">Recuperado</span>
                  <span className="font-mono text-green-400">{formatCurrency(esc.valorRecuperado)}</span>
                </div>
                <div className="h-3 bg-navy-900 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(100, (esc.valorRecuperado / (esc.valorRecuperado + esc.valorPerdido)) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400">Perdido</span>
                  <span className="font-mono text-red-400">{formatCurrency(esc.valorPerdido)}</span>
                </div>
                <div className="h-3 bg-navy-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(100, (esc.valorPerdido / (esc.valorRecuperado + esc.valorPerdido)) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-600">
            <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">Tribunais de Atuação</h2>
            <div className="flex flex-wrap gap-2">
              {esc.tribunais.map((tid) => (
                <span key={tid} className="bg-navy-700/50 text-silver-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-navy-500">
                  {trtNomes[tid] ?? tid}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {aba === 'temas' && (
        <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-600 bg-navy-900/50">
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-left">Tema</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Casos</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-right">Taxa de Sucesso</th>
                  <th className="py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider text-center">Risco</th>
                </tr>
              </thead>
              <tbody>
                {esc.temas.map((t) => {
                  const tema = temas.find((tm) => tm.id === t.temaId)
                  const risco = getRiscoFromProcedencia(100 - t.taxaSucesso)
                  return (
                    <tr key={t.temaId} className="border-b border-navy-700/60 hover:bg-navy-700/35 transition-colors">
                      <td className="py-4 px-5">
                        <Link to={`/temas/${t.temaId}`} className="text-silver-100 text-sm font-medium hover:text-blue-400 transition-colors">{tema?.nome ?? t.temaId}</Link>
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">{t.casos}</td>
                      <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-green-400">{formatPercent(t.taxaSucesso)}</td>
                      <td className="py-4 px-5 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${RISCO_BG[risco]} ${RISCO_TEXT[risco]}`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[risco] }} />
                          {RISCO_LABELS[risco]}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {aba === 'tribunais' && (
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
          <p className="text-silver-300 text-sm text-center py-8">
            Este escritório atua em {esc.tribunais.length} tribunais.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {esc.tribunais.map((tid) => (
              <span key={tid} className="bg-navy-700/50 text-silver-200 text-sm px-4 py-2 rounded-lg border border-navy-500 font-medium">
                {tid.toUpperCase().replace('TRT', 'TRT ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
