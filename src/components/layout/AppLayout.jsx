import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import { useLogin } from '../../contexts/LoginContext.jsx'

const TRANSITION_DURATION = 250

const style = document.createElement('style')
style.textContent = `
  @keyframes labora-fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .labora-enter {
    animation: labora-fade-in ${TRANSITION_DURATION}ms ease-out both;
  }
`
document.head.appendChild(style)

export default function AppLayout() {
  const location = useLocation()
  const { user } = useLogin()

  if (!user) return null

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-canvas)' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div key={location.pathname} className="labora-enter min-h-full flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <footer className="p-4 border-t text-center" style={{ borderColor: 'var(--border)', background: 'var(--bg-primary)' }}>
            <p className="text-[10px] leading-relaxed px-4" style={{ color: 'var(--text-muted)' }}>
              A Labora Data é uma ferramenta de apoio à decisão baseada em análise estatística e qualitativa de decisões judiciais.
              Os resultados apresentados não constituem parecer jurídico definitivo, não garantem resultado processual e devem ser interpretados por profissional habilitado.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
