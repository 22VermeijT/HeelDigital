import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Heel Digital</title>
      </Helmet>
      <main className="nf-main">
        <div className="nf-inner">
          <p className="nf-code">404</p>
          <h1 className="nf-title">Nothing here.</h1>
          <p className="nf-sub">
            The page you're looking for doesn't exist — it may have moved, or the link might be off.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
        </div>
      </main>
    </>
  )
}
