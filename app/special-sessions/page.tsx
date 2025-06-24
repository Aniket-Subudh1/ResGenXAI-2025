import Header from "../components/header"
import Footer from "../components/footer"
import SpecialSessions from "../components/special-sessions"
import CallToAction from "../components/call-to-action"


export default function CallForPapersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
     <SpecialSessions/>
      <CallToAction />
      <Footer />
    </main>
  )
}
