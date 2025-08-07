// components/landing/ContactSection.jsx
import React, { useState } from 'react';

const ContactMethod = ({ icon, title, info, subtitle }) => {
  return (
    <div className="contact-method">
      <div className="contact-icon">{icon}</div>
      <div className="contact-details">
        <h4>{title}</h4>
        <p>{info}</p>
        <small>{subtitle}</small>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setSubmitStatus('Message envoyé !');
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus('');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      info: "support@myunihub.fr",
      subtitle: "Réponse sous 24h"
    },
    {
      icon: "💬",
      title: "Chat en Direct",
      info: "Assistance instantanée",
      subtitle: "Lun-Ven 9h-18h"
    },
    {
      icon: "📱",
      title: "Réseaux Sociaux",
      info: "@MyUniHub",
      subtitle: "Actualités et conseils"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title" style={{ color: 'white' }}>Nous Contacter</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Besoin d'aide ou de suggestions ?</h3>
            <p>
              Notre équipe est là pour vous accompagner dans votre réussite universitaire. 
              N'hésitez pas à nous contacter pour toute question ou suggestion d'amélioration.
            </p>
            
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <ContactMethod
                  key={index}
                  icon={method.icon}
                  title={method.title}
                  info={method.info}
                  subtitle={method.subtitle}
                />
              ))}
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="support">Support technique</option>
                  <option value="suggestion">Suggestion d'amélioration</option>
                  <option value="bug">Signaler un bug</option>
                  <option value="partnership">Partenariat</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours...' : submitStatus || 'Envoyer le Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;