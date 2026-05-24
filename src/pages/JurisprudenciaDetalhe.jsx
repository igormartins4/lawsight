import { useParams, useNavigate } from 'react-router-dom'
import { decisoes, RESULTADOS_LABELS, formatCurrencyFull } from '../data/mock.js'

export default function JurisprudenciaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const d = decisoes.find(d => d.id === id)

  if (!d) {
    return (
      <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
        <div className="card p-12 text-center">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Jurisprudência não encontrada.</p>
          <button onClick={() => navigate('/jurisprudencias')} className="btn btn-ghost mt-4">Voltar</button>
        </div>
      </div>
    )
  }

  const resultadoColor = d.resultado === 'favoravel-empresa' ? 'text-green-400'
    : d.resultado === 'favoravel-trabalhador' ? 'text-red-400'
    : 'text-amber-400'

  const resultadoBg = d.resultado === 'favoravel-empresa' ? 'bg-green-500/10'
    : d.resultado === 'favoravel-trabalhador' ? 'bg-red-500/10'
    : 'bg-amber-500/10'

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Jurisprudência</h1>
          <p className="text-sm mt-1 font-mono" style={{ color: 'var(--text-tertiary)' }}>{d.processoNumero}</p>
        </div>
        <button onClick={() => navigate('/jurisprudencias')} className="btn btn-ghost">Voltar</button>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Informações da Decisão</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tema</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.tema}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Subtema</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.subtema}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Resultado</p>
            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mt-0.5 ${resultadoBg} ${resultadoColor}`}>
              {RESULTADOS_LABELS[d.resultado]}
            </span>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tribunal</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.tribunal}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Vara/Turma</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.vara}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Magistrado</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.magistrado}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Data da Decisão</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{d.dataDecisao}</p>
          </div>
          {d.valorCondenacao > 0 && (
            <div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Valor da Condenação</p>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatCurrencyFull(d.valorCondenacao)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Ementa</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{d.ementa}</p>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Resumo</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{d.resumo}</p>
      </div>

      {d.fundamentos && d.fundamentos.length > 0 && (
        <div className="card p-4 md:p-6 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Fundamentos Jurídicos</h2>
          <div className="flex flex-wrap gap-2">
            {d.fundamentos.map((f, i) => (
              <span key={i} className="badge" style={{
                background: 'var(--accent-muted)',
                color: 'var(--accent)',
                fontSize: '0.75rem',
              }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      {d.palavrasChave && d.palavrasChave.length > 0 && (
        <div className="card p-4 md:p-6 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Palavras-chave</h2>
          <div className="flex flex-wrap gap-2">
            {d.palavrasChave.map((p, i) => (
              <span key={i} className="badge" style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
              }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button onClick={() => navigate('/jurisprudencias')} className="btn btn-ghost">Voltar para lista</button>
      </div>
    </div>
  )
}
