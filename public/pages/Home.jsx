import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './leafletSetup.js'
import shops from '../data/shops.json'
import titleSvg from '../assets/images/title.svg'
import { Link } from 'react-router-dom'

const shopImagesBasePath = './public/assets/images/magasins/'
const weekdayKeys = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const shopList = Object.values(shops)

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

function MapUpdater({ selected, shopList }) {
  const map = useMap()

  useEffect(() => {
    const shop = shopList.find((s) => s.id === selected)
    if (shop && map) {
      map.setView([shop.coords.lat, shop.coords.lon], map.getZoom(), { animate: true })
    }
  }, [selected, shopList, map])

  return null
}

export default function Home() {
  const [selected, setSelected] = useState('kb')

  return (
    <>
      <section id="center">
        <div style={{textAlign: 'center'}}>
          <p>Bienvenue chez</p>
          <img src={titleSvg} style={{width:'800px'}} alt="EuroBazar"/>
        </div>
      </section>

      <div className="ticks" />

      <section id="main-content">
        <div
          id="locations"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${shops[selected].images && shops[selected].images.length > 0 ? `${shopImagesBasePath}${shops[selected].images[0]}` : ''})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <h2 style={{ color: '#fff' }}>Retrouvez-nous !</h2>
          <div className="locations-inner">
            <div className="map-pane">
              <div className="location-card">
                <button
                  className="arrow left"
                  onClick={() => {
                    const idx = shopList.findIndex((s) => s.id === selected)
                    const prev = shopList[(idx - 1 + shopList.length) % shopList.length]
                    setSelected(prev.id)
                  }}
                  aria-label="Ville précédente"
                  style={{color: "#333"}}
                />

                <div className="location-content" style={{color: "#333"}}>
                  {(() => {
                    const shop = shops[selected]
                    const { todayLabel, tomorrowLabel } = formatTodayTomorrowHours(shop.hours)
                    return (
                      <>
                        <h3>{shop.name} {shop.city}</h3>
                        <div className="address">
                          {shop.addressLines.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                        <div className="hours">
                          <div>{todayLabel}</div>
                          <div>{tomorrowLabel}</div>
                        </div>
                      </>
                    )
                  })()}
                </div>

                <button
                  className="arrow right"
                  onClick={() => {
                    const idx = shopList.findIndex((s) => s.id === selected)
                    const next = shopList[(idx + 1) % shopList.length]
                    setSelected(next.id)
                  }}
                  aria-label="Ville suivante"
                  style={{color: "#333"}}
                />
              </div>

              <div className="dots-bar">
                {shopList.map((shop) => (
                  <button
                    key={shop.id}
                    className={`dot ${selected === shop.id ? 'current' : ''}`}
                    onClick={() => setSelected(shop.id)}
                    aria-label={`Aller à ${shop.city}`}
                  />
                ))}
              </div>
            </div>

            <div className="map-pane">
              <div className="map">
                <MapContainer
                  center={[shopList[0].coords.lat, shopList[0].coords.lon]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <MapUpdater selected={selected} shopList={shopList} />
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {shopList.map((shop) => (
                    <Marker key={shop.id} position={[shop.coords.lat, shop.coords.lon]}>
                      <Popup>
                        <strong>{shop.name}</strong>
                        <div>{shop.addressLines.join(', ')}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="paragraphe contact-store-hours">
          <p>
            <h2>Des questions, répondus ici.</h2>
            Le site web regroupe tous sujets concernant le magasin et ses questions fréquentes.<br/>
            Vous pouvez les trouver dans le <b>Centre d'aide</b>.
          </p>
          <div className="desktop-links panneau">
            <Link to="/help">Centre d'aide</Link>
          </div>
        </div>
      </section>
    </>
  )
}
