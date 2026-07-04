import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './leafletSetup.js'
import shops from '../data/shops.json'

const shopList = Object.values(shops)

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
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
        {shopList.map((shop, index) => (
          <div key={shop.id} className="store-section">
            {/* Info + Map */}
            <div className="store-info-map">
              <div className="store-info">
                <h2>{shop.name}</h2>
                <div className="store-address">
                  {shop.addressLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                {shop.phone && <div className="store-phone">{shop.phone}</div>}
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
                  style={{ height: '100%', width: '100%' }}
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
            {shop.images && shop.images.length > 0 && (
              <div className="store-showcase">
                <div className="store-showcase-content">
                  <h3>Un aperçu de EUROBAZAR {shop.name}</h3>
                  <div className="store-image-pane map-pane">
                    <img 
                      src={shop.images[0]} 
                      alt={`${shop.name} showcase`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
