import { motion } from 'framer-motion'

const blocks = [
  {
    title: 'Fragile? We got it.',
    desc: 'Glass, art, instruments — handled and insured with white‑glove care.',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop'
  },
  {
    title: 'Real‑time updates',
    desc: 'Track your crew, chat with your coordinator, and get photo proofs.',
    img: 'https://images.unsplash.com/photo-1587929651402-ce54a2b3af41?q=80&w=1600&auto=format&fit=crop'
  },
  {
    title: 'Eco‑friendly packing',
    desc: 'Recycled materials and re‑usable crates to reduce waste.',
    img: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1600&auto=format&fit=crop'
  },
  {
    title: 'Flexible storage',
    desc: 'Short‑term to long‑term storage with climate control and CCTV.',
    img: 'https://images.unsplash.com/photo-1604147706284-7d4b4ae1801d?q=80&w=1600&auto=format&fit=crop'
  },
]

export default function InteractiveGrid() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Designed for a smoother move</h2>
            <p className="mt-3 text-white/70 max-w-2xl">Interactive highlights — hover to reveal details, click for a closer look. Built to feel premium and playful.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blocks.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <img src={b.img} alt="Moving feature" className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="relative p-5 min-h-[220px] flex flex-col justify-end">
                <h3 className="text-xl font-semibold text-white drop-shadow">{b.title}</h3>
                <p className="mt-2 text-sm text-white/80 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{b.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/20 group-hover:via-blue-500/20 group-hover:to-indigo-500/20 transition-colors" />
            </motion.article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] bg-[radial-gradient(40%_30%_at_20%_20%,#22d3ee,transparent),radial-gradient(40%_30%_at_80%_80%,#60a5fa,transparent)]" />
    </section>
  )
}
