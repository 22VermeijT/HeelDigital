import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const SECTIONS = ['about', 'services', 'how-it-works', 'why-us', 'contact']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection('services'); return }
    const visible = new Map()
    const observers = SECTIONS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(([entry]) => {
        visible.set(id, entry.isIntersecting)
        setActiveSection(SECTIONS.find(s => visible.get(s)) ?? '')
      }, { rootMargin: '-20% 0% -55% 0%' })
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(obs => obs?.disconnect())
  }, [location.pathname])

  const close = () => setMenuOpen(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleHomeClick = (e) => {
    close()
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const a = activeSection
  const isServicePage = location.pathname.startsWith('/services/')

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="logo" onClick={handleHomeClick} state={location.pathname !== '/' ? { scrollToTop: true } : undefined}>
            <img src="/HeelDigital.png" alt="Heel Digital" className="logo-img" />
          </Link>

          <nav className="nav">
            <Link to="/" onClick={handleHomeClick} state={location.pathname !== '/' ? { scrollToTop: true } : undefined} className={!a && !isServicePage ? 'nav-active' : ''}>Home</Link>
            <a href="/#about"        className={a === 'about'        ? 'nav-active' : ''}>About</a>
            <a href="/#services"     className={a === 'services' || isServicePage ? 'nav-active' : ''}>Services</a>
            <a href="/#how-it-works" className={a === 'how-it-works' ? 'nav-active' : ''}>How we work</a>
            <a href="/#why-us"       className={a === 'why-us'       ? 'nav-active' : ''}>Why us</a>
            <a href="/#contact"      className={a === 'contact'      ? 'nav-active' : ''}>Contact</a>
          </nav>

          <div className="header-right">
            <a href="/#contact" className="btn btn-primary btn-desktop-only">Get Started</a>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav — outside <header> to avoid Safari backdrop-filter stacking context bug */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-nav-backdrop"
              onClick={close}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="mobile-nav"
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <button className="mobile-nav-close" onClick={close} aria-label="Close menu">✕</button>
              <nav className="mobile-nav-links">
                <Link to="/" onClick={handleHomeClick} state={location.pathname !== '/' ? { scrollToTop: true } : undefined} className={!a && !isServicePage ? 'nav-active' : ''}>Home</Link>
                <a href="/#about"        onClick={close} className={a === 'about'        ? 'nav-active' : ''}>About</a>
                <a href="/#services"     onClick={close} className={a === 'services' || isServicePage ? 'nav-active' : ''}>Services</a>
                <a href="/#how-it-works" onClick={close} className={a === 'how-it-works' ? 'nav-active' : ''}>How we work</a>
                <a href="/#why-us"       onClick={close} className={a === 'why-us'       ? 'nav-active' : ''}>Why us</a>
                <a href="/#contact"      onClick={close} className={a === 'contact'      ? 'nav-active' : ''}>Contact</a>
                <a href="/#contact" onClick={close} className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', width: '100%', textAlign: 'center' }}>Get Started</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
