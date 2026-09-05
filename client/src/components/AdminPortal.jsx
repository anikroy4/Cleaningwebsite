import { useState } from 'react'
import AdminDashboard from './AdminDashboard'
import AdminLogin from './AdminLogin'

const TOKEN_KEY = 'cleanpro-admin-token'

export default function AdminPortal() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY))

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  if (!token) return <AdminLogin onAuthenticated={setToken} />
  return <AdminDashboard token={token} onLogout={logout} />
}
