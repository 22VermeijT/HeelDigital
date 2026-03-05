import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { services } from '../data/services'
import { useReveal } from '../hooks/useReveal'

export default function ServicePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const service = services.find(s => s.slug === slug)
  const otherServices = services.filter(s => s.slug !== slug).slice(0, 3)

  // Redirect unknown slugs
  useEffect(() => {
    if (!service) navigate('/', { replace: true })
  }, [service, navigate])

  useReveal()

  if (!service) return null

  return (
    <>
      <main className="sp-main">

        {/* ── Breadcrumb ── */}
        <div className="sp-breadcrumb">
          <div className="container">
            <Link to="/" className="sp-back">← All services</Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="sp-hero">
          <div className="sp-hero-glow" aria-hidden="true" />
          <div className="container sp-hero-inner">
            <div className="sp-hero-icon">{service.icon}</div>
            <h1 className="sp-hero-title">{service.title}</h1>
            <p className="sp-hero-tagline">{service.tagline}</p>
            <div className="sp-stats">
              {service.pageStats.map((stat, i) => (
                <div key={i} className="sp-stat">
                  <strong className="sp-stat-value">{stat.value}</strong>
                  <span className="sp-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <a href="/#contact" className="btn btn-primary btn-lg">
              Get started — free call or in-person chat
            </a>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="sp-section sp-overview">
          <div className="container sp-overview-inner">
            <div>
              <p className="sp-section-eyebrow" data-reveal>Overview</p>
              <h2 className="sp-section-title" data-reveal>What this service actually does for you</h2>
            </div>
            <div className="sp-overview-body" data-reveal>
              {service.overview.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="sp-section sp-process-section">
          <div className="container">
            <p className="sp-section-eyebrow" data-reveal>The process</p>
            <h2 className="sp-section-title" data-reveal>How we do it, step by step</h2>
            <div className="sp-steps">
              {service.process.map((step, i) => (
                <div
                  key={i}
                  className="sp-step"
                  data-reveal
                  style={{ '--reveal-delay': `${i * 0.1}s` }}
                >
                  <div className="sp-step-left">
                    <div className="sp-step-num">{step.number}</div>
                    {i < service.process.length - 1 && (
                      <div className="sp-step-line" aria-hidden="true" />
                    )}
                  </div>
                  <div className="sp-step-body">
                    <div className="sp-step-header">
                      <h3 className="sp-step-title">{step.title}</h3>
                      <span className="sp-step-duration">{step.duration}</span>
                    </div>
                    <p className="sp-step-desc">{step.desc}</p>
                    <p className="sp-step-detail">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Includes ── */}
        <section className="sp-section sp-includes-section">
          <div className="container">
            <p className="sp-section-eyebrow" data-reveal>What you get</p>
            <h2 className="sp-section-title" data-reveal>Everything included</h2>
            <ul className="sp-includes-grid" data-reveal>
              {service.includes.map((item, i) => (
                <li key={i} className="sp-include-item">
                  <span className="check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className="sp-section sp-who-section">
          <div className="container sp-who-inner">
            <div>
              <p className="sp-section-eyebrow" data-reveal>Is this right for you?</p>
              <h2 className="sp-section-title" data-reveal>Who this is built for</h2>
            </div>
            <ul className="sp-who-list" data-reveal>
              {service.whoIsItFor.map((item, i) => (
                <li key={i} className="sp-who-item">
                  <span className="sp-who-bullet">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sp-section sp-faq-section">
          <div className="container sp-faq-inner">
            <p className="sp-section-eyebrow" data-reveal>FAQ</p>
            <h2 className="sp-section-title" data-reveal>Common questions</h2>
            <div className="sp-faq-list">
              {service.faq.map((item, i) => (
                <div
                  key={i}
                  className={`sp-faq-item${openFaq === i ? ' open' : ''}`}
                >
                  <button
                    type="button"
                    className="sp-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span>{item.q}</span>
                    <span className="sp-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    className="sp-faq-answer-wrapper"
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    hidden={openFaq !== i}
                  >
                    <p className="sp-faq-answer">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Other services ── */}
        <section className="sp-section sp-other-section">
          <div className="container">
            <p className="sp-section-eyebrow" data-reveal>Keep exploring</p>
            <h2 className="sp-section-title" data-reveal>Other services</h2>
            <div className="sp-other-grid">
              {otherServices.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="sp-other-card"
                  data-reveal
                  style={{ '--reveal-delay': `${i * 0.1}s` }}
                >
                  <span className="sp-other-icon">{s.icon}</span>
                  <strong>{s.title}</strong>
                  <p>{s.description}</p>
                  <span className="sp-other-cta">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="sp-section sp-cta-section">
          <div className="container sp-cta-inner" data-reveal>
            <h2 className="sp-cta-title">Ready to get started?</h2>
            <p className="sp-cta-sub">
              Tell us about your business and we'll put together a custom plan — no obligation.
            </p>
            <a href="/#contact" className="btn btn-primary btn-lg">
              Book a free call or meet in person
            </a>
          </div>
        </section>

      </main>
    </>
  )
}
