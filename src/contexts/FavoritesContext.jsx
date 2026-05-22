import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const FavoritesContext = createContext()

const STORAGE_KEY = 'lawsight-favoritos'

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { temas: [], tribunais: [], escritorios: [], relatorios: [] }
    } catch {
      return { temas: [], tribunais: [], escritorios: [], relatorios: [] }
    }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos)) } catch {}
  }, [favoritos])

  const toggle = useCallback((tipo, id) => {
    setFavoritos((prev) => {
      const lista = prev[tipo] || []
      const idx = lista.indexOf(id)
      const next = { ...prev }
      if (idx >= 0) next[tipo] = lista.filter((x) => x !== id)
      else next[tipo] = [...lista, id]
      return next
    })
  }, [])

  const isFavorito = useCallback((tipo, id) => {
    return (favoritos[tipo] || []).includes(id)
  }, [favoritos])

  const count = Object.values(favoritos).reduce((s, arr) => s + arr.length, 0)

  return (
    <FavoritesContext.Provider value={{ favoritos, toggle, isFavorito, count }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve estar dentro de FavoritesProvider')
  return ctx
}
