import { useLGPD } from '../../contexts/LGPDContext.jsx'

export default function PrivacyModal() {
  const { showModal, setShowModal, aceitarTodos } = useLGPD()
  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowModal(false)}>
      <div
        className="max-w-lg w-full rounded-2xl p-6 overflow-y-auto max-h-[80vh]"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Política de Privacidade</h2>
          <button onClick={() => setShowModal(false)} className="btn-icon">&times;</button>
        </div>

        <div className="space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <section>
            <h3 className="font-medium text-base mb-1" style={{ color: 'var(--text-primary)' }}>1. Dados Coletados</h3>
            <p>A Lawsight coleta apenas dados de navegação e preferências de uso armazenados localmente no seu navegador (localStorage). Não coletamos dados pessoais, informações de login, ou rastreamos sua atividade fora da plataforma.</p>
          </section>

          <section>
            <h3 className="font-medium text-base mb-1" style={{ color: 'var(--text-primary)' }}>2. Finalidade do Armazenamento</h3>
            <p>Os dados armazenados localmente servem para:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Preservar suas preferências de tema (claro/escuro)</li>
              <li>Salvar seus favoritos e itens monitorados</li>
              <li>Manter registros de consentimento de cookies</li>
              <li>Armazenar preferências de filtros e configurações</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium text-base mb-1" style={{ color: 'var(--text-primary)' }}>3. Compartilhamento de Dados</h3>
            <p>Não compartilhamos dados com terceiros. Todo o armazenamento é local no seu navegador. Não há servidores coletando informações dos usuários nesta versão MVP.</p>
          </section>

          <section>
            <h3 className="font-medium text-base mb-1" style={{ color: 'var(--text-primary)' }}>4. Seus Direitos (LGPD)</h3>
            <p>Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Acessar seus dados armazenados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Ser informado sobre o uso dos dados</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium text-base mb-1" style={{ color: 'var(--text-primary)' }}>5. Exclusão de Dados</h3>
            <p>Você pode solicitar a exclusão de todos os dados armazenados localmente a qualquer momento através da página de Configurações ou clicando no botão abaixo. Esta ação remove todos os registros de localStorage do navegador.</p>
          </section>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={() => setShowModal(false)} className="btn btn-ghost text-sm">Fechar</button>
          <button onClick={() => { aceitarTodos(); setShowModal(false) }} className="btn btn-primary text-sm">Aceitar todos</button>
        </div>
      </div>
    </div>
  )
}
