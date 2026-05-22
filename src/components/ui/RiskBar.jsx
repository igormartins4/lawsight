export default function RiskBar({ procedente, parcial, improcedente, height = 8, showLabels = false }) {
  return (
    <div className="w-full">
      <div
        className="flex rounded-full overflow-hidden gap-px"
        style={{ height: `${height}px` }}
        title={`Procedente ${procedente.toFixed(1)}% · Parcial ${parcial.toFixed(1)}% · Improcedente ${improcedente.toFixed(1)}%`}
      >
        <div className="transition-all duration-300" style={{ width: `${procedente}%`, background: 'var(--danger)' }} />
        <div className="transition-all duration-300" style={{ width: `${parcial}%`, background: 'var(--warning)' }} />
        <div className="transition-all duration-300" style={{ width: `${improcedente}%`, background: 'var(--success)' }} />
      </div>
      {showLabels && (
        <div className="flex justify-between mt-1 text-xs font-mono">
          <span style={{ color: 'var(--danger)' }}>{procedente.toFixed(1)}%</span>
          <span style={{ color: 'var(--warning)' }}>{parcial.toFixed(1)}%</span>
          <span style={{ color: 'var(--success)' }}>{improcedente.toFixed(1)}%</span>
        </div>
      )}
    </div>
  )
}
