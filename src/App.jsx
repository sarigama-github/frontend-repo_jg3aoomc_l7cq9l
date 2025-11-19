import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import Services from './components/Services'
import ScrollShowcase from './components/ScrollShowcase'
import ProcessTimeline from './components/ProcessTimeline'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-300/30">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(120%_80%_at_50%_-10%,#0b1220,transparent),radial-gradient(120%_80%_at_50%_110%,#0b1220,transparent)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 mix-blend-screen" style={{ background: 'radial-gradient(80% 60% at 20% 0%, rgba(34,211,238,.15), transparent 60%), radial-gradient(80% 60% at 80% 100%, rgba(59,130,246,.2), transparent 60%)' }} />

      <Navbar />
      <main>
        <Hero3D />
        <Services />
        <ScrollShowcase />
        <ProcessTimeline />

        <section id="reviews" className="py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-center">Customers love moving with us</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {["Best move I've had — on time, careful, and fast.", 'Communication was stellar the whole way.', 'They packed everything perfectly. Worth it.'].map((q, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
                  <p className="text-white/90">“{q}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20" />
                    <div>
                      <p className="text-sm font-semibold">Happy Customer</p>
                      <p className="text-xs text-white/60">Verified review</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="relative py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_50%,rgba(34,211,238,0.15),transparent)]" />
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 backdrop-blur">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl md:text-4xl font-extrabold">Get your fast, free moving quote</h3>
                <p className="mt-2 text-white/80">Tell us about your move and we’ll reach out with a tailored plan and price.</p>
                <form className="mt-6 grid md:grid-cols-3 gap-3">
                  <input required placeholder="From (City)" className="col-span-1 rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <input required placeholder="To (City)" className="col-span-1 rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <input type="date" required className="col-span-1 rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50 [color-scheme:dark]" />
                  <input required placeholder="Name" className="md:col-span-1 rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <input required type="tel" placeholder="Phone" className="md:col-span-1 rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <input required type="email" placeholder="Email" className="md:col-span-1 rounded-lg bg-white/10 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <button type="submit" className="md:col-span-3 mt-1 inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition">Request quote</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/10 text-white/70">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SwiftMove. All rights reserved.</p>
          <div className="text-sm">Proudly moving homes and offices across the country.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
