import { useEffect, useState } from 'react'
import axios from 'axios'
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MessageCircle } from 'lucide-react'

const SERVICE_OPTIONS = ['Cleaning', 'Facility services', 'Winter maintenance', 'Other']
const API_URL = import.meta.env.VITE_API_URL || '/api'

const CONTACT_CARDS = [
  {
    Icon: Phone,
    bg: 'bg-[#F1F3FF]',
    border: 'border-slate-200',
    label: 'Telefon',
    value: '+49 (0) 123 456 7890',
    href: 'tel:+4901234567890',
    color: 'text-slate-900',
  },
  {
    Icon: Mail,
    bg: 'bg-[#F1F3FF]',
    border: 'border-slate-200',
    label: 'E-Mail',
    value: 'info@cleanpro-gmbh.de',
    href: 'mailto:info@cleanpro-gmbh.de',
    color: 'text-[#3157F5]',
  },
  {
    Icon: MessageCircle,
    bg: 'bg-green-50',
    border: 'border-green-100',
    label: 'WhatsApp',
    value: 'Message us directly ->',
    href: 'https://wa.me/4901234567890?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote.',
    color: 'text-green-600',
    external: true,
  },
]

export default function ContactForm() {
  const [form,   setForm]   = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    const selectService = (event) => {
      setForm((current) => ({ ...current, service: event.detail }))
    }
    window.addEventListener('cleanpro-service', selectService)
    return () => window.removeEventListener('cleanpro-service', selectService)
  }, [])

  const handle = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setFieldErrors((errors) => ({ ...errors, [name]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Please enter your name.'
    else if (form.name.trim().length < 2) errors.name = 'Your name must contain at least 2 characters.'
    if (!form.email.trim()) errors.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
    if (form.phone.trim() && !/^[+\d][\d\s()\-/.]{5,29}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number.'
    if (!form.message.trim()) errors.message = 'Please briefly describe your request.'
    else if (form.message.trim().length < 10) errors.message = 'Your message must contain at least 10 characters.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      setStatus('error')
      setErrMsg('Please check the highlighted fields.')
      return
    }
    setStatus('loading')
    setErrMsg('')
    try {
      await axios.post(`${API_URL}/contact`, form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      setFieldErrors({})
    } catch (err) {
      setStatus('error')
      setErrMsg(err.response?.data?.error || 'Something went wrong. Please try again.')
      setFieldErrors(err.response?.data?.fields || {})
    }
  }

  return (
    <section id="contact" className="section-py bg-white">
      <div className="site-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: Info ── */}
          <div>
            <p className="eyebrow text-cobalt mb-4">Contact</p>
            <h2 className="headline text-slate-900 mb-5">
              Request a free<br />quote.
            </h2>
            <p className="text-[1rem] leading-relaxed text-slate-500 mb-8">
              Tell us briefly how we can help. We will get back to you within{' '}
              <strong className="text-slate-700 font-semibold">24 hours</strong> with a
              no-obligation quote.
            </p>

            {/* Contact info cards */}
            <div className="space-y-3">
              {CONTACT_CARDS.map(({ Icon, bg, border, label, value, href, color, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`flex items-center gap-4 rounded-2xl border ${border} ${bg} px-5 py-4 hover:shadow-sm transition-shadow group`}
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                    <p className={`text-[0.9375rem] font-medium ${color} group-hover:underline`}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8">

            {status === 'success' ? (
              /* Success state */
              <div className="flex flex-col items-center py-12 text-center">
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-green-50 border border-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request received!</h3>
                <p className="text-slate-500 text-[0.9375rem] mb-6">
                  We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="btn btn-ghost text-[14px] py-2"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={submit} noValidate className="space-y-4">
                <h3 className="text-[1rem] font-bold text-slate-900 mb-1">Request form</h3>
                <p className="text-[13px] text-slate-400 mb-5">Required fields are marked with *.</p>

                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                      <span className="text-[12px] font-semibold text-slate-600">Name *</span>
                    <input
                      className={`field ${fieldErrors.name ? 'field-error' : ''}`}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Full name"
                      required
                      autoComplete="name"
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldErrors.name && <span id="name-error" className="field-message">{fieldErrors.name}</span>}
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-[12px] font-semibold text-slate-600">E-Mail *</span>
                    <input
                      className={`field ${fieldErrors.email ? 'field-error' : ''}`}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldErrors.email && <span id="email-error" className="field-message">{fieldErrors.email}</span>}
                  </label>
                </div>

                {/* Row: Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="text-[12px] font-semibold text-slate-600">Phone</span>
                    <input
                      className={`field ${fieldErrors.phone ? 'field-error' : ''}`}
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      placeholder="+49 (0) ..."
                      autoComplete="tel"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                    />
                    {fieldErrors.phone && <span id="phone-error" className="field-message">{fieldErrors.phone}</span>}
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-[12px] font-semibold text-slate-600">Service</span>
                    <select
                      className="field cursor-pointer"
                      name="service"
                      value={form.service}
                      onChange={handle}
                    >
                      <option value="">Please select</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Textarea */}
                <label className="block space-y-1.5">
                  <span className="text-[12px] font-semibold text-slate-600">Message *</span>
                  <textarea
                    className={`field resize-none h-32 ${fieldErrors.message ? 'field-error' : ''}`}
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="How can we make things easier for you?"
                    required
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                  />
                  {fieldErrors.message && <span id="message-error" className="field-message">{fieldErrors.message}</span>}
                </label>

                {/* Error */}
                {status === 'error' && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {errMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {status === 'loading'
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    : <><Send className="h-4 w-4" /> Request a quote</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-[0_12px_35px_rgb(21_59_55/0.08)]">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <div>
              <p className="eyebrow text-cobalt">Our location</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">Musterstraße 12 · 10115 Berlin</p>
            </div>
            <span className="text-xs font-medium text-slate-400">CleanPro GmbH</span>
          </div>
          <div className="aspect-video w-full sm:aspect-16/6">
            <iframe
              title="CleanPro GmbH location map"
              src="https://www.google.com/maps?q=Musterstra%C3%9Fe%2012%2C%2010115%20Berlin&z=14&output=embed"
              className="h-full w-full border-0 grayscale-15"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
