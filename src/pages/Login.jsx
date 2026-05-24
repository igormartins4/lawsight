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
      setErro('E-mail ou senha inválidos. Tente: admin@lawsight.com.br / admin')
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/lawsight/lawsight-logo.jpeg" alt="Lawsight" className="h-20 w-auto object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Lawsight</h1>
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

          <button type="submit" className="btn w-full py-3 bg-silver-100 text-navy-950 hover:bg-silver-200 font-semibold text-base">
            Entrar
          </button>

          <div className="pt-2 text-center">
            <p className="text-xs text-silver-400">
              Demo: <strong className="text-silver-200">admin@lawsight.com.br</strong> / <strong className="text-silver-200">admin</strong>
            </p>
          </div>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => navigate('/')} className="text-sm text-silver-200 hover:text-silver-100">
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  )
}
