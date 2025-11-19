import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="px-3 py-2 text-sm md:text-base text-white/80 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = (e) => {
    const href = e.currentTarget.getAttribute('href')
    if (href?.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-slate-900/60 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30" />
            <span className="font-bold text-white tracking-tight">SwiftMove</span>
          </a>

          <nav className="hidden md:flex items-center">
            <NavLink href="#services" onClick={handleAnchor}>Services</NavLink>
            <NavLink href="#whyus" onClick={handleAnchor}>Why us</NavLink>
            <NavLink href="#process" onClick={handleAnchor}>Process</NavLink>
            <NavLink href="#reviews" onClick={handleAnchor}>Reviews</NavLink>
            <a href="#cta" onClick={handleAnchor} className="ml-4 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition">
              <Phone size={18} /> Get a quote
            </a>
          </nav>

          <button className="md:hidden text-white/80" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/80 backdrop-blur">
          <div className="px-4 py-3 flex flex-col">
            <NavLink href="#services" onClick={handleAnchor}>Services</NavLink>
            <NavLink href="#whyus" onClick={handleAnchor}>Why us</NavLink>
            <NavLink href="#process" onClick={handleAnchor}>Process</NavLink>
            <NavLink href="#reviews" onClick={handleAnchor}>Reviews</NavLink>
            <a href="#cta" onClick={handleAnchor} className="mt-2 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-4 py-2 rounded-lg">
              <Phone size={18} /> Get a quote
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
