import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LoginProvider } from './contexts/LoginContext.jsx'
import { useLogin } from './contexts/LoginContext.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import { LGPDProvider } from './contexts/LGPDContext.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CasosList from './pages/CasosList.jsx'
import CadastroCaso from './pages/CadastroCaso.jsx'
import Jurisprudencias from './pages/Jurisprudencias.jsx'
import JurisprudenciaDetalhe from './pages/JurisprudenciaDetalhe.jsx'
import ConsultaJurisprudencias from './pages/ConsultaJurisprudencias.jsx'
import ImportarCsv from './pages/ImportarCsv.jsx'
import RelatorioCaso from './pages/RelatorioCaso.jsx'
import Temas from './pages/Temas.jsx'
import TemaDetalhe from './pages/TemaDetalhe.jsx'
import Tribunais from './pages/Tribunais.jsx'
import Magistrados from './pages/Magistrados.jsx'
import Escritorios from './pages/Escritorios.jsx'
import EscritorioDetalhe from './pages/EscritorioDetalhe.jsx'
import Relatorios from './pages/Relatorios.jsx'
import Simulador from './pages/Simulador.jsx'
import Configuracoes from './pages/Configuracoes.jsx'

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
        <FavoritesProvider>
          <LGPDProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/casos" element={<CasosList />} />
                  <Route path="/casos/novo" element={<CadastroCaso />} />
                  <Route path="/jurisprudencias" element={<Jurisprudencias />} />
                  <Route path="/jurisprudencias/:id" element={<JurisprudenciaDetalhe />} />
                  <Route path="/jurisprudencias/consulta" element={<ConsultaJurisprudencias />} />
                  <Route path="/jurisprudencias/importar" element={<ImportarCsv />} />
                  <Route path="/relatorio/:id" element={<RelatorioCaso />} />
                  <Route path="/temas" element={<Temas />} />
                  <Route path="/temas/:id" element={<TemaDetalhe />} />
                  <Route path="/tribunais" element={<Tribunais />} />
                  <Route path="/magistrados" element={<Magistrados />} />
                  <Route path="/escritorios" element={<Escritorios />} />
                  <Route path="/escritorios/:id" element={<EscritorioDetalhe />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/simulador" element={<Simulador />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </HashRouter>
          </LGPDProvider>
        </FavoritesProvider>
      </LoginProvider>
    </ThemeProvider>
  )
}
