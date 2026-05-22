export default function DataTable({ columns, data, onRowClick, emptyMessage = 'Nenhum dado encontrado.' }) {
  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center text-silver-400 text-sm">{emptyMessage}</div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-navy-600 bg-navy-900/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-3 px-5 text-xs font-semibold text-silver-300 uppercase tracking-wider whitespace-nowrap ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-navy-700/60 transition-colors ${
                onRowClick ? 'cursor-pointer hover:bg-navy-700/40' : 'hover:bg-navy-800/30'
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-3.5 px-5 text-sm ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
