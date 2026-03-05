import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { useReveal } from '../hooks/useReveal'

const stats = [
  { value: '500+', label: 'Reviews Generated' },
  { value: '80+', label: 'Websites Launched' },
  { value: '3.2×', label: 'Avg. Traffic Growth' },
  { value: '98%', label: 'Client Retention' },
]

const steps = [
  {
    number: '01',
    title: 'Quick call or in-person chat, zero pitch',
    description: 'We learn your business, your goals, and what’s actually broken. By phone or face to face — whatever you prefer. No deck, no “discovery workshop.” Just a real conversation.',
  },
  {
    number: '02',
    title: 'A plan you can understand',
    description: 'We spell out what we’ll do, what it costs, and what you’ll get. No surprise fees. You approve before we start.',
  },
  {
    number: '03',
    title: 'We do the work. You see the numbers.',
    description: 'One point of contact. Updates in plain English. You focus on your business; we focus on getting you more leads and visibility.',
  },
]

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ID
  ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
  : null

export default function Home() {
  useReveal()
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    if (formStatus !== 'success') return
    const t = setTimeout(() => setFormStatus('idle'), 4000)
    return () => clearTimeout(t)
  }, [formStatus])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!FORMSPREE_ENDPOINT) {
      setFormStatus('error')
      return
    }
    const form = e.target
    const data = new FormData(form)
    setFormStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setFormStatus('success')
        form.reset()
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main>
        {formStatus === 'success' && (
          <div className="form-toast" role="alert" aria-live="polite">
            <span className="form-toast-icon" aria-hidden="true">✓</span>
            <span>Hey, your message has been sent. We'll be in touch soon.</span>
          </div>
        )}
        {/* ── Hero ── */}
        <section className="hero hero-centered">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content hero-animate-content">
            <p className="hero-badge">For small businesses that are ready to grow</p>
            <h1 className="hero-title">
              Marketing that works.<br />
              <span className="accent">Without the agency circus.</span>
            </h1>
            <p className="hero-subtitle">
              We build sites, get you more 5-star reviews, and get you found on Google. One small team, clear pricing, no jargon. Built for owners who’d rather run their business than decode a marketing report.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary btn-lg">Call or meet in person — free</a>
              <a href="#services" className="btn btn-ghost btn-lg">What we do</a>
            </div>
          </div>
        </section>

        {/* ── Who we are ── */}
        <section id="about" className="section who-we-are">
          <div className="container who-we-are-inner">
            <h2 className="section-title" data-reveal>Built for owners, not enterprises</h2>
            <div className="who-we-are-grid">
              <div className="who-we-are-visual" data-reveal aria-hidden="true">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="who-we-are-graphic">
                  <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" opacity="0.15" />
                  <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                  <path d="M55 100c0-25 20-45 45-45s45 20 45 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                  <path d="M100 55v90M70 70l60 60M130 70l-60 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                  <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <div className="who-we-are-body" data-reveal style={{ '--reveal-delay': '0.1s' }}>
              <p>
                Heel Digital is a small team. We work with small businesses — the plumber who’s slammed with work but invisible on Google, the salon that’s great at what they do but terrible at reviews, the shop that’s outgrown its DIY site. You’re not looking for a 20-person agency or a “brand transformation.” You need a site that converts, reviews that build trust, and visibility that brings in leads.
              </p>
              <p>
                We’re not the cheapest. We’re not the flashiest. We’re the ones who show up, do the work, and tell you in plain English what’s happening. If that sounds like what you’ve been looking for, we should talk.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <div className="stats-bar">
          <div className="container stats-inner">
            {stats.map((s, i) => (
              <div key={i} className="stat-item" data-reveal style={{ '--reveal-delay': `${i * 0.08}s` }}>
                <strong className="stat-value">{s.value}</strong>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Services ── */}
        <section id="services" className="section services">
          <div className="container">
            <h2 className="section-title" data-reveal>What we do</h2>
            <p className="section-subtitle" data-reveal style={{ '--reveal-delay': '0.08s' }}>
              Sites, reviews, SEO, and ads. Pick what you need — we’ll show you how we do it.
            </p>
            <div className="services-grid">
              {services.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="service-card"
                  data-reveal
                  style={{ '--reveal-delay': `${i * 0.08}s` }}
                >
                  <span className="service-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul className="service-highlights">
                    {s.highlights.map((h, j) => (
                      <li key={j}><span className="check">✓</span>{h}</li>
                    ))}
                  </ul>
                  <span className="service-cta">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="how-it-works" className="section how">
          <div className="container">
            <h2 className="section-title" data-reveal>How we work</h2>
            <p className="section-subtitle" data-reveal style={{ '--reveal-delay': '0.08s' }}>
              No long contracts. No endless meetings. Just a clear process and one person you can actually reach.
            </p>
            <div className="steps">
              {steps.map((step, i) => (
                <div key={i} className="step" data-reveal style={{ '--reveal-delay': `${i * 0.15}s` }}>
                  <div className="step-num">{step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section id="why-us" className="section why">
          <div className="container">
            <h2 className="section-title" data-reveal>Why work with us</h2>
            <p className="section-subtitle" data-reveal style={{ '--reveal-delay': '0.08s' }}>
              The stuff that actually matters when you’re running a business.
            </p>
            <div className="why-grid">
              {[
                { icon: '💰', title: 'Upfront pricing', text: "You see the number before we start. No “scope creep” or surprise invoices." },
                { icon: '📊', title: 'Reports you can read', text: "Monthly updates in plain English. Rankings, traffic, leads — no buzzword bingo." },
                { icon: '🤝', title: 'One person, not a “team”', text: "You get a real contact. No handoffs, no account managers who never answer." },
                { icon: '⚡', title: 'Fast turnaround', text: "Sites in about 2 weeks. Review campaigns in days. We don’t sit on your project." },
              ].map((item, i) => (
                <div key={i} className="why-item" data-reveal style={{ '--reveal-delay': `${i * 0.08}s` }}>
                  <div className="why-icon">{item.icon}</div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section cta">
          <div className="container">
            <div className="cta-inner" data-reveal>
              <p className="cta-honesty">Good marketing shouldn’t be a cost that keeps you up at night — it should be a tool that helps fill your pockets, not drain them. We want to work with you to find a plan that actually works for your business and your budget.</p>
              <h2 className="section-title">Let’s find what works for you</h2>
              <p className="cta-text">
                We’re happy to meet by phone or in person — whatever works for you. Tell us what you do and what you’re hoping for; we’ll listen, then come back with a straight answer and a plan we can stand behind. No obligation, no pressure.
              </p>
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                action={FORMSPREE_ENDPOINT || '#'}
                method="POST"
              >
                <div className="form-row">
                  <input type="text" name="firstName" placeholder="First name" required className="form-input" />
                  <input type="text" name="lastName" placeholder="Last name" required className="form-input" />
                </div>
                <div className="form-row">
                  <input type="email" name="email" placeholder="Email" required className="form-input" />
                  <input type="tel" name="phone" placeholder="Phone number" className="form-input" />
                </div>
                <input type="text" name="company" placeholder="Company / business" className="form-input" />
                <textarea
                  name="message"
                  placeholder="What are you looking to achieve? (reviews, website, SEO...)"
                  rows={4}
                  className="form-input form-textarea"
                />
                {formStatus === 'error' && (
                  <p className="form-message form-message-error">
                    Something went wrong. Please email us directly at{' '}
                    <a href="mailto:hello@heeldigital.com" className="cta-email">hello@heeldigital.com</a>.
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending…' : "Send message — we'll respond within 24h"}
                </button>
              </form>
            </div>
          </div>
        </section>
    </main>
  )
}
