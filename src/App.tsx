import { useEffect } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileCtaBar } from './components/layout/MobileCtaBar'
import { initReveal } from './lib/reveal'
import { Faq } from './sections/Faq'
import { Features } from './sections/Features'
import { FinalCta } from './sections/FinalCta'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Personas } from './sections/Personas'
import { Problem } from './sections/Problem'
import { Security } from './sections/Security'
import { WhiteLabel } from './sections/WhiteLabel'

declare global {
  interface Window {
    __appReady?: boolean
  }
}

export function App() {
  useEffect(() => {
    window.__appReady = true
    return initReveal()
  }, [])

  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Problem />
        <HowItWorks />
        <Personas />
        <Features />
        <WhiteLabel />
        <Security />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  )
}
