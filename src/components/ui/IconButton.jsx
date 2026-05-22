import { useFavorites } from '../../contexts/FavoritesContext.jsx'

export default function IconButton({ tipo, id, icon, label, onClick, active, className = '' }) {
  const { isFavorito, toggle } = useFavorites()
  const fav = tipo && id ? isFavorito(tipo, id) : false

  if (tipo && id && !icon) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); toggle(tipo, id) }}
        className={`btn-icon ${fav ? 'active' : ''} ${className}`}
        title={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`btn-icon ${active ? 'active' : ''} ${className}`}
      title={label}
    >
      {icon}
    </button>
  )
}

export function FavoriteButton({ tipo, id, className = '' }) {
  const { isFavorito, toggle } = useFavorites()
  const fav = isFavorito(tipo, id)

  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(tipo, id) }}
      className={`btn-icon ${fav ? 'active' : ''} ${className}`}
      title={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>
  )
}
