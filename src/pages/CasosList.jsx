import { useNavigate } from 'react-router-dom'
import { casos, RISCO_COLORS, RISCO_LABELS, formatCurrencyFull } from '../data/mock.js'

export default function CasosList() {
  const navigate = useNavigate()

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Casos</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Todos os casos cadastrados</p>
        </div>
        <button onClick={() => navigate('/casos/novo')} className="btn" style={{ background: 'var(--accent)', color: 'var(--bg-primary)', fontWeight: 600 }}>
          + Novo Caso
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {casos.map(c => (
          <div key={c.id} className="card p-4 cursor-pointer transition-all duration-150 hover:scale-[1.02]" onClick={() => navigate(`/relatorio/${c.id}`)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/relatorio/${c.id}`)} role="link" tabIndex={0}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{c.nomeCaso}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.tema}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{
                border: '1px solid', color: RISCO_COLORS[c.risco], backgroundColor: `${RISCO_COLORS[c.risco]}15`
              }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[c.risco] }} />
                {RISCO_LABELS[c.risco]}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>{c.tribunal}</span>
              <span className="hidden sm:inline">{c.vara}</span>
              <span>{c.faseProcessual}</span>
            </div>
            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-tertiary)' }}>{c.magistrado}</span>
                <span className="font-medium" style={{ color: 'var(--accent)' }}>Ver relatório →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}