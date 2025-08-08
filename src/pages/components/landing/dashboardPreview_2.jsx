// components/landing/DashboardPreview.jsx
import React, { useState } from 'react';
import styles from '../../../styles/DashboardPreview.module.css';

const DashboardPreview_2 = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notifications, setNotifications] = useState([]);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    // Ajouter une notification temporaire pour montrer l'interaction
    const newNotification = {
      id: Date.now(),
      message: `Navigation vers ${tab}`,
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Supprimer la notification après 2 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 2000);
  };

  const handleQuizStart = (quizName) => {
    const newNotification = {
      id: Date.now(),
      message: `Démarrage du quiz: ${quizName}`,
      type: 'success'
    };
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 2000);
  };

  const handleViewNotes = () => {
    const newNotification = {
      id: Date.now(),
      message: 'Ouverture des notes...',
      type: 'info'
    };
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 2000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard':
        return (
          <>
            <img src="/imgs/dashboard.jpg" alt="dashboard" className="w-full "   />
          </>
        );

      case 'Planning':
        return (
          <>
            <img src="/imgs/planning.jpg" alt="dashboard" className="w-full "   />
          </>
        );

      case 'Subject':
        return (
          < >
            <img src="/imgs/subject.jpg" alt="subject" className="w-full "   />
          </>
        );

      case 'Notes':
        return (
          <>
            <img src="/imgs/notes.jpg" alt="notes" className="w-full "   />
          </>
        );

      case 'Quiz':
        return (
          <>
            <img src="/imgs/quiz.jpg" alt="quiz" className="w-full "   />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.dashboardPreview}>
      <div className={styles.container}>
        
        

        <div className={styles.mockupContainer}>
          {/* Mockup Browser Header */}
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <div className={`${styles.dot} ${styles.red}`}></div>
              <div className={`${styles.dot} ${styles.yellow}`}></div>
              <div className={`${styles.dot} ${styles.green}`}></div>
            </div>
            <div className={styles.urlBar}>myunihub.fr/Notes</div>
          </div>

          <img src="/imgs/vide_note.jpg" alt="notes" className="w-full "   />

            

        </div>
      </div>
      
        
    </section>
  );
};

export default DashboardPreview_2;