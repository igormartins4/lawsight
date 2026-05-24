import { useNavigate } from 'react-router-dom'
import { casos, decisoes, kpis, formatNumber, RISCO_COLORS, RISCO_LABELS, gerarAnalise } from '../data/mock.js'

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
        <div className="card p-4 transition-all duration-200 hover:scale-[1.03]">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Casos Cadastrados</p>
          <p className="text-2xl font-bold text-white">{formatNumber(kpis.totalCasos)}</p>
        </div>
        <div className="card p-4 transition-all duration-200 hover:scale-[1.03]">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Jurisprudências</p>
          <p className="text-2xl font-bold text-white">{formatNumber(kpis.totalJurisprudencias)}</p>
        </div>
        <div className="card p-4 transition-all duration-200 hover:scale-[1.03]">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Risco Baixo</p>
          <p className="text-2xl font-bold text-green-400">{kpis.casosRiscoBaixo}</p>
        </div>
        <div className="card p-4 transition-all duration-200 hover:scale-[1.03]">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Risco Médio</p>
          <p className="text-2xl font-bold text-amber-400">{kpis.casosRiscoMedio}</p>
        </div>
        <div className="card p-4 transition-all duration-200 hover:scale-[1.03]">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Risco Alto</p>
          <p className="text-2xl font-bold text-red-400">{kpis.casosRiscoAlto}</p>
        </div>
        <div className="card p-4 transition-all duration-200 hover:scale-[1.03]">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Total Decisões</p>
          <p className="text-2xl font-bold text-white">{formatNumber(decisoes.length)}</p>
        </div>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Casos Recentes</h2>
          <button onClick={() => navigate('/casos/novo')} className="btn text-xs py-1.5 transition-all duration-200" style={{ background: 'var(--accent)', color: '#0a1628', fontWeight: 600 }}>
            + Novo Caso
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {casos.map(c => (
            <div key={c.id} className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]" style={{ background: 'var(--bg-tertiary)' }} onClick={() => navigate(`/relatorio/${c.id}`)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{c.nomeCaso}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.tema}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" style={{
                  border: '1px solid', color: RISCO_COLORS[c.risco], backgroundColor: `${RISCO_COLORS[c.risco]}15`,
                }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: RISCO_COLORS[c.risco] }} />
                  {RISCO_LABELS[c.risco]}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span>{c.tribunal}</span>
                <span className="hidden sm:inline">{c.vara}</span>
                <span>{c.dataCriacao}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4 md:p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Últimas Análises</h2>
        <div className="space-y-3">
          {analises.map(({ caso, analise }) => (
            <div key={caso.id} className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer" style={{ background: 'var(--bg-tertiary)' }} onClick={() => navigate(`/relatorio/${caso.id}`)}>
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{caso.nomeCaso}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{caso.tema} · {analise.totalDecisoes} decisões analisadas</p>
              </div>
              <span className="btn text-xs py-1 flex-shrink-0 pointer-events-none" style={{ background: 'var(--accent)', color: '#0a1628', fontWeight: 600 }}>
                Ver
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}