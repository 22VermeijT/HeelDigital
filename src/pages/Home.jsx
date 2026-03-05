import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { useReveal } from '../hooks/useReveal'

const cardModals = [
  {
    icon: '⭐',
    title: 'Review Campaign Live',
    stat: '+42 five-star reviews in 30 days — 3.8 → 4.7 stars',
    points: [
      'Reviews are the #1 local ranking factor on Google. A business with 4.7 stars consistently outranks a competitor with 3.8 stars, even if the competitor has been around longer.',
      'Our system identifies the right moment to ask — right after a job is completed or a service is delivered — and sends a personalized follow-up via SMS or email with a one-tap link directly to your Google review page.',
      'We filter feedback privately first. Unhappy customers are redirected to an internal form so you can resolve the issue before it becomes a public 1-star review.',
      'For this client, 42 new reviews in 30 days pushed them from outside the top 10 into the Google Maps top 3 for their city. Inbound calls increased by 60% within six weeks.',
    ],
  },
  {
    icon: '📈',
    title: 'Organic Traffic Growth',
    stat: '↑ 218% organic traffic in 90 days — zero ad spend',
    points: [
      'We start with a full keyword audit — identifying every high-intent search term your customers use and mapping them to pages on your site. Most small business websites are invisible to Google simply because the right words are never on the page.',
      'On-page optimization covers title tags, meta descriptions, heading structure, internal linking, and page speed — all the technical signals Google uses to understand and rank your content.',
      'Google Business Profile optimization ensures your hours, categories, photos, and service descriptions are complete and keyword-rich, feeding the local algorithm directly.',
      'For this home services client, those three layers combined drove a 218% increase in organic sessions in 90 days — traffic that now arrives for free, every single month, and compounds over time.',
    ],
  },
  {
    icon: '🏆',
    title: '#1 on Google Maps',
    stat: 'Page 2 → #1 map pack in 60 days',
    points: [
      'The Google Maps "local pack" — the three businesses shown at the top of a search result — captures over 40% of all clicks. If you\'re not in it, you\'re invisible to most people searching right now.',
      'We optimize every signal Google uses to rank local businesses: category selection, service area configuration, photo quality and volume, Q&A responses, and post frequency on the Google Business Profile.',
      'Citation building means getting your business name, address, and phone number listed consistently across 50+ directories — Yelp, Apple Maps, Bing, and dozens of industry-specific sites. Consistency here is a direct trust signal to Google.',
      'Paired with a review campaign to build social proof, this client went from page 2 to the #1 map spot in 60 days and held that position. For a search like "plumber near me," that single ranking change was worth thousands in monthly revenue.',
    ],
  },
]

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

export default function Home() {
  useReveal()
  const [activeModal, setActiveModal] = useState(null)

  return (
    <main>
        {/* ── Hero ── */}
        <section className="hero">
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

          <div className="hero-visual">
            <button className="hero-card hc-reviews hero-animate-card-1" onClick={() => setActiveModal(0)}>
              <div className="hc-stars">⭐⭐⭐⭐⭐</div>
              <div className="hc-label">Review campaign live</div>
              <div className="hc-sub">+42 new 5-star reviews this month</div>
            </button>
            <button className="hero-card hc-traffic hero-animate-card-2" onClick={() => setActiveModal(1)}>
              <div className="hc-icon">📈</div>
              <div className="hc-label">Organic traffic</div>
              <div className="hc-sub">↑ 218% in 90 days</div>
            </button>
            <button className="hero-card hc-rank hero-animate-card-3" onClick={() => setActiveModal(2)}>
              <div className="hc-icon">🏆</div>
              <div className="hc-label">#1 on Google Maps</div>
              <div className="hc-sub">for "plumber near me"</div>
            </button>
          </div>

          {activeModal !== null && (
            <div className="hc-modal-backdrop" onClick={() => setActiveModal(null)}>
              <div className="hc-modal" onClick={e => e.stopPropagation()}>
                <button className="hc-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">✕</button>
                <div className="hc-modal-icon">{cardModals[activeModal].icon}</div>
                <h3 className="hc-modal-title">{cardModals[activeModal].title}</h3>
                <p className="hc-modal-stat">{cardModals[activeModal].stat}</p>
                <ul className="hc-modal-points">
                  {cardModals[activeModal].points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* ── Who we are ── */}
        <section id="about" className="section who-we-are">
          <div className="container who-we-are-inner">
            <h2 className="section-title" data-reveal>Built for owners, not enterprises</h2>
            <div className="who-we-are-body" data-reveal style={{ '--reveal-delay': '0.1s' }}>
              <p>
                Digital Dog is a small team. We work with small businesses — the plumber who’s slammed with work but invisible on Google, the salon that’s great at what they do but terrible at reviews, the shop that’s outgrown its DIY site. You’re not looking for a 20-person agency or a “brand transformation.” You need a site that converts, reviews that build trust, and visibility that brings in leads.
              </p>
              <p>
                We’re not the cheapest. We’re not the flashiest. We’re the ones who show up, do the work, and tell you in plain English what’s happening. If that sounds like what you’ve been looking for, we should talk.
              </p>
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
                onSubmit={e => {
                  e.preventDefault()
                  alert("Thanks! We'll be in touch within 24 hours.")
                }}
              >
                <div className="form-row">
                  <input type="text" placeholder="Your name" required className="form-input" />
                  <input type="email" placeholder="Email address" required className="form-input" />
                </div>
                <input type="text" placeholder="Business name (optional)" className="form-input" />
                <textarea
                  placeholder="What are you looking to achieve? (reviews, website, SEO...)"
                  rows={4}
                  className="form-input form-textarea"
                />
                <button type="submit" className="btn btn-primary btn-lg btn-full">
                  Send message — we'll respond within 24h
                </button>
              </form>
              <p className="cta-alt">
                Prefer email?{' '}
                <a href="mailto:hello@digitaldog.agency" className="cta-email">
                  hello@digitaldog.agency
                </a>
              </p>
            </div>
          </div>
        </section>
    </main>
  )
}
