import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import { useState } from 'react'
import { temas, formatCurrency, formatPercent, formatNumber } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'
import FilterBar from '../components/ui/FilterBar.jsx'
import { FavoriteButton } from '../components/ui/IconButton.jsx'

export default function Temas() {
  const navigate = useNavigate()
  const { toggle, isFavorito } = useFavorites()
  const [filtros, setFiltros] = useState({ busca: '', risco: '' })
  const [verFavoritos, setVerFavoritos] = useState(false)

  let sorted = [...temas].sort((a, b) => b.procedente - a.procedente)
  if (filtros.busca) sorted = sorted.filter((t) => t.nome.toLowerCase().includes(filtros.busca.toLowerCase()) || t.descricao.toLowerCase().includes(filtros.busca.toLowerCase()))
  if (filtros.risco) sorted = sorted.filter((t) => t.risco === filtros.risco)
  if (verFavoritos) sorted = sorted.filter((t) => isFavorito('tema', t.id))

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Análise por Tema</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {temas.length} temas monitorados · Clique em um tema para detalhe
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.map((tema) => (
          <div
            key={tema.id}
            onClick={() => navigate(`/temas/${tema.id}`)}
            className="card p-5 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>{tema.nome}</p>
                <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>{tema.descricao}</p>
              </div>
              <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
                <FavoriteButton tipo="tema" id={tema.id} />
              </div>
            </div>

            <div className="mb-3">
              <RiskBar procedente={tema.procedente} parcial={tema.parcial} improcedente={tema.improcedente} height={6} />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {formatNumber(tema.totalCasos)} casos
              </span>
              <span className="font-mono" style={{ color: 'var(--text-tertiary)' }}>
                {formatCurrency(tema.valorMedioCondena)}
              </span>
              <span className={`font-mono font-semibold ${
                tema.tendencia > 0 ? 'text-red-400' : tema.tendencia < 0 ? 'text-green-400' : ''
              }`}>
                {tema.tendencia > 0 ? '+' : ''}{tema.tendencia.toFixed(1)}pp
              </span>
              <RiskBadge risco={tema.risco} />
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Nenhum tema encontrado.</p>
        </div>
      )}
    </div>
  )
}
