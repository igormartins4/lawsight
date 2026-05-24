import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLogin } from '../../contexts/LoginContext.jsx'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
  { to: '/casos', label: 'Casos', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  { to: '/casos/novo', label: 'Cadastrar Caso', icon: 'M12 4.5v15m7.5-7.5h-15' },
  { to: '/jurisprudencias', label: 'Jurisprudências', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { to: '/jurisprudencias/consulta', label: 'Consultar', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
  { to: '/jurisprudencias/importar', label: 'Importar CSV', icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' },
]

export default function Sidebar() {
  const { user, logout } = useLogin()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: 'var(--text-primary)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'} />
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col flex-shrink-0 transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} style={{ background: 'var(--bg-primary)', borderRight: '1px solid var(--border)' }}>
        <div className="p-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <img src="/lawsight/lawsight-logo.jpeg" alt="Lawsight" className="h-10 w-auto object-contain flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>Lawsight</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>Jurimetria Trabalhista</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-1" style={{ color: 'var(--text-muted)' }}>Principal</p>
          {navItems.slice(0, 2).map(item => (
            <NavLink key={item.to} to={item.to} end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${isActive ? 'font-medium shadow-sm' : ''}`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                background: isActive ? 'var(--accent-muted)' : 'transparent',
              })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3" style={{ color: 'var(--text-muted)' }}>Casos</p>
          {navItems.slice(2, 3).map(item => (
            <NavLink key={item.to} to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${isActive ? 'font-medium shadow-sm' : ''}`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                background: isActive ? 'var(--accent-muted)' : 'transparent',
              })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-3" style={{ color: 'var(--text-muted)' }}>Jurisprudências</p>
          {navItems.slice(3).map(item => (
            <NavLink key={item.to} to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${isActive ? 'font-medium shadow-sm' : ''}`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                background: isActive ? 'var(--accent-muted)' : 'transparent',
              })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
          {user && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-silver-100/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-silver-100">{user.nome.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user.nome}</p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{user.escritorio}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="btn btn-ghost w-full justify-center text-xs">
            {user ? 'Sair' : 'Entrar'}
          </button>
        </div>
      </aside>
    </>
  )
}
