import { Sparkles, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const SOCIAL = [
  { Icon: FacebookIcon,  label: 'Facebook',  href: 'https://facebook.com'  },
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { Icon: LinkedinIcon,  label: 'LinkedIn',  href: 'https://linkedin.com'  },
]

const NAV_LINKS = [
  { label: 'Leistungen', href: '#services' },
  { label: 'Über uns',   href: '#about'    },
  { label: 'Kundenstimmen', href: '#reviews' },
  { label: 'Galerie',    href: '#gallery'   },
  { label: 'Kontakt',    href: '#contact'  },
  { label: 'Impressum',  href: '#'         },
  { label: 'Datenschutz',href: '#'         },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-slate-400">

      {/* ── CTA Banner ── */}
      <div className="border-b border-slate-800">
        <div className="site-wrap py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-semibold text-[1.0625rem] mb-1">
              Bereit für mehr Sauberkeit?
            </p>
            <p className="text-slate-400 text-[0.875rem]">
              Schreiben Sie uns — wir antworten innerhalb von 24 Stunden.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/4901234567890?text=Hallo%2C%20ich%20m%C3%B6chte%20ein%20Angebot%20anfragen."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-[14px] py-2.5 px-4"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="mailto:info@cleanpro-gmbh.de"
              className="btn btn-ghost text-[14px] py-2.5 px-4 border-slate-700 text-slate-300 hover:border-green hover:bg-brand"
            >
              <Mail className="h-4 w-4" />
              E-Mail
            </a>
          </div>
        </div>
      </div>

      {/* ── Main columns ── */}
      <div className="site-wrap py-12 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10">

        {/* Brand */}
        <div>
          <a href="#" className="inline-flex items-center gap-2.5 mb-5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-green">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-bold text-white text-[15px]">CleanPro GmbH</span>
          </a>
          <p className="text-[0.875rem] leading-relaxed text-slate-500 mb-6 max-w-xs">
            Ihr zuverlässiger Partner für Reinigung, Hausmeisterdienst und Winterdienst — professionell und zu Festpreisen.
          </p>
          {/* Social */}
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-700 text-slate-500 hover:border-slate-500 hover:text-white hover:shadow-sm transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="eyebrow text-slate-500 mb-5">Navigation</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-[0.875rem] text-slate-400 hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="eyebrow text-slate-500 mb-5">Kontakt</h3>
          <ul className="space-y-3 text-[0.875rem]">
            <li className="leading-relaxed text-slate-500">
              Musterstraße 12<br />10115 Berlin
            </li>
            <li>
              <a href="tel:+4901234567890" className="text-slate-400 hover:text-white transition-colors">
                +49 (0) 123 456 7890
              </a>
            </li>
            <li>
              <a href="mailto:info@cleanpro-gmbh.de" className="text-slate-400 hover:text-white transition-colors">
                info@cleanpro-gmbh.de
              </a>
            </li>
            <li className="text-slate-500">Mo – Fr: 07:00 – 18:00 Uhr</li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800">
        <div className="site-wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-slate-600">
          <p>© {year} CleanPro GmbH. Alle Rechte vorbehalten.</p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
          >
            Nach oben <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}
