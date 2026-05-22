import { RISCO_LABELS } from '../../data/mock.js'

const config = {
  critico: {
    bg: 'bg-red-950/70',
    text: 'text-red-400',
    border: 'border-red-800/60',
    dot: 'bg-red-500',
  },
  alto: {
    bg: 'bg-amber-950/70',
    text: 'text-amber-400',
    border: 'border-amber-800/60',
    dot: 'bg-amber-500',
  },
  medio: {
    bg: 'bg-yellow-950/70',
    text: 'text-yellow-400',
    border: 'border-yellow-800/60',
    dot: 'bg-yellow-500',
  },
  baixo: {
    bg: 'bg-green-950/70',
    text: 'text-green-400',
    border: 'border-green-800/60',
    dot: 'bg-green-500',
  },
}

export default function RiskBadge({ risco, size = 'sm' }) {
  const c = config[risco] || config.baixo
  const label = RISCO_LABELS[risco] || risco

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-semibold ${c.bg} ${c.text} ${c.border} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {label}
    </span>
  )
}
