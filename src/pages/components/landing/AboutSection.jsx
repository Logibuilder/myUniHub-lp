// components/landing/AboutSection.jsx
import React from 'react';

const AboutSection = () => {
  const stats = [
    { number: '95%', label: 'Temps de recherche économisé' },
    { number: '3x', label: 'Plus d\'efficacité en révision' },
    { number: '100%', label: 'Satisfaction étudiante' }
  ];

  const benefits = [
    'Gain de temps : Plus besoin de jongler entre plusieurs applications',
    'Organisation optimale : Structure claire et intuitive',
    'Synchronisation parfaite : Emploi du temps et notes liés',
    'Suivi de progression : Visualisez votre avancement par matière',
    'Interface moderne : Design pensé pour l\'efficacité'
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">À Propos de MyUniHub</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Notre Mission</h3>
            <p>
              MyUniHub a été créé par des étudiants, pour des étudiants. Nous comprenons les défis 
              quotidiens de la vie universitaire : jongler entre différentes matières, organiser ses notes, 
              suivre son emploi du temps, et réviser efficacement.
            </p>
            
            <h3>Notre Vision</h3>
            <p>
              Nous croyons que chaque étudiant mérite d'avoir les meilleurs outils pour réussir. 
              C'est pourquoi nous avons développé une solution tout-en-un qui centralise l'essentiel 
              de votre vie académique en un seul endroit.
            </p>
            
            <h3>Pourquoi MyUniHub ?</h3>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index}>✅ <strong>{benefit.split(':')[0]}:</strong> {benefit.split(':')[1]}</li>
              ))}
            </ul>
          </div>
          
          <div className="about-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;