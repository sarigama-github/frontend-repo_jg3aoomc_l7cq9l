import { motion } from 'framer-motion'
import { Calendar, Package, MapPin, Home } from 'lucide-react'

const steps = [
  { icon: Calendar, title: 'Plan', desc: 'Pick your date, get your estimate, and we set a precise arrival window.' },
  { icon: Package, title: 'Pack', desc: 'We bring materials and pack room‑by‑room with fragile care.' },
  { icon: MapPin, title: 'Move', desc: 'Load, transport and track your truck in real‑time.' },
  { icon: Home, title: 'Settle', desc: 'Unpack, assemble, and place furniture exactly where you want.' },
]

export default function ProcessTimeline() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-white">How it works</h2>
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur p-6"
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
