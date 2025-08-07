// components/landing/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>MyUniHub</h1>
        <p className="subtitle">Votre Compagnon Universitaire Tout-en-Un</p>
        <p className="hero-description">
          Simplifiez votre vie étudiante, optimisez votre réussite
        </p>
        <button 
          onClick={() => scrollToSection('features')}
          className="cta-button"
        >
          Découvrir les Fonctionnalités
        </button>
      </div>
      <div className="scroll-indicator"></div>
    </section>
  );
};

export default HeroSection;