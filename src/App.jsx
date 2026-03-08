import React, { useRef, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import NotFound from './pages/NotFound'

const getDepth = p => (p === '/' ? 0 : 1)

const variants = {
  initial: dir => ({ x: `${dir * 100}%` }),
  animate: {
    x: 0,
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
  exit: dir => ({
    x: `${dir * -20}%`,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
}

function AnimatedRoutes() {
  const location = useLocation()

  const prevPath = useRef('/')
  const dirRef = useRef(1)
  const savedScrollY = useRef({})
  const restoreTarget = useRef(0)

  if (location.pathname !== prevPath.current) {
    savedScrollY.current[prevPath.current] = window.scrollY
    dirRef.current = getDepth(location.pathname) >= getDepth(prevPath.current) ? 1 : -1
    const saved = savedScrollY.current[location.pathname]
    restoreTarget.current = dirRef.current === -1 && saved != null ? saved : 0
    prevPath.current = location.pathname
  }

  // Runs synchronously before first paint — no vertical movement during animation
  useLayoutEffect(() => {
    if (location.state?.scrollToTop) {
      // Explicit home nav (logo or Home link) — always go to top
      window.scrollTo(0, 0)
    } else if (dirRef.current === -1) {
      // Back: restore the exact scroll position the user was at
      window.scrollTo(0, restoreTarget.current)
    } else {
      // Forward: start at top so service page hero is in view
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div className="page-slide-wrapper">
      <AnimatePresence mode="popLayout" custom={dirRef.current}>
        <motion.div
          key={location.pathname}
          custom={dirRef.current}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="corner-deco corner-deco-tl" aria-hidden="true" />
      <div className="corner-deco corner-deco-tr" aria-hidden="true" />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
