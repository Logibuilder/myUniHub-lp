// components/landing/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Fonctionnalités', href: '#features' },
      { name: 'Tarifs', href: '#pricing' },
      { name: 'Sécurité', href: '#security' },
      { name: 'API', href: '#api' }
    ],
    support: [
      { name: 'Centre d\'aide', href: '#help' },
      { name: 'Contact', href: '#contact' },
      { name: 'Statut', href: '#status' },
      { name: 'Communauté', href: '#community' }
    ],
    company: [
      { name: 'À propos', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Carrières', href: '#careers' },
      { name: 'Presse', href: '#press' }
    ],
    legal: [
      { name: 'Confidentialité', href: '#privacy' },
      { name: 'Conditions', href: '#terms' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'RGPD', href: '#gdpr' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>MyUniHub</h3>
            <p>Votre compagnon universitaire tout-en-un pour une réussite académique optimale.</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Produit</h4>
              <ul>
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Entreprise</h4>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Légal</h4>
              <ul>
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} MyUniHub. Tous droits réservés.</p>
          <p>Fait avec ❤️ pour les étudiants</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;