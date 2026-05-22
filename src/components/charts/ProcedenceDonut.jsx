import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const TOOLTIP_STYLE = {
  background: '#0f2244',
  border: '1px solid #1e3a5f',
  borderRadius: '8px',
  color: '#e8ecf3',
  fontSize: '13px',
}

export default function ProcedenceDonut({ procedente, parcial, improcedente, height = 260 }) {
  const data = [
    { name: 'Procedente',   value: procedente,   color: '#ef4444' },
    { name: 'Parcial',      value: parcial,       color: '#f59e0b' },
    { name: 'Improcedente', value: improcedente,  color: '#22c55e' },
  ]

  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="82%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value.toFixed(1)}%`]}
            contentStyle={TOOLTIP_STYLE}
            itemStyle={{ color: '#e8ecf3' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="font-mono text-3xl font-bold text-silver-100 leading-none">
          {procedente.toFixed(1)}%
        </p>
        <p className="text-silver-300 text-xs mt-1.5 font-medium tracking-wide uppercase">
          Procedente
        </p>
      </div>
    </div>
  )
}
