import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext.jsx'
import { useFavorites } from '../contexts/FavoritesContext.jsx'
import { useLGPD } from '../contexts/LGPDContext.jsx'
import PrivacyModal from '../components/ui/PrivacyModal.jsx'

export default function Configuracoes() {
  const { theme, toggle } = useTheme()
  const { favoritos, count } = useFavorites()
  const { deleted, solicitarExclusao, preferences, setShowModal } = useLGPD()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmFavorites, setConfirmFavorites] = useState(false)
  const [copied, setCopied] = useState(false)

  function exportData() {
    const data = {
      exportadoEm: new Date().toISOString(),
      favoritos,
      tema: theme,
      lgpd: preferences,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'lawsight-dados.json'; a.click()
    URL.revokeObjectURL(url)
  }

  function clearFavorites() {
    try { localStorage.setItem('lawsight-favoritos', JSON.stringify({ temas: [], tribunais: [], escritorios: [], relatorios: [] })) } catch {}
    window.location.reload()
  }

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Configurações</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>Preferências da plataforma e gestão de dados</p>
      </div>

      <div className="space-y-4">
        {/* Aparência */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>Aparência</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Alternar entre modo claro e escuro</p>
            </div>
            <button onClick={toggle} className="btn btn-ghost text-sm gap-2">
              {theme === 'dark' ? (
                <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg> Modo Claro</>
              ) : (
                <><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg> Modo Escuro</>
              )}
            </button>
          </div>
        </div>

        {/* Favoritos */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>Favoritos</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{count} itens salvos</p>
            </div>
            {count > 0 && !confirmFavorites ? (
              <button onClick={() => setConfirmFavorites(true)} className="btn btn-ghost text-sm text-red-400">Limpar todos</button>
            ) : confirmFavorites ? (
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tem certeza?</span>
                <button onClick={() => { clearFavorites(); setConfirmFavorites(false) }} className="btn text-xs" style={{ background: 'var(--danger)', color: 'white' }}>Sim, limpar</button>
                <button onClick={() => setConfirmFavorites(false)} className="btn btn-ghost text-xs">Cancelar</button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Exportar dados */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>Exportar dados</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Baixe seus dados armazenados (LGPD Art. 9)</p>
            </div>
            <button onClick={exportData} className="btn btn-primary text-sm">Exportar JSON</button>
          </div>
        </div>

        {/* Privacidade LGPD */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>Privacidade e LGPD</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Gerencie seu consentimento e dados pessoais</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowModal(true)} className="btn btn-ghost text-sm">Ver política</button>
              {!confirmDelete ? (
                <button onClick={() => setConfirmDelete(true)} className="btn btn-ghost text-sm text-red-400">Excluir dados</button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Excluir tudo?</span>
                  <button onClick={() => { solicitarExclusao(); setConfirmDelete(false) }} className="btn text-xs" style={{ background: 'var(--danger)', color: 'white' }}>Sim, excluir</button>
                  <button onClick={() => setConfirmDelete(false)} className="btn btn-ghost text-xs">Cancelar</button>
                </div>
              )}
            </div>
          </div>
          {deleted && (
            <div className="mt-4 p-3 rounded-lg text-sm font-medium" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
              Dados excluídos com sucesso. O armazenamento local foi limpo.
            </div>
          )}
        </div>

        {/* Sobre */}
        <div className="card p-6">
          <h2 className="text-base font-medium" style={{ color: 'var(--text-primary)' }}>Sobre o Lawsight</h2>
          <div className="mt-3 space-y-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <p>Versão: <span className="font-mono">v0.3.0</span></p>
            <p>Jurimetria Trabalhista — MVP para validação</p>
            <p>Dados simulados para fins de demonstração</p>
            <p className="mt-2">Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018)</p>
          </div>
        </div>
      </div>

      <PrivacyModal />
    </div>
  )
}
