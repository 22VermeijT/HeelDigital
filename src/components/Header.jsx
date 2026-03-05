import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  const handleHomeClick = (e) => {
    close()
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo" onClick={handleHomeClick}>
          <img src="/HeelDigital.png" alt="Heel Digital" className="logo-img" />
        </Link>

        <nav className={`nav${menuOpen ? ' nav-open' : ''}`}>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <a href="/#about" onClick={close}>About</a>
          <a href="/#services" onClick={close}>Services</a>
          <a href="/#how-it-works" onClick={close}>How we work</a>
          <a href="/#why-us" onClick={close}>Why us</a>
          <a href="/#contact" onClick={close}>Contact</a>
        </nav>

        <div className="header-right">
          <a href="/#contact" className="btn btn-primary" onClick={close}>Get Started</a>
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

      {menuOpen && <div className="nav-overlay" onClick={close} aria-hidden="true" />}
    </header>
  )
}
