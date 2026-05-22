export default function KpiCard({ label, value, trend, trendUnit = 'pp', trendInverted = false }) {
  const isPos = trend > 0
  const isNeg = trend < 0
  const hasTrend = trend !== null && trend !== undefined

  let trendColor = 'var(--text-muted)'
  if (hasTrend) {
    if (isPos) trendColor = trendInverted ? 'var(--danger)' : 'var(--success)'
    else if (isNeg) trendColor = trendInverted ? 'var(--success)' : 'var(--danger)'
  }

  return (
    <div className="card p-4 pl-5" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
        background: 'var(--accent)', borderRadius: '2px', opacity: 0.5,
      }} />
      <p className="text-xs font-medium mb-1.5 leading-tight" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
      <p className="font-mono text-xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>{value}</p>
      {hasTrend && (
        <div className="flex items-center gap-1 mt-2 text-[11px]" style={{ color: trendColor }}>
          <span className="text-sm leading-none">{isPos ? '↑' : isNeg ? '↓' : '→'}</span>
          <span className="font-mono font-medium">
            {Math.abs(trend).toFixed(1)}{trendUnit}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>vs. mês ant.</span>
        </div>
      )}
    </div>
  )
}
