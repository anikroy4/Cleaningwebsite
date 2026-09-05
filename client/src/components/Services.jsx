import { useState } from 'react'
import { Brush, Building2, Snowflake, ArrowRight, Check } from 'lucide-react'

const SERVICES = [
  {
    Icon: Brush,
    color: 'text-brand',
    bg: 'bg-brand-light',
    tag: 'Cleaning Services',
    title: 'Reinigung',
    body: 'Wir kümmern uns um die Arbeit, die im Alltag gern liegen bleibt. Regelmäßig oder einmalig, ganz nach dem Rhythmus Ihres Hauses.',
    features: [
      'Büro- & Gewerbereinigung',
      'Grundreinigung & Sonderreinigung',
      'Treppenhaus & Gemeinschaftsflächen',
      'Glasreinigung & Fassade',
    ],
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=720&q=85&auto=format&fit=crop',
  },
  {
    Icon: Building2,
    color: 'text-slate-700',
    bg: 'bg-slate-100',
    tag: 'Facility Services',
    title: 'Hausmeisterdienst',
    body: 'Ein vertrautes Gesicht, das nach dem Rechten sieht: kleine Reparaturen, Außenpflege und technische Kontrollen aus einer Hand.',
    features: [
      'Kleinreparaturen & Handwerk',
      'Pflege von Außenanlagen',
      'Technische Kontrollen & Wartung',
      'Schlüsseldienst & Zugangsverwaltung',
    ],
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=720&q=85&auto=format&fit=crop',
  },
  {
    Icon: Snowflake,
    color: 'text-[#3157F5]',
    bg: 'bg-[#E8ECFF]',
    tag: 'Winter Services',
    title: 'Winterdienst',
    body: 'Wenn es glatt wird, sind wir da. Wir räumen und streuen Gehwege, Zufahrten und Parkplätze, auch früh morgens und an Feiertagen.',
    features: [
      'Schneeräumung & Streuung',
      '24 / 7 Winterbereitschaft',
      'Gehwege, Parkplätze & Zufahrten',
      'Saisonale Pauschalverträge',
    ],
    img: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=720&q=85&auto=format&fit=crop',
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  return (
    <section id="services" className="section-py bg-white">
      <div className="site-wrap">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="eyebrow text-cobalt mb-3">Unsere Leistungen</p>
          <h2 className="headline text-slate-900 mb-4">
            Alles aus einer Hand.
          </h2>
          <p className="text-[1rem] leading-relaxed text-slate-500">
            Sie sagen uns, was gerade wichtig ist. Wir hören zu, denken mit und kümmern uns darum,
            dass Ihre Immobilie sich einfach gut anfühlt.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map(({ Icon, color, bg, tag, title, body, features, img }, index) => (
            <article
              key={title}
              className={`card group flex flex-col focus-within:ring-2 focus-within:ring-clay focus-within:ring-offset-2 ${activeService === index ? 'ring-2 ring-clay ring-offset-2' : ''}`}
              onMouseEnter={() => setActiveService(index)}
              onFocusCapture={() => setActiveService(index)}
            >

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={img}
                  alt={`${title} – CleanPro GmbH`}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.045] ${activeService === index ? 'saturate-100' : 'saturate-50'}`}
                />
                {/* Tag chip on image */}
                <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {tag}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${bg}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <h3 className="text-[1.0625rem] font-bold text-slate-900">{title}</h3>
                  {activeService === index && <span className="ml-auto text-[11px] font-semibold text-clay">Ausgewählt</span>}
                </div>

                <p className="text-[0.9375rem] leading-relaxed text-slate-500 mb-5">{body}</p>

                {/* Feature list */}
                <ul className="flex-1 space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <a
                  href="#contact"
                  onClick={() => window.dispatchEvent(new CustomEvent('cleanpro-service', { detail: title }))}
                  className="group/cta inline-flex items-center gap-1 rounded-md text-[13px] font-semibold text-brand transition-colors hover:text-clay focus-visible:outline-2 focus-visible:outline-clay focus-visible:outline-offset-4"
                >
                  Angebot anfragen <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
