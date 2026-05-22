import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const TOOLTIP_STYLE = {
  background: '#0f2244',
  border: '1px solid #1e3a5f',
  borderRadius: '8px',
  color: '#e8ecf3',
  fontSize: '13px',
}

export default function TrendLineChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
        <XAxis
          dataKey="mes"
          tick={{ fill: '#8090a8', fontSize: 11 }}
          axisLine={{ stroke: '#1e3a5f' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#8090a8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          domain={[28, 72]}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          itemStyle={{ color: '#e8ecf3' }}
          formatter={(v, name) => [`${v.toFixed(1)}%`, name]}
        />
        <Legend
          wrapperStyle={{ paddingTop: '12px', color: '#b8c4d8', fontSize: '12px' }}
        />
        <Line
          type="monotone"
          dataKey="procedente"
          name="Procedente"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="parcial"
          name="Parcial"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="improcedente"
          name="Improcedente"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
