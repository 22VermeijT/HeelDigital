import React from 'react'
import { testimonials } from '../data/testimonials'

const row1 = testimonials
const row2 = [...testimonials].reverse()

function Card({ name, business, city, quote }) {
  return (
    <div className="tmq-card">
      <div className="tmq-stars" aria-hidden="true">★★★★★</div>
      <p className="tmq-quote">"{quote}"</p>
      <div className="tmq-meta">
        <span className="tmq-name">{name}</span>
        <span className="tmq-biz">{business} · {city}</span>
      </div>
    </div>
  )
}

export default function TestimonialMarquee() {
  return (
    <section className="tmq-section" aria-label="Client testimonials">
      <p className="tmq-eyebrow">What clients say</p>

      {/* Row 1 — scrolls left */}
      <div className="tmq-track">
        <div className="tmq-row tmq-row-left">
          {[...row1, ...row1].map((t, i) => <Card key={i} {...t} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="tmq-track">
        <div className="tmq-row tmq-row-right">
          {[...row2, ...row2].map((t, i) => <Card key={i} {...t} />)}
        </div>
      </div>
    </section>
  )
}
