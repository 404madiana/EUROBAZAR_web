import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './leafletSetup.js'
import shops from '../data/shops.json'

const shopList = Object.values(shops)
const shopImagesBasePath = '/public/assets/images/magasins/'

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

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
        className="copy-button"
        onClick={handleCopy}
        title={copied ? 'Copié !' : 'Copier'}
        aria-label={`Copier ${label}`}
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

function StoreSection({ shop }) {
  const [imgIndex, setImgIndex] = useState(0)
  const images = shop.images || []
  const n = images.length

  const prevImage = () => {
    if (n === 0) return
    setImgIndex((i) => (i - 1 + n) % n)
  }

  const nextImage = () => {
    if (n === 0) return
    setImgIndex((i) => (i + 1) % n)
  }

  return (
    <div key={shop.id} className="store-section">
      {/* Info + Map */}
      <div className="store-info-map">
        <div className="store-info">
          <h2>{shop.name}</h2>
          <h2>{shop.city}</h2>
          <CopyableBlock
            content={shop.addressLines.join('\n')}
            label="Adresse"
          />
          {shop.phone && (
            <CopyableBlock
              content={shop.phone}
              label="Téléphone"
            />
          )}
          <div className="store-hours">
            <strong>Horaires :</strong>
            <ul>
              {Object.entries(shop.hours).map(([day, hours]) => (
                <li key={day}>
                  {capitalize(day)} : {hours || 'Fermé'}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="store-map-pane map-pane">
          <MapContainer
            center={[shop.coords.lat, shop.coords.lon]}
            zoom={14}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[shop.coords.lat, shop.coords.lon]}>
              <Popup>
                <strong>{shop.name}</strong>
                <div>{shop.addressLines.join(', ')}</div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Showcase Image */}
      <div className="store-showcase">
        <button
          className="arrow left"
          onClick={prevImage}
          aria-label="Image précédente"
        />

        <div className="location-content">
          {n > 0 && (
            <div className="store-showcase-content">
              <h3>Un aperçu de {shop.name} {shop.city}</h3>
              <div className="store-image-pane map-pane">
                <img
                  src={`${shopImagesBasePath}${images[imgIndex]}`}
                  alt={`${shop.city} showcase`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}
        </div>

        <button
          className="arrow right"
          onClick={nextImage}
          aria-label="Image suivante"
        />
      </div>
    </div>
  )
}

export default function Stores() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">Nos</p>
        <h1>magasins</h1>
        <p>Nos magasins se situent principalement dans le département du Val-de-Marne.<br/>
Retrouvez-les ci-dessous.</p>
      </header>

      <div className="stores-container">
        {shopList.map((shop) => (
          <StoreSection key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  )
}
