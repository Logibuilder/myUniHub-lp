// components/landing/HelpSection.jsx
import React from 'react';

const HelpCategory = ({ icon, title, items }) => {
  return (
    <div className="help-category">
      <div className="help-icon">{icon}</div>
      <h3>{title}</h3>
      <div className="help-items">
        {items.map((item, index) => (
          <div key={index} className="help-item">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  return (
    <div className="faq-item">
      <h4>{question}</h4>
      <p>{answer}</p>
    </div>
  );
};

const HelpSection = () => {
  const helpCategories = [
    {
      icon: "🚀",
      title: "Premiers Pas",
      items: [
        {
          title: "Comment créer mon compte ?",
          description: "Inscrivez-vous en quelques clics avec votre email universitaire pour bénéficier de toutes les fonctionnalités."
        },
        {
          title: "Configuration de l'emploi du temps",
          description: "Importez votre emploi du temps ou créez-le manuellement. MyUniHub s'adapte à tous les formats."
        },
        {
          title: "Ajout de vos matières",
          description: "Personnalisez vos matières avec des couleurs et organisez-les selon vos préférences."
        }
      ]
    },
    {
      icon: "📝",
      title: "Prise de Notes",
      items: [
        {
          title: "Partage de notes avec permissions",
          description: "Cliquez sur le bouton \"Partager\" dans vos notes pour les envoyer à vos camarades avec des droits de lecture ou d'édition."
        },
        {
          title: "Génération de QCM avec l'IA",
          description: "Sélectionnez une note et cliquez sur \"Générer QCM\" pour créer automatiquement des questions de révision personnalisées."
        },
        {
          title: "Organiser vos notes",
          description: "Vos notes sont automatiquement classées par matière et par date pour un accès rapide."
        },
        {
          title: "Bibliothèque de QCM",
          description: "Accédez à tous vos QCM sauvegardés dans la section \"Révisions\" pour des sessions d'entraînement répétées."
        }
      ]
    },
    {
      icon: "🤝",
      title: "Collaboration",
      items: [
        {
          title: "Comment partager une note ?",
          description: "Ouvrez votre note, cliquez sur \"Partager\", sélectionnez vos contacts et choisissez les permissions (lecture ou édition)."
        },
        {
          title: "Créer un groupe de travail",
          description: "Dans la section \"Groupes\", cliquez sur \"Nouveau groupe\", ajoutez les membres et définissez la matière associée."
        },
        {
          title: "Utiliser le chat de groupe",
          description: "Accédez au chat depuis votre groupe de travail pour communiquer en temps réel et partager des fichiers."
        }
      ]
    },
    {
      icon: "🤖",
      title: "IA & Révisions",
      items: [
        {
          title: "Comment générer un QCM ?",
          description: "Ouvrez une note et cliquez sur le bouton \"Générer QCM\". L'IA analysera le contenu et créera des questions adaptées."
        },
        {
          title: "Personnaliser la difficulté",
          description: "Choisissez le niveau de difficulté (Facile, Moyen, Difficile) avant la génération pour adapter les questions à vos besoins."
        },
        {
          title: "Suivi des performances",
          description: "Consultez vos statistiques de révision pour identifier les sujets à approfondir et suivre vos progrès."
        }
      ]
    },
    {
      icon: "⚙️",
      title: "Paramètres",
      items: [
        {
          title: "Personnalisation de l'interface",
          description: "Adaptez les couleurs, la disposition et les notifications selon vos préférences."
        },
        {
          title: "Synchronisation des données",
          description: "Vos données sont automatiquement sauvegardées et synchronisées sur tous vos appareils."
        },
        {
          title: "Exportation des notes",
          description: "Exportez vos notes en PDF ou autres formats pour les partager ou les imprimer."
        }
      ]
    }
  ];

  const faqItems = [
    {
      question: "Comment fonctionne le partage de notes ?",
      answer: "Vous pouvez partager vos notes avec des camarades en définissant des permissions précises : lecture seule ou édition collaborative. Le destinataire reçoit une notification et peut accéder à la note depuis son tableau de bord."
    },
    {
      question: "Le chat est-il sécurisé ?",
      answer: "Oui, toutes les communications sont chiffrées de bout en bout. Seuls les membres du groupe peuvent accéder aux conversations et aux fichiers partagés."
    },
    {
      question: "Comment fonctionne l'IA de génération de QCM ?",
      answer: "L'IA analyse le contenu de vos notes, identifie les concepts clés et génère automatiquement des questions pertinentes avec des réponses multiples. Plus vos notes sont détaillées, meilleurs sont les QCM générés."
    },
    {
      question: "Puis-je modifier les QCM générés ?",
      answer: "Oui, vous pouvez éditer les questions et réponses générées par l'IA pour les adapter parfaitement à vos besoins de révision."
    },
    {
      question: "MyUniHub est-il gratuit ?",
      answer: "Oui, MyUniHub offre une version gratuite avec toutes les fonctionnalités essentielles. Des options premium sont disponibles pour des besoins avancés."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire et ne partageons jamais vos données personnelles."
    }
  ];

  return (
    <section id="help" className="help-section">
      <div className="container">
        <h2 className="section-title">Centre d'Aide</h2>
        <div className="help-grid">
          {helpCategories.map((category, index) => (
            <HelpCategory
              key={index}
              icon={category.icon}
              title={category.title}
              items={category.items}
            />
          ))}
        </div>
        
        <div className="faq-section">
          <h3>Questions Fréquentes</h3>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;