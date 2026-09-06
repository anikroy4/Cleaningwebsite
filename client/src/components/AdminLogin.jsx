import { useState } from 'react'
import axios from 'axios'
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Sparkles } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export default function AdminLogin({ onAuthenticated }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${API_URL}/auth/login`, form)
      sessionStorage.setItem('cleanpro-admin-token', response.data.token)
      onAuthenticated(response.data.token)
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-surface px-5 py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-light/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-clay-soft/60 blur-3xl" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgb(21_59_55/0.12)] sm:p-9">
        <div className="mb-9 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand"><Sparkles className="h-5 w-5 text-white" /></span>
          <div><p className="text-sm font-bold tracking-tight text-slate-900">CleanPro GmbH</p><p className="text-xs text-slate-400">Protected admin area</p></div>
        </div>
        <div className="mb-7"><p className="eyebrow mb-3 text-cobalt">Secure access</p><h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back.</h1><p className="mt-2 text-sm leading-6 text-slate-500">Sign in to manage incoming requests.</p></div>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-600">Username or email</span><input className="field" name="username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} autoComplete="username" required /></label>
          <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-600">Password</span><span className="relative block"><input className="field pr-11" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-green-bg hover:text-brand" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
          {error && <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />} {loading ? 'Checking…' : 'Sign in as admin'}<ArrowRight className="ml-auto h-4 w-4" /></button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">Your session expires automatically after 8 hours.</p>
      </section>
    </main>
  )
}
