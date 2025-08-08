// components/landing/DashboardPreview.jsx
import React, { useState } from 'react';
import styles from '../../../styles/DashboardPreview.module.css';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [notifications, setNotifications] = useState([]);


  const getUserInfo = (tab) => {
    const userConfigs = {
      'Planning': { name: 'Ali Ousmane', avatar: 'A', university: 'Université Paul Sabatier' },
      'Dashboard': { name: 'Assane KANE', avatar: 'A', university: 'Université Jean Jaurès' },
      'Subject': { name: 'Annadif Abdel Rahim', avatar: 'A', university: 'Université Lille 1' },
      'Notes': { name: 'Youssouf Ali Rozi', avatar: 'Y', university: 'Université de Montpellier' },
      'Quiz': { name: 'Assane KANE', avatar: 'A', university: 'Université Paul Sabatier' }
    };
    return userConfigs[tab] || userConfigs['Dashboard'];
  };

  const currentUser = getUserInfo(activeTab);
  
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
                <span>{currentUser.name}</span>
                <div className={styles.avatar}>{currentUser.avatar}</div>
              </div>
            </div>

            {/* Welcome Section */}
            <div className={styles.welcomeSection}>
              <h1 className={styles.welcomeTitle}>Bonjour, {currentUser.name}! 👋</h1>
              <p className={styles.welcomeSubtext}>💪 Continuez sur cette lancée !</p>
              <div className={styles.universityBadge}>
                🏫 {currentUser.university}
              </div>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;