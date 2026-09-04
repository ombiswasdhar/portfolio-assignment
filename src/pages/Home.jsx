import Nav from '../components/Nav'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-red-600 selection:text-white">
      <Nav />
      <main className="w-full">
        <Hero />
      </main>
    </div>
  )
}

