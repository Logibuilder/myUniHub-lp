// components/landing/MyUniHubLanding.jsx - Version complète
import React from 'react';
import {  useParallax } from '../hooks/useParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AIShowcase from './AIShowcase';
import CollaborationShowcase from './CollaborationShowcase';
import DashboardPreview from './DashboardPreview';
import AboutSection from './AboutSection';
import HelpSection from './HelpSection';
import ContactSection from './ContactSection';
import CTASection from './CTASection';
import Footer from './Footer';

const MyUniHubLanding = () => {
  useScrollAnimation();
  useParallax();

  return (
    <div className="myunihub-landing">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AIShowcase />
      <CollaborationShowcase />
      <DashboardPreview />
      <AboutSection />
      <HelpSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default MyUniHubLanding;