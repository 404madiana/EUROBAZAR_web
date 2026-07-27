import React, { useState } from 'react'

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
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

const cards = [
  {
    title: 'Poche personnelle (Deblock)',
    image: './assets/images/donations/deblock.png',
    link: 'https://deblock.com/dp/qr-transfer?handle=diana104',
  },
  {
    title: 'Adresse Bitcoin',
    image: './assets/images/donations/deblock_bitcoin.png',
    link: 'bc1qsju98a5xw57prfapfvwhxkp92z6xzlu5g9k5h',
  },
  {
    title: 'PayPal',
    image: './assets/images/donations/paypal.png',
    link: 'https://www.paypal.com/qrcodes/p2pqrc/WBWAFNFH6HHSC',
  },
];

let activeCardIndex = 0;

function showCard(index) {
  const card = cards[index];
  if (card) {
    cards.forEach((c) => c.classList.remove('active'));
    card.classList.add('active');
    activeCardIndex = index;
  }
}

function swipeLeft() {
  const nextIndex = activeCardIndex + 1;
  if (nextIndex < cards.length) {
    showCard(nextIndex);
  }
}

function swipeRight() {
  const prevIndex = activeCardIndex - 1;
  if (prevIndex >= 0) {
    showCard(prevIndex);
  }
}

document.addEventListener('touchstart', (event) => {
  const card = event.target.closest('.support-account .card');
  if (card) {
    const startX = event.touches[0].clientX;
    const cardWidth = card.offsetWidth;
    const swipeThreshold = cardWidth * 0.25;

    document.addEventListener('touchmove', (moveEvent) => {
      const moveX = moveEvent.touches[0].clientX;
      const deltaX = moveX - startX;

      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          swipeRight();
        } else {
          swipeLeft();
        }
      }
    });

    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', null);
    });
  }
});

export default function Soutien() {
  return (
    <section className="page-content">
      <header className="page-header">
        <p className="eyebrow">Soutenir le</p>
        <h1>Site web</h1>
      </header>
      <div className="a-propos-profile paragraphe" style={{backgroundColor: "var(--location-card)" }} >
        <div>
          <p>
            Ce site web a été réalisé par <a href="https://github.com/404madiana/EUROBAZAR_web">Diana</a> pendant son stage ouvrier non-rémunéré de juin à juillet.
            C'est à elle que revient la <b>construction du projet de A à Z</b> pour obtenir un site web comme celle-ci.
            <br/><br/>
            L'hébergement du site ainsi que le nom de domaine <br/>(<code>www.eurobazar-kb.com</code>) sont financièrement alimentés par elle-même.<br/>
            Ceci dit, le site risque de ne plus être en ligne si les fonds mensuelles ne sont pas suffisantes, les fonds pour le site étant indépendants de la caisse d'EUROBAZAR.
            <br/><br/>
            Pour empêcher la fermeture du site web, vous pouvez soutenir Diana avec les moyens multiples ci-dessous.
          </p>
        </div>
        <div className="store-image-pane">
          <img src="./assets/images/pcg_glv.png" className="a-propos-image"></img>
        </div>
      </div>
      <div className="ticks" />
      <div className="paragraphe options">
        <div className="qr-codes">
          <h2>Dons / pourboires</h2>
          <h4>
            Pour maintenir pécunièrement le site ✧♡ (◕‿◕ )<br/>
            Remplissez le formulaire à droite ou cliquez sur l'un des codes QR !
          </h4>
          <div className="support-account">
            {cards.map((card, index) => (
              <a
                key={index}
                className={`card ${index === activeCardIndex ? 'active' : ''}`}
                onClick={() => showCard(index)}
              >
                <img src={card.image} alt={card.title} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="donorbox-form">
          <script type="module" src="https://donorbox.org/widgets.js" async></script><dbox-widget campaign="eurobazar-kb" type="donation_form" amount="5" enable-auto-scroll="true"></dbox-widget>
        </div>
      </div>
      <div className="paragraphe options" style={{ backgroundColor: "var(--accent-github-bg)"}}>
        <div>
          <h2 className='texte-hi'>Recrutez-là!</h2>
          <p>Activement en recherche d'un <b>CDI à temps partiel</b> sur les heures de <b>weekend</b>, à partir du mois d'août.</p>
          <p>De préférence en informatique, télétravail autorisé (optionnel), dans les départements du Val-de-Marne et Paris.</p>
          <CopyableBlock content="nguyen.diana@laposte.net" label="Copier l'adresse email" />
        </div>
        <div>
          <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
          <div class="badge-base LI-profile-badge" data-locale="fr_FR" data-size="large" data-theme="light" data-type="VERTICAL" data-vanity="404-madiana" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://fr.linkedin.com/in/404-madiana?trk=profile-badge"></a></div>
        </div>
      </div>
    </section>
  )
}
