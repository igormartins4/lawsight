import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decisoes, TEMAS, tribunais, RESULTADOS_DECISAO, RESULTADOS_LABELS, formatCurrencyFull } from '../data/mock.js'

export default function ConsultaJurisprudencias() {
  const navigate = useNavigate()
  const [filtros, setFiltros] = useState({
    tema: '', tribunal: '', magistrado: '', periodoInicio: '', periodoFim: '',
    resultado: '', palavrasChave: '',
  })
  const [resultados, setResultados] = useState(null)

  const filtered = decisoes.filter(d => {
    if (filtros.tema && d.temaId !== filtros.tema) return false
    if (filtros.tribunal && d.tribunalId !== filtros.tribunal) return false
    if (filtros.magistrado && !d.magistrado.toLowerCase().includes(filtros.magistrado.toLowerCase())) return false
    if (filtros.resultado && d.resultado !== filtros.resultado) return false
    if (filtros.periodoInicio && d.dataDecisao < filtros.periodoInicio) return false
    if (filtros.periodoFim && d.dataDecisao > filtros.periodoFim) return false
    if (filtros.palavrasChave) {
      const kw = filtros.palavrasChave.toLowerCase()
      if (!d.palavrasChave.some(p => p.toLowerCase().includes(kw)) &&
          !d.ementa.toLowerCase().includes(kw) &&
          !d.resumo.toLowerCase().includes(kw)) return false
    }
    return true
  })

  function handleSearch(e) {
    e.preventDefault()
    setResultados(filtered)
  }

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Consultar Jurisprudências</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>Busque decisões por tema, tribunal, magistrado, período e palavras-chave</p>

      <form onSubmit={handleSearch} className="card p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tema</label>
            <select value={filtros.tema} onChange={e => setFiltros(f => ({ ...f, tema: e.target.value }))} className="select w-full">
              <option value="">Todos</option>
              {TEMAS.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tribunal</label>
            <select value={filtros.tribunal} onChange={e => setFiltros(f => ({ ...f, tribunal: e.target.value }))} className="select w-full">
              <option value="">Todos</option>
              {tribunais.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Resultado</label>
            <select value={filtros.resultado} onChange={e => setFiltros(f => ({ ...f, resultado: e.target.value }))} className="select w-full">
              <option value="">Todos</option>
              {RESULTADOS_DECISAO.map(r => <option key={r} value={r}>{RESULTADOS_LABELS[r]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Magistrado</label>
            <input value={filtros.magistrado} onChange={e => setFiltros(f => ({ ...f, magistrado: e.target.value }))} placeholder="Nome..." className="input w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>De</label>
            <input type="date" value={filtros.periodoInicio} onChange={e => setFiltros(f => ({ ...f, periodoInicio: e.target.value }))} className="input w-full" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Até</label>
            <input type="date" value={filtros.periodoFim} onChange={e => setFiltros(f => ({ ...f, periodoFim: e.target.value }))} className="input w-full" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Palavras-chave</label>
            <input value={filtros.palavrasChave} onChange={e => setFiltros(f => ({ ...f, palavrasChave: e.target.value }))} placeholder="Ex: horas extras, adicional de insalubridade..." className="input w-full" />
          </div>
        </div>
        <button type="submit" className="btn mt-4 bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold">
          Buscar
        </button>
      </form>

      {resultados && (
        <>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {resultados.length} {resultados.length === 1 ? 'decisão encontrada' : 'decisões encontradas'}
          </p>
          <div className="space-y-3">
            {resultados.length === 0 ? (
              <div className="card p-8 text-center">
                <p style={{ color: 'var(--text-muted)' }}>Nenhuma decisão encontrada com os filtros selecionados.</p>
              </div>
            ) : (
              resultados.slice(0, 20).map(d => (
                <div key={d.id} className="card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{d.tema}</p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{d.processoNumero}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${d.resultado === 'favoravel-empresa' ? 'bg-green-500/10 text-green-400' : d.resultado === 'favoravel-trabalhador' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {RESULTADOS_LABELS[d.resultado]}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {d.resumo}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{d.tribunal}</span>
                    <span>{d.vara}</span>
                    <span>{d.magistrado}</span>
                    <span>{d.dataDecisao}</span>
                    {d.valorCondenacao > 0 && <span>{formatCurrencyFull(d.valorCondenacao)}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
