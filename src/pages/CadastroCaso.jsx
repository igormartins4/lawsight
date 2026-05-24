import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TEMAS, OBJETIVOS_ANALISE, OBJETIVOS_LABELS, FASES_PROCESSUAIS, FASES_LABELS, tribunais, varasPorTribunal } from '../data/mock.js'

export default function CadastroCaso() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nomeCaso: '', parteRepresentada: 'empresa', temaId: TEMAS[0].id, subtema: '',
    tribunal: '', vara: '', magistrado: '', faseProcessual: 'inicial',
    resumoFatos: '', pedidos: '', valorCausa: '', provas: '', teseJuridica: '',
    objetivoAnalise: 'estimar-risco',
  })
  const [salvo, setSalvo] = useState(false)

  const tema = TEMAS.find(t => t.id === form.temaId)
  const varas = form.tribunal ? varasPorTribunal[form.tribunal] || [] : []

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSalvo(true)
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  if (salvo) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Caso cadastrado com sucesso!</h2>
          <p className="text-sm text-silver-300">Redirecionando para o dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Cadastrar Caso</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>Preencha os dados do caso trabalhista para análise</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-4 md:p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Identificação</h2>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Nome Interno do Caso</label>
            <input name="nomeCaso" value={form.nomeCaso} onChange={handleChange} required placeholder="Ex: Reclamatória João Silva" className="input w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Parte Representada</label>
              <select name="parteRepresentada" value={form.parteRepresentada} onChange={handleChange} className="select w-full">
                <option value="empresa">Empresa</option>
                <option value="trabalhador">Trabalhador</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Fase Processual</label>
              <select name="faseProcessual" value={form.faseProcessual} onChange={handleChange} className="select w-full">
                {FASES_PROCESSUAIS.map(f => (
                  <option key={f} value={f}>{FASES_LABELS[f]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card p-4 md:p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Classificação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tema Principal</label>
              <select name="temaId" value={form.temaId} onChange={handleChange} className="select w-full">
                {TEMAS.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Subtema</label>
              <select name="subtema" value={form.subtema} onChange={handleChange} className="select w-full">
                <option value="">Selecione...</option>
                {tema?.subtemas.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card p-4 md:p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Órgão Julgador</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tribunal</label>
              <select name="tribunal" value={form.tribunal} onChange={handleChange} className="select w-full">
                <option value="">Selecione...</option>
                {tribunais.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Vara/Turma</label>
              <select name="vara" value={form.vara} onChange={handleChange} className="select w-full" disabled={!varas.length}>
                <option value="">Selecione...</option>
                {varas.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Juiz/Desembargador/Relator</label>
            <input name="magistrado" value={form.magistrado} onChange={handleChange} placeholder="Se conhecido" className="input w-full" />
          </div>
        </div>

        <div className="card p-4 md:p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Dados do Processo</h2>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Resumo dos Fatos</label>
            <textarea name="resumoFatos" value={form.resumoFatos} onChange={handleChange} rows={3} className="input w-full resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Pedidos</label>
            <input name="pedidos" value={form.pedidos} onChange={handleChange} placeholder="Ex: Horas extras, adicional de insalubridade" className="input w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Valor Aproximado da Causa (R$)</label>
              <input type="number" name="valorCausa" value={form.valorCausa} onChange={handleChange} className="input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Provas Disponíveis</label>
              <input name="provas" value={form.provas} onChange={handleChange} placeholder="Ex: Contrato, holerites" className="input w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tese Jurídica Pretendida</label>
            <textarea name="teseJuridica" value={form.teseJuridica} onChange={handleChange} rows={2} className="input w-full resize-none" />
          </div>
        </div>

        <div className="card p-4 md:p-6 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Análise</h2>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Objetivo da Análise</label>
            <select name="objetivoAnalise" value={form.objetivoAnalise} onChange={handleChange} className="select w-full">
              {OBJETIVOS_ANALISE.map(o => (
                <option key={o} value={o}>{OBJETIVOS_LABELS[o]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn py-3 px-8 bg-teal-500 text-navy-950 hover:bg-teal-400 font-semibold">
            Cadastrar e Analisar
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-ghost py-3 px-8">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
