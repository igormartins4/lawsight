import { useParams, useNavigate } from 'react-router-dom'
import { casos, gerarAnalise, formatCurrencyFull, formatPercent, formatNumber, RISCO_COLORS, RISCO_LABELS, RESULTADOS_LABELS } from '../data/mock.js'

export default function RelatorioCaso() {
  const { id } = useParams()
  const navigate = useNavigate()
  const caso = casos.find(c => c.id === id)
  const analise = caso ? gerarAnalise(id) : null

  if (!caso || !analise) {
    return (
      <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
        <div className="card p-12 text-center">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Caso não encontrado.</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost mt-4">Voltar</button>
        </div>
      </div>
    )
  }

  const distData = [
    { name: 'Favorável Empresa', value: analise.percFavoravelEmpresa, color: '#22c55e' },
    { name: 'Favorável Trabalhador', value: analise.percFavoravelTrabalhador, color: '#ef4444' },
    { name: 'Parcial', value: analise.percParcial, color: '#f59e0b' },
    { name: 'Inconclusivo', value: analise.percInconclusivo, color: '#6b7280' },
  ]

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto" id="relatorio">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Relatório Jurimétrico</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{caso.nomeCaso}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn" style={{ background: 'var(--accent)', color: '#0a1628', fontWeight: 600 }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Imprimir / PDF
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost">Voltar</button>
        </div>
      </div>

      {/* Dados do Caso */}
      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Dados do Caso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {[
            ['Caso', caso.nomeCaso],
            ['Parte Representada', caso.parteRepresentada === 'empresa' ? 'Empresa' : 'Trabalhador'],
            ['Tema', caso.tema],
            ['Subtema', caso.subtema],
            ['Tribunal', caso.tribunal],
            ['Vara/Turma', caso.vara],
            ['Magistrado', caso.magistrado],
            ['Fase Processual', caso.faseProcessual],
            ['Valor da Causa', formatCurrencyFull(caso.valorCausa)],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risco Estimado */}
      <div className={`card p-4 md:p-6 mb-6 ${analise.risco === 'alto' ? 'card-danger' : analise.risco === 'medio' ? 'card-warning' : 'card-success'}`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${RISCO_COLORS[analise.risco]}20` }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={RISCO_COLORS[analise.risco]}>
              <path strokeLinecap="round" strokeLinejoin="round" d={analise.risco === 'baixo' ? 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'} />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Risco Estimado</p>
            <p className="text-3xl font-bold" style={{ color: RISCO_COLORS[analise.risco] }}>
              {RISCO_LABELS[analise.risco]}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {analise.totalDecisoes} decisões analisadas · {caso.parteRepresentada === 'empresa' ? 'Empresa' : 'Trabalhador'} representado
            </p>
          </div>
        </div>
      </div>

      {/* Indicadores Quantitativos */}
      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Indicadores Quantitativos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            ['Total Decisões', analise.totalDecisoes, ''],
            ['Favorável Empresa', formatPercent(analise.percFavoravelEmpresa), 'text-green-400'],
            ['Favorável Trabalhador', formatPercent(analise.percFavoravelTrabalhador), 'text-red-400'],
            ['Parcialmente Favorável', formatPercent(analise.percParcial), 'text-amber-400'],
            ['Inconclusivas', formatPercent(analise.percInconclusivo), 'text-silver-300'],
            ['Valor Médio Condenação', formatCurrencyFull(analise.valorMedioCondenacao), ''],
            ['Menor Valor', formatCurrencyFull(analise.menorValorCondenacao), ''],
            ['Maior Valor', formatCurrencyFull(analise.maiorValorCondenacao), ''],
          ].map(([label, value, cls]) => (
            <div key={label} className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-[10px] font-medium uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
              <p className={`text-lg font-bold ${cls || ''}`} style={{ color: cls || 'var(--text-primary)' }}>{value}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Por Tribunal, Vara e Magistrado</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{caso.tribunal}</p>
            <p className="text-sm font-medium text-white">{analise.decisoesMesmoTribunal} decisões</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{caso.vara}</p>
            <p className="text-sm font-medium text-white">{analise.decisoesMesmaVara} decisões</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="text-[10px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{caso.magistrado}</p>
            <p className="text-sm font-medium text-white">{analise.decisoesMesmoMagistrado} decisões</p>
          </div>
        </div>

        {/* Gráfico de barras simples */}
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Distribuição dos Resultados</h3>
        <div className="space-y-2 mb-6">
          {distData.map(d => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="text-xs w-40 flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
              <div className="flex-1 h-5 rounded-sm overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="h-full rounded-sm transition-all duration-500" style={{ width: `${Math.max(2, d.value)}%`, background: d.color }} />
              </div>
              <span className="text-xs font-mono w-12 text-right" style={{ color: 'var(--text-secondary)' }}>{d.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Padrão Decisório do Magistrado */}
      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Peso Decisório do Magistrado</h2>
        {analise.temPadraoMagistrado && analise.padraoMagistrado ? (
          <div>
            <div className="p-3 rounded-lg mb-4" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-sm font-semibold text-silver-100 mb-2">Padrão Decisório do Magistrado</p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                {analise.decisoesMesmoMagistrado} decisões analisadas do {caso.magistrado} sobre {caso.tema}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Favorável Empresa</p>
                  <p className="font-semibold text-green-400">{formatPercent(analise.padraoMagistrado.percFavoravelEmpresa)}</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Favorável Trabalhador</p>
                  <p className="font-semibold text-red-400">{formatPercent(analise.padraoMagistrado.percFavoravelTrabalhador)}</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Valor Médio</p>
                  <p className="font-semibold text-white">{formatCurrencyFull(analise.padraoMagistrado.valorMedioCondenacao)}</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Tendência</p>
                  <p className="font-semibold" style={{ color: 'var(--accent)' }}>{analise.padraoMagistrado.tendencia}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              A base ainda não possui volume suficiente de decisões deste magistrado para indicar tendência individual robusta. A análise foi ampliada para órgão julgador e tribunal.
            </p>
          </div>
        )}
      </div>

      {/* Análise Qualitativa */}
      <div className="card p-4 md:p-6 mb-6" style={{ borderLeft: `4px solid ${RISCO_COLORS[analise.risco]}` }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Análise Qualitativa</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Síntese do Padrão Decisório Geral</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{analise.qualitativa.sinteseGeral}</p>
          </div>
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Síntese do Tribunal</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{analise.qualitativa.sinteseTribunal}</p>
          </div>
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Síntese da Vara</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{analise.qualitativa.sinteseVara}</p>
          </div>
          {analise.qualitativa.sinteseMagistrado && (
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Padrão do Magistrado</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{analise.qualitativa.sinteseMagistrado}</p>
            </div>
          )}
          {analise.qualitativa.fatoresAumentoRisco.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1 text-red-400">Fatores que Aumentam o Risco</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {analise.qualitativa.fatoresAumentoRisco.map((f, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)' }}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          {analise.qualitativa.fatoresReducaoRisco.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1 text-green-400">Fatores que Reduzem o Risco</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {analise.qualitativa.fatoresReducaoRisco.map((f, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)' }}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Recomendação */}
      <div className="card p-4 md:p-6 mb-6" style={{ borderLeft: `4px solid var(--accent)` }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Recomendação Estratégica</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {analise.qualitativa.recomendacao}
        </p>
        {analise.temPadraoMagistrado && (
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
            As decisões identificadas do mesmo magistrado revelam tendência relevante para a análise do caso. Esse dado deve ser considerado com cautela, mas pode auxiliar na definição da estratégia processual, especialmente em temas repetitivos.
          </p>
        )}
      </div>

      {/* Jurisprudências mais relevantes */}
      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Jurisprudências Mais Relevantes</h2>
        <div className="space-y-3">
          {analise.decisoesUtilizadas.map(d => (
            <div key={d.id} className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{d.tema} · {d.tribunal}</p>
                <span className={`text-[10px] font-medium ${d.resultado === 'favoravel-empresa' ? 'text-green-400' : d.resultado === 'favoravel-trabalhador' ? 'text-red-400' : 'text-amber-400'}`}>
                  {RESULTADOS_LABELS[d.resultado]}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {d.magistrado} · {d.vara} · {d.dataDecisao}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                {d.resumo}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-lg text-center" style={{ background: 'var(--bg-tertiary)' }}>
        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          A Lawsight é uma ferramenta de apoio à decisão baseada em análise estatística e qualitativa de decisões judiciais.
          Os resultados apresentados não constituem parecer jurídico definitivo, não garantem resultado processual e devem ser interpretados por profissional habilitado.
        </p>
      </div>
    </div>
  )
}
