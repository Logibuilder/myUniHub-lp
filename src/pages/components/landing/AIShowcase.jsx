// components/landing/AIShowcase.jsx
import React, { useState } from 'react';

const AIShowcase = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateQCM = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      
      setTimeout(() => {
        setIsGenerated(false);
      }, 3000);
    }, 2000);
  };

  const aiFeatures = [
    {
      icon: "🧠",
      title: "Génération Automatique de QCM",
      description: "L'IA analyse le contenu de vos notes et génère automatiquement des questions à choix multiples adaptées au niveau de difficulté souhaité."
    },
    {
      icon: "💾",
      title: "Sauvegarde Intelligente",
      description: "Tous les QCM générés sont automatiquement sauvegardés dans votre bibliothèque de révision pour un accès ultérieur."
    },
    {
      icon: "📊",
      title: "Suivi de Performance",
      description: "Analysez vos résultats et identifiez les points à améliorer grâce aux statistiques détaillées de vos sessions de révision."
    },
    {
      icon: "🎯",
      title: "Révision Adaptative",
      description: "L'IA adapte la difficulté et le type de questions selon vos performances passées pour maximiser votre apprentissage."
    }
  ];

  return (
    <section className="ai-showcase">
      <div className="container">
        <h2 className="section-title">Intelligence Artificielle Intégrée</h2>
        <div className="ai-content">
          <div className="ai-description">
            <h3>🤖 Révolutionnez vos Révisions avec l'IA</h3>
            <p>
              MyUniHub intègre une intelligence artificielle avancée qui transforme vos notes de cours 
              en outils de révision interactifs et personnalisés.
            </p>
            
            <div className="ai-features">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="ai-feature">
                  <div className="ai-feature-icon">{feature.icon}</div>
                  <div className="ai-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="ai-demo">
            <div className="demo-container">
              <div className="demo-header">
                <h4>📝 Note: Algorithmes de Tri</h4>
                <button 
                  className={`generate-btn ${isGenerating ? 'generating' : ''} ${isGenerated ? 'generated' : ''}`}
                  onClick={handleGenerateQCM}
                  disabled={isGenerating}
                >
                  {isGenerating ? '🔄 Génération...' : isGenerated ? '✅ QCM Généré !' : '🤖 Générer QCM'}
                </button>
              </div>
              
              <div className="note-preview">
                <p><strong>Le tri par fusion (merge sort)</strong> est un algorithme de tri stable qui divise récursivement le tableau en deux moitiés, trie chaque moitié, puis fusionne les résultats.</p>
                <p><strong>Complexité:</strong> O(n log n) dans tous les cas</p>
                <p><strong>Avantages:</strong> Stable, prévisible, efficace sur de grandes données</p>
              </div>
              
              <div className={`qcm-preview ${isGenerated ? 'visible' : ''}`}>
                <div className="qcm-header">
                  <h5>🤖 QCM Généré Automatiquement</h5>
                  <span className="qcm-badge">Sauvegardé</span>
                </div>
                
                <div className="question">
                  <h6>Question 1/5: Quelle est la complexité temporelle du tri par fusion ?</h6>
                  <div className="options">
                    <label className="option">
                      <input type="radio" name="q1" value="a" />
                      <span>A) O(n²)</span>
                    </label>
                    <label className="option correct">
                      <input type="radio" name="q1" value="b" />
                      <span>B) O(n log n)</span>
                    </label>
                    <label className="option">
                      <input type="radio" name="q1" value="c" />
                      <span>C) O(n)</span>
                    </label>
                    <label className="option">
                      <input type="radio" name="q1" value="d" />
                      <span>D) O(log n)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;