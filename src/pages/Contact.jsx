export default function Contact() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">Nous</p>
        <h1>contacter</h1>
        <p>Une question, une demande ou besoin d'un renseignement ? Écrivez-nous ou passez en boutique.</p>
      </header>

      <div className="contact-grid">
        <div className="contact-card">
          <h2>Informations</h2>
          <p>Téléphone : <strong>+33 1 23 45 67 89</strong></p>
          <p>Email : <strong>contact@eurobazar.example</strong></p>
          <p>Adresse : <strong>5 rue du Commerce, 75001 Paris</strong></p>
          <p>Horaires du service client : 9h - 18h du lundi au vendredi</p>
        </div>

        <form className="contact-form">
          <label>
            Votre nom
            <input type="text" placeholder="Nom" />
          </label>
          <label>
            Votre email
            <input type="email" placeholder="email@example.com" />
          </label>
          <label>
            Votre message
            <textarea placeholder="Votre message..." rows="6" />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </section>
  )
}
