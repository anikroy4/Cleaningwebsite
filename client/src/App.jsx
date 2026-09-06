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
          <meta name="description" content="Internal overview of incoming CleanPro requests." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <AdminPortal />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>CleanPro GmbH | Cleaning, Facility Services & Winter Maintenance</title>
        <meta name="description" content="Professional cleaning, facility services, and winter maintenance from CleanPro GmbH. Reliable, flexible, and personal." />
        <meta property="og:title" content="CleanPro GmbH | Cleanliness you can trust" />
        <meta property="og:description" content="Professional cleaning, facility services, and winter maintenance from one source." />
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
