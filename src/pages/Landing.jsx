import { useNavigate } from 'react-router-dom'
import { useLogin } from '../contexts/LoginContext.jsx'

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useLogin()

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <header className="p-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/lawsight-logo.jpeg" alt="Lawsight" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-white">Lawsight</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={() => navigate('/dashboard')} className="btn bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold">
              Ir para o Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold">
                Entrar
              </button>
            </>
          )}
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Jurimetria trabalhista para <span className="text-silver-100">decisões jurídicas mais seguras</span>
        </h1>
        <p className="text-lg md:text-xl text-silver-300 mb-12 max-w-2xl">
          Transforme dados de jurisprudência em inteligência estratégica para acordos, defesas e recursos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
          <div className="card p-6 text-left">
            <div className="w-12 h-12 rounded-xl bg-silver-100/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-silver-100" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Análise de Decisões</h3>
            <p className="text-sm text-silver-300">Identifique padrões de julgamento por tribunal, vara e magistrado com base em decisões reais cadastradas.</p>
          </div>
          <div className="card p-6 text-left">
            <div className="w-12 h-12 rounded-xl bg-silver-100/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-silver-100" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Avaliação Estatística de Risco</h3>
            <p className="text-sm text-silver-300">Calcule percentuais de êxito, valores médios de condenação e nível de risco por caso.</p>
          </div>
          <div className="card p-6 text-left">
            <div className="w-12 h-12 rounded-xl bg-silver-100/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-silver-100" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Apoio Estratégico para Decisões</h3>
            <p className="text-sm text-silver-300">Receba recomendações estratégicas sobre acordo, defesa ou recurso baseadas em dados reais.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <button onClick={() => navigate(user ? '/casos/novo' : '/login')} className="btn flex-1 py-3 bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold text-base">
            Cadastrar Caso
          </button>
          <button onClick={() => navigate(user ? '/jurisprudencias/consulta' : '/login')} className="btn flex-1 py-3 border border-silver-200 text-silver-200 hover:bg-silver-100/10 font-semibold text-base">
            Consultar Jurisprudências
          </button>
          <button onClick={() => navigate(user ? '/dashboard' : '/login')} className="btn flex-1 py-3 border border-silver-200 text-silver-200 hover:bg-silver-100/10 font-semibold text-base">
            Ver Análises
          </button>
        </div>
      </section>

      <footer className="p-6 text-center">
        <p className="text-xs text-silver-400">
          Lawsight é uma ferramenta de apoio à decisão baseada em análise estatística e qualitativa de decisões judiciais.
          Os resultados apresentados não constituem parecer jurídico definitivo e devem ser interpretados por profissional habilitado.
        </p>
      </footer>
    </div>
  )
}
