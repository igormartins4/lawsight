import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../contexts/LoginContext.jsx'

export default function Login() {
  const { login } = useLogin()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    if (!email || !senha) {
      setErro('Preencha e-mail e senha.')
      return
    }
    if (login(email, senha)) {
      navigate('/dashboard')
    } else {
      setErro('E-mail ou senha inválidos. Tente: admin@laboradata.com.br / admin')
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-teal-500 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-navy-950" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Labora Data</h1>
          <p className="text-silver-300 text-sm mt-1">Acesse sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-4">
          {erro && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-silver-200 mb-1.5">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="input w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-silver-200 mb-1.5">Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" className="input w-full" />
          </div>

          <button type="submit" className="btn w-full py-3 bg-teal-500 text-navy-950 hover:bg-teal-400 font-semibold text-base">
            Entrar
          </button>

          <div className="pt-2 text-center">
            <p className="text-xs text-silver-400">
              Demo: <strong className="text-silver-200">admin@laboradata.com.br</strong> / <strong className="text-silver-200">admin</strong>
            </p>
          </div>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => navigate('/')} className="text-sm text-teal-400 hover:text-teal-300">
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  )
}
