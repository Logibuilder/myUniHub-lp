// components/landing/FeaturesSection.jsx
import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: "📅",
      title: "Emploi du Temps Intelligent",
      description: "Visualisez votre journée en un clin d'œil avec un tableau de bord intuitif. Chaque session de votre emploi du temps devient un point d'entrée vers vos prises de notes associées."
    },
    {
      icon: "📝",
      title: "Prise de Notes Révolutionnaire",
      description: "Organisez vos notes par matière et par séance. Retrouvez facilement vos cours grâce à une structure claire et intuitive qui suit votre emploi du temps."
    },
    {
      icon: "🤝",
      title: "Collaboration & Partage",
      description: "Partagez vos notes avec vos camarades et collaborez en temps réel. Système de chat intégré pour faciliter le travail de groupe et les échanges académiques."
    },
    {
      icon: "🤖",
      title: "IA de Révision Intelligente",
      description: "Générez automatiquement des QCM personnalisés à partir de vos notes de cours. L'IA analyse votre contenu et crée des questions de révision adaptées à votre niveau."
    },
    {
      icon: "📚",
      title: "Suivi Personnalisé",
      description: "Toutes vos matières au même endroit avec un code couleur unique. Visualisez votre progression et identifiez les sujets à approfondir."
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Fonctionnalités Principales</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;