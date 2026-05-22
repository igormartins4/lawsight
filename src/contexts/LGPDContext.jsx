import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LGPDContext = createContext()

const CONSENT_KEY = 'lawsight-lgpd-consent'
const PREFERENCES_KEY = 'lawsight-lgpd-preferences'

export function LGPDProvider({ children }) {
  const [consentido, setConsentido] = useState(() => {
    try { return localStorage.getItem(CONSENT_KEY) === 'true' } catch { return false }
  })

  const [preferences, setPreferences] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PREFERENCES_KEY)) || { analytics: true, funcional: true, personalizacao: true } }
    catch { return { analytics: true, funcional: true, personalizacao: true } }
  })

  const [showBanner, setShowBanner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    if (!consentido) {
      const timer = setTimeout(() => setShowBanner(true), 500)
      return () => clearTimeout(timer)
    }
  }, [consentido])

  const aceitarTodos = useCallback(() => {
    setConsentido(true)
    setPreferences({ analytics: true, funcional: true, personalizacao: true })
    try { localStorage.setItem(CONSENT_KEY, 'true'); localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ analytics: true, funcional: true, personalizacao: true })) } catch {}
    setShowBanner(false)
  }, [])

  const recusarTodos = useCallback(() => {
    setConsentido(true)
    setPreferences({ analytics: false, funcional: true, personalizacao: false })
    try { localStorage.setItem(CONSENT_KEY, 'true'); localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ analytics: false, funcional: true, personalizacao: false })) } catch {}
    setShowBanner(false)
  }, [])

  const salvarPreferencias = useCallback((prefs) => {
    setConsentido(true)
    setPreferences(prefs)
    try { localStorage.setItem(CONSENT_KEY, 'true'); localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs)) } catch {}
    setShowBanner(false)
    setShowModal(false)
  }, [])

  const solicitarExclusao = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_KEY)
      localStorage.removeItem(PREFERENCES_KEY)
      localStorage.removeItem('lawsight-theme')
      localStorage.removeItem('lawsight-favoritos')
    } catch {}
    setConsentido(false)
    setPreferences({ analytics: false, funcional: false, personalizacao: false })
    setDeleted(true)
    setTimeout(() => setDeleted(false), 3000)
  }, [])

  return (
    <LGPDContext.Provider value={{ consentido, preferences, showBanner, showModal, deleted, setShowModal, aceitarTodos, recusarTodos, salvarPreferencias, solicitarExclusao }}>
      {children}
    </LGPDContext.Provider>
  )
}

export function useLGPD() {
  const ctx = useContext(LGPDContext)
  if (!ctx) throw new Error('useLGPD deve estar dentro de LGPDProvider')
  return ctx
}
