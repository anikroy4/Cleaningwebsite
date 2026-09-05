import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const PILLS = [
  'Kostenlose Erstberatung',
  'Festpreisgarantie',
  'Schnelle Reaktionszeit',
]

export default function Hero() {
  const [note, setNote] = useState(0)
  const notes = [
    'Ein sauberes Umfeld macht den Kopf frei.',
    'Ihr Alltag ist voll genug. Den Rest übernehmen wir.',
    'Gute Arbeit beginnt mit einem guten Gefühl.',
  ]

  useEffect(() => {
    const timer = window.setInterval(() => setNote((current) => (current + 1) % notes.length), 4200)
    return () => window.clearInterval(timer)
  }, [notes.length])

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F6F1E8]"
      aria-label="Einleitung"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #C9C3B8 1px, transparent 0)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
        }}
        aria-hidden="true"
      />

      {/* Blue glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-200 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgb(201 120 92 / 0.16) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="site-wrap relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C8D8C5] bg-[#E7F0E9] px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9785C] animate-pulse" />
            <span className="eyebrow text-[#28645A]">Professioneller Reinigungsservice</span>
          </div>

          {/* Headline */}
          <h1 className="display text-slate-900 mb-6">
            Sauberkeit, auf die Sie{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#28645A]">vertrauen können.</span>
              <svg
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 5.5 C75 1.5, 150 7.5, 299 3.5"
                  stroke="#D49A82"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Sub */}
          <p className="mx-auto max-w-xl text-[1.0625rem] leading-relaxed text-slate-500 mb-4">
            CleanPro GmbH steht für professionelle Gebäudereinigung, Hausmeisterdienste und
            Winterdienst — zuverlässig, flexibel und mit einem offenen Ohr für das, was Sie brauchen.
          </p>
          <p className="mx-auto mb-10 min-h-6 max-w-xl text-sm font-medium text-[#C9785C] transition-opacity duration-500" aria-live="polite">
            {notes[note]}
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a href="#contact" className="btn btn-primary w-full sm:w-auto">
              Angebot anfragen <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="btn btn-ghost w-full sm:w-auto">
              Unsere Leistungen
            </a>
          </div>

          {/* Trust pills */}
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {PILLS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-[13px] font-medium text-slate-600 shadow-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, #fff)' }}
        aria-hidden="true"
      />
    </section>
  )
}
