import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import { escritorios, formatCurrency, formatPercent, formatNumber, RISCO_LABELS, RISCO_COLORS } from '../data/mock.js'
import FilterBar from '../components/ui/FilterBar.jsx'
import { FavoriteButton } from '../components/ui/IconButton.jsx'

export default function Escritorios() {
  const navigate = useNavigate()
  const { isFavorito } = useFavorites()
  const [filtros, setFiltros] = useState({ busca: '', risco: '' })
  const [verFavoritos, setVerFavoritos] = useState(false)

  let filtrados = escritorios.filter((esc) => {
    if (filtros.busca && !esc.nome.toLowerCase().includes(filtros.busca.toLowerCase())) return false
    if (filtros.risco && esc.risco !== filtros.risco) return false
    return true
  }).sort((a, b) => b.casos - a.casos)
  if (verFavoritos) filtrados = filtrados.filter((e) => isFavorito('escritorio', e.id))

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Análise por Escritório</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {escritorios.length} escritórios monitorados · Desempenho em causas trabalhistas
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap mb-4">
        <FilterBar riscos={['critico','alto','medio','baixo']} onChange={setFiltros} />
        <button
          onClick={() => setVerFavoritos((v) => !v)}
          className={`btn btn-ghost text-xs gap-1.5 ${verFavoritos ? 'text-amber-400' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill={verFavoritos ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          Favoritos
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total de Causas', value: formatNumber(escritorios.reduce((s, e) => s + e.casos, 0)) },
          { label: 'Valor Total Perdido', value: formatCurrency(escritorios.reduce((s, e) => s + e.valorPerdido, 0)) },
          { label: 'Valor Total Recuperado', value: formatCurrency(escritorios.reduce((s, e) => s + e.valorRecuperado, 0)) },
          { label: 'Taxa de Sucesso Média', value: formatPercent(escritorios.reduce((s, e) => s + e.taxaSucesso, 0) / escritorios.length) },
        ].map(({ label, value }) => (
          <div key={label} className="card p-5">
            <p className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
            <p className="font-mono text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtrados.map((esc) => (
          <div
            key={esc.id}
            onClick={() => navigate(`/escritorios/${esc.id}`)}
            className="card p-5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{esc.nome}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{esc.especialidade} · {esc.casos} causas</p>
              </div>
              <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
                <FavoriteButton tipo="escritorio" id={esc.id} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs mb-3">
              <div>
                <p className="font-mono font-semibold text-green-400">{formatCurrency(esc.valorRecuperado)}</p>
                <p className="mt-0.5" style={{ color: 'var(--text-muted)' }}>Recuperado</p>
              </div>
              <div>
                <p className="font-mono font-semibold text-red-400">{formatCurrency(esc.valorPerdido)}</p>
                <p className="mt-0.5" style={{ color: 'var(--text-muted)' }}>Perdido</p>
              </div>
              <div>
                <p className={`font-mono font-semibold ${esc.tendencia < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {esc.tendencia > 0 ? '+' : ''}{esc.tendencia.toFixed(1)}pp
                </p>
                <p className="mt-0.5" style={{ color: 'var(--text-muted)' }}>Tendência</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              <span className="font-mono font-semibold text-xs" style={{ color: RISCO_COLORS[esc.risco] }}>
                {RISCO_LABELS[esc.risco]}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{esc.ultimaAtualizacao}</span>
            </div>
          </div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Nenhum escritório encontrado.</p>
        </div>
      )}
    </div>
  )
}
