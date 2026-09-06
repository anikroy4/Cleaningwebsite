import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Activity, ArrowLeft, BarChart3, CalendarDays, Check, CheckCircle2, ChevronRight, ClipboardList, Clock3, Loader2, LogOut, Mail, MessageCircle, RefreshCw, Search, Settings, Sparkles, UserPlus, Users, X } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const SERVICES = ['All services', 'Cleaning', 'Facility services', 'Winter maintenance', 'Other']
const SERVICE_ALIASES = {
  Reinigung: 'Cleaning',
  Hausmeisterdienst: 'Facility services',
  Winterdienst: 'Winter maintenance',
  Sonstiges: 'Other',
}

const displayService = (service) => SERVICE_ALIASES[service] || service || 'Other'

const formatDate = (value) => new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(value))

export default function AdminDashboard({ token, onLogout }) {
  const [admin, setAdmin] = useState(null)
  const [team, setTeam] = useState([])
  const [teamEmail, setTeamEmail] = useState('')
  const [teamPassword, setTeamPassword] = useState('')
  const [teamRole, setTeamRole] = useState('admin')
  const [teamMessage, setTeamMessage] = useState('')
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const [settingsView, setSettingsView] = useState(null)
  const [settings, setSettings] = useState(() => {
    try {
      return { companyName: 'CleanPro GmbH', notificationEmail: '', timezone: 'Europe/Berlin', autoRefresh: true, compactRows: false, emailAlerts: true, ...(JSON.parse(localStorage.getItem('cleanpro-dashboard-settings')) || {}) }
    } catch {
      return { companyName: 'CleanPro GmbH', notificationEmail: '', timezone: 'Europe/Berlin', autoRefresh: true, compactRows: false, emailAlerts: true }
    }
  })
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [service, setService] = useState(SERVICES[0])
  const [selectedContact, setSelectedContact] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const updateSettings = (key, value) => {
    setSettings((current) => {
      const next = { ...current, [key]: value }
      localStorage.setItem('cleanpro-dashboard-settings', JSON.stringify(next))
      return next
    })
  }

  const loadAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      setAdmin(response.data.admin)
      const usersResponse = await axios.get(`${API_URL}/auth/users`, { headers: { Authorization: `Bearer ${token}` } })
      setTeam(usersResponse.data.data || [])
    } catch (requestError) {
      if (requestError.response?.status === 401) onLogout()
    }
  }, [token, onLogout])

  useEffect(() => { loadAdmin() }, [loadAdmin])

  const loadContacts = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true)
    if (silent) setRefreshing(true)
    setError('')
    try {
      const response = await axios.get(`${API_URL}/contact`, { headers: { Authorization: `Bearer ${token}` } })
      setContacts(response.data.data || [])
      setLastUpdated(new Date())
    } catch (requestError) {
      if (requestError.response?.status === 401) onLogout()
      setError('Requests could not be loaded. Please check the server connection.')
    } finally {
      if (!silent) setLoading(false)
      if (silent) setRefreshing(false)
    }
  }, [token, onLogout])

  useEffect(() => {
    const initialLoad = window.setTimeout(() => loadContacts(), 0)
    const interval = settings.autoRefresh ? window.setInterval(() => loadContacts({ silent: true }), 30000) : null
    return () => {
      window.clearTimeout(initialLoad)
      if (interval) window.clearInterval(interval)
    }
  }, [loadContacts, settings.autoRefresh])

  const updateRole = async (event) => {
    event.preventDefault()
    setTeamMessage('')
    try {
      const response = await axios.post(`${API_URL}/auth/users`, { email: teamEmail, password: teamPassword, role: teamRole }, { headers: { Authorization: `Bearer ${token}` } })
      setTeamEmail('')
      setTeamPassword('')
      setTeamMessage(`Access granted as ${teamRole}. Temporary password: ${response.data.temporaryPassword}`)
      const usersResponse = await axios.get(`${API_URL}/auth/users`, { headers: { Authorization: `Bearer ${token}` } })
      setTeam(usersResponse.data.data || [])
    } catch (requestError) {
      setTeamMessage(requestError.response?.data?.error || 'Could not save the role.')
    }
  }

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return contacts.filter((contact) => {
      const matchesService = service === SERVICES[0] || displayService(contact.service) === service
      const matchesSearch = !query || [contact.name, contact.email, contact.message].some((value) => value?.toLowerCase().includes(query))
      return matchesService && matchesSearch
    })
  }, [contacts, search, service])

  const serviceCounts = contacts.reduce((counts, contact) => {
    const serviceName = displayService(contact.service)
    counts[serviceName] = (counts[serviceName] || 0) + 1
    return counts
  }, {})

  const latestContact = contacts[0]
  const topServices = Object.entries(serviceCounts).sort(([, a], [, b]) => b - a)
  const maxServiceCount = topServices[0]?.[1] || 1

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_1px_0_#E2E8F0]">
        <div className="mx-auto flex min-h-18 w-full max-w-330 flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-3" aria-label="Zur Website">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight">CleanPro GmbH</span>
              <span className="block text-[11px] font-medium text-slate-400">Admin area</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Live sync · {admin?.role === 'superadmin' ? 'Super admin' : 'Admin'}</span>
            <div className="flex items-center gap-2"><button type="button" onClick={onLogout} className="btn btn-ghost px-3 py-2 text-sm"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Log out</span></button><a href="/" className="btn btn-ghost px-3 py-2 text-sm" aria-label="Back to website"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Back to website</span></a></div>
          </div>
          <nav aria-label="Dashboard menu" className="basis-full flex flex-wrap gap-2 border-t border-slate-100 py-3">
            <a href="#dashboard-overview" className="btn btn-ghost px-3 py-2 text-sm">Overview</a>
            <div className="relative">
              <button type="button" onClick={() => setSettingsMenuOpen((open) => !open)} className={`btn btn-ghost px-3 py-2 text-sm ${settingsMenuOpen ? 'bg-green-bg text-brand' : ''}`} aria-expanded={settingsMenuOpen} aria-haspopup="menu"><Settings className="h-4 w-4" /> Settings</button>
              {settingsMenuOpen && <div className="absolute left-0 top-full z-20 mt-2 min-w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_30px_rgb(15_23_42/0.12)]" role="menu">
                <button type="button" onClick={() => { setSettingsView('workspace'); setSettingsMenuOpen(false) }} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-green-bg hover:text-brand" role="menuitem">Workspace settings</button>
                <button type="button" onClick={() => { setSettingsView('admin'); setSettingsMenuOpen(false) }} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-green-bg hover:text-brand" role="menuitem">Admin access</button>
              </div>}
            </div>
          </nav>
        </div>
      </header>

      <main id="dashboard-overview" className="mx-auto w-full max-w-330 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-brand-dark px-6 py-8 text-white shadow-[0_18px_40px_rgb(9_40_36/0.2)] sm:px-9 sm:py-10">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-3 text-brand-light">Control room · {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` : 'syncing'}</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Requests at a glance.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#D0E0D8]">Your request pipeline, live from the CleanPro system. Open an entry for all details and direct contact.</p>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-12 hidden h-64 w-64 rounded-full border-28 border-brand-light/15 sm:block" />
          <div className="pointer-events-none absolute -bottom-24 right-28 hidden h-52 w-52 rounded-full border border-brand-light/20 sm:block" />
          <button type="button" onClick={() => loadContacts({ silent: true })} disabled={loading || refreshing} className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-light px-4 py-2.5 text-sm font-bold text-brand-dark transition hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:absolute sm:bottom-9 sm:right-9 sm:mt-0">
            {refreshing || loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Metrics">
          <MetricCard icon={ClipboardList} label="Total requests" value={contacts.length} tone="teal" />
          <MetricCard icon={CalendarDays} label="This month" value={contacts.filter((contact) => new Date(contact.createdAt).getMonth() === new Date().getMonth() && new Date(contact.createdAt).getFullYear() === new Date().getFullYear()).length} tone="blue" />
          <MetricCard icon={Users} label="Top service" value={Object.entries(serviceCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'None yet'} tone="clay" compact />
          <MetricCard icon={CheckCircle2} label="Latest request" value={latestContact ? formatDate(latestContact.createdAt).split(',')[0] : 'None yet'} tone="green" compact />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15_23_42/0.03)] sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Demand</p><h2 className="mt-1 text-lg font-bold text-slate-900">Services compared</h2></div><Activity className="h-5 w-5 text-brand" /></div>
            <div className="space-y-4">
              {SERVICES.slice(1).map((serviceName) => {
                const count = serviceCounts[serviceName] || 0
                return <div key={serviceName}><div className="mb-1.5 flex justify-between text-sm"><span className="font-medium text-slate-600">{serviceName}</span><span className="font-bold text-slate-900">{count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${Math.max((count / maxServiceCount) * 100, count ? 8 : 0)}%` }} /></div></div>
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-[#C8D98F] bg-green-bg p-5 sm:p-6"><div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm"><Clock3 className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-wider text-green">Next step</p><h2 className="mt-1 text-lg font-bold text-brand-dark">Respond quickly</h2><p className="mt-2 text-sm leading-6 text-[#55705A]">Select a request and reply directly by email. Every new request appears automatically in the dashboard.</p>{lastUpdated && <p className="mt-5 text-xs font-medium text-green">Last updated {lastUpdated.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>}</div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(15_23_42/0.04)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Incoming requests</h2>
              <p className="mt-1 text-sm text-slate-500">Showing {filteredContacts.length} of {contacts.length} entries</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block">
                <span className="sr-only">Search requests</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="field min-w-0 py-2.5 pl-9 pr-3 text-sm sm:w-64" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email" />
              </label>
              <label>
                <span className="sr-only">Filter by service</span>
                <select className="field cursor-pointer py-2.5 text-sm" value={service} onChange={(event) => setService(event.target.value)}>
                  {SERVICES.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </div>
          </div>

          {error && <div className="m-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          {loading && contacts.length === 0 ? (
            <div className="flex min-h-56 items-center justify-center text-sm text-slate-500"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading requests</div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-5 text-center"><BarChart3 className="mb-3 h-8 w-8 text-slate-300" /><p className="font-semibold text-slate-700">No requests found</p><p className="mt-1 text-sm text-slate-500">Adjust your search or filter.</p></div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full min-w-190 text-left text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr><th className="px-6 py-3 font-semibold">Contact</th><th className="px-6 py-3 font-semibold">Service</th><th className="px-6 py-3 font-semibold">Message</th><th className="px-6 py-3 font-semibold">Received</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id} onClick={() => setSelectedContact(contact)} onKeyDown={(event) => event.key === 'Enter' && setSelectedContact(contact)} tabIndex="0" role="button" className="cursor-pointer align-top transition-all hover:bg-[#F2F8F0] hover:shadow-[0_2px_12px_rgb(21_59_55/0.08)] focus:bg-[#F2F8F0] focus:outline-none">
                      <td className="px-6 py-4"><p className="font-semibold text-slate-800">{contact.name}</p><a className="mt-1 inline-flex items-center gap-1 text-xs text-brand hover:underline" href={`mailto:${contact.email}`}><Mail className="h-3 w-3" />{contact.email}</a>{contact.phone && <p className="mt-1 text-xs text-slate-400">{contact.phone}</p>}</td>
                      <td className="px-6 py-4"><span className="inline-flex rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand">{displayService(contact.service)}</span></td>
                      <td className="max-w-90 px-6 py-4 leading-6 text-slate-600">{contact.message}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500">{formatDate(contact.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selectedContact && <ContactDetail contact={selectedContact} onClose={() => setSelectedContact(null)} />}

        {settingsView && <div id="dashboard-settings" className="mt-8 space-y-8">
          {settingsView === 'workspace' && <WorkspaceSettings settings={settings} updateSettings={updateSettings} />}
          {settingsView === 'admin' && <AdminAccess admin={admin} team={team} teamEmail={teamEmail} setTeamEmail={setTeamEmail} teamPassword={teamPassword} setTeamPassword={setTeamPassword} teamRole={teamRole} setTeamRole={setTeamRole} teamMessage={teamMessage} updateRole={updateRole} />}
        </div>}
      </main>
    </div>
  )
}

function SettingToggle({ label, detail, checked, onChange }) {
  return <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand"><span><span className="block text-sm font-semibold text-slate-800">{label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{detail}</span></span><button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-slate-300'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />{checked && <Check className="absolute left-1.5 top-1.5 h-3 w-3 text-white" />}</button></label>
}

function WorkspaceSettings({ settings, updateSettings }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15_23_42/0.04)] sm:p-6">
    <div className="mb-6 flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-brand"><Settings className="h-5 w-5" /></div><div><p className="eyebrow text-cobalt">Workspace settings</p><h2 className="text-xl font-bold text-slate-900">Dashboard preferences</h2></div></div>
    <div className="mb-6 grid gap-4 border-b border-slate-100 pb-6 md:grid-cols-3">
      <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-600">Company name</span><input className="field" value={settings.companyName} onChange={(event) => updateSettings('companyName', event.target.value)} /></label>
      <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-600">Notification email</span><input className="field" type="email" value={settings.notificationEmail} onChange={(event) => updateSettings('notificationEmail', event.target.value)} placeholder="alerts@example.com" /></label>
      <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-600">Timezone</span><select className="field cursor-pointer" value={settings.timezone} onChange={(event) => updateSettings('timezone', event.target.value)}><option value="Europe/Berlin">Europe/Berlin</option><option value="America/New_York">America/New York</option><option value="Asia/Dhaka">Asia/Dhaka</option><option value="UTC">UTC</option></select></label>
    </div>
    <div className="grid gap-3 md:grid-cols-3">
      <SettingToggle label="Auto-refresh requests" detail="Refresh the request list every 30 seconds." checked={settings.autoRefresh} onChange={(value) => updateSettings('autoRefresh', value)} />
      <SettingToggle label="Compact request rows" detail="Use a tighter table layout for busy inboxes." checked={settings.compactRows} onChange={(value) => updateSettings('compactRows', value)} />
      <SettingToggle label="Email alerts" detail="Keep email notification preference enabled." checked={settings.emailAlerts} onChange={(value) => updateSettings('emailAlerts', value)} />
    </div>
  </section>
}

function AdminAccess({ admin, team, teamEmail, setTeamEmail, teamPassword, setTeamPassword, teamRole, setTeamRole, teamMessage, updateRole }) {
  return <section id="dashboard-team" className="rounded-2xl border border-[#C8D98F] bg-green-bg p-5 shadow-[0_8px_30px_rgb(15_23_42/0.04)] sm:p-6">
    <div className="mb-6 flex items-start gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand shadow-sm"><UserPlus className="h-5 w-5" /></div><div><p className="eyebrow text-brand">{admin?.role === 'superadmin' ? 'Super admin' : 'Admin access'}</p><h2 className="text-xl font-bold text-brand-dark">Grant email access</h2><p className="mt-1 text-sm text-[#55705A]">Give any valid email address an admin role. Super admins can also grant the super admin role.</p></div></div>
    <form onSubmit={updateRole} className="grid gap-3 md:grid-cols-[1fr_1fr_180px_auto]">
      <input className="field bg-white" type="email" value={teamEmail} onChange={(event) => setTeamEmail(event.target.value)} placeholder="team.member@example.com" required />
      <input className="field bg-white" type="password" minLength="8" value={teamPassword} onChange={(event) => setTeamPassword(event.target.value)} placeholder="Temporary password (optional)" />
      <select className="field cursor-pointer bg-white" value={teamRole} onChange={(event) => setTeamRole(event.target.value)}><option value="admin">Admin</option>{admin?.role === 'superadmin' && <option value="superadmin">Super admin</option>}</select>
      <button className="btn btn-primary" type="submit"><UserPlus className="h-4 w-4" /> Add member</button>
    </form>
    {teamMessage && <p className="mt-3 text-sm font-medium text-brand">{teamMessage}</p>}
    <div className="mt-6 overflow-x-auto rounded-xl border border-[#C8D98F] bg-white"><table className="w-full min-w-140 text-left text-sm"><thead className="bg-[#F4F8DE] text-xs uppercase tracking-wider text-[#68845B]"><tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Added</th></tr></thead><tbody className="divide-y divide-slate-100">{team.map((user) => <tr key={user.email}><td className="px-4 py-3 font-medium text-slate-700">{user.email}</td><td className="px-4 py-3"><span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand">{user.role}</span></td><td className="px-4 py-3 text-xs text-slate-500">{formatDate(user.createdAt)}</td></tr>)}</tbody></table></div>
  </section>
}

function ContactDetail({ contact, onClose }) {
  return <aside className="mt-6 overflow-hidden rounded-2xl border border-[#C9DED0] bg-[#F8FCF7] shadow-[0_12px_35px_rgb(40_100_90/0.08)]" aria-label="Request details">
    <div className="flex items-start justify-between gap-4 border-b border-[#DCEBDD] px-5 py-5 sm:px-7"><div><p className="eyebrow mb-2 text-brand">Request opened</p><h2 className="text-xl font-bold text-slate-900">{contact.name}</h2><p className="mt-1 text-sm text-slate-500">{formatDate(contact.createdAt)}</p></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition-all hover:bg-white hover:text-slate-700 hover:shadow-sm" aria-label="Close details"><X className="h-5 w-5" /></button></div>
    <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-3"><a href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-brand transition-all hover:border-brand hover:shadow-sm"><Mail className="h-4 w-4" />{contact.email}</a>{contact.phone && <a href={`tel:${contact.phone}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-brand hover:shadow-sm"><MessageCircle className="h-4 w-4 text-brand" />{contact.phone}</a>}<div className="flex items-center justify-between rounded-xl bg-brand-light px-4 py-3"><span className="text-sm text-[#55705A]">Requested service</span><span className="text-sm font-bold text-brand">{contact.service || 'Other'}</span></div></div><div className="rounded-xl border border-[#DCEBDD] bg-white p-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Message</p><p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{contact.message}</p><a href={`mailto:${contact.email}?subject=Your%20CleanPro%20request`} className="btn btn-primary mt-5 w-fit px-4 py-2.5 text-sm">Reply <ChevronRight className="h-4 w-4" /></a></div></div>
  </aside>
}

function MetricCard({ icon: Icon, label, value, tone, compact = false }) {
  const tones = {
    teal: 'bg-[#E8F5B8] text-brand',
    blue: 'bg-blue-50 text-blue-600',
    clay: 'bg-[#FFE1D7] text-[#D84E35]',
    green: 'bg-green-50 text-green-600',
  }

  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15_23_42/0.03)]"><div className={`mb-5 grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-5 w-5" /></div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p><p className={`mt-1 truncate font-bold text-slate-900 ${compact ? 'text-lg' : 'text-3xl'}`}>{value}</p></article>
}
