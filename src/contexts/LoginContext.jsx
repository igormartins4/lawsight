import { createContext, useContext, useState, useEffect } from 'react'
import { usuarios } from '../data/mock.js'

const LoginContext = createContext()

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('labora_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
    setLoading(false)
  }, [])

  function login(email, senha) {
    const found = usuarios.find(u => u.email === email && u.senha === senha)
    if (!found) return false
    const { senha: _, ...safe } = found
    setUser(safe)
    localStorage.setItem('labora_user', JSON.stringify(safe))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('labora_user')
  }

  return (
    <LoginContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)
