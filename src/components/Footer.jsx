import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="footer-brand">
          <img src="/HeelDigital.png" alt="Heel Digital" className="logo-img logo-img-sm" />
        </Link>
        <nav className="footer-nav">
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#how-it-works">How we work</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="footer-copy">
          <p>Based in Wisconsin · Serving businesses nationwide</p>
          <p>© {new Date().getFullYear()} Heel Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
