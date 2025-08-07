// components/landing/DashboardPreview.jsx
import React, { useState } from 'react';
import styles from '../../../styles/DashboardPreview.module.css';

const DashboardPreview = () => {
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
          <div className={styles.tabContent}>
            <img src="/imgs/planning.jpg" alt="dashboard" className="w-full "   />
          </div>
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
        <div className={styles.header}>
          <h2 className={styles.title}>
            Tableau de Bord Intelligent
          </h2>
          <p className={styles.subtitle}>
            Visualisez vos performances, gérez votre planning et accédez à vos ressources en un clin d'œil
          </p>
        </div>

        {/* Notifications */}
        <div className={styles.notifications}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.notification} ${styles[notification.type]}`}
            >
              {notification.message}
            </div>
          ))}
        </div>

        <div className={styles.mockupContainer}>
          {/* Mockup Browser Header */}
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <div className={`${styles.dot} ${styles.red}`}></div>
              <div className={`${styles.dot} ${styles.yellow}`}></div>
              <div className={`${styles.dot} ${styles.green}`}></div>
            </div>
            <div className={styles.urlBar}>{activeTab ? `myunihub.fr/${activeTab}` : 'myunihub.fr'}</div>
          </div>

          {/* Dashboard Content */}
          <div className={styles.dashboardContent}>
            {/* Top Navigation */}
            <div className={styles.topNav}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>🎓</div>
                <span>MyUniHub</span>
              </div>
              <nav className={styles.nav}>
                <span 
                  className={`${styles.navItem} ${activeTab === 'Dashboard' ? styles.active : ''}`}
                  onClick={() => handleNavClick('Dashboard')}
                >
                  Dashboard
                </span>
                <span 
                  className={`${styles.navItem} ${activeTab === 'Planning' ? styles.active : ''}`}
                  onClick={() => handleNavClick('Planning')}
                >
                  Planning
                </span>
                <span 
                  className={`${styles.navItem} ${activeTab === 'Subject' ? styles.active : ''}`}
                  onClick={() => handleNavClick('Subject')}
                >
                  Subject
                </span>
                <span 
                  className={`${styles.navItem} ${activeTab === 'Notes' ? styles.active : ''}`}
                  onClick={() => handleNavClick('Notes')}
                >
                  Notes
                </span>
                
                <span 
                  className={`${styles.navItem} ${activeTab === 'Quiz' ? styles.active : ''}`}
                  onClick={() => handleNavClick('Quiz')}
                >
                  Quiz
                </span>
              </nav>
              <div className={styles.userInfo}>
                <span>Ali Ousmane</span>
                <div className={styles.avatar}>A</div>
              </div>
            </div>

            {/* Welcome Section */}
            <div className={styles.welcomeSection}>
              <h1 className={styles.welcomeTitle}>Bonjour, Ali Ousmane! 👋</h1>
              <p className={styles.welcomeSubtext}>💪 Continuez sur cette lancée !</p>
              <div className={styles.universityBadge}>
                🏫 Université Sorbonne
              </div>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <img src="/imgs/open_note.jpg" alt="notes" className="w-full "   />
      </div>
      <div className={styles.container}>
        <img src="/imgs/vide_note.jpg" alt="notes" className="w-full "   />
      </div>
    </section>
  );
};

export default DashboardPreview;