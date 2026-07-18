import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function CopyableBlock({ content, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="copyable-block">
      <div className="copyable-content">{content}</div>
      <button
        className={`copy-button ${copied ? 'copied' : ''}`}
        onClick={handleCopy}
        title={copied ? 'Copié !' : 'Copier'}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="copy-icon"
        >
          {copied ? (
            <>
              <polyline points="20 6 9 17 4 12"></polyline>
            </>
          ) : (
            <>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </>
          )}
        </svg>
      </button>
    </div>
  )
}

export default function About() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">L'équipe</p>
        <h1>EuroBazar</h1>
        <p>Bazar, magasin, épicerie, caserne... EuroBazar réunit des produits choisis avec soin, des boutiques locales et une équipe engagée pour votre satisfaction.</p>
      </header>

      <div className="paragraphe">
        <p>EUROBAZAR est un ensemble de commerces alimentaire et ménagère depuis 1995, se situant principalement dans le département du Val-de-Marne.</p>
        <p>
          Depuis notre création, nous avons à cœur de proposer une expérience d'achat simple.
          Nos boutiques sont conçues pour vous aider à trouver des produits originaux, du quotidien aux découvertes du moment.
        </p>
        <p>
          Notre équipe travaille chaque jour pour offrir un service chaleureux, des conseils personnalisés et des services de proximité.
        </p>
      </div>
      <div className="about-profile">
        <div className="paragraphe">
          <h3>Saïd DOUICH</h3>
          <p>
            Gérant d'EUROBAZAR depuis juin 2015, il est en tête de tous la gestion et services relatifs au sein du magazin.
          </p>
          <div className='pied'><CopyableBlock content="06 18 78 06 99" label="Copier le numéro" /></div>
        </div>
        <div className="store-image-pane">
          <img src="public/assets/images/favicon.png" style={{height: "48vh"}}></img>
        </div>
      </div>
      <div className="social-block">
        <h2>Une question ?</h2>
        <div className="desktop-links panneau">
          <Link to="/contact">Contactez-nous !</Link>
          <Link to="/help">Centre d'aide</Link>
        </div>
      </div>
    </section>
  )
}