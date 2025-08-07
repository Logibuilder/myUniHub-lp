// components/landing/CTASection.jsx
import React from 'react';

const CTASection = () => {
  const handleGetStarted = () => {
    // Ici vous pouvez rediriger vers la page d'inscription ou ouvrir un modal
    console.log('Redirection vers l\'inscription');
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Prêt à Révolutionner Votre Vie Universitaire ?</h2>
          <p>MyUniHub est plus qu'une simple application, c'est votre partenaire de réussite universitaire.</p>
          <button onClick={handleGetStarted} className="cta-button-secondary">
            Commencer Maintenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;