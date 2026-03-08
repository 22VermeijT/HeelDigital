import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const toContact = { to: '/', state: { scrollToTop: true, scrollTo: 'contact' } }
import { Helmet } from 'react-helmet-async'
import { services } from '../data/services'
import ServiceIcon from '../components/ServiceIcon'

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

  if (!service) return null

  return (
    <>
      <Helmet>
        <title>{service.title} — Heel Digital</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={`${import.meta.env.VITE_SITE_URL}/services/${service.slug}`} />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={`${import.meta.env.VITE_SITE_URL}/services/${service.slug}`} />
        <meta property="og:title"       content={`${service.title} — Heel Digital`} />
        <meta property="og:description" content={service.description} />
        <meta property="og:image"       content={`${import.meta.env.VITE_SITE_URL}/HeelDigital.png`} />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:title"      content={`${service.title} — Heel Digital`} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image"      content={`${import.meta.env.VITE_SITE_URL}/HeelDigital.png`} />
      </Helmet>
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
            <div className="sp-hero-icon"><ServiceIcon name={service.icon} /></div>
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
            {service.pricing && (
              <div className="sp-pricing">
                <strong className="sp-pricing-amount">{service.pricing.from}</strong>
              </div>
            )}
            <Link {...toContact} className="btn btn-primary btn-lg">
              Get started — free call or in-person chat
            </Link>
          </div>
        </section>

        {/* ── Pricing ── */}
        {service.pricing && (
          <section className="sp-section sp-pricing-section" id="pricing">
            <div className="container sp-pricing-inner">
              <p className="sp-section-eyebrow">Pricing</p>
              <h2 className="sp-section-title">What it costs</h2>
              <div className="sp-pricing-detail">
                <strong className="sp-pricing-amount">{service.pricing.from}</strong>
                {service.pricing.note && <p className="sp-pricing-note">{service.pricing.note}</p>}
                {service.pricing.explanation && (
                  <div className="sp-pricing-explanation">
                    {service.pricing.explanation.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Overview ── */}
        <section className="sp-section sp-overview">
          <div className="container sp-overview-inner">
            <div>
              <p className="sp-section-eyebrow">Overview</p>
              <h2 className="sp-section-title">What this service actually does for you</h2>
            </div>
            <div className="sp-overview-body">
              {service.overview.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="sp-section sp-process-section">
          <div className="container">
            <p className="sp-section-eyebrow">The process</p>
            <h2 className="sp-section-title">How we do it, step by step</h2>
            <div className="sp-steps">
              {service.process.map((step, i) => (
                <div
                  key={i}
                  className="sp-step"
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
            <p className="sp-section-eyebrow">What you get</p>
            <h2 className="sp-section-title">{service.upgrades ? 'Included & upgrades' : 'Everything included'}</h2>
            <ul className="sp-includes-grid">
              {service.includes.map((item, i) => (
                <li key={i} className="sp-include-item">
                  <span className="check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            {service.upgrades && (
              <>
                <p className="sp-includes-upgrade-label">Available upgrades</p>
                <ul className="sp-includes-grid sp-includes-upgrades">
                  {service.upgrades.map((item, i) => (
                    <li key={i} className="sp-include-item sp-include-item-upgrade">
                      <span className="sp-include-upgrade-icon">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className="sp-section sp-who-section">
          <div className="container sp-who-inner">
            <div>
              <p className="sp-section-eyebrow">Is this right for you?</p>
              <h2 className="sp-section-title">Who this is built for</h2>
            </div>
            <ul className="sp-who-list">
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
            <p className="sp-section-eyebrow">FAQ</p>
            <h2 className="sp-section-title">Common questions</h2>
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
            <p className="sp-section-eyebrow">Keep exploring</p>
            <h2 className="sp-section-title">Other services</h2>
            <div className="sp-other-grid">
              {otherServices.map((s, i) => (
                <Link
                  key={i}
                  to={`/services/${s.slug}`}
                  className="sp-other-card"
                >
                  <span className="sp-other-icon"><ServiceIcon name={s.icon} /></span>
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
          <div className="container sp-cta-inner">
            <h2 className="sp-cta-title">Ready to get started?</h2>
            <p className="sp-cta-sub">
              Tell us about your business and we'll put together a custom plan — no obligation.
            </p>
            <Link {...toContact} className="btn btn-primary btn-lg">
              Book a free call or meet in person
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
