// hooks/useScrollAnimation.js
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
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

    // Observer tous les éléments animables
    const animatableElements = document.querySelectorAll(
      '.feature-card, .help-category, .stat-card, .faq-item, .ai-feature, .collab-feature'
    );
    
    animatableElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      animatableElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
};