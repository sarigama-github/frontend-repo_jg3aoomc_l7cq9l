import { motion, useScroll, useTransform } from 'framer-motion'

const photos = [
  { src: 'https://images.unsplash.com/photo-1591160690555-c4fef6baf1cd?q=80&w=1974&auto=format&fit=crop', caption: 'Careful packing for peace of mind' },
  { src: 'https://images.unsplash.com/photo-1538474705339-76f8432f8bca?q=80&w=2070&auto=format&fit=crop', caption: 'Modern, GPS‑tracked fleet' },
  { src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1974&auto=format&fit=crop', caption: 'White‑glove service from start to finish' },
]

export default function ScrollShowcase() {
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8])

  return (
    <section id="whyus" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">We move differently</h2>
          <p className="mt-4 text-white/70 max-w-lg">From digital inventories to hourly updates, our process is built for clarity, speed and absolute care for your belongings.</p>
          <ul className="mt-6 space-y-3 text-white/80">
            <li>• Smart estimates with transparent pricing</li>
            <li>• Dedicated move coordinator</li>
            <li>• Real‑time tracking and photo updates</li>
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {photos.map((p, i) => (
            <motion.div key={i} style={{ rotate }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`relative rounded-xl overflow-hidden border border-white/10 ${i === 1 ? 'col-span-1 row-span-2' : 'col-span-1'}`}>
              <img src={p.src} alt="Moving" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-xs text-white/90 bg-gradient-to-t from-black/60 to-transparent">{p.caption}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
