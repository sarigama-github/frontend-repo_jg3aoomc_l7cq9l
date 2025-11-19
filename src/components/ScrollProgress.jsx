import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 })

  // Prevent iOS Safari overscroll glow from making the bar jump
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none'
    return () => { document.body.style.overscrollBehavior = '' }
  }, [])

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] origin-left h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.6)]"
    />
  )
}
