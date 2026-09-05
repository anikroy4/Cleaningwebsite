import {
  BadgeCheck,
  Clock3,
  Droplets,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";

const REVIEWS = [
  {
    quote:
      "Seit CleanPro unsere Büros betreut, fühlt sich jeder Montag leichter an.",
    name: "Julia M.",
    role: "Büroleitung, Würzburg",
  },
  {
    quote:
      "Schnelle Antworten, saubere Arbeit und ein Team, das wirklich mitdenkt.",
    name: "Martin K.",
    role: "Hausverwaltung, Berlin",
  },
  {
    quote:
      "Auch beim ersten Schnee war alles pünktlich geräumt. Genau so muss Service sein.",
    name: "Svenja R.",
    role: "Eigentümerin, Potsdam",
  },
];

const STANDARDS = [
  {
    Icon: BadgeCheck,
    label: "Qualitätsstandard",
    detail: "Dokumentierte Abläufe",
  },
  {
    Icon: ShieldCheck,
    label: "Sicherheitsfokus",
    detail: "Geschulte Fachkräfte",
  },
  { Icon: Leaf, label: "Bewusst handeln", detail: "Umweltfreundliche Mittel" },
  { Icon: ThumbsUp, label: "Klarer Service", detail: "Fester Ansprechpartner" },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85&auto=format&fit=crop",
    alt: "Professionelle Reinigung eines hellen Raumes",
    label: "Saubere Räume",
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900&q=85&auto=format&fit=crop",
    alt: "Reinigungskraft bei der Arbeit",
    label: "Sorgfalt im Detail",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop",
    alt: "Gepflegte Außenanlage eines Gebäudes",
    label: "Alles im Blick",
  },
  {
    src: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=900&q=85&auto=format&fit=crop",
    alt: "Verschneite Wege im Winter",
    label: "Bereit bei jedem Wetter",
  },
];

const GUARANTEES = [
  {
    Icon: Clock3,
    title: "Antwort in 24 Stunden",
    body: "Sie erhalten schnell eine klare Rückmeldung und ein unverbindliches Angebot.",
  },
  {
    Icon: Sparkles,
    title: "Sauber dokumentiert",
    body: "Leistungen und Intervalle bleiben transparent und nachvollziehbar.",
  },
  {
    Icon: ShieldCheck,
    title: "Planbare Kosten",
    body: "Faire Festpreise ohne Überraschungen bei der Monatsabrechnung.",
  },
  {
    Icon: Droplets,
    title: "Nachhaltig gedacht",
    body: "Wir wählen effiziente Abläufe und umweltbewusste Reinigungsmittel.",
  },
];

export default function TrustSections() {
  return (
    <>
      <Reviews />
      <Accreditations />
      <Gallery />
      <Guarantees />
    </>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section-py bg-[#FBFAF5]">
      <div className="site-wrap">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3 text-cobalt">Kundenstimmen</p>
            <h2 className="headline text-slate-900">
              Gute Arbeit spricht
              <br className="hidden sm:block" /> sich herum.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#C8D98F] bg-brand-light px-4 py-3">
            <div className="flex gap-0.5 text-[#F59E0B]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-brand">4,9 / 5</span>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {REVIEWS.map(({ quote, name, role }) => (
            <article
              key={name}
              className="card flex min-h-52 flex-col justify-between p-6"
            >
              <div>
                <div className="mb-5 flex gap-0.5 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-[1.02rem] font-semibold leading-7 text-slate-800">
                  “{quote}”
                </blockquote>
              </div>
              <footer className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-sm font-bold text-brand">{name}</p>
                  <p className="text-xs text-slate-400">{role}</p>
                </div>
                <Sparkles className="h-4 w-4 text-green" />
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Accreditations() {
  return (
    <section
      id="accreditations"
      className="border-y border-[#C8D98F] bg-brand-light py-12"
    >
      <div className="site-wrap">
        <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-2 text-brand">
              Akkreditierungen & Standards
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
              Vertrauen braucht Nachweise.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#55705A]">
            Unsere Abläufe sind auf Qualität, Sicherheit und verlässliche
            Zusammenarbeit ausgerichtet. Nachweise erhalten Sie gerne auf
            Anfrage.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#C8D98F] bg-[#C8D98F] md:grid-cols-4">
          {STANDARDS.map(({ Icon, label, detail }) => (
            <div
              key={label}
              className="bg-[#F4F8DE] p-5 transition-colors hover:bg-white"
            >
              <Icon className="mb-5 h-6 w-6 text-brand" />
              <p className="text-sm font-bold text-brand-dark">{label}</p>
              <p className="mt-1 text-xs text-[#68845B]">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="section-py bg-white">
      <div className="site-wrap">
        <div className="mb-10 max-w-xl">
          <p className="eyebrow mb-3 text-cobalt">Einblicke</p>
          <h2 className="headline text-slate-900">
            Ordnung, die man
            <br /> sehen kann.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Ein kleiner Eindruck von den Räumen, Wegen und Details, um die wir
            uns kümmern.
          </p>
        </div>
        <div className="grid auto-rows-45 grid-cols-2 gap-3 sm:auto-rows-55 lg:grid-cols-4 lg:auto-rows-65">
          {GALLERY.map(({ src, alt, label }, index) => (
            <figure
              key={label}
              className={`group relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={src}
                alt={alt}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/75 to-transparent px-4 pb-4 pt-12">
                <figcaption className="text-sm font-semibold text-white">
                  {label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantees() {
  return (
    <section id="guarantees" className="section-py bg-ink text-white">
      <div className="site-wrap">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-3 text-brand-light">Unser Versprechen</p>
            <h2 className="headline text-white">Service, der bleibt.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Verlässliche Leistung heißt für uns: erreichbar sein, sauber
            arbeiten und Verantwortung übernehmen.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-700 bg-slate-700 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map(({ Icon, title, body }) => (
            <article
              key={title}
              className="bg-[#172629] p-6 transition-colors hover:bg-brand"
            >
              <Icon className="mb-8 h-6 w-6 text-brand-light" />
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
