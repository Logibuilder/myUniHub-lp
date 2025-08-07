import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import styles from '../../../styles/navigation.module.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.navBrand}>
          <div className={styles.logoIcon}>
            <Sparkles size={20} />
          </div>
          <h1 className={styles.brandName}>MyUniHub</h1>
        </div>

        {/* Navigation desktop */}
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            <button onClick={() => scrollToSection('features')} className={styles.navLink}>
              Fonctionnalités
            </button>
            <button onClick={() => scrollToSection('about')} className={styles.navLink}>
              À propos
            </button>
            <button onClick={() => scrollToSection('help')} className={styles.navLink}>
              Aide
            </button>
            <button onClick={() => scrollToSection('contact')} className={styles.navLink}>
              Contact
            </button>
            <button className={styles.navLink}>Connexion</button>
          </div>
        </div>

        {/* Bouton menu mobile */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <button
          onClick={() => scrollToSection('features')}
          className={styles.mobileNavLink}
        >
          Fonctionnalités
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className={styles.mobileNavLink}
        >
          À propos
        </button>
        <button
          onClick={() => scrollToSection('help')}
          className={styles.mobileNavLink}
        >
          Aide
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={styles.mobileNavLink}
        >
          Contact
        </button>
        <button className={styles.mobileNavLink}>
          Connexion
        </button>
      
      </div>
    </nav>
  );
};

export default Navigation;