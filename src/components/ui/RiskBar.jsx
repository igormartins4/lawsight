export default function RiskBar({ procedente, parcial, improcedente, height = 8, showLabels = false }) {
  return (
    <div className="w-full">
      <div
        className="flex rounded-full overflow-hidden gap-px"
        style={{ height: `${height}px` }}
        title={`Procedente ${procedente.toFixed(1)}% · Parcial ${parcial.toFixed(1)}% · Improcedente ${improcedente.toFixed(1)}%`}
      >
        <div
          className="bg-red-500 transition-all duration-300"
          style={{ width: `${procedente}%` }}
        />
        <div
          className="bg-amber-500 transition-all duration-300"
          style={{ width: `${parcial}%` }}
        />
        <div
          className="bg-green-500 transition-all duration-300"
          style={{ width: `${improcedente}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between mt-1 text-xs text-silver-400 font-mono">
          <span className="text-red-400">{procedente.toFixed(1)}%</span>
          <span className="text-amber-400">{parcial.toFixed(1)}%</span>
          <span className="text-green-400">{improcedente.toFixed(1)}%</span>
        </div>
      )}
    </div>
  )
}
