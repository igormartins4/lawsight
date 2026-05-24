import { useState } from 'react'
import { decisoes, tribunais, TEMAS, RESULTADOS_DECISAO, RESULTADOS_LABELS, varasPorTribunal, magistrados, formatCurrencyFull } from '../data/mock.js'

export default function Jurisprudencias() {
  const [lista, setLista] = useState([...decisoes])
  const [editando, setEditando] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function handleDelete(id) {
    setLista(l => l.filter(d => d.id !== id))
  }

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Jurisprudências</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Cadastro de decisões judiciais</p>
        </div>
        <button onClick={() => { setEditando(null); setShowForm(!showForm) }} className="btn" style={{ background: 'var(--accent)', color: 'var(--bg-primary)', fontWeight: 600 }}>
          {showForm ? 'Cancelar' : '+ Nova Decisão'}
        </button>
      </div>

      {showForm && (
        <FormularioDecisao
          editando={editando}
          onSave={(d) => {
            if (editando) {
              setLista(l => l.map(item => item.id === d.id ? d : item))
            } else {
              setLista(l => [{ ...d, id: `dec-${Date.now()}` }, ...l])
            }
            setShowForm(false)
            setEditando(null)
          }}
          onCancel={() => { setShowForm(false); setEditando(null) }}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {lista.slice(0, 20).map(d => (
          <div key={d.id} className="card p-4 transition-all duration-150 hover:border-opacity-100" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-xs font-mono truncate" style={{ color: 'var(--text-primary)' }}>{d.processoNumero}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{d.tema} · {d.tribunal}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${d.resultado === 'favoravel-empresa' ? 'bg-green-500/10 text-green-400' : d.resultado === 'favoravel-trabalhador' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                {RESULTADOS_LABELS[d.resultado]}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
              <span>{d.vara}</span>
              <span>{d.magistrado}</span>
              {d.valorCondenacao > 0 && <span>{formatCurrencyFull(d.valorCondenacao)}</span>}
            </div>
            <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>
              {d.resumo}
            </p>
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.dataDecisao}</span>
              <div className="flex gap-1">
                <button onClick={(e) => { e.stopPropagation(); setEditando(d); setShowForm(true) }} className="btn-icon" title="Editar">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(d.id) }} className="btn-icon" title="Excluir">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FormularioDecisao({ editando, onSave, onCancel }) {
  const [form, setForm] = useState(editando || {
    tribunal: '', vara: '', magistrado: '', processoNumero: '', dataDecisao: '',
    temaId: TEMAS[0].id, subtema: '', ementa: '', resumo: '', resultado: 'inconclusiva',
    valorCondenacao: 0, fundamentos: '', palavrasChave: '', link: '',
  })
  const tema = TEMAS.find(t => t.id === form.temaId)
  const varas = form.tribunal ? (varasPorTribunal[form.tribunal] || []) : []

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...form,
      tribunal: tribunais.find(t => t.id === form.tribunal)?.nome || form.tribunal,
      tribunalId: form.tribunal,
      tema: TEMAS.find(t => t.id === form.temaId)?.nome,
      temaId: form.temaId,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 md:p-6 mb-6 space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
        {editando ? 'Editar Decisão' : 'Nova Decisão'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tribunal</label>
          <select name="tribunal" value={form.tribunal} onChange={handleChange} required className="select w-full">
            <option value="">Selecione...</option>
            {tribunais.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Vara/Turma</label>
          <select name="vara" value={form.vara} onChange={handleChange} className="select w-full" disabled={!varas.length}>
            <option value="">Selecione...</option>
            {varas.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Magistrado</label>
          <input name="magistrado" value={form.magistrado} onChange={handleChange} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Nº Processo</label>
          <input name="processoNumero" value={form.processoNumero} onChange={handleChange} required className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Data Decisão</label>
          <input type="date" name="dataDecisao" value={form.dataDecisao} onChange={handleChange} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tema</label>
          <select name="temaId" value={form.temaId} onChange={handleChange} className="select w-full">
            {TEMAS.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Subtema</label>
          <select name="subtema" value={form.subtema} onChange={handleChange} className="select w-full">
            <option value="">Selecione...</option>
            {tema?.subtemas.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Resultado</label>
          <select name="resultado" value={form.resultado} onChange={handleChange} className="select w-full">
            {RESULTADOS_DECISAO.map(r => <option key={r} value={r}>{RESULTADOS_LABELS[r]}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Valor Condenação (R$)</label>
          <input type="number" name="valorCondenacao" value={form.valorCondenacao} onChange={handleChange} className="input w-full" />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Ementa</label>
          <textarea name="ementa" value={form.ementa} onChange={handleChange} rows={2} className="input w-full resize-none" />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Resumo</label>
          <textarea name="resumo" value={form.resumo} onChange={handleChange} rows={2} className="input w-full resize-none" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Fundamentos Jurídicos</label>
          <input name="fundamentos" value={form.fundamentos} onChange={handleChange} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Palavras-chave</label>
          <input name="palavrasChave" value={form.palavrasChave} onChange={handleChange} className="input w-full" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Link da Decisão</label>
          <input name="link" value={form.link} onChange={handleChange} className="input w-full" />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="btn bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold">
          {editando ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-ghost">Cancelar</button>
      </div>
    </form>
  )
}