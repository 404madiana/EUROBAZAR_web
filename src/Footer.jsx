import React from 'react';
import { Link } from 'react-router-dom'
import titleSvg from './../public/assets/img/title.svg'

const Footer = () => {
  return (
    <footer>
      <div className='siege'>

        <Link to="/" aria-label="Retour à l'accueil">
          <img src={titleSvg} style={{width:'300px'}} alt="EuroBazar"/>
        </Link>
        <p>&copy; 1995 EUROBAZAR</p>
        <p>36 Avenue de Fontainebleau</p>
        <p>94270 Le Kremlin-Bicêtre</p>
      </div>
      <div className="desktop-links carrefour">
        <Link to="/stores">Nos magasins</Link>
        <Link to="/about">À propos de nous</Link>
        <Link to="/contact">Nous contacter</Link>
        <Link to="/help">Centre d'aide</Link>
        <Link to="https://github.com/404madiana/EUROBAZAR_web" style={{color: '#ffff00'}}>Projet du site web (GitHub)</Link>
      </div>
    </footer>
  );
};

export default Footer;