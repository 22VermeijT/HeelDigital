import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { services } from '../data/services'
import { stats } from '../data/stats'
import ServiceIcon from '../components/ServiceIcon'
import HeroIllustration from '../components/HeroIllustration'
import TestimonialMarquee from '../components/TestimonialMarquee'


function CountUp({ value, active }) {
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!active) return
    const match = value.match(/^([\d.]+)(.*)$/)
    if (!match) { setDisplay(value); return }
    const target = parseFloat(match[1])
    const suffix = match[2]
    const decimals = (match[1].split('.')[1] || '').length
    const duration = 1500
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay((target * eased).toFixed(decimals) + suffix)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, value])
  return <>{display}</>
}

const steps = [
  {
    number: '01',
    title: 'Quick call or in-person chat, zero pitch',
    description: `We learn your business, your goals, and what's actually broken. By phone or face to face — whatever you prefer. No deck, no “discovery workshop.” Just a real conversation.`,
  },
  {
    number: '02',
    title: 'A plan you can understand',
    description: `We spell out what we'll do, what it costs, and what you'll get. No surprise fees. You approve before we start.`,
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
  const location = useLocation()
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    const id = location.state?.scrollTo ?? (location.hash ? location.hash.slice(1) : null)
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 420)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (formStatus !== 'success') return
    const t = setTimeout(() => setFormStatus('idle'), 4000)
    return () => clearTimeout(t)
  }, [formStatus])

  const statsRef = useRef(null)
  const [statsActive, setStatsActive] = useState(false)
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsActive(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

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
      <Helmet>
        <title>Heel Digital — Digital Marketing for Small Businesses</title>
        <meta name="description" content="Heel Digital helps small businesses get more leads with websites, reviews, SEO, and ads. Clear pricing, no jargon, real results." />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL}/`} />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={`${import.meta.env.VITE_SITE_URL}/`} />
        <meta property="og:title"       content="Heel Digital — Digital Marketing for Small Businesses" />
        <meta property="og:description" content="Heel Digital helps small businesses get more leads with websites, reviews, SEO, and ads. Clear pricing, no jargon, real results." />
        <meta property="og:image"       content={`${import.meta.env.VITE_SITE_URL}/HeelDigital.png`} />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:title"      content="Heel Digital — Digital Marketing for Small Businesses" />
        <meta name="twitter:description" content="Heel Digital helps small businesses get more leads with websites, reviews, SEO, and ads. Clear pricing, no jargon, real results." />
        <meta name="twitter:image"      content={`${import.meta.env.VITE_SITE_URL}/HeelDigital.png`} />
      </Helmet>
        {formStatus === 'success' && (
          <div className="form-toast" role="alert" aria-live="polite">
            <span className="form-toast-icon" aria-hidden="true">✓</span>
            <span>Hey, your message has been sent. We'll be in touch soon.</span>
          </div>
        )}
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-dots" aria-hidden="true" />
          <div className="hero-content hero-animate-content">
            <p className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              For small businesses that are ready to grow
            </p>
            <h1 className="hero-title">
              Marketing that works.<br />
              <span className="accent">Without the agency circus.</span>
            </h1>
            <p className="hero-subtitle">
              We build sites, get you more 5-star reviews, and get you found on Google. One small team, clear pricing, no jargon. Built for owners who'd rather run their business than decode a marketing report.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary btn-lg">Call or meet in person — free</a>
              <a href="#services" className="btn btn-ghost btn-lg">What we do</a>
            </div>
          </div>
          <div className="hero-visual hero-animate-visual">
            <HeroIllustration />
          </div>
        </section>

        {/* ── Who we are ── */}
        <section id="about" className="section who-we-are">
          <div className="container who-we-are-inner">
            <h2 className="section-title">Built for owners, not enterprises</h2>
            <div className="who-we-are-grid">
              <div className="who-we-are-visual" aria-hidden="true">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="who-we-are-graphic">
                  {/* Concentric dashed rings */}
                  <circle cx="100" cy="108" r="78" stroke="currentColor" strokeWidth="1" opacity="0.07" strokeDasharray="4 7" />
                  <circle cx="100" cy="108" r="54" stroke="currentColor" strokeWidth="1" opacity="0.11" strokeDasharray="3 5" />
                  <circle cx="100" cy="108" r="30" stroke="currentColor" strokeWidth="1" opacity="0.17" />
                  {/* Connection lines from center */}
                  <line x1="100" y1="94" x2="100" y2="32" stroke="var(--accent)" strokeWidth="0.75" opacity="0.18" />
                  <line x1="100" y1="94" x2="162" y2="76" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
                  <line x1="100" y1="94" x2="150" y2="152" stroke="var(--accent)" strokeWidth="0.75" opacity="0.13" />
                  <line x1="100" y1="94" x2="50" y2="152" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
                  <line x1="100" y1="94" x2="38" y2="76" stroke="currentColor" strokeWidth="0.75" opacity="0.1" />
                  {/* Satellite nodes */}
                  <circle cx="100" cy="30" r="4" fill="var(--accent)" opacity="0.5" />
                  <circle cx="164" cy="76" r="3" fill="currentColor" opacity="0.2" />
                  <circle cx="152" cy="153" r="3.5" fill="var(--accent)" opacity="0.35" />
                  <circle cx="48" cy="153" r="3" fill="currentColor" opacity="0.2" />
                  <circle cx="36" cy="76" r="3" fill="currentColor" opacity="0.2" />
                  <circle cx="140" cy="28" r="2.5" fill="currentColor" opacity="0.15" />
                  <circle cx="60" cy="28" r="2.5" fill="currentColor" opacity="0.15" />
                  {/* Central location pin */}
                  <path d="M100 54a23 23 0 0 1 23 23c0 17-23 41-23 41s-23-24-23-41a23 23 0 0 1 23-23z" fill="var(--accent)" opacity="0.88" />
                  <circle cx="100" cy="77" r="8" fill="rgba(255,255,255,0.65)" />
                </svg>
              </div>
              <div className="who-we-are-body">
              <p>
                Heel Digital is a small team. We work with small businesses — the plumber who's slammed with work but invisible on Google, the salon that's great at what they do but terrible at reviews, the shop that's outgrown its DIY site. You're not looking for a 20-person agency or a "brand transformation." You need a site that converts, reviews that build trust, and visibility that brings in leads.
              </p>
              <p>
                We're not the cheapest. We're not the flashiest. We're the ones who show up, do the work, and tell you in plain English what's happening. If that sounds like what you've been looking for, we should talk.
              </p>
              <p>
                Based in Wisconsin, we work with businesses across the country — everything we do runs just as well over a call or email. If you're in the greater Wisconsin area, we're happy to meet in person.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <div className="stats-bar" ref={statsRef}>
          <div className="container stats-inner">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <strong className="stat-value"><CountUp value={s.value} active={statsActive} /></strong>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonial Marquee ── */}
        <TestimonialMarquee />

        {/* ── Services ── */}
        <section id="services" className="section services">
          <div className="container">
            <h2 className="section-title">What we do</h2>
            <p className="section-subtitle">
              Sites, reviews, SEO, and ads. Pick what you need — we'll show you how we do it.
            </p>
            <div className="services-grid">
              {services.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="service-card"
                  data-num={String(i + 1).padStart(2, '0')}
                  onMouseMove={handleCardMouseMove}
                >
                  <span className="service-icon"><ServiceIcon name={s.icon} /></span>
                  <h3>{s.title}</h3>
                  {s.pricing && (
                    <p className="service-pricing"><strong>{s.pricing.from}</strong></p>
                  )}
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
            <h2 className="section-title">How we work</h2>
            <p className="section-subtitle">
              No long contracts. No endless meetings. Just a clear process and one person you can actually reach.
            </p>
            <div className="steps">
              {steps.map((step, i) => (
                <div key={i} className="step">
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
            <h2 className="section-title">Why work with us</h2>
            <p className="section-subtitle">
              The stuff that actually matters when you're running a business.
            </p>
            <div className="why-grid">
              {[
                { icon: 'pricing', title: 'Upfront pricing & clear reporting', text: 'You see the number before we start. No scope creep or surprise invoices. Monthly updates in plain English — rankings, traffic, leads, no buzzword bingo.' },
                { icon: 'contact', title: 'One person, not a team', text: 'You get a real contact. No handoffs, no account managers who never answer.' },
                { icon: 'fast', title: 'Fast turnaround', text: 'Sites in about 2 weeks. Review campaigns in days. We do not sit on your project.' },
              ].map((item, i) => (
                <div key={i} className="why-item">
                  <div className="why-icon"><ServiceIcon name={item.icon} /></div>
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
            <div className="cta-inner">
              <p className="cta-honesty">Good marketing shouldn't be a cost that keeps you up at night — it should be a tool that helps fill your pockets, not drain them. We want to work with you to find a plan that actually works for your business and your budget.</p>
              <h2 className="section-title">Let's find what works for you</h2>
              <p className="cta-text">
                We're happy to meet by phone or in person — whatever works for you. Tell us what you do and what you're hoping for; we'll listen, then come back with a straight answer and a plan we can stand behind. No obligation, no pressure.
              </p>
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                action={FORMSPREE_ENDPOINT || '#'}
                method="POST"
              >
                <div className="form-row">
                  <label htmlFor="firstName" className="sr-only">First name</label>
                  <input id="firstName" type="text" name="firstName" placeholder="First name" required className="form-input" />
                  <label htmlFor="lastName" className="sr-only">Last name</label>
                  <input id="lastName" type="text" name="lastName" placeholder="Last name" required className="form-input" />
                </div>
                <div className="form-row">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input id="email" type="email" name="email" placeholder="Email" required className="form-input" />
                  <label htmlFor="phone" className="sr-only">Phone number</label>
                  <input id="phone" type="tel" name="phone" placeholder="Phone number" className="form-input" />
                </div>
                <label htmlFor="company" className="sr-only">Company or business name</label>
                <input id="company" type="text" name="company" placeholder="Company / business" className="form-input" />
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
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
              <p className="cta-alt">
                Prefer to call? <a href="tel:+19525679588" className="cta-email">(952) 567-9588</a> — no answer? Just leave a message!
              </p>
            </div>
          </div>
        </section>
    </main>
  )
}
