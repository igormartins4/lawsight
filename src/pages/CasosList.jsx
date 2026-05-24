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
        <button onClick={() => navigate('/casos/novo')} className="btn" style={{ background: 'var(--accent)', color: '#0a1628', fontWeight: 600 }}>
          + Novo Caso
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: 'var(--text-muted)' }}>
              <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider">Caso</th>
              <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden md:table-cell">Tema</th>
              <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden lg:table-cell">Tribunal</th>
              <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden xl:table-cell">Magistrado</th>
              <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider">Risco</th>
              <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden sm:table-cell">Fase</th>
              <th className="text-right font-medium py-2 text-[10px] uppercase tracking-wider">Ação</th>
            </tr>
          </thead>
          <tbody>
            {casos.map(c => (
              <tr key={c.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="py-3 pr-4">
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{c.nomeCaso}</span>
                </td>
                <td className="py-3 pr-4 hidden md:table-cell" style={{ color: 'var(--text-secondary)' }}>{c.tema}</td>
                <td className="py-3 pr-4 hidden lg:table-cell" style={{ color: 'var(--text-secondary)' }}>{c.tribunal}</td>
                <td className="py-3 pr-4 hidden xl:table-cell" style={{ color: 'var(--text-secondary)' }}>{c.magistrado}</td>
                <td className="py-3 pr-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                    border: '1px solid', color: RISCO_COLORS[c.risco], backgroundColor: `${RISCO_COLORS[c.risco]}15`
                  }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[c.risco] }} />
                    {RISCO_LABELS[c.risco]}
                  </span>
                </td>
                <td className="py-3 pr-4 hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>{c.faseProcessual}</td>
                <td className="py-3 text-right">
                  <button onClick={() => navigate(`/relatorio/${c.id}`)} className="btn text-xs py-1" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                    Ver Relatório
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
