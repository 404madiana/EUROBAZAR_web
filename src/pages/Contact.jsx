import React, { useState } from 'react'
import shops from '../data/shops.json'

const weekdayKeys = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function formatTodayTomorrowHours(hoursObj) {
  const today = new Date().getDay()
  const todayKey = weekdayKeys[today]
  const tomorrowKey = weekdayKeys[(today + 1) % 7]
  return {
    todayLabel: `Aujourd'hui : ${hoursObj[todayKey] || 'Fermé'}`,
    tomorrowLabel: `Demain : ${hoursObj[tomorrowKey] || 'Fermé'}`,
  }
}

const shopList = Object.values(shops)

function CopyableBlock({ content, label }) { // fnc pour copie des tel
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
        style={{borderColor: "var(--text)", color: "var(--text)"}}
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

export default function Contact() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">Nous</p>
        <h1>contacter</h1>
        <p>Pour les appels téléphoniques, veuillez prendre connaissance des horaires des magasins.</p>
        <p>PRO TIP : Vous pouvez nous retrouver directement au magasin EUROBAZAR Kremlin-Bicêtre :^)</p>
      </header>
      <div className="paragraphe texte-hi" style={{backgroundColor: "var(--location-card)"}}>
        <h2 className='texte-hi'>Par téléphone</h2>
        <div className='contact-store-hours'>
          <div style={{width: '90%'}}>
            <div className="tel-titre">
              <h3>Portable</h3>
              <p style={{color: "var(--accent-github)"}}>(recommandé)</p>
            </div>
            <CopyableBlock content="06 18 78 06 99" label="Copier le numéro" />
          </div>
          <div>
            <div className="tel-titre">
              <h3>Fixe</h3>
            </div>
            <CopyableBlock content="01 49 87 02 98" label="Copier le numéro" />
          </div>
        </div>
      </div>
      <div className="paragraphe">
        <h2>Horaires</h2>
        <div className="store-hours contact-store-hours">
          {shopList.map((shop) => {
            const { todayLabel, tomorrowLabel } = formatTodayTomorrowHours(shop.hours)
            return (
              <div key={shop.id}>
                <h3>{shop.name} {shop.city}</h3>
                <div className="hours">
                  <div>{todayLabel}</div>
                  <div>{tomorrowLabel}</div>
                </div>
                <div className="weekly-hours">
                  <strong>La semaine</strong>
                  <ul>
                    {Object.entries(shop.hours).map(([day, hours]) => (
                      <li key={day}>
                        {capitalize(day)} : {hours || 'Fermé'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
