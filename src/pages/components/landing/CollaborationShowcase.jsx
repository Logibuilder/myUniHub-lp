// components/landing/CollaborationShowcase.jsx
import React, { useState } from 'react';

const CollaborationShowcase = () => {
  const [message, setMessage] = useState('');
  const [selectedContacts, setSelectedContacts] = useState(['thomas', 'marie']);
  const [permission, setPermission] = useState('read');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Ici vous pourriez ajouter la logique d'envoi
      console.log('Message envoyé:', message);
      setMessage('');
    }
  };

  const handleContactToggle = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const collaborationFeatures = [
    {
      icon: "📤",
      title: "Partage de Notes Instantané",
      description: "Partagez vos notes avec vos camarades en un clic. Contrôlez les permissions de lecture ou d'édition pour une collaboration sécurisée."
    },
    {
      icon: "💬",
      title: "Chat Intégré par Matière",
      description: "Communiquez directement dans la plateforme avec des conversations organisées par matière et par groupe de travail."
    },
    {
      icon: "👥",
      title: "Groupes de Travail",
      description: "Créez des espaces collaboratifs dédiés à vos projets avec partage de fichiers, planning commun et suivi des tâches."
    },
    {
      icon: "🔄",
      title: "Synchronisation en Temps Réel",
      description: "Toutes les modifications et nouveaux messages sont synchronisés instantanément entre tous les membres du groupe."
    }
  ];

  const contacts = [
    { id: 'thomas', name: 'Thomas Martin', avatar: '👨‍🎓' },
    { id: 'marie', name: 'Marie Dubois', avatar: '👩‍🎓' },
    { id: 'lucas', name: 'Lucas Bernard', avatar: '👨‍🎓' }
  ];

  return (
    <section className="collaboration-showcase">
      <div className="container">
        <h2 className="section-title">Collaboration & Travail en Groupe</h2>
        <div className="collab-content">
          <div className="collab-description">
            <h3>🤝 Travaillez Ensemble, Réussissez Ensemble</h3>
            <p>
              MyUniHub transforme la collaboration étudiante avec des outils de partage et de communication 
              intégrés, conçus spécialement pour les projets de groupe et l'entraide académique.
            </p>
            
            <div className="collab-features">
              {collaborationFeatures.map((feature, index) => (
                <div key={index} className="collab-feature">
                  <div className="collab-feature-icon">{feature.icon}</div>
                  <div className="collab-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="collab-demo">
            <div className="demo-container-collab">
              {/* Chat Interface */}
              <div className="chat-interface">
                <div className="chat-header">
                  <h4>💬 Groupe: Projet Base de Données</h4>
                  <div className="online-indicators">
                    <span className="online-dot"></span>
                    <span className="member-count">3 en ligne</span>
                  </div>
                </div>
                
                <div className="chat-messages">
                  <div className="message received">
                    <div className="message-avatar">👨‍🎓</div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="sender">Thomas</span>
                        <span className="time">14:32</span>
                      </div>
                      <p>Salut ! J'ai partagé mes notes sur les requêtes SQL complexes 📝</p>
                    </div>
                  </div>
                  
                  <div className="shared-note">
                    <div className="note-icon">📄</div>
                    <div className="note-info">
                      <h5>Notes: Requêtes SQL Avancées</h5>
                      <p>Partagé par Thomas • 15 min</p>
                    </div>
                    <button className="view-note-btn">Voir</button>
                  </div>
                  
                  <div className="message sent">
                    <div className="message-content">
                      <div className="message-header">
                        <span className="sender">Vous</span>
                        <span className="time">14:35</span>
                      </div>
                      <p>Parfait ! Je vais les consulter pour notre présentation de demain 👍</p>
                    </div>
                    <div className="message-avatar">👩‍🎓</div>
                  </div>
                  
                  <div className="message received">
                    <div className="message-avatar">👨‍🎓</div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="sender">Marie</span>
                        <span className="time">14:38</span>
                      </div>
                      <p>J'ai terminé la partie sur les jointures. On se retrouve en salle info à 16h ? 🕐</p>
                    </div>
                  </div>
                </div>
                
                <form className="chat-input" onSubmit={handleSendMessage}>
                  <input 
                    type="text" 
                    placeholder="Tapez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" className="send-btn">📤</button>
                </form>
              </div>
              
              {/* Share Interface */}
              <div className="share-interface">
                <div className="share-header">
                  <h4>📤 Partager une Note</h4>
                </div>
                
                <div className="note-to-share">
                  <h5>📝 Modélisation Relationnelle - Cours 3</h5>
                  <p>Dernière modification: il y a 2h</p>
                </div>
                
                <div className="share-options">
                  <h6>Partager avec:</h6>
                  <div className="share-contacts">
                    {contacts.map(contact => (
                      <div key={contact.id} className="contact-item">
                        <div className="contact-avatar">{contact.avatar}</div>
                        <span>{contact.name}</span>
                        <input 
                          type="checkbox" 
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleContactToggle(contact.id)}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="permission-settings">
                    <label>
                      <input 
                        type="radio" 
                        name="permission" 
                        value="read" 
                        checked={permission === 'read'}
                        onChange={(e) => setPermission(e.target.value)}
                      />
                      Lecture seule
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="permission" 
                        value="edit"
                        checked={permission === 'edit'}
                        onChange={(e) => setPermission(e.target.value)}
                      />
                      Lecture et édition
                    </label>
                  </div>
                  
                  <button className="share-btn">🚀 Partager la Note</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationShowcase;