import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LoginProvider } from './contexts/LoginContext.jsx'
import { useLogin } from './contexts/LoginContext.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CasosList from './pages/CasosList.jsx'
import CadastroCaso from './pages/CadastroCaso.jsx'
import Jurisprudencias from './pages/Jurisprudencias.jsx'
import ConsultaJurisprudencias from './pages/ConsultaJurisprudencias.jsx'
import ImportarCsv from './pages/ImportarCsv.jsx'
import RelatorioCaso from './pages/RelatorioCaso.jsx'

function ProtectedRoutes() {
  const { user, loading } = useLogin()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <AppLayout />
}

function PublicRoute({ children }) {
  const { user, loading } = useLogin()
  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <LoginProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/casos" element={<CasosList />} />
              <Route path="/casos/novo" element={<CadastroCaso />} />
              <Route path="/jurisprudencias" element={<Jurisprudencias />} />
              <Route path="/jurisprudencias/consulta" element={<ConsultaJurisprudencias />} />
              <Route path="/jurisprudencias/importar" element={<ImportarCsv />} />
              <Route path="/relatorio/:id" element={<RelatorioCaso />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </LoginProvider>
    </ThemeProvider>
  )
}
