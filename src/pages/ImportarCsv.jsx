import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ImportarCsv() {
  const navigate = useNavigate()
  const [simulando, setSimulando] = useState(false)
  const [concluido, setConcluido] = useState(false)

  function handleSimular() {
    setSimulando(true)
    setTimeout(() => {
      setSimulando(false)
      setConcluido(true)
    }, 2000)
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Importar CSV</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>Importe decisões em lote (simulação MVP)</p>

      <div className="card p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-silver-100/10 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-silver-100" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <div>
          <p className="text-white font-medium mb-1">Importação de Decisões</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Formato: CSV com colunas (tribunal, vara, magistrado, processo, data, tema, resultado, valor)</p>
        </div>

        {!concluido ? (
          <button onClick={handleSimular} disabled={simulando} className="btn py-3 px-8 bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold disabled:opacity-50">
            {simulando ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Importando...
              </span>
            ) : 'Simular Importação'}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-green-400 font-medium">Importação concluída com sucesso!</p>
              <p className="text-sm text-green-300/70 mt-1">47 novas decisões adicionadas à base.</p>
            </div>
            <button onClick={() => navigate('/jurisprudencias')} className="btn btn-ghost">
              Ver Jurisprudências
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
