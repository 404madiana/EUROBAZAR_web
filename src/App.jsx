import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import './pages.css'
import './index.css'
import './footer.css'
import './locations.css'
import Home from './pages/Home.jsx'
import Stores from './pages/Stores.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Help from './pages/Help.jsx'
import Soutien from './pages/Soutien.jsx'
import titleSvg from '/assets/images/title.svg'
import Footer from './Footer.jsx';
import NotFound from './404.jsx'
import Reset404Counter from './Reset404Counter.jsx'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Router>
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

          <Link to="/" className="brand-plate" aria-label="Retour à l'accueil" style={{backgroundColor: '#0000ff'}}>
            <img src={titleSvg} className="logo-header" alt="EuroBazar"/>
          </Link>

          <div className="desktop-links">
            <Link to="/magasins">Nos magasins</Link>
            <Link to="/a-propos">À propos de nous</Link>
            <Link to="/contact">Nous contacter</Link>
            <Link to="/aide">Centre d'aide</Link>
            <Link to="/soutien" style={{color: "red"}}>Soutenir le site</Link>
          </div>
        </div>

        <div
          className={`drawer ${drawerOpen ? 'open' : ''}`}
          id="appbar-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="drawer-title">
            <Link to="/" className="brand-plate" aria-label="Retour à l'accueil" style={{backgroundColor: '#0000ff88'}}>
              <img src={titleSvg} className="logo-drawer" alt="EuroBazar"/>
            </Link>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Fermer le menu"
            >
              ×
            </button>
          </div>
          <nav className="drawer-nav">
            <Link to="/magasins" onClick={() => setDrawerOpen(false)}>
              Nos magasins
            </Link>
            <Link to="/a-propos" onClick={() => setDrawerOpen(false)}>
              À propos de nous
            </Link>
            <Link to="/contact" onClick={() => setDrawerOpen(false)}>
              Nous contacter
            </Link>
            <Link to="/aide" onClick={() => setDrawerOpen(false)}>
              Centre d'aide
            </Link>
            <Link to="/soutien" onClick={() => setDrawerOpen(false)} style={{backgroundColor: "red"}}>
              Soutenez le site !
            </Link>
            <a id='instagram' href="https://www.instagram.com/euro_bazar_/" target="_blank" rel="noopener noreferrer">
              Suivez-nous sur Instagram !
            </a>
            <a id='tiktok' href="https://www.tiktok.com/@eurobazar94" target="_blank" rel="noopener noreferrer">
              Suivez-nous sur TikTok !
            </a>
            <a id='facebook' href="https://www.facebook.com/p/EURO-BAZAR-100079855926200" target="_blank" rel="noopener noreferrer">
              Suivez-nous sur Facebook !
            </a>
          </nav>
        </div>

        <div className={`drawer-backdrop ${drawerOpen ? 'visible' : ''}`} onClick={() => setDrawerOpen(false)} />
      </header>

      <main className="main-page">
        <Reset404Counter />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magasins" element={<Stores />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aide" element={<Help />} />
          <Route path="/soutien" element={<Soutien />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div className="ticks" />
      <Footer />
    </Router>
  )
}

export default App
