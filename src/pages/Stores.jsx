import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './leafletSetup.js'
import shops from '../data/shops.json'

const shopList = Object.values(shops)

export default function Stores() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">Nos</p>
        <h1>magasins</h1>
        <p>Nos magasins se situent principalement dans le département du Val-de-Marne.<br/>
Retrouvez-les ci-dessous.</p>
      </header>

      <div className="stores-grid">
        <div className="store-list">
          {shopList.map((shop) => (
            <article key={shop.id} className="store-card">
              <h2>{shop.name}</h2>
              <div className="store-address">
                {shop.addressLines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
              <div className="store-hours">
                <strong>Horaires :</strong>
                <ul>
                  {Object.entries(shop.hours).map(([day, hours]) => (
                    <li key={day}>
                      {day[0].toUpperCase() + day.slice(1)} : {hours || 'Fermé'}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="store-map">
          <MapContainer
            center={[shopList[0].coords.lat, shopList[0].coords.lon]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
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
    </section>
  )
}
