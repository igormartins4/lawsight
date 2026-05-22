import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { escritorios, formatCurrency, formatPercent, RISCO_LABELS, RISCO_BG, RISCO_TEXT } from '../data/mock.js'
import FilterBar from '../components/ui/FilterBar.jsx'

export default function Escritorios() {
  const navigate = useNavigate()
  const [filtros, setFiltros] = useState({ busca: '', risco: '' })

  const filtrados = escritorios.filter((esc) => {
    if (filtros.busca && !esc.nome.toLowerCase().includes(filtros.busca.toLowerCase())) return false
    if (filtros.risco && esc.risco !== filtros.risco) return false
    return true
  }).sort((a, b) => b.casos - a.casos)

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-silver-100">Análise por Escritório</h1>
        <p className="text-silver-300 mt-1 text-sm">
          {escritorios.length} escritórios monitorados · Desempenho em causas trabalhistas
        </p>
      </div>

      <FilterBar
        riscos={['critico','alto','medio','baixo']}
        onChange={setFiltros}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total de Causas', value: escritorios.reduce((s, e) => s + e.casos, 0).toLocaleString('pt-BR') },
          { label: 'Valor Total Perdido', value: formatCurrency(escritorios.reduce((s, e) => s + e.valorPerdido, 0)) },
          { label: 'Valor Total Recuperado', value: formatCurrency(escritorios.reduce((s, e) => s + e.valorRecuperado, 0)) },
          { label: 'Taxa de Sucesso Média', value: formatPercent(escritorios.reduce((s, e) => s + e.taxaSucesso, 0) / escritorios.length) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-navy-800 rounded-xl p-5 border border-navy-600">
            <p className="text-silver-300 text-xs mb-2">{label}</p>
            <p className="font-mono text-lg font-bold text-silver-100">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-600 bg-navy-900/50">
                {[
                  { label: 'Escritório' },
                  { label: 'Especialidade' },
                  { label: 'Causas', align: 'right' },
                  { label: 'Sucesso', align: 'right' },
                  { label: 'Recuperado', align: 'right' },
                  { label: 'Perdido', align: 'right' },
                  { label: 'Tendência', align: 'right' },
                  { label: 'Risco' },
                ].map(({ label, align }) => (
                  <th key={label} className={`py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider whitespace-nowrap ${align === 'right' ? 'text-right' : 'text-left'}`}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((esc) => (
                <tr
                  key={esc.id}
                  onClick={() => navigate(`/escritorios/${esc.id}`)}
                  className="border-b border-navy-700/60 hover:bg-navy-700/35 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-5">
                    <p className="font-medium text-silver-100 text-sm">{esc.nome}</p>
                    <p className="text-silver-400 text-xs mt-0.5">Atualizado em {esc.ultimaAtualizacao}</p>
                  </td>
                  <td className="py-4 px-5 text-silver-300 text-sm">{esc.especialidade}</td>
                  <td className="py-4 px-5 text-right font-mono text-sm text-silver-100">{esc.casos}</td>
                  <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-green-400">{formatPercent(esc.taxaSucesso)}</td>
                  <td className="py-4 px-5 text-right font-mono text-sm text-green-400">{formatCurrency(esc.valorRecuperado)}</td>
                  <td className="py-4 px-5 text-right font-mono text-sm text-red-400">{formatCurrency(esc.valorPerdido)}</td>
                  <td className={`py-4 px-5 text-right font-mono text-sm font-semibold ${esc.tendencia > 0 ? 'text-red-400' : esc.tendencia < 0 ? 'text-green-400' : 'text-silver-400'}`}>
                    {esc.tendencia > 0 ? '+' : ''}{esc.tendencia.toFixed(1)}pp
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border ${RISCO_BG[esc.risco]} ${RISCO_TEXT[esc.risco]} border-current`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${RISCO_BG[esc.risco].replace('/10', '-500').replace('bg-', 'bg-')}`} />
                      {RISCO_LABELS[esc.risco]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
