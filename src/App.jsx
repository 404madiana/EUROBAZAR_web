import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import './locations.css'
import Home from './pages/Home.jsx'
import Stores from './pages/Stores.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <BrowserRouter>
      <header className="appbar">
        <div className="appbar-inner">
          <button
            type="button"
            className="menu-toggle"
            style={{ padding: '20px 10px' }}
            aria-expanded={drawerOpen}
            aria-controls="appbar-drawer"
            onClick={() => setDrawerOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true" />
          </button>

          <Link to="/" className="brand-plate" aria-label="Retour à l'accueil">
            EUROBAZAR
          </Link>

          <div className="desktop-links">
            <Link to="/stores">Nos magasins</Link>
            <Link to="/about">À propos de nous</Link>
            <Link to="/contact">Nous contacter</Link>
          </div>
        </div>

        <div
          className={`drawer ${drawerOpen ? 'open' : ''}`}
          id="appbar-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <button
            type="button"
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Fermer le menu"
          >
            ×
          </button>
          <nav className="drawer-nav">
            <Link to="/stores" onClick={() => setDrawerOpen(false)}>
              Nos magasins
            </Link>
            <Link to="/about" onClick={() => setDrawerOpen(false)}>
              À propos de nous
            </Link>
            <Link to="/contact" onClick={() => setDrawerOpen(false)}>
              Nous contacter
            </Link>
          </nav>
        </div>

        <div className={`drawer-backdrop ${drawerOpen ? 'visible' : ''}`} onClick={() => setDrawerOpen(false)} />
      </header>

      <main className="main-title">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
