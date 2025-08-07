import React, { useEffect } from "react";

export default function Intro() {
  useEffect(() => {
    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Animation des cartes au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = Math.random() * 0.5 + 's';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observer les nouvelles sections
    document.querySelectorAll('.help-category, .stat-card, .faq-item, .ai-feature').forEach(card => {
      observer.observe(card);
    });

    // Animation du bouton de génération de QCM
    const generateBtn = document.querySelector('.generate-btn');
    if (generateBtn) {
      generateBtn.addEventListener('click', function() {
        const qcmPreview = document.querySelector('.qcm-preview');
        const btn = this;
        
        btn.innerHTML = '🔄 Génération...';
        btn.style.background = '#f59e0b';
        
        qcmPreview.style.opacity = '0.5';
        qcmPreview.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          qcmPreview.style.opacity = '1';
          qcmPreview.style.transform = 'scale(1)';
          qcmPreview.style.transition = 'all 0.5s ease';
          
          btn.innerHTML = '✅ QCM Généré !';
          btn.style.background = '#10B981';
          
          setTimeout(() => {
            btn.innerHTML = '🤖 Générer QCM';
            btn.style.background = '#ff6b6b';
          }, 2000);
        }, 1500);
      });
    }

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.background = '#10B981';
        
        setTimeout(() => {
          submitBtn.textContent = 'Message envoyé !';
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            this.reset();
          }, 2000);
        }, 1500);
      });
    }

    // Animation de la navigation au scroll
    let lastScrollTop = 0;
    const nav = document.querySelector('.main-nav');
    
    if (nav) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
        
        if (scrollTop > 50) {
          nav.style.background = 'rgba(255, 255, 255, 0.95)';
          nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
          nav.style.background = 'rgba(255, 255, 255, 0.95)';
          nav.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
      });
    }

    // Animation des cartes de matières
    document.querySelectorAll('.subject-card').forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(1deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotate(0deg)';
      });
    });

    // Parallaxe subtil pour le hero
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      });
    }

    return () => {
      // Nettoyage des event listeners
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }

        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.15"/><circle cx="90" cy="40" r="0.8" fill="white" opacity="0.12"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        .hero-content {
          max-width: 1200px;
          padding: 2rem;
          position: relative;
          z-index: 2;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          animation: slideInLeft 1.2s ease-out 0.3s both;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero .subtitle {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          margin-bottom: 2rem;
          opacity: 0.9;
          animation: slideInRight 1.2s ease-out 0.6s both;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .cta-button {
          display: inline-block;
          background: #ff6b6b;
          color: white;
          padding: 1rem 2.5rem;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
          animation: bounceIn 1.5s ease-out 0.9s both;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
          background: #ff5252;
        }

        .features {
          padding: 5rem 2rem;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-bottom: 3rem;
          color: #2d3748;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(45deg, #667eea, #764ba2);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin-bottom: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          background: linear-gradient(45deg, #667eea, #764ba2);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #2d3748;
        }

        .feature-card p {
          color: #64748b;
          line-height: 1.7;
        }

        .dashboard-preview {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          padding: 5rem 2rem;
          color: white;
          text-align: center;
        }

        .preview-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .dashboard-mockup {
          background: #1e293b;
          border-radius: 20px;
          padding: 2rem;
          margin: 3rem 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          border: 1px solid #475569;
        }

        .mockup-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #475569;
        }

        .mockup-dots {
          display: flex;
          gap: 8px;
          margin-right: 1rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .mockup-title {
          color: #e2e8f0;
          font-weight: 600;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .subject-card {
          background: #334155;
          padding: 1.5rem;
          border-radius: 15px;
          border-left: 5px solid;
          transition: all 0.3s ease;
        }

        .subject-card:hover {
          transform: scale(1.05);
          background: #475569;
        }

        .subject-card.blue { border-left-color: #3B82F6; }
        .subject-card.green { border-left-color: #10B981; }
        .subject-card.yellow { border-left-color: #F59E0B; }
        .subject-card.red { border-left-color: #EF4444; }
        .subject-card.purple { border-left-color: #8B5CF6; }
        .subject-card.pink { border-left-color: #EC4899; }

        .subject-name {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #e2e8f0;
        }

        .subject-notes {
          font-size: 0.9rem;
          color: #94a3b8;
        }

        .sessions-today {
          background: #475569;
          padding: 1.5rem;
          border-radius: 15px;
          margin-top: 2rem;
        }

        .session-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          margin-bottom: 1rem;
          background: #334155;
          border-radius: 10px;
        }

        .session-info h4 {
          color: #e2e8f0;
          margin-bottom: 0.5rem;
        }

        .session-details {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .session-type {
          background: #667eea;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .cta-section {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
          padding: 5rem 2rem;
          text-align: center;
          color: white;
        }

        .cta-content h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: clamp(1rem, 2vw, 1.2rem);
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-button-secondary {
          background: white;
          color: #ff6b6b;
          padding: 1rem 2.5rem;
          text-decoration: none;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .cta-button-secondary:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .main-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-links a {
          text-decoration: none;
          color: #2d3748;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-links a:hover {
          color: #667eea;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #667eea;
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .about-section {
          padding: 5rem 2rem;
          background: white;
        }

        .about-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .about-text h3 {
          color: #2d3748;
          font-size: 1.5rem;
          margin: 2rem 0 1rem 0;
        }

        .about-text h3:first-child {
          margin-top: 0;
        }

        .about-text p {
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 0.8rem;
          padding-left: 0;
        }

        .about-stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        .help-section {
          padding: 5rem 2rem;
          background: #f8fafc;
        }

        .help-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .help-category {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .help-category:hover {
          transform: translateY(-5px);
        }

        .help-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .help-category h3 {
          color: #2d3748;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .help-item {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .help-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .help-item h4 {
          color: #2d3748;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .help-item p {
          color: #64748b;
          line-height: 1.6;
        }

        .faq-section {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .faq-section h3 {
          color: #2d3748;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .faq-item {
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 15px;
        }

        .faq-item h4 {
          color: #2d3748;
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
        }

        .faq-item p {
          color: #64748b;
          line-height: 1.6;
        }

        .contact-section {
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          padding: 5rem 2rem;
          color: white;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-info h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .contact-info p {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.7;
          margin-bottom: 3rem;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .contact-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-details h4 {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }

        .contact-details p {
          margin: 0;
          opacity: 0.9;
        }

        .contact-details small {
          opacity: 0.7;
          font-size: 0.9rem;
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .contact-form h3 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.15);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .form-submit {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
          width: 100%;
        }

        .form-submit:hover {
          transform: translateY(-2px);
        }

        .ai-showcase {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .ai-showcase .section-title {
          color: white;
        }

        .ai-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .ai-description h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .ai-description > p {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 3rem;
          line-height: 1.7;
        }

        .ai-features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .ai-feature {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .ai-feature-icon {
          font-size: 2.5rem;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          backdrop-filter: blur(10px);
        }

        .ai-feature-content h4 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .ai-feature-content p {
          opacity: 0.9;
          line-height: 1.6;
        }

        .demo-container {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .demo-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .generate-btn {
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .generate-btn:hover {
          background: #ff5252;
          transform: translateY(-2px);
        }

        .note-preview {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          border-left: 4px solid #ff6b6b;
        }

        .note-preview p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .note-preview p:last-child {
          margin-bottom: 0;
        }

        .qcm-preview {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 15px;
          border-left: 4px solid #10B981;
        }

        .qcm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .qcm-header h5 {
          margin: 0;
          font-size: 1rem;
        }

        .qcm-badge {
          background: #10B981;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .question h6 {
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.4;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          padding: 0.8rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .option:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .option.correct {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
        }

        .option input[type="radio"] {
          margin: 0;
        }

        .option span {
          flex: 1;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .scroll-indicator::after {
          content: '↓';
          font-size: 2rem;
          color: white;
          opacity: 0.7;
        }

        .animate-in {
          animation: slideInUp 0.8s ease-out forwards;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .main-nav {
            padding: 1rem;
            flex-direction: column;
          }
          
          .nav-links {
            margin-top: 1rem;
            gap: 1rem;
          }
          
          .hero-content {
            padding: 1rem;
          }
          
          .features-grid, .help-grid, .faq-grid {
            grid-template-columns: 1fr;
          }
          
          .ai-content, .contact-content, .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .dashboard-mockup, .faq-section, .contact-form {
            padding: 1.5rem;
          }
          
          .feature-card, .help-category {
            padding: 1.5rem;
          }
        }
      `}</style>

      <section className="hero">
        <nav className="main-nav">
          <div className="nav-brand">MyUniHub</div>
          <ul className="nav-links">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#help">Aide</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <div className="hero-content">
          <h1>MyUniHub</h1>
          <p className="subtitle">Votre Compagnon Universitaire Tout-en-Un</p>
          <p style={{fontSize: "1.2rem", marginBottom: "2rem", opacity: "0.8"}}>
            Simplifiez votre vie étudiante, optimisez votre réussite
          </p>
          <a href="#features" className="cta-button">Découvrir les Fonctionnalités</a>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Fonctionnalités Principales</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Emploi du Temps Intelligent</h3>
              <p>Visualisez votre journée en un clin d'œil avec un tableau de bord intuitif. Chaque session de votre emploi du temps devient un point d'entrée vers vos prises de notes associées.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Prise de Notes Révolutionnaire</h3>
              <p>Organisez vos notes par matière et par séance. Retrouvez facilement vos cours grâce à une structure claire et intuitive qui suit votre emploi du temps.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Collaboration & Partage</h3>
              <p>Partagez vos notes avec vos camarades et collaborez en temps réel. Système de chat intégré pour faciliter le travail de groupe et les échanges académiques.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>IA de Révision Intelligente</h3>
              <p>Générez automatiquement des QCM personnalisés à partir de vos notes de cours. L'IA analyse votre contenu et crée des questions de révision adaptées à votre niveau.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Suivi Personnalisé</h3>
              <p>Toutes vos matières au même endroit avec un code couleur unique. Visualisez votre progression et identifiez les sujets à approfondir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="collaboration-showcase">
        <div className="container">
          <h2 className="section-title">Collaboration & Travail en Groupe</h2>
          <div className="collab-content">
            <div className="collab-description">
              <h3>🤝 Travaillez Ensemble, Réussissez Ensemble</h3>
              <p>MyUniHub transforme la collaboration étudiante avec des outils de partage et de communication intégrés, conçus spécialement pour les projets de groupe et l'entraide académique.</p>
              
              <div className="collab-features">
                <div className="collab-feature">
                  <div className="collab-feature-icon">📤</div>
                  <div className="collab-feature-content">
                    <h4>Partage de Notes Instantané</h4>
                    <p>Partagez vos notes avec vos camarades en un clic. Contrôlez les permissions de lecture ou d'édition pour une collaboration sécurisée.</p>
                  </div>
                </div>
                
                <div className="collab-feature">
                  <div className="collab-feature-icon">💬</div>
                  <div className="collab-feature-content">
                    <h4>Chat Intégré par Matière</h4>
                    <p>Communiquez directement dans la plateforme avec des conversations organisées par matière et par groupe de travail.</p>
                  </div>
                </div>
                
                <div className="collab-feature">
                  <div className="collab-feature-icon">👥</div>
                  <div className="collab-feature-content">
                    <h4>Groupes de Travail</h4>
                    <p>Créez des espaces collaboratifs dédiés à vos projets avec partage de fichiers, planning commun et suivi des tâches.</p>
                  </div>
                </div>
                
                <div className="collab-feature">
                  <div className="collab-feature-icon">🔄</div>
                  <div className="collab-feature-content">
                    <h4>Synchronisation en Temps Réel</h4>
                    <p>Toutes les modifications et nouveaux messages sont synchronisés instantanément entre tous les membres du groupe.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="collab-demo">
              <div className="demo-container-collab">
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
                  
                  <div className="chat-input">
                    <input type="text" placeholder="Tapez votre message..." />
                    <button className="send-btn">📤</button>
                  </div>
                </div>
                
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
                      <div className="contact-item">
                        <div className="contact-avatar">👨‍🎓</div>
                        <span>Thomas Martin</span>
                        <input type="checkbox" checked />
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar">👩‍🎓</div>
                        <span>Marie Dubois</span>
                        <input type="checkbox" checked />
                      </div>
                      <div className="contact-item">
                        <div className="contact-avatar">👨‍🎓</div>
                        <span>Lucas Bernard</span>
                        <input type="checkbox" />
                      </div>
                    </div>
                    
                    <div className="permission-settings">
                      <label>
                        <input type="radio" name="permission" value="read" checked />
                        Lecture seule
                      </label>
                      <label>
                        <input type="radio" name="permission" value="edit" />
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

      <section className="ai-showcase">
        <div className="container">
          <h2 className="section-title">Intelligence Artificielle Intégrée</h2>
          <div className="ai-content">
            <div className="ai-description">
              <h3>🤖 Révolutionnez vos Révisions avec l'IA</h3>
              <p>MyUniHub intègre une intelligence artificielle avancée qui transforme vos notes de cours en outils de révision interactifs et personnalisés.</p>
              
              <div className="ai-features">
                <div className="ai-feature">
                  <div className="ai-feature-icon">🧠</div>
                  <div className="ai-feature-content">
                    <h4>Génération Automatique de QCM</h4>
                    <p>L'IA analyse le contenu de vos notes et génère automatiquement des questions à choix multiples adaptées au niveau de difficulté souhaité.</p>
                  </div>
                </div>
                
                <div className="ai-feature">
                  <div className="ai-feature-icon">💾</div>
                  <div className="ai-feature-content">
                    <h4>Sauvegarde Intelligente</h4>
                    <p>Tous les QCM générés sont automatiquement sauvegardés dans votre bibliothèque de révision pour un accès ultérieur.</p>
                  </div>
                </div>
                
                <div className="ai-feature">
                  <div className="ai-feature-icon">📊</div>
                  <div className="ai-feature-content">
                    <h4>Suivi de Performance</h4>
                    <p>Analysez vos résultats et identifiez les points à améliorer grâce aux statistiques détaillées de vos sessions de révision.</p>
                  </div>
                </div>
                
                <div className="ai-feature">
                  <div className="ai-feature-icon">🎯</div>
                  <div className="ai-feature-content">
                    <h4>Révision Adaptative</h4>
                    <p>L'IA adapte la difficulté et le type de questions selon vos performances passées pour maximiser votre apprentissage.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ai-demo">
              <div className="demo-container">
                <div className="demo-header">
                  <h4>📝 Note: Algorithmes de Tri</h4>
                  <button className="generate-btn">🤖 Générer QCM</button>
                </div>
                
                <div className="note-preview">
                  <p><strong>Le tri par fusion (merge sort)</strong> est un algorithme de tri stable qui divise récursivement le tableau en deux moitiés, trie chaque moitié, puis fusionne les résultats.</p>
                  <p><strong>Complexité:</strong> O(n log n) dans tous les cas</p>
                  <p><strong>Avantages:</strong> Stable, prévisible, efficace sur de grandes données</p>
                </div>
                
                <div className="qcm-preview">
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

      <section className="dashboard-preview">
        <div className="preview-container">
          <h2 className="section-title" style={{color: "white"}}>Aperçu du Tableau de Bord</h2>
          <p style={{fontSize: "1.2rem", marginBottom: "2rem", opacity: "0.9"}}>
            Le cœur de MyUniHub - conçu pour un accès rapide et intuitif à toutes vos informations
          </p>
          
          <div className="dashboard-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="mockup-title">MyUniHub Dashboard</div>
            </div>
            
            <h3 style={{color: "#e2e8f0", marginBottom: "1rem"}}>Mes Matières</h3>
            <div className="subjects-grid">
              <div className="subject-card blue">
                <div className="subject-name">Algorithmes et Structures de Données</div>
                <div className="subject-notes">12 notes</div>
              </div>
              <div className="subject-card green">
                <div className="subject-name">Programmation Orientée Objet</div>
                <div className="subject-notes">8 notes</div>
              </div>
              <div className="subject-card yellow">
                <div className="subject-name">Base de Données</div>
                <div className="subject-notes">15 notes</div>
              </div>
              <div className="subject-card red">
                <div className="subject-name">Réseaux et Sécurité</div>
                <div className="subject-notes">6 notes</div>
              </div>
              <div className="subject-card purple">
                <div className="subject-name">Intelligence Artificielle</div>
                <div className="subject-notes">10 notes</div>
              </div>
              <div className="subject-card pink">
                <div className="subject-name">Développement Web</div>
                <div className="subject-notes">9 notes</div>
              </div>
            </div>
            
            <div className="sessions-today">
              <h3 style={{color: "#e2e8f0", marginBottom: "1rem"}}>Sessions d'Aujourd'hui</h3>
              <div className="session-item">
                <div className="session-info">
                  <h4>Algorithmes de Tri</h4>
                  <div className="session-details">09:00 - 10:30 • Amphi A</div>
                </div>
                <div className="session-type">COURS</div>
              </div>
              <div className="session-item">
                <div className="session-info">
                  <h4>Modélisation Relationnelle</h4>
                  <div className="session-details">14:00 - 15:30 • Salle Info 2</div>
                </div>
                <div className="session-type">TD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">À Propos de MyUniHub</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Notre Mission</h3>
              <p>MyUniHub a été créé par des étudiants, pour des étudiants. Nous comprenons les défis quotidiens de la vie universitaire : jongler entre différentes matières, organiser ses notes, suivre son emploi du temps, et réviser efficacement.</p>
              
              <h3>Notre Vision</h3>
              <p>Nous croyons que chaque étudiant mérite d'avoir les meilleurs outils pour réussir. C'est pourquoi nous avons développé une solution tout-en-un qui centralise l'essentiel de votre vie académique en un seul endroit.</p>
              
              <h3>Pourquoi MyUniHub ?</h3>
              <ul className="benefits-list">
                <li>✅ <strong>Gain de temps :</strong> Plus besoin de jongler entre plusieurs applications</li>
                <li>✅ <strong>Organisation optimale :</strong> Structure claire et intuitive</li>
                <li>✅ <strong>Synchronisation parfaite :</strong> Emploi du temps et notes liés</li>
                <li>✅ <strong>Suivi de progression :</strong> Visualisez votre avancement par matière</li>
                <li>✅ <strong>Interface moderne :</strong> Design pensé pour l'efficacité</li>
              </ul>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">95%</div>
                <div className="stat-label">Temps de recherche économisé</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3x</div>
                <div className="stat-label">Plus d'efficacité en révision</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfaction étudiante</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="help" className="help-section">
        <div className="container">
          <h2 className="section-title">Centre d'Aide</h2>
          <div className="help-grid">
            <div className="help-category">
              <div className="help-icon">🚀</div>
              <h3>Premiers Pas</h3>
              <div className="help-items">
                <div className="help-item">
                  <h4>Comment créer mon compte ?</h4>
                  <p>Inscrivez-vous en quelques clics avec votre email universitaire pour bénéficier de toutes les fonctionnalités.</p>
                </div>
                <div className="help-item">
                  <h4>Configuration de l'emploi du temps</h4>
                  <p>Importez votre emploi du temps ou créez-le manuellement. MyUniHub s'adapte à tous les formats.</p>
                </div>
                <div className="help-item">
                  <h4>Ajout de vos matières</h4>
                  <p>Personnalisez vos matières avec des couleurs et organisez-les selon vos préférences.</p>
                </div>
              </div>
            </div>

            <div className="help-category">
              <div className="help-icon">📝</div>
              <h3>Prise de Notes</h3>
              <div className="help-items">
                <div className="help-item">
                  <h4>Créer une nouvelle note</h4>
                  <p>Cliquez sur une session dans votre emploi du temps pour créer instantanément une note associée.</p>
                </div>
                <div className="help-item">
                  <h4>Partage de notes avec permissions</h4>
                  <p>Cliquez sur le bouton "Partager" dans vos notes pour les envoyer à vos camarades avec des droits de lecture ou d'édition.</p>
                </div>
                <div className="help-item">
                  <h4>Génération de QCM avec l'IA</h4>
                  <p>Sélectionnez une note et cliquez sur "Générer QCM" pour créer automatiquement des questions de révision personnalisées.</p>
                </div>
                <div className="help-item">
                  <h4>Organiser vos notes</h4>
                  <p>Vos notes sont automatiquement classées par matière et par date pour un accès rapide.</p>
                </div>
                <div className="help-item">
                  <h4>Bibliothèque de QCM</h4>
                  <p>Accédez à tous vos QCM sauvegardés dans la section "Révisions" pour des sessions d'entraînement répétées.</p>
                </div>
              </div>
            </div>

            <div className="help-category">
              <div className="help-icon">🤝</div>
              <h3>Collaboration</h3>
              <div className="help-items">
                <div className="help-item">
                  <h4>Comment partager une note ?</h4>
                  <p>Ouvrez votre note, cliquez sur "Partager", sélectionnez vos contacts et choisissez les permissions (lecture ou édition).</p>
                </div>
                <div className="help-item">
                  <h4>Créer un groupe de travail</h4>
                  <p>Dans la section "Groupes", cliquez sur "Nouveau groupe", ajoutez les membres et définissez la matière associée.</p>
                </div>
                <div className="help-item">
                  <h4>Utiliser le chat de groupe</h4>
                  <p>Accédez au chat depuis votre groupe de travail pour communiquer en temps réel et partager des fichiers.</p>
                </div>
              </div>
            </div>

            <div className="help-category">
              <div className="help-icon">🤖</div>
              <h3>IA & Révisions</h3>
              <div className="help-items">
                <div className="help-item">
                  <h4>Comment générer un QCM ?</h4>
                  <p>Ouvrez une note et cliquez sur le bouton "Générer QCM". L'IA analysera le contenu et créera des questions adaptées.</p>
                </div>
                <div className="help-item">
                  <h4>Personnaliser la difficulté</h4>
                  <p>Choisissez le niveau de difficulté (Facile, Moyen, Difficile) avant la génération pour adapter les questions à vos besoins.</p>
                </div>
                <div className="help-item">
                  <h4>Suivi des performances</h4>
                  <p>Consultez vos statistiques de révision pour identifier les sujets à approfondir et suivre vos progrès.</p>
                </div>
              </div>
            </div>

            <div className="help-category">
              <div className="help-icon">⚙️</div>
              <h3>Paramètres</h3>
              <div className="help-items">
                <div className="help-item">
                  <h4>Personnalisation de l'interface</h4>
                  <p>Adaptez les couleurs, la disposition et les notifications selon vos préférences.</p>
                </div>
                <div className="help-item">
                  <h4>Synchronisation des données</h4>
                  <p>Vos données sont automatiquement sauvegardées et synchronisées sur tous vos appareils.</p>
                </div>
                <div className="help-item">
                  <h4>Exportation des notes</h4>
                  <p>Exportez vos notes en PDF ou autres formats pour les partager ou les imprimer.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="faq-section">
            <h3>Questions Fréquentes</h3>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Comment fonctionne le partage de notes ?</h4>
                <p>Vous pouvez partager vos notes avec des camarades en définissant des permissions précises : lecture seule ou édition collaborative. Le destinataire reçoit une notification et peut accéder à la note depuis son tableau de bord.</p>
              </div>
              <div className="faq-item">
                <h4>Le chat est-il sécurisé ?</h4>
                <p>Oui, toutes les communications sont chiffrées de bout en bout. Seuls les membres du groupe peuvent accéder aux conversations et aux fichiers partagés.</p>
              </div>
              <div className="faq-item">
                <h4>Comment fonctionne l'IA de génération de QCM ?</h4>
                <p>L'IA analyse le contenu de vos notes, identifie les concepts clés et génère automatiquement des questions pertinentes avec des réponses multiples. Plus vos notes sont détaillées, meilleurs sont les QCM générés.</p>
              </div>
              <div className="faq-item">
                <h4>Puis-je modifier les QCM générés ?</h4>
                <p>Oui, vous pouvez éditer les questions et réponses générées par l'IA pour les adapter parfaitement à vos besoins de révision.</p>
              </div>
              <div className="faq-item">
                <h4>MyUniHub est-il gratuit ?</h4>
                <p>Oui, MyUniHub offre une version gratuite avec toutes les fonctionnalités essentielles. Des options premium sont disponibles pour des besoins avancés.</p>
              </div>
              <div className="faq-item">
                <h4>Mes données sont-elles sécurisées ?</h4>
                <p>Absolument. Nous utilisons un chiffrement de niveau bancaire et ne partageons jamais vos données personnelles.</p>
              </div>
              <div className="faq-item">
                <h4>Puis-je utiliser MyUniHub hors ligne ?</h4>
                <p>Oui, vos notes et emploi du temps sont disponibles hors ligne. Les modifications seront synchronisées dès que vous serez reconnecté.</p>
              </div>
              <div className="faq-item">
                <h4>MyUniHub fonctionne-t-il sur mobile ?</h4>
                <p>Oui, MyUniHub est entièrement responsive et fonctionne parfaitement sur smartphones et tablettes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title" style={{color: "white"}}>Nous Contacter</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Besoin d'aide ou de suggestions ?</h3>
              <p>Notre équipe est là pour vous accompagner dans votre réussite universitaire. N'hésitez pas à nous contacter pour toute question ou suggestion d'amélioration.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>support@myunihub.fr</p>
                    <small>Réponse sous 24h</small>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">💬</div>
                  <div className="contact-details">
                    <h4>Chat en Direct</h4>
                    <p>Assistance instantanée</p>
                    <small>Lun-Ven 9h-18h</small>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">📱</div>
                  <div className="contact-details">
                    <h4>Réseaux Sociaux</h4>
                    <p>@MyUniHub</p>
                    <small>Actualités et conseils</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Envoyez-nous un message</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <select id="subject" name="subject" required>
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
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" className="form-submit">Envoyer le Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à Révolutionner Votre Vie Universitaire ?</h2>
            <p>MyUniHub est plus qu'une simple application, c'est votre partenaire de réussite universitaire.</p>
            <a href="#" className="cta-button-secondary">Commencer Maintenant</a>
          </div>
        </div>
      </section>
    </div>
  );
}