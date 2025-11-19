import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero3D() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(56,189,248,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_70%,rgba(59,130,246,0.2),transparent)]" />
      </div>

      <div className="absolute right-0 top-0 h-[110vh] w-full lg:w-1/2 opacity-90">
        <Spline scene="https://prod.spline.design/2b9mG8ZKx8qvV9lV/scene.splinecode" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-10 w-full">
        <div className="py-28 md:py-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 ring-1 ring-white/20">Premium Moving Services</span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Move without the stress. We handle everything.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
              Residential, commercial, and long-distance moves with white‑glove packing, secure storage, and real‑time updates.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition">Get a fast quote</a>
              <a href="#services" className="inline-flex justify-center items-center px-6 py-3 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition">Explore services</a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-white/70">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur ring-2 ring-white/30" />
                ))}
              </div>
              <p className="text-sm">Trusted by 1,200+ happy customers</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
