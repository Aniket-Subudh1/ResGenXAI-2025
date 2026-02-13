import Header from "./components/header"
import Hero from "./components/hero"
import AboutUniversity from "./components/about-university"
import AboutConference from "./components/about-conference"
import Outcomes from "./components/outcomes"
import CallToAction from "./components/call-to-action"

import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <Header />
      <Hero />
      <AboutUniversity />
      <AboutConference />
      <Outcomes />
      <CallToAction />
    
      <Footer />
    </main>
  )
}
