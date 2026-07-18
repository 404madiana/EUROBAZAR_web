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

export default function Contact() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">Nous</p>
        <h1>contacter</h1>
        <p>Pour les appels téléphoniques, veuillez prendre connaissance des horaires des magasins.</p>
        <p>PRO TIP : Vous pouvez nous joindre directement au magasin EUROBAZAR Kremlin-Bicêtre :^)</p>
      </header>

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
