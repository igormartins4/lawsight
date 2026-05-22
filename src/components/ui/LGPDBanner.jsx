import { useState } from 'react'
import { useLGPD } from '../../contexts/LGPDContext.jsx'
import PrivacyModal from './PrivacyModal.jsx'

export default function LGPDBanner() {
  const { showBanner, setShowModal, aceitarTodos, recusarTodos } = useLGPD()
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, funcional: true, personalizacao: true })
  const { salvarPreferencias } = useLGPD()

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Privacidade e Cookies</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                Utilizamos cookies e armazenamento local para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
                <button onClick={() => setShowModal(true)} className="underline" style={{ color: 'var(--accent)' }}>Política de Privacidade</button>.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={recusarTodos} className="btn btn-ghost text-xs">Recusar todos</button>
              {showPrefs ? (
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                  {Object.entries({ analytics: 'Analytics', funcional: 'Funcional', personalizacao: 'Personalização' }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                      <input type="checkbox" checked={prefs[key]} onChange={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))} className="rounded" />
                      {label}
                    </label>
                  ))}
                  <button onClick={() => salvarPreferencias(prefs)} className="btn btn-primary text-xs">Salvar</button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowPrefs(true)} className="btn btn-ghost text-xs">Personalizar</button>
                  <button onClick={aceitarTodos} className="btn btn-primary text-xs">Aceitar todos</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PrivacyModal />
    </>
  )
}
