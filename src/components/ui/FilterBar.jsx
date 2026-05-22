import { useState } from 'react'

export default function FilterBar({ anos, tribunais, riscos, onChange }) {
  const [filtros, setFiltros] = useState({ ano: '', tribunal: '', risco: '', busca: '' })

  function atualizar(chave, valor) {
    const next = { ...filtros, [chave]: valor }
    setFiltros(next)
    onChange?.(next)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 bg-navy-800/70 rounded-xl px-4 py-3 border border-navy-600 mb-6">
      {/* Busca */}
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text" placeholder="Buscar..."
          value={filtros.busca}
          onChange={(e) => atualizar('busca', e.target.value)}
          className="w-full bg-navy-900 text-silver-100 text-sm rounded-lg pl-9 pr-3 py-2 border border-navy-600 placeholder:text-silver-400 focus:outline-none focus:border-blue-500/60 transition-colors"
        />
      </div>

      {/* Filtro Ano */}
      {anos && (
        <select
          value={filtros.ano}
          onChange={(e) => atualizar('ano', e.target.value)}
          className="bg-navy-900 text-silver-100 text-sm rounded-lg px-3 py-2 border border-navy-600 focus:outline-none focus:border-blue-500/60 appearance-none cursor-pointer"
        >
          <option value="">Todos os anos</option>
          {anos.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      )}

      {/* Filtro Tribunal */}
      {tribunais && (
        <select
          value={filtros.tribunal}
          onChange={(e) => atualizar('tribunal', e.target.value)}
          className="bg-navy-900 text-silver-100 text-sm rounded-lg px-3 py-2 border border-navy-600 focus:outline-none focus:border-blue-500/60 appearance-none cursor-pointer"
        >
          <option value="">Todos os tribunais</option>
          {tribunais.map((t) => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </select>
      )}

      {/* Filtro Risco */}
      {riscos && (
        <select
          value={filtros.risco}
          onChange={(e) => atualizar('risco', e.target.value)}
          className="bg-navy-900 text-silver-100 text-sm rounded-lg px-3 py-2 border border-navy-600 focus:outline-none focus:border-blue-500/60 appearance-none cursor-pointer"
        >
          <option value="">Todos os riscos</option>
          {riscos.map((r) => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
      )}

      {/* Limpar */}
      {(filtros.ano || filtros.tribunal || filtros.risco || filtros.busca) && (
        <button
          onClick={() => { setFiltros({ ano: '', tribunal: '', risco: '', busca: '' }); onChange?.({ ano: '', tribunal: '', risco: '', busca: '' }) }}
          className="text-xs text-silver-400 hover:text-silver-100 transition-colors ml-auto"
        >
          Limpar filtros ×
        </button>
      )}
    </div>
  )
}
