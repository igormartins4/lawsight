import { useState } from 'react'
import { temas, formatCurrency, formatNumber, getRiscoFromProcedencia, RISCO_LABELS, RISCO_COLORS } from '../data/mock.js'

export default function Simulador() {
  const [temaId, setTemaId] = useState(temas[0].id)
  const [quantidade, setQuantidade] = useState(10)
  const [valorMedio, setValorMedio] = useState('')
  const [resultado, setResultado] = useState(null)

  const tema = temas.find((t) => t.id === temaId)

  function calcular(e) {
    e.preventDefault()
    if (!tema) return
    const vm = Number(valorMedio) || tema.valorMedioCondena
    const provisaoOtimista = quantidade * vm * (tema.improcedente / 100)
    const provisaoRealista = quantidade * vm * ((tema.procedente + tema.parcial * 0.5) / 100)
    const provisaoPessimista = quantidade * vm * (tema.procedente / 100)
    const provisaoTotal = quantidade * vm
    const risco = getRiscoFromProcedencia(tema.procedente)
    setResultado({ vm, provisaoOtimista, provisaoRealista, provisaoPessimista, provisaoTotal, risco })
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Simulador de Contingência</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          Estime provisões trabalhistas com base em cenários estatísticos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={calcular} className="card p-6 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Parâmetros</h2>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Tema</label>
            <select value={temaId} onChange={(e) => { setTemaId(e.target.value); setResultado(null) }} className="select w-full">
              {temas.map((t) => (
                <option key={t.id} value={t.id}>{t.nome} — {t.procedente.toFixed(0)}% procedente</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Quantidade estimada de processos</label>
            <input type="number" min={1} max={10000} value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} className="input w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Valor médio estimado (opcional)
            </label>
            <input type="number" min={0} value={valorMedio} onChange={(e) => setValorMedio(e.target.value)} placeholder={`Sugerido: ${formatCurrency(tema.valorMedioCondena)}`} className="input w-full" />
            {!valorMedio && (
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Usando valor médio do tema: {formatCurrency(tema.valorMedioCondena)}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full text-sm py-2.5">Calcular Provisão</button>

          {/* Info do tema */}
          {tema && (
            <div className="p-3 rounded-lg text-xs space-y-1" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>
              <p>Baseado em <strong>{tema.totalCasos} casos reais</strong> do tema {tema.nome}</p>
              <p>Taxa de procedência: <span style={{ color: 'var(--danger)' }}>{tema.procedente.toFixed(1)}%</span> · Parcial: <span style={{ color: 'var(--warning)' }}>{tema.parcial.toFixed(1)}%</span> · Improcedente: <span style={{ color: 'var(--success)' }}>{tema.improcedente.toFixed(1)}%</span></p>
            </div>
          )}
        </form>

        {/* Resultado */}
        <div>
          {resultado ? (
            <div className="card p-6 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Resultado da Simulação</h2>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Cenário Otimista', value: formatCurrency(resultado.provisaoOtimista), sub: 'improcedência total', color: 'text-green-400' },
                  { label: 'Cenário Realista', value: formatCurrency(resultado.provisaoRealista), sub: 'ponderação estatística', color: 'text-amber-400' },
                  { label: 'Cenário Pessimista', value: formatCurrency(resultado.provisaoPessimista), sub: 'procedência total', color: 'text-red-400' },
                  { label: 'Exposição Total', value: formatCurrency(resultado.provisaoTotal), sub: `${quantidade} processos × ${formatCurrency(resultado.vm)}`, color: 'text-silver-100' },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                    <p className={`font-mono text-lg font-bold mt-1 ${color}`}>{value}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>
                  </div>
                ))}
              </div>

              {/* Barra de risco */}
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Nível de Risco</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${tema.procedente}%`, background: resultado.risco === 'critico' ? 'var(--danger)' : resultado.risco === 'alto' ? 'var(--warning)' : resultado.risco === 'medio' ? '#eab308' : 'var(--success)' }} />
                  </div>
                  <span className="text-xs font-semibold font-mono" style={{ color: RISCO_COLORS[resultado.risco] }}>
                    {RISCO_LABELS[resultado.risco]}
                  </span>
                </div>
              </div>

              {/* Recomendação */}
              <div className="p-4 rounded-xl text-sm" style={{ background: 'var(--accent-muted)', border: '1px solid var(--accent)' }}>
                <p className="font-medium" style={{ color: 'var(--accent)' }}>Recomendação Estratégica</p>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {resultado.risco === 'critico' || resultado.risco === 'alto'
                    ? 'Considere avaliar acordos preventivos para reduzir exposição. A alta taxa de procedência indica risco significativo de condenação.'
                    : resultado.risco === 'medio'
                    ? 'Avalie cada caso individualmente. A taxa mediana sugere que acordos seletivos podem ser vantajosos.'
                    : 'Baixo risco de condenação. Priorize a defesa judicial e evite acordos acima do valor de mercado.'}
                </p>
              </div>

              <button onClick={() => { alert('Relatório de contingência gerado com sucesso! (simulado)') }} className="btn btn-primary w-full text-sm py-2.5">
                Gerar Relatório de Contingência
              </button>
            </div>
          ) : (
            <div className="card-static p-12 flex flex-col items-center justify-center text-center" style={{ minHeight: '300px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3.047m8.5-3.047l1 3.047m0 0l.75 2.25M6 16.5l-1.5 3.75m13.5-3.75l1.5 3.75M21 3v11.25a2.25 2.25 0 01-2.25 2.25h-1.5" />
              </svg>
              <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Preencha os parâmetros ao lado</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Calcule provisões com base em cenários otimista, realista e pessimista</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
