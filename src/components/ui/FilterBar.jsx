import { useState } from 'react'

export default function FilterBar({ anos, tribunais, riscos, onChange }) {
  const [filtros, setFiltros] = useState({ ano: '', tribunal: '', risco: '', busca: '' })

  function atualizar(chave, valor) {
    const next = { ...filtros, [chave]: valor }
    setFiltros(next)
    onChange?.(next)
  }

  const selectStyle = {
    background: 'var(--bg-secondary)', color: 'var(--text-primary)',
    border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
    padding: '6px 12px', fontSize: '13px', outline: 'none', cursor: 'pointer',
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl px-4 py-3 mb-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--text-tertiary)' }}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text" placeholder="Buscar..."
          value={filtros.busca}
          onChange={(e) => atualizar('busca', e.target.value)}
          className="w-full text-sm rounded-lg pl-9 pr-3 py-2"
          style={{
            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            border: '1px solid var(--border)', outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {anos && (
        <select value={filtros.ano} onChange={(e) => atualizar('ano', e.target.value)} style={selectStyle} className="appearance-none cursor-pointer">
          <option value="">Todos os anos</option>
          {anos.map((a) => (<option key={a} value={a}>{a}</option>))}
        </select>
      )}

      {tribunais && (
        <select value={filtros.tribunal} onChange={(e) => atualizar('tribunal', e.target.value)} style={selectStyle} className="appearance-none cursor-pointer">
          <option value="">Todos os tribunais</option>
          {tribunais.map((t) => (<option key={t.id} value={t.id}>{t.nome}</option>))}
        </select>
      )}

      {riscos && (
        <select value={filtros.risco} onChange={(e) => atualizar('risco', e.target.value)} style={selectStyle} className="appearance-none cursor-pointer">
          <option value="">Todos os riscos</option>
          {riscos.map((r) => (<option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>))}
        </select>
      )}

      {(filtros.ano || filtros.tribunal || filtros.risco || filtros.busca) && (
        <button
          onClick={() => { setFiltros({ ano: '', tribunal: '', risco: '', busca: '' }); onChange?.({ ano: '', tribunal: '', risco: '', busca: '' }) }}
          className="text-xs ml-auto" style={{ color: 'var(--text-tertiary)' }}
        >
          Limpar filtros ×
        </button>
      )}
    </div>
  )
}
