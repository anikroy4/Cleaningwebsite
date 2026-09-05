import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import AboutUs from './components/AboutUs'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import AdminPortal from './components/AdminPortal'
import TrustSections from './components/TrustSections'
import { Helmet } from 'react-helmet-async'

export default function App() {
  if (window.location.pathname === '/admin') {
    return (
      <>
        <Helmet>
          <title>Admin Dashboard | CleanPro GmbH</title>
          <meta name="description" content="Interne Übersicht der eingegangenen CleanPro-Anfragen." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <AdminPortal />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>CleanPro GmbH | Reinigung, Hausmeisterdienst & Winterdienst</title>
        <meta name="description" content="Professionelle Reinigung, Hausmeisterdienst und Winterdienst von CleanPro GmbH. Zuverlässig, flexibel und mit persönlichem Ansprechpartner." />
        <meta property="og:title" content="CleanPro GmbH | Sauberkeit, auf die Sie vertrauen können" />
        <meta property="og:description" content="Professionelle Reinigung, Hausmeisterdienst und Winterdienst aus einer Hand." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="site-shell">
        <Header />
        <main className="flex-1">
          <Hero />
          <Services />
          <AboutUs />
          <TrustSections />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  )
}
