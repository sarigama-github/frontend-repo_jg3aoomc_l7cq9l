import { motion, useScroll, useTransform } from 'framer-motion'
import { Truck, Boxes, Shield, Clock } from 'lucide-react'

const items = [
  { icon: Truck, title: 'Local & Long‑Distance', desc: 'Door‑to‑door moving with GPS tracked trucks and dedicated crews.' },
  { icon: Boxes, title: 'Packing & Unpacking', desc: 'Pro‑grade materials, fragile care, and room‑by‑room labeling.' },
  { icon: Shield, title: 'Insured & Secure', desc: 'Fully licensed with comprehensive coverage for peace of mind.' },
  { icon: Clock, title: 'On‑time Guarantee', desc: 'Precise scheduling with live ETA updates and friendly pros.' },
]

export default function Services() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section id="services" className="relative py-24 md:py-32">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 opacity-[0.08] bg-[radial-gradient(60%_40%_at_20%_20%,#22d3ee,transparent),radial-gradient(60%_40%_at_80%_80%,#60a5fa,transparent)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Everything you need to move better</h2>
          <p className="mt-4 text-white/70">Pick only what you need — we tailor each plan to your home, timeline and budget.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 hover:-translate-y-1 transition will-change-transform"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-tr from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30">
                <Icon />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
