import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

const TRANSITION_DURATION = 250

const style = document.createElement('style')
style.textContent = `
  @keyframes lawsight-fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .lawsight-enter {
    animation: lawsight-fade-in ${TRANSITION_DURATION}ms ease-out both;
  }
`
document.head.appendChild(style)

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-canvas)' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div key={location.pathname} className="lawsight-enter">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
