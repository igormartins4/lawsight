import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Temas from './pages/Temas.jsx'
import TemaDetalhe from './pages/TemaDetalhe.jsx'
import Escritorios from './pages/Escritorios.jsx'
import EscritorioDetalhe from './pages/EscritorioDetalhe.jsx'
import Magistrados from './pages/Magistrados.jsx'
import Tribunais from './pages/Tribunais.jsx'
import Relatorios from './pages/Relatorios.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="temas" element={<Temas />} />
          <Route path="temas/:id" element={<TemaDetalhe />} />
          <Route path="escritorios" element={<Escritorios />} />
          <Route path="escritorios/:id" element={<EscritorioDetalhe />} />
          <Route path="magistrados" element={<Magistrados />} />
          <Route path="tribunais" element={<Tribunais />} />
          <Route path="relatorios" element={<Relatorios />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
