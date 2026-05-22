import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { temas, RISCO_COLORS } from '../../data/mock.js'

const TOOLTIP_STYLE = {
  background: '#0f2244',
  border: '1px solid #1e3a5f',
  borderRadius: '8px',
  color: '#e8ecf3',
  fontSize: '13px',
}

export default function TopicsBarChart({ height = 320 }) {
  const sorted = [...temas].sort((a, b) => b.procedente - a.procedente)

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#8090a8', fontSize: 11 }}
          axisLine={{ stroke: '#1e3a5f' }}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="nome"
          tick={{ fill: '#b8c4d8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={150}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          itemStyle={{ color: '#e8ecf3' }}
          formatter={(v) => [`${v.toFixed(1)}%`, 'Procedente']}
        />
        <Bar dataKey="procedente" radius={[0, 4, 4, 0]} maxBarSize={22}>
          {sorted.map((entry, index) => (
            <Cell key={index} fill={RISCO_COLORS[entry.risco]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
