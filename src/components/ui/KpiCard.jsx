export default function KpiCard({ label, value, trend, trendUnit = 'pp', trendInverted = false }) {
  const isPos = trend > 0
  const isNeg = trend < 0
  const hasTrend = trend !== null && trend !== undefined

  // trendInverted=true: positive is bad (red), negative is good (green) — used for risk metrics
  let trendColorClass = 'text-silver-300'
  if (hasTrend) {
    if (isPos) trendColorClass = trendInverted ? 'text-red-400' : 'text-green-400'
    else if (isNeg) trendColorClass = trendInverted ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="bg-navy-800 rounded-xl p-5 border border-navy-600 hover:border-navy-500 transition-colors">
      <p className="text-silver-300 text-sm font-medium mb-3 leading-tight">{label}</p>
      <p className="font-mono text-3xl font-bold text-silver-100 leading-none">{value}</p>
      {hasTrend && (
        <div className={`flex items-center gap-1 mt-2.5 text-xs ${trendColorClass}`}>
          <span className="text-base leading-none">{isPos ? '↑' : isNeg ? '↓' : '→'}</span>
          <span className="font-mono font-medium">
            {Math.abs(trend).toFixed(1)}{trendUnit}
          </span>
          <span className="text-silver-400">vs. mês anterior</span>
        </div>
      )}
    </div>
  )
}
