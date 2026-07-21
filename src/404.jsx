// src/404.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TITLES = [
  "Page introuvable",
  "Vous êtes sûr de l'orthographe du lien ?",
  "Pas de page associé dsl",
  "La page a pris sa pause café",
  "La page a fui du magasin comme son propriétaire",
  "Essayez d'autres pages pour voir ?",
  "salam oe, non c fermé",
  "\"For example, nothing.\" - Mbappé, 2026",
  "La page s'est fait cambriolé !???",
];

const REFRESH_KEY = "eurobazar_404_refresh_count";
const BONUS_TITLE = "Vaut mieux reporter ce problème sur GitHub nan?";
const VALID_PAGES = ["/", "/stores", "/about", "/contact", "/help"];

export default function NotFound() {
  const location = useLocation();
  const didRun = useRef(false);

  const [title, setTitle] = useState(TITLES[0]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    // get count
    const currentCount = Number(window.localStorage.getItem(REFRESH_KEY)) || 0;
    const newCount = currentCount + 1;
    // localStorage count
    window.localStorage.setItem(REFRESH_KEY, String(newCount));
    setRefreshCount(newCount);

    // tous les 10 reloads
    if (newCount % 10 === 0) { setTitle(BONUS_TITLE); }
    else {
      const randomIndex = Math.floor(Math.random() * TITLES.length);
      setTitle(TITLES[randomIndex]);
    }
  }, []);

  useEffect(() => {
    if (VALID_PAGES.includes(location.pathname)) {
      window.localStorage.setItem(REFRESH_KEY, "0");
      setRefreshCount(0);
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1>404 :/</h1>
      <h2>{title}</h2>

      <p>
        La page que vous cherchez n’existe pas ou a été déplacée.<br/>
        Pensez à vérifier le lien s'il y a faute de frappe.
      </p>
      <p>
        Si le problème persiste, veuillez le reporter sur <a href="https://github.com/404madiana/EUROBAZAR_web/issues/new">GitHub</a>.
      </p>

      <Link to="/" style={{ color: "#0077ff" }}>
        Retour à l’accueil
      </Link>
      <Link to="https://github.com/404madiana/EUROBAZAR_web/issues/new" style={{ color: "var(--accent-github)" }}>
        Signaler ce problème (nouvelle issue GitHub).
      </Link>
    </div>
  );
}