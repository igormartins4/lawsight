import { RISCO_LABELS } from '../../data/mock.js'

const config = {
  critico: { color: 'var(--danger)', bg: 'var(--danger-bg)' },
  alto: { color: '#d9a024', bg: 'rgba(217, 160, 36, 0.1)' },
  medio: { color: '#b8943e', bg: 'rgba(184, 148, 62, 0.1)' },
  baixo: { color: 'var(--success)', bg: 'var(--success-bg)' },
}

export default function RiskBadge({ risco, size = 'sm' }) {
  const c = config[risco] || config.baixo
  const label = RISCO_LABELS[risco] || risco

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-semibold ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
      style={{ border: '1px solid', color: c.color, background: c.bg, borderColor: `${c.color}40` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
      {label}
    </span>
  )
}
