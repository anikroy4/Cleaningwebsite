import { useState, useEffect } from 'react'
import { Sparkles, Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Leistungen', href: '#services' },
  { label: 'Über uns',   href: '#about'    },
  { label: 'Referenzen', href: '#reviews'   },
  { label: 'Kontakt',    href: '#contact'  },
]

export default function Header() {
  const [open,      setOpen]      = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_#E2E8F0]'
          : 'bg-white'}
      `}
    >
      <div className="site-wrap flex h-17 items-center justify-between">

        {/* ── Logo ── */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-clay rounded-lg"
          onClick={close}
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-sm">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="leading-none">
            <span className="block text-[15px] font-bold tracking-tight text-slate-900">
              CleanPro GmbH
            </span>
            <span className="block text-[10px] font-medium text-slate-400 mt-0.5">
              Reinigung & Facility Services
            </span>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Hauptnavigation">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-slate-600 hover:text-brand hover:bg-green-bg hover:shadow-sm transition-all"
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary ml-3 py-2 px-4 text-[14px]">
            Angebot anfragen
          </a>
        </nav>

        {/* ── Mobile toggle ── */}
        <button
          className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-green-bg hover:shadow-sm transition-all"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          border-t border-slate-100
          ${open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className="site-wrap py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
          {NAV.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="py-2.5 px-3 rounded-lg text-[15px] font-medium text-slate-700 hover:bg-brand-light hover:text-brand hover:shadow-sm transition-all"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={close}
            className="btn btn-primary mt-2 w-full"
          >
            Angebot anfragen
          </a>
        </nav>
      </div>
    </header>
  )
}
