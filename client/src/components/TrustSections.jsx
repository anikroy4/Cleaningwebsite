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
      "Since CleanPro started looking after our offices, every Monday feels easier.",
    name: "Julia M.",
    role: "Office manager, Wurzburg",
  },
  {
    quote:
      "Fast responses, spotless work, and a team that truly thinks ahead.",
    name: "Martin K.",
    role: "Property management, Berlin",
  },
  {
    quote:
      "Everything was cleared on time even with the first snow. That is what service should be.",
    name: "Svenja R.",
    role: "Property owner, Potsdam",
  },
];

const STANDARDS = [
  {
    Icon: BadgeCheck,
    label: "Quality standard",
    detail: "Documented processes",
  },
  {
    Icon: ShieldCheck,
    label: "Safety focus",
    detail: "Trained professionals",
  },
  { Icon: Leaf, label: "Act responsibly", detail: "Eco-friendly products" },
  { Icon: ThumbsUp, label: "Clear service", detail: "Dedicated contact" },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=85&auto=format&fit=crop",
    alt: "Professional cleaning of a bright room",
    label: "Clean spaces",
  },
  {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900&q=85&auto=format&fit=crop",
    alt: "Cleaner at work",
    label: "Attention to detail",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop",
    alt: "Well-maintained outdoor area of a building",
    label: "Everything in hand",
  },
  {
    src: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=900&q=85&auto=format&fit=crop",
    alt: "Snow-covered paths in winter",
    label: "Ready in any weather",
  },
];

const GUARANTEES = [
  {
    Icon: Clock3,
    title: "Reply within 24 hours",
    body: "You will quickly receive a clear response and a no-obligation quote.",
  },
  {
    Icon: Sparkles,
    title: "Clearly documented",
    body: "Services and schedules remain transparent and easy to follow.",
  },
  {
    Icon: ShieldCheck,
    title: "Predictable costs",
    body: "Fair fixed prices with no surprises on your monthly invoice.",
  },
  {
    Icon: Droplets,
    title: "Sustainably considered",
    body: "We choose efficient processes and environmentally conscious products.",
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
            <p className="eyebrow mb-3 text-cobalt">Customer reviews</p>
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
              Accreditations & standards
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-brand-dark">
              Trust needs proof.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#55705A]">
            Our processes are designed around quality, safety, and reliable
            collaboration. Supporting documents are available on request.
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
          <p className="eyebrow mb-3 text-cobalt">A closer look</p>
          <h2 className="headline text-slate-900">
            Order you can
            <br /> see.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            A glimpse at the spaces, paths, and details we take care of.
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
            <p className="eyebrow mb-3 text-brand-light">Our promise</p>
            <h2 className="headline text-white">Service that lasts.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Reliable service means being available, working cleanly, and taking responsibility.
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
