import Nav from '../components/Nav'

export default function About() {
  return (
    <div className="min-h-screen bg-[#eceef2] text-neutral-900">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">About</h1>
      </main>
    </div>
  )
}
