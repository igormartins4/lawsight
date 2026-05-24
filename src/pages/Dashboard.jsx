import { useNavigate } from 'react-router-dom'
import { casos, decisoes, kpis, formatCurrency, formatNumber, formatPercent, RISCO_COLORS, RISCO_LABELS, gerarAnalise } from '../data/mock.js'

export default function Dashboard() {
  const navigate = useNavigate()
  const analises = casos.slice(0, 5).map(c => ({ caso: c, analise: gerarAnalise(c.id) }))

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>Visão geral da plataforma · Dados simulados</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Casos Cadastrados</p>
          <p className="text-2xl font-bold text-white">{formatNumber(kpis.totalCasos)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Jurisprudências</p>
          <p className="text-2xl font-bold text-white">{formatNumber(kpis.totalJurisprudencias)}</p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Risco Baixo</p>
          <p className="text-2xl font-bold text-green-400">{kpis.casosRiscoBaixo}</p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Risco Médio</p>
          <p className="text-2xl font-bold text-amber-400">{kpis.casosRiscoMedio}</p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Risco Alto</p>
          <p className="text-2xl font-bold text-red-400">{kpis.casosRiscoAlto}</p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Total Decisões</p>
          <p className="text-2xl font-bold text-white">{formatNumber(decisoes.length)}</p>
        </div>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Casos Recentes</h2>
          <button onClick={() => navigate('/casos/novo')} className="btn text-xs py-1.5" style={{ background: 'var(--accent)', color: '#0a1628', fontWeight: 600 }}>
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
                <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden xl:table-cell">Vara/Turma</th>
                <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden xl:table-cell">Magistrado</th>
                <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider">Risco</th>
                <th className="text-left font-medium py-2 pr-4 text-[10px] uppercase tracking-wider hidden sm:table-cell">Data</th>
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
                  <td className="py-3 pr-4 hidden xl:table-cell" style={{ color: 'var(--text-secondary)' }}>{c.vara}</td>
                  <td className="py-3 pr-4 hidden xl:table-cell" style={{ color: 'var(--text-secondary)' }}>{c.magistrado}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                      border: '1px solid',
                      color: RISCO_COLORS[c.risco],
                      backgroundColor: `${RISCO_COLORS[c.risco]}15`,
                    }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[c.risco] }} />
                      {RISCO_LABELS[c.risco]}
                    </span>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>{c.dataCriacao}</td>
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

      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Últimas Análises</h2>
        <div className="space-y-3">
          {analises.map(({ caso, analise }) => (
            <div key={caso.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{caso.nomeCaso}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{caso.tema} · {analise.totalDecisoes} decisões analisadas</p>
              </div>
              <button onClick={() => navigate(`/relatorio/${caso.id}`)} className="btn text-xs py-1 flex-shrink-0" style={{ background: 'var(--accent)', color: '#0a1628', fontWeight: 600 }}>
                Ver
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
