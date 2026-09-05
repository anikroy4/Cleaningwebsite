import { ShieldCheck, Star, Clock, Users } from 'lucide-react'

const VALUES = [
  { Icon: ShieldCheck, title: 'Zuverlässigkeit',    body: 'Pünktlich, konsequent — wir halten, was wir versprechen.' },
  { Icon: Star,        title: 'Qualität',           body: 'Modernste Technik und regelmäßige Qualitätskontrollen.' },
  { Icon: Clock,       title: 'Flexibilität',       body: 'Anpassung an Ihren Zeitplan, auch kurzfristig.' },
  { Icon: Users,       title: 'Erfahrenes Team',    body: 'Über 10 Jahre Expertise und echtes Engagement.' },
]

const STATS = [
  { value: '10+',  label: 'Jahre Erfahrung'      },
  { value: '500+', label: 'Zufriedene Kunden'    },
  { value: '100%', label: 'Festpreisgarantie'    },
]

export default function AboutUs() {
  return (
    <section id="about" className="section-py bg-brand-light">
      <div className="site-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left column: copy ── */}
          <div>
            <p className="eyebrow text-brand mb-4">Über uns</p>
            <h2 className="headline text-slate-900 mb-6">
              Wir sind zuverlässig,<br />professionell und leidenschaftlich.
            </h2>

            <p className="text-[1rem] leading-relaxed text-slate-500 mb-4">
              Wir sind zuverlässig und professionell. CleanPro GmbH steht seit über einem Jahrzehnt
              für exzellente Gebäudereinigung und Facility-Management in der Region. Unser
              eingespieltes Team sorgt dafür, dass Ihre Räumlichkeiten stets in bestem Zustand sind.
            </p>
            <p className="text-[1rem] leading-relaxed text-slate-500 mb-10">
              Wir setzen auf umweltfreundliche Reinigungsmittel, modernste Geräte und echte
              Verlässlichkeit — diskret, effizient und mit persönlichem Ansprechpartner.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
              {STATS.map(({ value, label }) => (
                <div key={label} className="bg-[#F6F1E8] px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand tracking-tight">{value}</p>
                  <p className="mt-1 text-[11px] font-medium text-[#748078] leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: value cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[#C8D98F] bg-surface p-6 hover:border-clay hover:shadow-[0_4px_20px_rgb(21_59_55/0.12)] transition-all duration-200"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-sage transition-colors group-hover:bg-clay-soft">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="text-[0.9375rem] font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-[0.875rem] leading-relaxed text-slate-500">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
