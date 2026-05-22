import { useParams, useNavigate } from 'react-router-dom'
import { temas, historico, formatCurrency, formatPercent } from '../data/mock.js'
import RiskBadge from '../components/ui/RiskBadge.jsx'
import RiskBar from '../components/ui/RiskBar.jsx'
import ProcedenceDonut from '../components/charts/ProcedenceDonut.jsx'
import TrendLineChart from '../components/charts/TrendLineChart.jsx'

export default function TemaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tema = temas.find((t) => t.id === id)

  if (!tema) {
    return (
      <div className="p-8 text-center">
        <p className="text-silver-300 mb-4">Tema não encontrado.</p>
        <button
          onClick={() => navigate('/temas')}
          className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
        >
          ← Voltar para Análise por Tema
        </button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-silver-400 mb-6">
        <button
          onClick={() => navigate('/temas')}
          className="hover:text-silver-100 transition-colors"
        >
          Análise por Tema
        </button>
        <span>/</span>
        <span className="text-silver-100">{tema.nome}</span>
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-silver-100">{tema.nome}</h1>
          <p className="text-silver-300 mt-1.5 text-sm max-w-xl">{tema.descricao}</p>
        </div>
        <RiskBadge risco={tema.risco} size="md" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">
            Total de Processos
          </p>
          <p className="font-mono text-3xl font-bold text-silver-100">{tema.totalCasos}</p>
        </div>
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">
            Valor Médio de Condenação
          </p>
          <p className="font-mono text-3xl font-bold text-silver-100">
            {formatCurrency(tema.valorMedioCondena)}
          </p>
        </div>
        <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 text-center">
          <p className="text-silver-400 text-xs font-medium uppercase tracking-wider mb-2">
            Tendência Mensal
          </p>
          <p
            className={`font-mono text-3xl font-bold ${
              tema.tendencia > 0
                ? 'text-red-400'
                : tema.tendencia < 0
                ? 'text-green-400'
                : 'text-silver-400'
            }`}
          >
            {tema.tendencia > 0 ? '+' : ''}
            {tema.tendencia.toFixed(1)}pp
          </p>
        </div>
      </div>

      {/* Donut + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Verdict Ring */}
        <div className="lg:col-span-2 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">
            Anel de Veredictos
          </h2>
          <ProcedenceDonut
            procedente={tema.procedente}
            parcial={tema.parcial}
            improcedente={tema.improcedente}
          />

          {/* Verdict bar */}
          <div className="mt-5 pt-4 border-t border-navy-600">
            <RiskBar
              procedente={tema.procedente}
              parcial={tema.parcial}
              improcedente={tema.improcedente}
              height={10}
              showLabels={true}
            />
            <div className="flex justify-between mt-2.5 text-xs text-silver-400">
              <span>Procedente</span>
              <span>Parcial</span>
              <span>Improcedente</span>
            </div>
          </div>
        </div>

        {/* Trend line */}
        <div className="lg:col-span-3 bg-navy-800 rounded-xl p-6 border border-navy-600">
          <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">
            Evolução Histórica do Portfólio — 12 meses
          </h2>
          <TrendLineChart data={historico} />
        </div>
      </div>

      {/* Quick facts */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-600">
        <h2 className="text-xs font-semibold text-silver-300 uppercase tracking-wider mb-4">
          Resumo Jurídico
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Procedente',
              value: formatPercent(tema.procedente),
              sub: 'do total de casos',
              color: 'text-red-400',
            },
            {
              label: 'Parcial',
              value: formatPercent(tema.parcial),
              sub: 'procedência parcial',
              color: 'text-amber-400',
            },
            {
              label: 'Improcedente',
              value: formatPercent(tema.improcedente),
              sub: 'casos favoráveis',
              color: 'text-green-400',
            },
            {
              label: 'Exposição Estimada',
              value: formatCurrency(tema.totalCasos * tema.valorMedioCondena * tema.procedente / 100),
              sub: 'com base na taxa atual',
              color: 'text-silver-100',
            },
          ].map(({ label, value, sub, color }) => (
            <div key={label}>
              <p className="text-silver-400 text-xs mb-1">{label}</p>
              <p className={`font-mono text-xl font-bold ${color}`}>{value}</p>
              <p className="text-silver-400 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
